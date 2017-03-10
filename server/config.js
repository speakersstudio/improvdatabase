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
            port: 1919
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
            port: process.env.PORT || 5000
        };
    }
};