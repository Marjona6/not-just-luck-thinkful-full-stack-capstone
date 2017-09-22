"use strict";

const bodyParser = require('body-parser');
const config = require('./config');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const express = require('express');
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

mongoose.Promise = global.Promise;

var server = undefined;

function runServer() {
    return new Promise(function(resolve, reject) {
        mongoose.connect(config.DATABASE_URL, function(err) {
            if(err) {
                return reject(err);
            }
            server = app.listen(config.PORT, function() {
                console.log('Listening on localhost:' + config.PORT);
                resolve();
            }).on('error', function(err) {
                mongoose.disconnect();
                reject(err);
            });
        });
    });
}

if (require.main === module) {
    runServer().catch(function(err) {
        return console.error(err);
    });
};

function closeServer() {
    return mongoose.disconnect().then(function() {
        return new Promise(function(resolve, reject) {
            console.log('Closing server');
            server.close(function(err) {
                if(err) {
                    return reject(err);
                }
                resolve();
            });
        });
    });
}