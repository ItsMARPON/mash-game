const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
        partner: {
            type: String, 
            required: true,
            minlength: 1,
            maxlength: 30,
            trim: true,
        },
        kids: {
            type: Int,
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
            type: Int,
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
            type: Int,
            required: true,
            trim: true,
        }
    });

module.exports = categorySchema;