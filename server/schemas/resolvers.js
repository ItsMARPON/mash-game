const { AuthenticationError } = require('apollo-server-express');

//TODO: add more models in 
const {User} = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        //TODO: Add other model in populate
        me: async (parent, args, context) => {
            if (context.user){
                return User.findOne({ _id: context.user._id }).populate('');
            }
            throw new AuthenticationError('You need to be logged in');
        },
    },

    Mutation: {
        addUser: async (parent, {username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!correctPw){
                throw new AuthenticationError('incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        },
    }
}