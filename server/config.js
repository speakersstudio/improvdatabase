module.exports = function () {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        return {
            "token": "fe73_yspk3g2i+6$nba6_p2zm$v0rz4ihdme*!z@++ej@^463p",
            salt: process.env.IMPROVPLUS_SALT,
            postgres: {
                host: 'localhost:5432',
                user: 'sdbuatyadcczhj',
                pass: 'password123',
                db: 'd1ihmfmjooehcl'
            },
            redis: {
                port: 6379,
                host: '127.0.0.1',
                auth: null
            },
            mongodb: {
                uri: 'mongodb://localhost/improvplus'
            },
            stripe: {
                secret: 'sk_test_a4RI3mC0rwHl2CyayrMedpk1', // these are the test keys, obv
                publishable: 'pk_test_o2Kb3Is8AdQuSP8a4UjrvRyK'
            },
            port: 1919,
            saltRounds: 10
        };
    } else if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'qa') {
        return {
            token: process.env.SECRET,
            salt: process.env.IMPROVPLUS_SALT,
            postgres: {
                host: process.env.POSTGRES_HOST,
                user: process.env.POSTGRES_USER,
                pass: process.env.POSTGRES_PASS,
                db: process.env.POSTGRES_DB
            },
            redis: {
                url: process.env.REDISCLOUD_URL
            },
            mongodb: {
                uri: process.env.MONGODB_URI
            },
            stripe: {
                secret: process.env.STRIPE_SECRET,
                publishable: process.env.STRIPE_PUBLISHABLE
            },
            port: process.env.PORT || 5000,
            saltRounds: 10
        };
    }
};