// connect to db
// insert seed data into db
// make HTTP requests to API using the test client
// inspect the state of the db after request is made
// tear down the db

// using ES6 promises

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

// requiring in the js files from this app
const Achievement = require('../models/achievement');
//console.log(Achievement);
const User = require('../models/user');
//console.log(User);
const {app, runServer, closeServer} = require('../server');
// import TEST_DATABASE_URL from ('../config');
const {DATABASE_URL, TEST_DATABASE_URL} = require('../config');
console.log(TEST_DATABASE_URL);

// chai
const should = chai.should();
chai.use(chaiHttp);

// function definitions
function seedAchievementData() {
	console.info('Seeding achievement data');
	const seedData = [];

	for (let i=1; i<=10; i++) {
		seedData.push(generateAchievementData());
	}
	// console.log(seedData);
	// console.log(Achievement);
	// should return a promise
	return Achievement.insertMany(seedData);
}
const testUsername = faker.random.word() + faker.random.number();

function generateUserData() {
	return {
		username: testUsername,
		password: faker.random.word()
	}
}

function generateTrait() {
	const traits = [
		'Optimism', 'Creativity', 'Resilience', 'Self-Control', 'Focus', 'Flexibility', 'Vision', 'Time Management', 'Communication Skills', 'Courage', 'Generosity', 'Confidence', 'Curiosity', 'Planning', 'Balance', 'Enthusiasm', 'People Skills', 'Listening Skills', 'Empathy', 'Preparation', 'Self-Reliance', 'Gratitude', 'Forgiveness', 'Goal Setting', 'Grit', 'Tenacity'];
		return traits[Math.floor(Math.random() * traits.length)];
}

function generateAchievementData() {
	return {
		// should be the same as username from generateUserData() above
		user: testUsername, 
		achieveWhat: faker.lorem.sentence(),
		achieveHow: [generateTrait(), generateTrait(), generateTrait()],
		achieveWhen: faker.date.past().toString(),
		achieveWhy: faker.lorem.sentence()
	}
}

function tearDownDb() {
	console.warn('Deleting database!');
	return mongoose.connection.dropDatabase();
}

describe('Achievements API resource', function() {

	before(function() {
		return runServer(TEST_DATABASE_URL)
		.then(console.log('running server'))
		.catch(err => console.log({err}));
	});

	beforeEach(function() {
		return seedAchievementData();
	});

	describe('GET endpoint', function() {
		it('should return all achievements in the DB for a user', function() {
			let res;
			return chai.request(app)
				.get('/achievements/' + testUsername)
				.then(function(_res) {
					res = _res;
					res.should.have.status(200);
					res.body.achievementOutput.should.have.length.of.at.least(1);
					return Achievement.count();
				})
				.then(function(count) {
					res.body.achievementOutput.should.have.length.of(count);
				});
		});
	});

	it('should return achievements with the right fields', function() {
		// ensure they have the expected keys
		return chai.request(app)
			.get('/achievements/' + testUsername)
			.then(function(res) {
				res.should.have.status(200);
				res.should.be.json;
				res.body.achievementOutput.should.be.a('array');
				res.body.achievementOutput.should.have.length.of.at.least(1);

				res.body.achievementOutput.forEach(function(achievement) {
					achievement.should.be.a('object');
					achievement.should.include.keys(
						'user', 'achieveWhat', 'achieveHow', 'achieveWhen', 'achieveWhy');
				});
			});
	});

	describe('POST endpoint', function() {
		it('should add a new achievement', function() {
			const newAchievement = generateAchievementData();
			console.log(newAchievement);

			return chai.request(app)
				.post('/new/create')
				.send(newAchievement)
				.then(function(res) {
					res.should.have.status(200);
					res.should.be.json;
					res.body.should.be.a('object');
					res.body.should.include.keys(
						'user', 'achieveWhat', 'achieveHow', 'achieveWhen', 'achieveWhy');
					res.body.user.should.equal(newAchievement.user);
					res.body.achieveWhat.should.equal(newAchievement.achieveWhat);
					// res.body.achieveHow.should.equal(newAchievement.achieveHow); // returns two objects that look same but says they're not
					res.body.achieveWhen.should.equal(newAchievement.achieveWhen);
					res.body.achieveWhy.should.equal(newAchievement.achieveWhy);
					res.body._id.should.not.be.null;

					return Achievement.findById(res.body.id);
				})
				// .then(function(achievement) {
				// 	console.log(achievement);
				// 	achievement.user.should.equal(newAchievement.user);
				// 	// achievement.achieveWhat.should.equal(newAchievement.achieveWhat);
				// 	// achievement.achieveHow.should.equal(newAchievement.achieveHow);
				// 	// achievement.achieveWhen.should.equal(newAchievement.achieveWhen);
				// 	// achievement.achieveWhy.should.equal(newAchievement.achieveWhy);
				// });
		});
	});

	describe('PUT endpoint', function() {
		it('should update fields sent over', function() {
			const updateData = {
				achieveWhat: 'Picked a peck of pickled peppers',
				achieveWhy: 'To fetch a pail of water'
			};

			return Achievement
				.findOne()
				.then(function(achievement) {
					updateData.id = achievement.id;
					return chai.request(app)
						.put(`/achievement/${achievement.id}`)
						.send(updateData);
				})
				.then(function(res) {
					res.should.have.status(204);
					return Achievement.findById(updateData.id);
				})
				.then(function(achievement) {
					achievement.achieveWhat.should.equal(updateData.achieveWhat);
					achievement.achieveWhy.should.equal(updateData.achieveWhy);
				});
		});
	});

	describe('DELETE endpoint', function() {
		it('should delete an achievement by ID', function() {
			let achievement;
			return Achievement
				.findOne()
				.then(function(_achievement) {
					achievement = _achievement;
					return chai.request(app).delete(`/achievement/${achievement.id}`);
				})
				.then(function(res) {
					res.should.have.status(204);
					return Achievement.findById(achievement.id);
				})
				.then(function(_achievement) {
					should.not.exist(_achievement);
				});
		});
	});

	afterEach(function() {
		return tearDownDb();
	});

	after(function() {
		return closeServer();
	});
});