exports.DATABASE_URL = process.env.DATABASE_URL || global.DATABASE_URL || 'mongodb://admin:admin@ds147034.mlab.com:47034/not-just-luck';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL ||
    'mongodb://admin:admin@ds227525.mlab.com:27525/not-just-luck-test';
exports.PORT = process.env.PORT || 8080;