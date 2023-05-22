const { AuthenticationError } = require("apollo-server-express");
const { getUserInput } = require(".");
const { User, gameResultSchema } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );
        return userData;
      }
      throw new AuthenticationError("You need to be logged in");
    },
    //sorting options
    areas: () => {
      const optionsPerArea = getOptionsPerArea();
      const results = processInput(optionsPerArea);
      return Object.entries(results).map(([area, result]) => ({
        area,
        options: result.options.map((option) => ({ value: option })),
        selectedOption: result.selectedOption,
      }));
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },

    addGameResults: async (parent, { newSavedGameResults }, context) => {
      if (context.user) {
        const updateUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { savedResults: newSavedGameResults } },
          { new: true }
        );

        return updateUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    
    removeGameResults: async (parent, { id }, context) => {
      if (context.user) {
        const updateUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { savedResults: { _id: id } } },
          { new: true }
        );
        return updateUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    
    enterOptions: async () => {
      await getUserInput();
      return true;
    },
  },
};

module.exports = resolvers;
