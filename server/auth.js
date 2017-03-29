const   jwt = require('jwt-simple'),
        userApi = require('./routes/api/user.controller'),
        roles = require('./roles'),
        util = require('./util'),
        config  = require('./config')(),
        url = require('url');
        //redis   = require('redis'),
        //client;

/*
if (config.redis.url) {
    var redisUrl = url.parse(config.redis.url);
    client = redis.createClient(redisUrl.port, redisUrl.hostname, {no_ready_check: true});
    client.auth(redisUrl.auth.split(':')[1]);
} else {
    client = redis.createClient(config.redis.port, config.redis.host);
}
*/

module.exports = {

    login: (req, res) => {
        var email = req.body.email || '';
        var password = req.body.password || '';

        if (email === '' || password === '') {
            module.exports.invalid(req, res);
            return;
        }

        // Fire a query to your DB and check if the credentials are valid
        userApi.validateUser(email, password)
            .catch(err => {
                util.handleError(req, res, err);
            })
            .then(user => {
                if (user) {
                    module.exports.genToken(user).then(token => {
                        res.status(200).json(token);
                    });
                } else {
                    module.exports.invalid(req, res);
                }
            });
    },

    invalid: (req, res) => {
        res.status(401).json({
            "status": 401,
            "message": "Invalid credentials"
        });
    },

    logout: (req, res) => {
        var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    /*
        if (token) {
            // instantly expire the token from redis
            client.expire(token, 0, function (err, response) {
                if (err) {
                    res.status(500).json({ message: 'Server Error', error: err });
                } else if (response) {
                    console.log('USER LOG OUT');
                    res.status(200).json({ message: 'Logout' });
                }
            });
        }
        */
        res.status(200).json({ message: 'Logout' });
    },

    refresh: (req, res) => {
        var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];

        if (!token || !req.user) {
            res.status(401).json({
                'status': 401,
                'message': 'Invalid Token'
            });
            return;
        }

        /*
        // instantly expire the old token from redis
        client.expire(token, 0, function (err, response) {
            if (err) {
                res.status(500).json({ message: 'Server Error', error: err });
            } else if (response) {
                genToken(req.user, function (err, token) {
                    if (err) {
                        console.error('REDIS ERROR', err);
                    }
                    res.status(200).json(token);
                });
            }
        });
        */

        module.exports.genToken(req.user).then(token => {
            res.status(200).json(token);
        });
    },

    /**
     * Load the supplied token, and use it to fetch the user requesting this action
     */
    checkToken: (req, res, next) => {
        var token = (req.body && req.body.access_token) ||
            (req.query && req.query.access_token) || req.headers['x-access-token'];

        req.user = {
            actions: roles.getActionsForRole(0)
        };

        if (token) {
            try {
                var decoded = jwt.decode(token, config.token);

                // first make sure the token hasn't expired
                if (decoded.exp > Date.now()) {
                    // now make sure the user exists
                    // The iss parameter would be the logged in user's UserID
                    userApi.findUser(decoded.iss, 'stripeCustomerId')
                        .then(user => {
                            req.user = user;
                            next();
                        });
                } else {
                    next();
                }
            } catch (err) {
                console.log("Token decode error: ", err);
                next();
            }
        } else {
            next();
        }
    },

    unauthorized: (req, res) => {
        res.status(401).json({
            "message": "Unauthorized"
        });
    },

    /**
     * Check the user's list of actions to see if they can do what they're trying to do
     */
    checkAuth: (req, res, next) => {
        console.log("Checking auth for: " + req.url);
        const url = req.url;

        let perm = roles.canUserHave(url, req.method, req.user);

        if (!perm) {
            console.log('Auth not permitted!');
            this.unauthorized(req, res);
        } else {
            next();
        }
    },

    genToken: (user) => {
        var expires = expiresIn(7), // one week, as recommended by Auth0
            token = jwt.encode({
                exp: expires,
                iss: user._id
            }, config.token);

            // this is all redis stuff, which isn't really necessary
            //multi = client.multi();

        //multi.set(token, user.UserID);
        //multi.expire(token, 60 * 60 * 24 * 7); // one week in seconds

        /*
        multi.exec(function (err) {
            callback(err, {
                token: token,
                expires: expires,
                user: user
            });
        });
        */

        // just to be safe...
        delete user.password;
        delete user.stripeCustomerId;

        return Promise.resolve({
            token: token,
            expires: expires,
            user: user
        });
    }

}

function expiresIn(days) {
    var dateObj = new Date();
    dateObj.setDate(dateObj.getDate() + days);
    return dateObj.getTime();
}
