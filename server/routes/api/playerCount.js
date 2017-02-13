var connection = require('../connection'),
    auth        = require('../../auth'),

    formProperties = ['Name', 'Description', 'Min', 'Max'];

exports.create = function(req,res) {
    var data = connection.getPostData(req.body, formProperties),
        UserID = req.user.UserID;
    data.AddedUserID = UserID;
    data.ModifiedUserID = UserID; 

    data.DateAdded = 'NOW';
    data.DateModified = 'NOW';

    var q = connection.getInsertQuery('playercount', data, 'PlayerCountID');

    connection.query(q.query, q.values, function(err, response) {
        if (err) {
            res.json('500', err);
        } else {
            res.json('200', response.rows[0]);
        }
    });
};
exports.getAll = function(req,res) {
    connection.query('SELECT * FROM playercount;', function(err, response) {
        if (err) {
            res.json('500', err);
        } else {
            res.json('200', response.rows);
        }
    });
};
exports.get = function(req,res) {
    connection.query('SELECT * FROM playercount WHERE "PlayerCountID"=$1;', [req.params.id], function(err, response) {
        if (err) {
            res.json('500', err);
        } else {
            res.json('200', response.rows);
        }
    });
};
exports.update = function(req,res) {
    var data = connection.getPostData(req.body, formProperties),
        UserID = req.user.UserID;
    data.ModifiedUserID = UserID;
    data.DateModified = 'NOW';

    var q = connection.getUpdateQuery('playercount', data, {PlayerCountID: req.params.id});

    connection.query(q.query, q.values, function(err, response) {
        if (err) {
            res.json('500', err);
        } else {
            res.json('200', response.rows[0]);
        }
    });
};
exports.delete = function(req,res) {
    connection.query('DELETE FROM playercount WHERE "PlayerCountID"=$1', [req.params.id], function(err) {
        if (err) {
            res.json('500', err);
        } else {
            res.json('200', 'PlayerCount Deleted');
        }
    });
};
