exports.DATABASE_URL = process.env.DATABASE_URL || global.DATABASE_URL || 'mongodb://admin:admin@ds147034.mlab.com:47034/not-just-luck';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL ||
    'mongodb://demo:demo@ds121483.mlab.com:21483/job-tracker-data';
exports.PORT = process.env.PORT || 8080;