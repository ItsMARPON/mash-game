const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const categorySchema = new Schema(
    {
        partner: {
            type: String, 
            required: true,
            minlength: 1,
            maxlength: 280,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+/, 'Must match an email adress!'],
        },
        password: {
            type: String, 
            required: true,
            minlength: 5,
        }
    }
);