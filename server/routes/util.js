exports = {

    smartUpdate: (model, data, whitelist) => {
        whitelist.forEach(name => {
            if (data[name]) {
                model[name] = data[name];
            }
        });
        return model;
    },

    handleError: (req, res, err) => {
        res.status(500).json(err);
    }

}