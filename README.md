# Not Just Luck: Banish impostor syndrome for good!

Not Just Luck is an interactive full-stack web app that helps users overcome impostor syndrome by guiding them to see the history of their own successes as well as the skills and traits that made those successes possible.

## Screenshots
![Landing page screen shot](https://github.com/Marjona6/not-just-luck-thinkful-full-stack-capstone/blob/master/public/img/njl01.png)
![Account setup screen shot](https://github.com/Marjona6/not-just-luck-thinkful-full-stack-capstone/blob/master/public/img/njl02.png)
![User homepage screen shot](https://github.com/Marjona6/not-just-luck-thinkful-full-stack-capstone/blob/master/public/img/njl03.png)
![Achievement timeline screen shot](https://github.com/Marjona6/not-just-luck-thinkful-full-stack-capstone/blob/master/public/img/njl04.png)
![Skills word cloud screen shot](https://github.com/Marjona6/not-just-luck-thinkful-full-stack-capstone/blob/master/public/img/njl05.png)

## Use Case
Not Just Luck is for anyone who struggles with impostor syndrome and would like a centralized place to record and reflect upon their accomplishments and what it took to achieve them. Not Just Luck is like a good friend who reminds you of your strengths when you forget.

## Initial UX
User Stories
AS A VISITOR, NOT LOGGED IN

* As an initial visitor to the page, I want to land on the web page and see what the page is about so I can understand what the app is and does and decide whether or not to create an account to be able to use the app.
* As a visitor, I want to create a new account so that I can use the app.
(LANDING PAGE--wireframe will have title, logo, a few details about logging in and what the app is about)
![UI Flow handwritten draft](https://github.com/Marjona6/not-just-luck-thinkful-full-stack-capstone/blob/master/public/img/wf00.jpg)

* As a visitor, I want to be able to view a demo or read about/see how the app works so that I can decide if I want to sign up for an account. (LANDING PAGE plus DEMO?)

* As a visitor who has already created an account, I want to log in so that I can access my account.

AS A LOGGED-IN USER
* As a user, I want to set up my new account by describing some past successes so that I can reflect back on them later when I feel impostor syndrome setting in.
![UI Flow handwritten draft](https://github.com/Marjona6/not-just-luck-thinkful-full-stack-capstone/blob/master/public/img/wf04.jpg)

* As a user, I want to view my past successes once I have entered them into the system so that I can combat impostor syndrome feelings.
* As a user, I want to see graphic/visual representations of my past successes and the skills and traits I used to achieve them so I can know I am a capable person.
![UI Flow handwritten draft](https://github.com/Marjona6/not-just-luck-thinkful-full-stack-capstone/blob/master/public/img/wf01.jpg)
![UI Flow handwritten draft](https://github.com/Marjona6/not-just-luck-thinkful-full-stack-capstone/blob/master/public/img/wf02.jpg)
![UI Flow handwritten draft](https://github.com/Marjona6/not-just-luck-thinkful-full-stack-capstone/blob/master/public/img/wf03.jpg)

## Working Prototype
Find a working prototype with Node at http://not-just-luck.herokuapp.com/ .
Find a working prototype with React front end at https://marjona6.github.io/not-just-luck-thinkful-full-stack-capstone-react/build .

## Functionality
* When they first set up their account, users are guided through a setup process in which they will be asked to describe an achievement or success they have accomplished and to specify which skills and character traits were required in order to achieve it (for example, negotiation, interpersonal skills, planning, forethought, JavaScript, Python, classical guitar, persistence, juggling). The app will provide users with a default list of general skills and traits from which users can select all relevant ones, and (PLANNED FUTURE ADDITIONAL FEATURE) users should also be able to add and specify their own skills or traits to add to the list (for example, job-specific skills like jQuery or project management).
* Once they have initially set up an account, view their past successes in one or more graphic representations (timelines, charts, graphs, visualizations, word clouds, etc.).

## Technical
Not Just Luck was built as two separate parts.

<h3>Front End</h3>
<ul>
  <li>HTML5</li>
  <li>CSS3</li>
  <li>JavaScript</li>
  <li>jQuery</li>
  <li>React</li>
</ul>
<h3>Back End</h3>
<ul>
  <li>Node.js</li>
  <li>Express.js</li>
  <li>MongoDB</li>
  <li>Mongoose</li>
  <li>mLab database</li>
  <li><a href="https://mochajs.org/">Mocha</a> and <a href="http://chaijs.com/">Chai</a> for testing</li>
</ul>
<h3>Responsive</h3>
<ul>
  <li>The app is responsive and optimized for both desktop and mobile viewing and use.</li>
</ul>
<h3>Security</h3>
<ul>
  <li>User passwords are encrypted using <a href="https://github.com/dcodeIO/bcrypt.js">bcrypt.js</a>.</li>
</ul>

## API Documentation
API endpoints for the back end include:
* POST to '/users/create' for creating a new user
* POST to '/signin' to sign in an existing user
* POST to '/new/create' to add an achievement to a user's list of accomplishments
* PUT to '/achievement/:id' to update an existing achievement
* GET to '/achievements/:user' to access all of a user's existing achievements
* GET to '/achievement/:id' to access a single achievement by ID
* DELETE to '/achievement/:id' to delete a single achievement by ID

## Development Roadmap
Planned additional features and improvements will allow users to:
* Be presented with motivational quotations that appear at random on their homepage.
* Enter and store compliments they receive from friends, co-workers, bosses, etc. in a "Bank"; and
* Refer back to these compliments (that help them to see that they are qualified and skilled) by viewing the "Bank."
* Change password
* Update email address