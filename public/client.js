"use strict";

// Function and object definitions
var user = undefined;
var achievementId = undefined;
var dateFormat = 'eu';
var editToggle = false;
var backWarnToggle = false;
var backToLandingPageToggle = false;
var newUserToggle = false;
var backToHomePageToggle = true;

function submitNewAccomplishment(user) {
	event.preventDefault();
	backWarnToggle = false;
	// AJAX call to send the form data up to the server/DB
	// take values from form inputs
	const achWhat = $('input[id="achieve-what"]').val();
	var achHow = [];
		// add all the cb values to the array achHow
		var cbElements = $('input[type=checkbox]');
		for (let i=0; i < cbElements.length; i++) {
			if ($(cbElements[i]).is(':checked')) {
				achHow.push(cbElements[i].value);
			};
		};
	var achWhen = $('input[id="datepicker"]').val();
	achWhen = Date.parse(achWhen);
	const achWhy = $('input[id="achieve-why"]').val();
	const newAchObject = {
		user: user,
		achieveWhat: achWhat,
		achieveHow: achHow,
		achieveWhen: achWhen,
		achieveWhy: achWhy
	};
	if (editToggle === false) {
		$.ajax({
				type: 'POST',
				url: 'https://not-just-luck.herokuapp.com/new/create',
				dataType: 'json',
				data: JSON.stringify(newAchObject),
				contentType: 'application/json'
			})
			.done(function (result) {
				showTimeline();
			})
			.fail(function (jqXHR, error, errorThrown) {
	            console.log(jqXHR);
	            console.log(error);
	            console.log(errorThrown);
			});
	} else if (editToggle === true) {
		$.ajax({
				type: 'PUT',
				url: 'https://not-just-luck.herokuapp.com/achievement/' + achievementId,
				dataType: 'json',
				data: JSON.stringify(newAchObject),
				contentType: 'application/json'
			})
			.done(function (result) {
				showTimeline();
				editToggle = false;
			})
			.fail(function (jqXHR, error, errorThrown) {
	            console.log(jqXHR);
	            console.log(error);
	            console.log(errorThrown);
			});
	};
}

function goBack() {
	if (backToLandingPageToggle === true) {
		location.reload();
	} else if (backWarnToggle === true) {
		event.preventDefault();
		if (confirm('Are you sure you want to go back? Your changes will not be saved.') == true) {
			if (backToHomePageToggle === true) {
				showHomePage();
			} else {
				showTimeline();
			}
			$('#input-form')[0].reset();
			backWarnToggle = false;
		}
	} else {
		showHomePage();
	};
}

function showSignInPage() {
	backToLandingPageToggle = true;
	$('#landing-page').hide();
	$('#account-signup-page').hide();
	$('#js-signin-link').hide();
	$('#js-delete-button').hide();
	$('#js-back-button').show();
	$('#signin-page').show();
}

function showAddPage() {
	$('*').scrollTop(0);
	$('#landing-page').hide();
	$('#signin-page').hide();
	$('#user-home-page').hide();
	$('#account-signup-page').hide();
	$('#add-new-blurb').hide();
	$('#js-signin-link').hide();
	$('#js-signout-link').show();
	$('#account-setup-blurb').hide();
	$('#account-setup-page').show();
	$('#js-back-button').show();
	if (newUserToggle === true) {
		$('#js-back-button').hide();
		$('#account-setup-blurb').show();
	} else {
		$('#add-new-blurb').show();
	};
}

function showHomePage() {
	backToHomePageToggle = true;
	$('#visuals').hide();
	$('#landing-page').hide();
	$('#signin-page').hide();
	$('#js-back-button').hide();
	$('#js-delete-button').hide();
	$('#account-setup-page').hide();
	$('#user-home-page').show();
}

function showTimeline() {
	backWarnToggle = false;
	$('#account-setup-page').hide();
	$('#user-home-page').hide();
	$('#js-delete-button').hide();
	$('#visual-how').hide();
	$('#visual-what').hide();
	$('#visual-why').hide();
	$('#js-back-button').show();
	$('#visuals').show();
	$('#visual-when').show();
	$.getJSON('https://not-just-luck.herokuapp.com/achievements/' + user, function (res) {
		let htmlContent = '';
		for (let i=0; i<res.achievementOutput.length; i++) {
			let myUl = '<ul class="timeline-ul">';
			for (let j=0; j<res.achievementOutput[i].achieveHow.length; j++) {
				myUl += `<li>${res.achievementOutput[i].achieveHow[j]}</li>`;
			};
			myUl += '</ul>';
			let achWhenReadable = new Date(res.achievementOutput[i].achieveWhen);
			let dd = achWhenReadable.getDate();
			let mm = achWhenReadable.getMonth()+1;
			let yyyy = achWhenReadable.getFullYear();
			// if statements to choose date display format go here
			// defaults to European
			if (dateFormat == 'in') {
				achWhenReadable = yyyy + '/' + mm + '/' + dd;
			} else if (dateFormat == 'us') {
				achWhenReadable = mm + '/' + dd + '/' + yyyy;
			} else {
				achWhenReadable = dd + '/' + mm + '/' + yyyy;
			}
			htmlContent += `<div class="timeline-item" date-is="${achWhenReadable}">
				<a href="#" class="js-get-achievement" id="${res.achievementOutput[i]._id}"><h2>
				${res.achievementOutput[i].achieveWhat}</h2></a>
				<p>${res.achievementOutput[i].achieveWhy}</p>
				<p>It took: ${myUl}</div>`;	
		};
		$('.timeline-container').html(htmlContent);
	});
	// reset form back to empty
	$('#input-form')[0].reset();
	// reset checkboxes back to unchecked
	$('input:checkbox').removeAttr('checked');
}

// Triggers
$(document).ready(function () {
	// when page first loads
	$('*').scrollTop(0);
	// backWarnToggle = false;
	backToLandingPageToggle = false;
	$('#signin-page').hide();
	$('#account-setup-page').hide();
	$('#user-home-page').hide();
	$('#visuals').hide();
	$('#js-signout-link').hide();
	$('#js-back-button').hide();
	$('#js-delete-button').hide();
	$('#landing-page').show();
	$('#account-signup-page').show();

// USER FLOW 1: USER SIGNS UP FOR NEW ACCOUNT
	$('#js-new-account').on('click', function(event) {
		const form = document.body.querySelector('#new-account-form');
		if (form.checkValidity && !form.checkValidity()) {
			return;
		}
		const fname = $('input[name="fname"]').val();
		const uname = $('input[name="uname"]').val();
		const pw = $('input[name="pw"]').val();
		const confirmPw = $('input[name="confirm-pw"]').val();
		if (pw !== confirmPw) {
			event.preventDefault();
			alert('Passwords must match!');
		} else {
			event.preventDefault();
			const newUserObject = {
				username: uname,
				password: pw
			};
			// will assign a value to variable 'user' in signin step below
			// AJAX call to send form data up to server/DB and create new user
			$.ajax({
				type: 'POST',
				url: 'https://not-just-luck.herokuapp.com/users/create',
				dataType: 'json',
				data: JSON.stringify(newUserObject),
				contentType: 'application/json'
			})
			.done(function (result) {
				event.preventDefault();
				newUserToggle = true;
				alert('Thanks for signing up! You may now sign in with your username and password.');
				showSignInPage();
			})
			.fail(function (jqXHR, error, errorThrown) {
	            console.log(jqXHR);
	            console.log(error);
	            console.log(errorThrown);
			});
		};
	});

	

// USER FLOW 2: USER WITH ACCOUNT SIGNS IN
// users signing up for new accounts should be routed into this flow to keep everything inside a single user flow
	// when user clicks sign-in link in header
	$('#js-signin-link').on('click', function(event) {
		event.preventDefault();
		showSignInPage();
	});	

	// when user clicks sign-in button from #signin-page
	// EVERYTHING MEATY GOES INSIDE HERE
	$('#js-signin-button').on('click', function(event) {
		event.preventDefault();
		backToLandingPageToggle = false;
		// AJAX call to validate login info and sign user in
		const inputUname = $('input[name="signin-uname"]').val();
		const inputPw = $('input[name="signin-pw"]').val();
		// check for spaces, empty, undefined
        if ((!inputUname) || (inputUname.length < 1) || (inputUname.indexOf(' ') > 0)) {
            alert('Invalid username');
        }
        else if ((!inputPw) || (inputPw.length < 1) || (inputPw.indexOf(' ') > 0)) {
            alert('Invalid password');
        } else {
            const unamePwObject = {
                username: inputUname,
                password: inputPw
	        };
	        user = inputUname;
	        $.ajax({
	        	type: "POST",
	                url: "https://not-just-luck.herokuapp.com/signin",
	                dataType: 'json',
	                data: JSON.stringify(unamePwObject),
	                contentType: 'application/json'
	            })
	            .done(function (result) {
	            	// show the signout link in header as soon as user is signed in
					$('#js-signout-link').show();
	            	if (newUserToggle === true) {
	            		showAddPage();
	            	} else {
	            		showHomePage();
	            	}
	        	})
	        	.fail(function (jqXHR, error, errorThrown) {
	                console.log(jqXHR);
	                console.log(error);
	                console.log(errorThrown);
	                alert('Invalid username and password combination. Pleae check your username and password and try again.');
	            });
		};

		// when user clicks Add Accomplishment button from #user-home-page
		$('#js-add-accomplishment').on('click', function(event) {
			event.preventDefault();
			backWarnToggle = true;
			$('*').scrollTop(0);
			$("#datepicker").datepicker();
			showAddPage();
		});

		// when user clicks I Did This button from #account-setup-page
		$('#js-submit-accomplishment').on('click', function(event) {
			submitNewAccomplishment(user);
			newUserToggle = false;
		});
	});

	// when user clicks sign-out link in header
	$('#js-signout-link').on('click', function(event) {
		location.reload();
	});

	

// when user clicks how/what/when/why links from home page
	// when user clicks WHY from home page
	$('#the-why').on('click', function(event) {
		$.getJSON('https://not-just-luck.herokuapp.com/achievements/' + user, function (res) {
			let htmlContent = '';
			for (let i=0; i<res.achievementOutput.length; i++) {
				if (res.achievementOutput[i].achieveWhy !== undefined) {
					htmlContent += '<p>' + res.achievementOutput[i].achieveWhy + '</p>';
				};
			};
			$('#motivations').html(htmlContent);
		});
		$('#user-home-page').hide();
		$('#visual-how').hide();
		$('#visual-what').hide();
		$('#visual-when').hide();
		$('#visuals').show();
		$('#js-delete-button').hide();
		$('#js-back-button').show();
		$('#visual-why').show();
	});

	// when user clicks HOW from home page
	$('#the-how').on('click', function(event) {
		$.getJSON('https://not-just-luck.herokuapp.com/achievements/' + user, function (res) {
			let traitsObject = {};
			for (let i=0; i<res.achievementOutput.length; i++) {
				// need to loop through each res.achievementOutput[i].achieveHow array and add up the total of each trait
				for (let j=0; j<res.achievementOutput[i].achieveHow.length; j++) {
					if (res.achievementOutput[i].achieveHow[j] in traitsObject) {
						// if the trait already exists in the object, increase its value by 1 (1 instance)
						traitsObject[res.achievementOutput[i].achieveHow[j]] += 1;
					} else {
						// if the trait does not exist in the object already, add it with value of 1 (1 instance)
						traitsObject[res.achievementOutput[i].achieveHow[j]]	= 1;
					};
				};
			};
			let htmlContent = '';
			for (let i=0; i<Object.keys(traitsObject).length; i++) {
				// let the font size of each trait vary with number of instances; more instances = greater font size
				htmlContent += `<span class="size-${Object.values(traitsObject)[i]}"> ${Object.keys(traitsObject)[i].toLowerCase()} </span>`;
			}
			$('#traits').html(htmlContent);
			
		});
		$('#user-home-page').hide();
		$('#visual-why').hide();
		$('#visual-what').hide();
		$('#visual-when').hide();
		$('#js-delete-button').hide();
		$('#visuals').show();
		$('#js-back-button').show();
		$('#visual-how').show();
	});

	// when user clicks WHEN from home page
	$('#the-when').on('click', function(event) {
		event.preventDefault();
		backToHomePageToggle = false;
		showTimeline();

		// when user clicks js-format-date button to change display date format
		$(document).on('click', '#js-format-date', function(event) {
			event.preventDefault();
			dateFormat = $('select[name="date-format"]').find('option:selected').val();
			showTimeline();
		});

		// when user clicks on an achievement heading from the timeline, takes user to edit screen for that achievement
		$(document).on('click', '.js-get-achievement', function(event) {
			event.preventDefault();
			editToggle = true;
			achievementId = event.target.parentNode.id;
			// AJAX call to get the values of the achievement from the DB
			$.getJSON('http://not-just-luck.herokuapp.com/achievement/' + achievementId, function(res) {
				// set back warning toggle to true
				backWarnToggle = true;
				// add in pre-filled values based on achievement id
				$('#achieve-what').val(res.achieveWhat);
				$('#achieve-why').val(res.achieveWhy);
				// datepicker not currently working
				$("#datepicker").datepicker();
				let achWhenReadable = new Date(res.achieveWhen);
				$('#datepicker').val(achWhenReadable);
				// for loop
				for (let i=0; i<res.achieveHow.length; i++) {
					$('input[value="' + res.achieveHow[i] + '"]').prop('checked', 'checked');
				}
			});
			// hide and show
			$('#visual-when').hide();
			$('#visuals').hide();
			$('#account-setup-blurb').hide();
			$('#add-new-blurb').hide();
			$('#add-details').hide();
			$('#account-setup-page > h2').hide();
			$('#js-back-button').show();
			$('#account-setup-page').show();
			$('#js-delete-button').show();
			// reset back warning and edit toggles to false
			backWarnToggle = false;

			// when user clicks I Did This button from #account-setup-page
			$('#js-submit-accomplishment').on('click', function(event) {
				submitNewAccomplishment(user);
			});
			// when user clicks DELETE button from an edit screen
			$('#js-delete-button').on('click', function(event) {
				event.preventDefault();
				backToHomePageToggle = false;
				if (confirm('Are you SURE you want to delete this awesome accomplishment? Your data will be PERMANENTLY erased.') === true) {
					$.ajax({
						method: 'DELETE',
						url: 'https://not-just-luck.herokuapp.com/achievement/' + achievementId,
						success: showTimeline
					});
				}
			});
		});
	});
		

	// when user clicks WHAT from home page
	$('#the-what').on('click', function(event) {
		$.getJSON('https://not-just-luck.herokuapp.com/achievements/' + user, function (res) {
			let htmlContent = '';
			for (let i=0; i<res.achievementOutput.length; i++) {
				if (res.achievementOutput[i].achieveWhat !== undefined) {
					htmlContent += '<p>' + res.achievementOutput[i].achieveWhat + '</p>';
				};
			};
			$('#awesome-stuff').html(htmlContent);
		});
		$('#user-home-page').hide();
		$('#visual-how').hide();
		$('#visual-why').hide();
		$('#visual-when').hide();
		$('#js-delete-button').hide();
		$('#visuals').show();
		$('#js-back-button').show();
		$('#visual-what').show();
	});

	// when user clicks Back button from any of the visuals
	$('#js-back-button').on('click', function(event) {
		goBack();
	});
});

// TODO:
// put buttons together in a line?
// user should be able to add their own skills/traits to checkbox list
// add 'Oops, nothing here yet!' for empty achievement lists (new users)
// fix issues with new users who create an account, then come back later to set up account--
// ... it doesn't automatically take them to account setup page but rather homepage (very minor issue)