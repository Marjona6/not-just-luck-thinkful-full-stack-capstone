"use strict";

// Function and object definitions

// Triggers
$(document).ready(function () {
	// when page first loads
	$('#signin-page').hide();
	$('#account-setup-page').hide();
	$('#user-home-page').hide();
	$('#visuals').hide();
	$('#landing-page').show();
	$('#account-signup-page').show();

// USER FLOW 1: USER SIGNS UP FOR NEW ACCOUNT
	document.getElementById('js-new-account').addEventListener('click', function(event) {
		event.preventDefault();
		const form = document.body.querySelector('#new-account-form');
		// fix issue with html5 validation
		if (form.checkValidity && !form.checkValidity()) {
			return;
		}
		// AJAX call to send form data up to server/DB and create new user
		$('#landing-page').hide();
		$('#account-signup-page').hide();
		$('#add-new-blurb').hide();
		$('#account-setup-blurb').show();
		$('#account-setup-page').show();
	});

	

// USER FLOW 2: USER WITH ACCOUNT SIGNS IN
	// when user clicks sign-in link in header
	document.getElementById('js-signin-link').addEventListener('click', function(event) {
		event.preventDefault();
		$('#landing-page').hide();
		$('#account-signup-page').hide();
		$('#signin-page').show();
	});

	// when user clicks sign-in button from #signin-page
	document.getElementById('js-signin-button').addEventListener('click', function(event) {
		event.preventDefault();
		// AJAX call to validate login info and sign user in
		$('#signin-page').hide();
		$('#user-home-page').show();
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
		$('#account-setup-page').hide();
		$('#user-home-page').show();
	});
});