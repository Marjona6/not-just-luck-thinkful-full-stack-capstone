exports.DATABASE_URL = process.env.DATABASE_URL || global.DATABASE_URL || 'mongodb://demo:demo@ds121483.mlab.com:21483/job-tracker-data';
//exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL ||
    //'mongodb://demo:demo@ds121483.mlab.com:21483/job-tracker-data';
exports.PORT = process.env.PORT || 8080;