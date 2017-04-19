var ops     = {
        "user": require('./user.controller'),
        "game": require('./game.controller'),
        "metadata": require('./metadata.controller'),
        "name": require('./name.controller'), 
        "note": require('./note.controller'),
        "tag": require('./tag.controller'),
        "team": require('./team.controller'),
        "package": require('./package.controller'),
        "subscription": require('./subscription.controller'),
        "material": require('./material-item.controller'),
        "purchase": require('./purchase.controller')
    };
exports.ops = ops;

exports.create = function(req,res) {
    if (ops[req.params.op]) {
        console.log("CREATE " + req.params.op);
        ops[req.params.op].create(req,res);
    } else {
        res.send('404', 'Not Found');
    }
};
exports.getAll = function(req,res) {
    if (ops[req.params.op] && ops[req.params.op].getAll) {
        console.log("GET ALL " + req.params.op);
        ops[req.params.op].getAll(req,res);
    } else {
        res.send('404', 'Not Found');
    }
};
exports.getAllExpanded = function(req, res) {
    if (ops[req.params.op] && ops[req.params.op].getAllExpanded) {
        console.log("GET ALL EXPANDED" + req.params.op);
        ops[req.params.op].getAllExpanded(req,res);
    } else {
        exports.getAll(req, res);
    }
}
exports.get = function(req,res) {
    if (ops[req.params.op] && ops[req.params.op].get) {
        console.log("GET " + req.params.op, req.params.id);
        ops[req.params.op].get(req,res);
    } else {
        res.send('404', 'Not Found');
    }
};
exports.getExpanded = function(req, res) {
    if (ops[req.params.op] && ops[req.params.op].getExpanded) {
        console.log("GET EXPANDED" + req.params.op);
        ops[req.params.op].getExpanded(req,res);
    } else {
        exports.get(req, res);
    }
}
exports.update = function(req,res) {
    if (ops[req.params.op] && req.params.id) {
        console.log("UPDATE " + req.params.op, req.params.id);
        ops[req.params.op].update(req,res);
    } else {
        res.send('404', 'Not Found');
    }
};
exports.delete = function(req,res) {
    if (ops[req.params.op] && req.params.id) {
        console.log("DELETE " + req.params.op, req.params.id);
        ops[req.params.op].delete(req,res);
    } else {
        res.send('404', 'Not Found');
    }
};
exports.method = function(req,res) {
    if (ops[req.params.op] && ops[req.params.op][req.params.method]) {
        console.log("Method requested:", req.params.method + " ON " + req.params.op, req.params.id);
        ops[req.params.op][req.params.method](req,res);
    } else {
        res.send('404', 'Not Found');
    }
};

exports.backup = function (req, res) {
    if (ops[req.params.op] && ops[req.params.op].backup) {
        console.log('Backup data for ' + req.params.op);
        ops[req.params.op].backup(req, res);
    } else {
        res.send('404', 'Not found');
    }
};

exports.validate = function(req, res) {
    if (ops[req.params.op] && ops[req.params.op].validate) {
        console.log('Validate data for ' + req.params.op);
        ops[req.params.op].validate(req, res);
    } else {
        res.send('404', 'Not found');
    }
}
