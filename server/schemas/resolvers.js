const { AuthenticationError } = require("apollo-server-express");
const { User, gameResultSchema } = require("../models");
const { signToken } = require("../utils/auth");

const MASH = ['Mansion', 'Apartment', 'Shack', 'Homeless']

const getRandom = list => {
  const length = list.length
  const index = Math.random() * (length-1);
  
  return list[index]
}


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
    createNewMash: async (parent, { newMash }, context) => {
      const { partners, numberOfKids, careers, salaries, modesOfTransportation, meansOfDeath, agesOfDeath, magicNumber} = newMash
      const partner = getRandom(partners)
      const kids = getRandom(numberOfKids)
      const career = getRandom(careers)
      const salary = getRandom(salaries)
      const transportation = getRandom(modesOfTransportation)
      const death = getRandom(meansOfDeath)
      const ageOfDeath = getRandom(agesOfDeath)
      const mash = getRandom(MASH)

      const gameResult = new gameResultSchema(partner, kids, career, salary, transportation, death, ageOfDeath, mash)


   
      // if (context.user) {
      //   const updateUser = await User.findByIdAndUpdate(
      //     { _id: context.user._id },
      //     { $push: { savedResults: newMash } },
      //     { new: true }
      //   );

      //   return updateUser;
      // }
      // throw new AuthenticationError("You need to be logged in!");
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

    updateUsername: async (parent, { username }, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(
          context.User._id,
          { username },
          { new: true }
        )
          .populate('savedResults')
      }
      throw new AuthenticationError('Not logged in')
    },
  },
};

module.exports = resolvers;
