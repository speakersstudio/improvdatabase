// DEPRECATED - packages are in mongo now!

var connection = require('../connection'),
    
    formProperties = ["Name", "Description", "Price", "Addon", "Public"];

exports.getAll = function(req,res) {
    let callback = function(err, response) {
        if (err) {
            res.json('500', err);
        } else {
            res.json('200', response.rows);
        }
    };

    if (req.user.UserID) {
        getAllForUser(req.user.UserID, callback);
    } else {
        getAll(callback);
    }
};

getAll = function (callback) {
    let q = 'SELECT package.*, false AS "Owned" FROM package WHERE "Public"=true';
    connection.query(q, callback);
}

getAllForUser = function (userId, callback) {
    let q = 'SELECT package.*, false AS "Owned"	FROM package WHERE package."Public"=true ';
    q+=     'EXCEPT SELECT package.*, false AS "Owned" FROM packageuser, package ';
    q+=     'WHERE packageuser."UserID" = \'' + userId + '\' ';
    q+=     'AND package."PackageID" = packageuser."PackageID" ';
    q+=     'UNION SELECT package.*, true AS "Owned" FROM packageuser, package ';
    q+=     'WHERE packageuser."UserID" = \'' + userId + '\' ';
    q+=     'AND package."PackageID" = packageuser."PackageID"';

    connection.query(q, callback);
}


