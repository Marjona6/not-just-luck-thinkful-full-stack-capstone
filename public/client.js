"use strict";

// Function and object definitions
var user = undefined;

function showTimeline() {
	$('#account-setup-page').hide();
	$('#user-home-page').hide();
	$('#js-delete-button').hide();
	$('#visual-how').hide();
	$('#visual-what').hide();
	$('#visual-why').hide();
	$('#js-back-button').show();
	$('#visuals').show();
	$('#visual-when').show();
	$.getJSON('/achievements', function (res) {
		let htmlContent = '';
		for (let i=0; i<res.achievements.length; i++) {
			if (res.achievements[i].user === user) {
				let myUl = '<ul class="timeline-ul">';
				for (let j=0; j<res.achievements[i].achieveHow.length; j++) {
					myUl += `<li>${res.achievements[i].achieveHow[j]}</li>`;
				};
				myUl += '</ul>';
				htmlContent += `<div class="timeline-item" date-is="${res.achievements[i].achieveWhen}">
					<a href="#" class="js-get-achievement" id="${res.achievements[i]._id}"><h2>
					${res.achievements[i].achieveWhat}</h2></a>
					<p>${res.achievements[i].achieveWhy}</p>
					<p>It took: ${myUl}</div>`;	
				};			
		};
		$('.timeline-container').html(htmlContent);
	});
}

// Triggers
$(document).ready(function () {
	// when page first loads
	var backWarnToggle = false;
	var backToLandingPageToggle = false;
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
	document.getElementById('js-new-account').addEventListener('click', function(event) {
		const form = document.body.querySelector('#new-account-form');
		if (form.checkValidity && !form.checkValidity()) {
			console.log('validity has been checked');
			return;
		}
		const fname = $('input[name="fname"]').val();
		const uname = $('input[name="uname"]').val();
		const pw = $('input[name="pw"]').val();
		const confirmPw = $('input[name="confirm-pw"]').val();
		console.log('setting values');
		if (pw !== confirmPw) {
			event.preventDefault();
			alert('Passwords must match!');
		} else {
			event.preventDefault();
			const newUserObject = {
				username: uname,
				password: pw
			};
			user = uname;
			// AJAX call to send form data up to server/DB and create new user
			$.ajax({
				type: 'POST',
				url: 'users/create',
				dataType: 'json',
				data: JSON.stringify(newUserObject),
				contentType: 'application/json'
			})
			.done(function (result) {
				event.preventDefault();
				$('#landing-page').hide();
				$('#account-signup-page').hide();
				$('#add-new-blurb').hide();
				$('#js-signin-link').hide();
				$('#js-signout-link').show();
				$('#account-setup-blurb').show();
				$('#account-setup-page').show();
			})
			.fail(function (jqXHR, error, errorThrown) {
	            console.log(jqXHR);
	            console.log(error);
	            console.log(errorThrown);
			});
		};
	});

	

// USER FLOW 2: USER WITH ACCOUNT SIGNS IN
	// when user clicks sign-in link in header
	document.getElementById('js-signin-link').addEventListener('click', function(event) {
		event.preventDefault();
		backToLandingPageToggle = true;
		$('#landing-page').hide();
		$('#account-signup-page').hide();
		$('#js-signin-link').hide();
		$('#js-delete-button').hide();
		$('#js-back-button').show();
		$('#signin-page').show();
	});

	// when user clicks sign-in button from #signin-page
	document.getElementById('js-signin-button').addEventListener('click', function(event) {
		event.preventDefault();
		backToLandingPageToggle = false;
		// AJAX call to validate login info and sign user in
		const inputUname = $('input[name="signin-uname"]').val();
		const inputPw = $('input[name="signin-pw"]').val();
		// check for spaces, empty, undefined
        if ((!inputUname) || (inputUname.length < 1) || (inputUname.indexOf(' ') > 0)) {
            alert('Invalid email');
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
	                url: "/signin",
	                dataType: 'json',
	                data: JSON.stringify(unamePwObject),
	                contentType: 'application/json'
	            })
	            .done(function (result) {
	            	$('#signin-page').hide();
	            	$('#js-back-button').hide();
	            	$('#js-delete-button').hide();
					$('#user-home-page').show();
					$('#js-signout-link').show();
	        	})
	        	.fail(function (jqXHR, error, errorThrown) {
	                console.log(jqXHR);
	                console.log(error);
	                console.log(errorThrown);
	                alert('User does not exist! Please sign up using the sign-up button.');
	            });
		};
	});

	// when user clicks sign-out link in header
	document.getElementById('js-signout-link').addEventListener('click', function(event) {
		location.reload();
	});

	// when user clicks Add Accomplishment button from #user-home-page
	document.getElementById('js-add-accomplishment').addEventListener('click', function(event) {
		event.preventDefault();
		backWarnToggle = true;
		$('#user-home-page').hide();
		$('#account-setup-blurb').hide();
		$('#js-delete-button').hide();
		$('#add-new-blurb').show();
		$('#account-setup-page').show();
		$('#js-back-button').show();
	});

	// when user clicks I Did This button from #account-setup-page
	document.getElementById('js-submit-accomplishment').addEventListener('click', function(event) {
		event.preventDefault();
		backWarnToggle = false;
		// AJAX call to send the form data up to the server/DB
		// take values from form inputs
		const achWhat = $('input[id="achieve-what"]').val();
		console.log(achWhat);
		var achHow = [];
			// add all the cb values to the array achHow
			var cbElements = $('input[type=checkbox]');
			for (let i=0; i < cbElements.length; i++) {
				if ($(cbElements[i]).is(':checked')) {
					console.log(cbElements[i].value);
					achHow.push(cbElements[i].value);
				};
			};
			console.log(achHow);
		// datepicker not currently working
		$("#datepicker").datepicker({
        	numberOfMonths: 2,
        	showButtonPanel: true
    	});
		const achWhen = $('input[id="datepicker"]').val();
		console.log(achWhen);
		const achWhy = $('input[id="achieve-why"]').val();
		console.log(achWhy);
		console.log('user is ' + user);
		const newAchObject = {
			user: user,
			achieveWhat: achWhat,
			achieveHow: achHow,
			achieveWhen: achWhen,
			achieveWhy: achWhy
		};
		$.ajax({
				type: 'POST',
				url: 'achievements/create',
				dataType: 'json',
				data: JSON.stringify(newAchObject),
				contentType: 'application/json'
			})
			.done(function (result) {
				// reset form back to empty
				document.getElementById('input-form').reset();
				// reset checkboxes back to unchecked
				$('input:checkbox').removeAttr('checked');
				showTimeline();
			})
			.fail(function (jqXHR, error, errorThrown) {
	            console.log(jqXHR);
	            console.log(error);
	            console.log(errorThrown);
			});
	});

// when user clicks how/what/when/why links from home page
	// when user clicks WHY from home page
	document.getElementById('the-why').addEventListener('click', function(event) {
		$.getJSON('/achievements', function (res) {
			let htmlContent = '';
			for (let i=0; i<res.achievements.length; i++) {
				if (res.achievements[i].user === user) {
					if (res.achievements[i].achieveWhy !== undefined) {
						htmlContent += '<p>' + res.achievements[i].achieveWhy + '</p>';
					};
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
	document.getElementById('the-how').addEventListener('click', function(event) {
		$.getJSON('/achievements', function (res) {
			let traitsObject = {};
			for (let i=0; i<res.achievements.length; i++) {
				// make sure to only get those belonging to the signed-in user
				if (res.achievements[i].user === user) {
					// need to loop through each res.achievements[i].achieveHow array and add up the total of each trait
					for (let j=0; j<res.achievements[i].achieveHow.length; j++) {
						if (res.achievements[i].achieveHow[j] in traitsObject) {
							// if the trait already exists in the object, increase its value by 1 (1 instance)
							traitsObject[res.achievements[i].achieveHow[j]] += 1;
						} else {
							// if the trait does not exist in the object already, add it with value of 1 (1 instance)
							traitsObject[res.achievements[i].achieveHow[j]]	= 1;
						};
					};
				};
			};
			console.log(traitsObject);
			console.log(Object.keys(traitsObject));
			let htmlContent = '';
			for (let i=0; i<Object.keys(traitsObject).length; i++) {
				// let the font size of each trait vary with number of instances; more instances = greater font size
				htmlContent += `<span class="size-${Object.values(traitsObject)[i]}"> ${Object.keys(traitsObject)[i].toLowerCase()} </span>`;
				console.log(Object.keys(traitsObject)[i].toLowerCase());
			}
			console.log(htmlContent);
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
	document.getElementById('the-when').addEventListener('click', function(event) {
		event.preventDefault();
		showTimeline();

		// when user clicks on an achievement heading from the timeline, takes user to edit screen for that achievement
		$(document).on('click', '.js-get-achievement', function(event) {
			event.preventDefault();
			console.log(event.target.parentNode.id);
			const achievementId = event.target.parentNode.id;
			console.log('got something');
			// AJAX call to get the values of the achievement from the DB
			$.getJSON('/achievements/' + achievementId, function(res) {
				// set back warning toggle to true
				backWarnToggle = true;
				// add in pre-filled values based on achievement id
				$('#achieve-what').val(res.achieveWhat);
				$('#achieve-why').val(res.achieveWhy);
				$('#datepicker').val(res.achieveWhen);
				// for loop
				for (let i=0; i<res.achieveHow.length; i++) {
					$('input[value="' + res.achieveHow[i] + '"]').attr('checked', 'checked');
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
			// set back warning toggle to false
			backWarnToggle = false;

			// when user clicks DELETE button from an edit screen
			document.getElementById('js-delete-button').addEventListener('click', function(event) {
				event.preventDefault();
				if (confirm('Are you SURE you want to delete this awesome accomplishment? Your data will be PERMANENTLY erased.') === true) {
					$.ajax({
						method: 'DELETE',
						url: '/achievements/' + achievementId,
						success: showTimeline //some function
					});
				}
			});
		});
	});
		

	// when user clicks WHAT from home page
	document.getElementById('the-what').addEventListener('click', function(event) {
		$.getJSON('/achievements', function (res) {
			let htmlContent = '';
			for (let i=0; i<res.achievements.length; i++) {
				if (res.achievements[i].user === user) {
					if (res.achievements[i].achieveWhat !== undefined) {
						htmlContent += '<p>' + res.achievements[i].achieveWhat + '</p>';
					};
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
	document.getElementById('js-back-button').addEventListener('click', function(event) {
		if (backToLandingPageToggle === true) {
			location.reload();
		} else if (backWarnToggle === true) {
			event.preventDefault();
			if (confirm('Are you sure you want to go back? Your changes will not be saved.') == true) {
				$('#visuals').hide();
				$('#js-back-button').hide();
				$('#js-delete-button').hide();
				$('#account-setup-page').hide();
				$('#user-home-page').show();
				backWarnToggle = false;
				// reset form back to empty
				document.getElementById('input-form').reset();
				// reset checkboxes back to unchecked
				$('input:checkbox').removeAttr('checked');
			}
		} else {
			$('#visuals').hide();
			$('#js-back-button').hide();
			$('#js-delete-button').hide();
			$('#account-setup-page').hide();
			$('#user-home-page').show();
		};
	});
});

// TODO:
// add form validation for signin page
// add PUT functionality for editing achievements
// fix ordering issues with timeline
// fix datepicker
// on signup page, focus on top of account setup page after signing up
// put buttons together in a line?
// make sure correct user is being sent (problems due to pre-filled?)
// user should be able to add their own skills/traits to checkbox list
// store dates as unix dates--how?
// add date display format selection capability
// 