"use strict";

const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

const achievementSchema = new mongoose.Schema({
    user: {
        type: String,
        required: false},
	achieveWhat: {
		type: String,
		required: false},
	achieveHow: {
		type: Array,
		required: false},
    achieveWhen: {
        type: Date,
        required: false},
    achieveWhy: {
        type: String,
        required: false}
});

const Achievement = mongoose.model('Achievement', achievementSchema);

module.exports = Achievement;