module.exports = {

    smartUpdate: (model, data, whitelist) => {
        whitelist.forEach(name => {
            if (data[name] != undefined && data[name] != null) {
                model[name] = data[name];
            }
        });
        return model;
    },

    handleError: (req, res, err) => {
        console.error("Handle error:", err);
        res.status(500).json(err);
        throw new Error(err);
    }

}