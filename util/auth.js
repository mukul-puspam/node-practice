var config = require('../config/config');
var jwt = require('jsonwebtoken');
var User = require('../api/users/userModel');

module.exports.authMiddleware = function (app) {
    app.use(function (req, res, next) {
        var token = req.body.token || req.params.token || req.headers['x-access-token'];
        if (token) {

            jwt.verify(token, config.secret, function (err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    req.decoded = decoded;
                    next();
                }
            })
        } else {
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });
        }
    });
}

module.exports.register = function (req, res, next) {
    User.findOne({
        username: req.body.username
    }, function (err, user) {
        if (err) {
            res.status(403).send({
                success: false,
                message: err.message
            })
        }
        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {
            if (user.password != req.body.password) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {
                var payload = {
                    admin: true
                }
                var token = jwt.sign(payload, config.secret, {
                    expiresIn: 86400 // expires in 24 hours
                });
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }

        }

    });
}