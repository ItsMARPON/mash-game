const { AuthenticationError } = require('apollo-server-express');

//Add more models in 
const {User, Category} = require('../models');
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
        // Add other model in populate
        me: async (parent, args, context) => {
            if (context.user){
                return User.findOne({ _id: context.user._id }).populate('categories');
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