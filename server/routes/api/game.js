var connection = require("../connection"),
    tagApi  = require("./tag"),
    auth        = require('../../auth'),

    formProperties = ["Description", "DurationID", "PlayerCountID", "ParentGameID"];

exports.create = function(req,res) {
    var data = connection.getPostData(req.body, formProperties),
    UserID = req.user._id;

    data.ModifiedUserID = '0';
    data.AddedUserID = '1';
    data.DateModified = 'NOW';
    data.DateAdded = 'NOW';

    var q = connection.getInsertQuery('game', data, 'GameID');

    var tagIDs = req.body.Tags || [];

    connection.query(q.query, q.values, function(err, result) {
        if (err) {
            res.json("500", err);
        } else {
            if (req.body.Name) {
                var nameData = {
                    GameID: result.rows[0].GameID,
                    DateAdded: 'NOW',
                    DateModified: 'NOW',
                    Name: req.body.Name,
                    Weight: 1
                };

                var nameq = connection.getInsertQuery('name', nameData, 'NameID');

                connection.query(nameq.query, nameq.values, function(err, nameResponse) {
                    if (err) {
                        res.json("500", err);
                    } else {
                        for(var t = 0, maxt = tagIDs.length; t < maxt; t++) {
                            tagApi.tagGame(nameData.GameID, tagIDs[t], UserID);
                        }

                        res.json("200", { Game: result.rows[0], Name: nameResponse.rows[0] });
                    }
                });
            } else {
                res.json("200", result.rows[0]);
            }
        }
    });
};

exports.getAll = function(req, res) {
    connection.query(connection.getSelectQuery('game'), function(err, response) {
        if (err) {
            if (!res) {
                return err;
            } else {
                res.json("500", err);
            }
        } else {
            //var delay = process.env.NODE_ENV === 'production' ? 0 : 1500;

            //setTimeout(function () {
                if (!res) {
                    return response.rows;
                } else {
                    res.json("200", response.rows);
                }
            //}, delay);
        }
    });
};

exports.getAllExpanded = function(req, res) {
    var resultObject = {},
        resultCount = 0,
        resultMax = 5;

    var handleQuery = function(err, response, resultType) {
        if (err) {
            res.status(500).json(err);
        } else {
            resultCount++;
            resultObject[resultType] = response;
            if (resultCount >= resultMax) {
                var games = [];

                for(var i = 0; i < resultObject.game.rows.length; i++) {
                    var game = resultObject.game.rows[i];
                    var names = [];

                    // find the first name with the given GameID, and then start loading them
                    // they're sorted by gameID, so we can save some time that way
                    var loading = false;
                    for (var ni = 0; ni < resultObject.name.rows.length; ni++) {
                        var name = resultObject.name.rows[ni];
                        if (name.GameID === game.GameID) {
                            names.push(name);
                            loading = true;
                        } else if (loading) {
                            break;
                        }
                    }

                    game.Names = names;

                    for (var pci = 0; pci < resultObject.playerCount.rows.length; pci++) {
                        var playerCount = resultObject.playerCount.rows[pci];
                        if (playerCount.PlayerCountID === game.PlayerCountID) {
                            game.PlayerCount = playerCount;
                            break;
                        }
                    }

                    for (var pci = 0; pci < resultObject.duration.rows.length; pci++) {
                        var duration = resultObject.duration.rows[pci];
                        if (parseInt(duration.DurationID) === parseInt(game.DurationID)) {
                            game.Duration = duration;
                            break;
                        }
                    }

                    games.push(game);
                }
                res.json("200", games);
            }
        }
    }

    connection.query('SELECT * FROM game;', (err, response) => handleQuery(err, response, 'game'));
    connection.query('SELECT * FROM name ORDER BY "GameID";', (err, response) => handleQuery(err, response, 'name'));
    connection.query('SELECT * FROM playerCount ORDER BY "PlayerCountID";', (err, response) => handleQuery(err, response, 'playerCount'));
    connection.query('SELECT * FROM duration;', (err, response) => handleQuery(err, response, 'duration'));
    connection.query('SELECT * FROM users;', (err, response) => handleQuery(err, response, 'users'));
};

exports.get = function(req,res) {
    connection.query('SELECT * FROM game WHERE "GameID"=$1', [req.params.id], function(err, response) {
        if (err) {
            res.json("500", err);
        } else {
            res.json("200", response.rows);
        }
    });
};
exports.update = function(req,res) {
    let data = connection.getPostData(req.body, formProperties),
        UserID = req.user._id;
    data.ModifiedUserID = UserID;

    var gameid;
    if (req.params.id) {
        gameid = req.params.id;
    } else {
        gameid = req.body.GameID;
    }

    var q = connection.getUpdateQuery('game', data, { GameID: gameid });

    connection.query(q.query, q.values, function(err, response) {
        if (err) {
            res.json("500", err);
        } else {
            res.json("200", response.rows[0]);
        }
    });
};
exports.delete = function(req, res) {
    connection.query('DELETE FROM game WHERE "GameID"=$1;', [req.params.id], function(err) {
        if (err) {
            res.json("500", err);
        } else {
            connection.query('DELETE FROM name WHERE "GameID"=$1;', [req.params.id], function(err) {
                if (err) {
                    res.json("500", err);
                } else {
                    connection.query('DELETE FROM taggame WHERE "GameID"=$1;', [req.params.id], function(err) {
                        if (err) {
                            res.json("500", err);
                        } else {
                            res.json("200", "Game Deleted");
                        }
                    });
                }
            });
        }
    });
};

//unique things!
exports.getNames = function(req, res) {
    connection.query('SELECT * FROM name WHERE "GameID"=$1;', [req.params.id], function(err, response) {
        if (err) {
            res.json("500", err);
        } else {
            res.json("200", response.rows);
        }
    });
};
exports.getNotes = function(req,res) {
    connection.query('SELECT * FROM note WHERE "GameID"=$1;', [req.params.id], function(err, response) {
        if (err) {
            res.json("500", err);
        } else {
            res.json("200", response.rows);
        }
    });
};
exports.getTags = function(req,res) {
    connection.query('SELECT * FROM tag, taggame WHERE tag."TagID"=taggame."TagID" AND taggame."GameID"=$1;', [req.params.id], function(err, response) {
        if (err) {
            res.json("500", err);
        } else {
            res.json("200", response.rows);
        }
    });
};
exports.addTag = function(req, res) {
    var data = [
            req.params.id,
            req.params.toId,
            1
        ],
        query = 'INSERT INTO taggame ("GameID", "TagID") VALUES ($1, $2);';
    connection.query(query, data, function(err) {
        if (err) {
            res.json("500", err);
        } else {
            res.send("200", "Tag applied");
        }
    });
};
exports.removeTag = function(req, res) {
    connection.query('DELETE FROM taggame WHERE "GameID"=$1 AND "TagID"=$2', [req.params.id, req.params.toId], function(err) {
        if (err) {
            res.json("500", err);
        } else {
            res.send("200", "Tag removed");
        }
    });
};
