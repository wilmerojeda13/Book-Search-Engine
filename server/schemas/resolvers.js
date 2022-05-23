// Exporting User
const {User} = require('../models/User')
const {AuthenticationError} = require('apollo-server-express');
const {signToken} = require('../utils/auth')

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if(context.user) {
        const userData = await User.findOne({_id: context.user._id})
        .select('-_v -password')
        return userData;
      }

      throw new AuthenticationError(' Not logged in ⛔');
    }
  },

  // Create user and changing into a token
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token= signToken(user);

      return {token, user}
    },
    // when the user login first its going to loojk for the email after that its going to look for second authentication which is password
    login: async (parent, {email, password}) => {
      const user = await User.findOne ({email});
      // when the user login and have wrong credentials for the emailits's going to deploy an error 'Incorrect Credentials'
      if (!user) {
        throw new AuthenticationError(' Not logged in ⛔');
      }

      const correctPW = await user.isCorrectPassword(password);
      //Password incorrect throw error
      if(!correctPW) {
        throw new AuthenticationError('Incorrect credentials')
      }
      //when the user pass credentials return token
      const token = signToken(user);
      return {token, user};
    },
    //saved function that makes user to sign in with their created authentication if is wrong credentials message its going to display (you need to be logged in)
    saveBook: async (parent, {input}, context) => {
      if (context.user) {
        const updateUser = await User.findByIdAndUpdate(
          {_id: context.user._id},
          {$addToSet: {saveBooks: input}},
          {new: true}
        );
        return updateUser;
      }
      throw new AuthenticationError('You need to logged in')
    },
    // Remove book function its goinh to look for the bookId and saved but first they have to logged in in order to do so if not error its going to display
    removeBook: async (parent, {bookId}, context) => {
      if (context.user) {
        const updateUser = await User.findByIdAndUpdate(
          {_id: context.user._id},
          {pull: {savedBooks: {bookId}}},
          {new: true}
        );
        return updateUser;
      }
      throw new AuthenticationError('You need to logged in')
    },

  }
}

module.exports = resolvers;