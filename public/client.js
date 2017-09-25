"use strict";

// Function and object definitions

// Triggers
$(document).ready(function () {
	// when page first loads
	var user = undefined;
	$('#signin-page').hide();
	$('#account-setup-page').hide();
	$('#user-home-page').hide();
	$('#visuals').hide();
	$('#js-signout-link').hide();
	$('#landing-page').show();
	$('#account-signup-page').show();

// USER FLOW 1: USER SIGNS UP FOR NEW ACCOUNT
	document.getElementById('js-new-account').addEventListener('click', function(event) {
		const form = document.body.querySelector('#new-account-form');
		// fix issue with html5 validation
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
		$('#landing-page').hide();
		$('#account-signup-page').hide();
		$('#js-signin-link').hide();
		$('#signin-page').show();
	});

	// when user clicks sign-in button from #signin-page
	document.getElementById('js-signin-button').addEventListener('click', function(event) {
		event.preventDefault();
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
		console.log('signed out');
		location.reload();
	});

	// when user clicks Add Accomplishment button from #user-home-page
	document.getElementById('js-add-accomplishment').addEventListener('click', function(event) {
		event.preventDefault();
		$('#user-home-page').hide();
		$('#account-setup-blurb').hide();
		$('#add-new-blurb').show();
		$('#account-setup-page').show();
	});

	// when user clicks I Did This button from #account-setup-page
	document.getElementById('js-submit-accomplishment').addEventListener('click', function(event) {
		event.preventDefault();
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
		const achWhen = $('input[id="achieve-when"]').val();
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
				event.preventDefault();
				console.log('add accomplishment done function working');
				$('#account-setup-page').hide();
				$('#user-home-page').show();
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
			for (let i=0; i<res.achievements.length; i++) {
				console.log(res.achievements[i].achieveWhy);
				if (res.achievements[i].achieveWhy !== undefined) {
					let htmlContent = '<p>' + res.achievements[i].achieveWhy + '</p>';
					$('#motivations').append(htmlContent);
				};
			};
			console.log(res.achievements);
		});
		$('#user-home-page').hide();
		$('#visual-how').hide();
		$('#visual-what').hide();
		$('#visual-when').hide();
		$('#visuals').show();
		$('#visual-why').show();
	});

	// when user clicks HOW from home page
	document.getElementById('the-how').addEventListener('click', function(event) {
		$('#user-home-page').hide();
		$('#visual-why').hide();
		$('#visual-what').hide();
		$('#visual-when').hide();
		$('#visuals').show();
		$('#visual-how').show();
	});

	// when user clicks WHEN from home page
	document.getElementById('the-when').addEventListener('click', function(event) {
		$('#user-home-page').hide();
		$('#visual-how').hide();
		$('#visual-what').hide();
		$('#visual-why').hide();
		$('#visuals').show();
		$('#visual-when').show();
	});

	// when user clicks WHAT from home page
	document.getElementById('the-what').addEventListener('click', function(event) {
		$('#user-home-page').hide();
		$('#visual-how').hide();
		$('#visual-why').hide();
		$('#visual-when').hide();
		$('#visuals').show();
		$('#visual-what').show();
	});

	// when user clicks Back button from any of the visuals
	document.getElementById('js-back-button').addEventListener('click', function(event) {
		$('#visuals').hide();
		$('#user-home-page').show();
	});
});

// TODO:
// add AJAX calls and server functionality (finish this--done?)
// hook up DB
// add form validation for signin page