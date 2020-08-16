import User from './models/RoomModel.js'
export default {
  Query: {
    async users() {
      return await User.find();
    }
  },
  Mutation: {
    async createuser(root, { input }) {
      return await User.create(input);
    },
    async updateuser(root, {
        _id,
        input
      }) {
        return await User.findOneAndUpdate({
          _id
        }, input, {
          new: true
        })
      },
      async deleteuser(root, {
        _id
      }) {
        return await User.findByIdAndRemove(_id)
      }
    }
  };