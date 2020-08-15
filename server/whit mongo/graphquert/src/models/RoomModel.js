import mongoose from 'mongoose';

const Schema = mongoose.Schema

const userSchema = new Schema({
  uid: { type: String },
  token: { type: String },
  name: { type: String },
  email: { type: String },
  pic: { type: String },
  point: { type: Number },
})

const User = mongoose.model('user', userSchema,'users')

export default User

