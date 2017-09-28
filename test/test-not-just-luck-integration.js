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
const {Achievement} = require('../models/achievement');
const {User} = require('../models/user');
const {app, runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');

// chai
const should = chai.should();
chai.use(chaiHttp);

// function definitions
function generateUserData() {
	return {
		username: faker.random.word() + faker.random.number(),
		password: faker.random.
	}
}

function generateAchievementData() {
	return {
		// should be the same as username from generateUserData() above
		user: , 
		achieveWhat: faker.lorem.sentence(),
		achieveHow: [ 
			"Self-Control",
	        "Courage",
	        "Gratitude"],
		achieveWhen: faker.date.past(),
		achieveWhy: faker.lorem.sentence()
	}
}

function generateRestaurantData() {
  return {
    name: faker.company.companyName(),
    borough: generateBoroughName(),
    cuisine: generateCuisineType(),
    address: {
      building: faker.address.streetAddress(),
      street: faker.address.streetName(),
      zipcode: faker.address.zipCode()
    },
    grades: [generateGrade(), generateGrade(), generateGrade()]
  }
}