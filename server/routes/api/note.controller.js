const mongoose = require('mongoose');
        
const   util = require('../../util');

const Note = require('../../models/note.model');

module.exports = {

    create: (req, res) => {
        // TODO!
        res.status(404);
    },

    update: (req, res) => {
        // TODO!
        res.status(404);
    },

    getAll: (req, res) => {

        Note.find({})
            .where('public').equals(true)
            .populate({
                path: 'tag',
                select: 'name description games'
            })
            .populate({
                path: 'metadata',
                select: 'name description type games'
            })
            .populate({
                path: 'addedUser',
                select: 'firstName lastName'
            })
            .populate({
                path: 'modifiedUser',
                select: 'firstName lastName'
            })
            .exec()
            .then(notes => {
                res.send(notes);
            })

    }

}