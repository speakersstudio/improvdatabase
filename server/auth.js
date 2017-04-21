const   jwt = require('jwt-simple'),
        userApi = require('./routes/api/user.controller'),
        roles = require('./roles'),
        util = require('./util'),
        config  = require('./config')(),
        url = require('url'),
        bcrypt = require('bcrypt'),
        emailUtil = require('./email');
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

    recoverPassword: (req, res) => {
        let email = req.body.email,
            noUser = function() {
                res.json({ error: 'No user found'});
            }

        if (email === '') {
            noUser();
            return;
        }

        userApi.findUser(email).then(user => {

            if (!user) {
                noUser();
            } else {

                var dateObj = new Date();
                dateObj.setHours(dateObj.getHours() + 12); // you have 12 hours to use the link

                let token = jwt.encode({
                    exp: dateObj.getTime(),
                    iss: user._id
                }, config.token);

                let name = user.firstName + ' ' + user.lastName;
                if (!name.trim()) {
                    name = 'ImprovPlus User';
                }

                let link = req.protocol + '://' + req.get('host') + '/resetMyPassword/' + token;

                emailUtil.send({
                    to: user.email,
                    toName: user.firstName + ' ' + user.lastName,
                    subject: 'ImprovPlus Password Rescue',
                    content: {
                        type: 'text',
                        preheader: 'Did you forget your ImprovPlus password? We can help with that.',
                        greeting: `Dear ${name},`,
                        body: `
                            <p>So you lost your password. That's okay - it happens to the best of us. You can use the button below to change it to something else.</p>
                        `,
                        action: link,
                        actionText: 'Click here to reset your password.',
                        afterAction: `
                            <p>If that link doesn't work for whatever reason, you can point your browser directly to ${link} and make it happen.</p>
                            <p>By the way, if you didn't ask for a new password, let us know - some joker might be trying to commit some sort of hijink.</p>
                            <p>If you are still having problems, feel free to reach out to us. You can reply directly to this email.</p>

                            <p> </p>
                            <p>Sincerely,</p>

                            <p>The Proprietors of ImprovPlus</p>
                        `
                    }
                }, (error, response) => {
                    res.send('Sent');
                })

            }

        })
    },

    checkPasswordToken: (req, res) => {
        let token = req.body.token,
            decoded = jwt.decode(token, config.token);

        if (decoded.exp > Date.now()) {
            res.json({message: "Okay"});
        } else {
            res.json({message: "Expired"});
        }
    },

    changePassword: (req, res) => {
        let token = req.body.token,
            password = req.body.password,
            decoded = jwt.decode(token, config.token),
            id = decoded.iss,
            hash;

        if (decoded.exp > Date.now()) {
            bcrypt.hash(password, config.saltRounds).then(h => {
                hash = h;
                return User.findOne({}).where('_id').equals(id).exec();
            }).then(user => {
                user.password = hash;

                return user.save((err, saved) => {
                    if (err) {
                        util.handleError(req, res, err);
                    } else {
                        saved = saved.toObject();
                        delete saved.password;
                        saved.actions = roles.getActionsForRole(saved.role);

                        if (res) {
                            res.json(saved);
                        }
                    }
                });
            });
        } else {
            res.json({message: "Expired"});
        }
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
            module.exports.unauthorized(req, res);
        } else {
            next();
        }
    },

    genToken: (user, expires) => {
        expires = expires || expiresInDays(7); // one week is recommended by Auth0

        let token = jwt.encode({
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

function expiresInDays(days) {
    var dateObj = new Date();
    dateObj.setDate(dateObj.getDate() + days);
    return dateObj.getTime();
}
