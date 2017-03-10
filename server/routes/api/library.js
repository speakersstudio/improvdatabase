// DEPRECATED! Library stuff is in mongo now!

var connection = require('../connection');

exports.getAll = function(req,res) {
    let q = 'SELECT DISTINCT ON (materialitem."MaterialItemID") ';
        q+= 'materialitem."MaterialItemID", materialitem."Name", materialitem."Description", ';
        q+= 'materialitem."Addon", materialitem."DateAdded", materialitem."DateModified", package."PackageID" ';
        q+= 'FROM packageuser, package, materialitempackage, materialitem ';
        q+= 'WHERE packageuser."UserID" = \'' + req.user._id + '\' ';
        q+=     ' AND package."PackageID" = packageuser."PackageID" ';
        q+=     ' AND materialitempackage."PackageID"=package."PackageID" ';
        q+=     ' AND materialitem."MaterialItemID"=materialitempackage."MaterialItemID"; ';

    connection.query(q, function(err, response) {
        if (err) {
            res.json('500', err);
        } else {
            res.json('200', response.rows);
        }
    });
};