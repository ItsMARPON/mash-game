const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
        mash: {
            type: String, 
            required: true,
            trim: true,
        },
        partner: {
            type: String, 
            required: true,
            minlength: 1,
            maxlength: 30,
            trim: true,
        },
        kids: {
            type: Number,
            required: true,
            trim: true,
        },
        career: {
            type: String, 
            required: true,
            minlength: 1,
            maxlength: 30,
            trim: true,
        },
        salary: {
            type: Number,
            required: true,
            trim: true,
        },
        transportation: {
            type: String, 
            required: true,
            minlength: 1,
            maxlength: 30,
            trim: true,
        },
        death: {
            type: String, 
            required: true,
            minlength: 1,
            maxlength: 100,
            trim: true,
        },
        deathAge: {
            type: Number,
            required: true,
            trim: true,
        }
    });


module.exports = categorySchema;