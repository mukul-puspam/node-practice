var express = require('express');
var app = express();
var api = require('./api/api');
var auth = require('./util/auth');

require('./middleware/middleware')(app);


app.post('/authenticate',auth.register)

auth.authMiddleware(app);

app.use('/api', api);

module.exports = app;
