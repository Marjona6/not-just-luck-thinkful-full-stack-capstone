"use strict";

const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

const achievementSchema = new mongoose.Schema({
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

// userSchema.methods.validatePassword = function(password, callback) {
//     bcrypt.compare(password, this.password, (err, isValid) => {
//         if (err) {
//             callback(err);
//             return;
//         }
//         callback(null, isValid);
//     });
// };

const Achievement = mongoose.model('Achievement', achievementSchema);

module.exports = Achievement;