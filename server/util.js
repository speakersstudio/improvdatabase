module.exports = {

    smartUpdate: (model, data, whitelist) => {
        whitelist.forEach(name => {
            if (data[name]) {
                model[name] = data[name];
            }
        });
        return model;
    },

    handleError: (req, res, err) => {
        console.error("Handle error:", err);
        res.status(500).json(err);
    }

}