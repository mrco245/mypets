import { Schema, model } from 'mongoose';

// Define a schema for the User collection
const userSchema = new Schema({
    username: String,
    email: String,
    password: String
  });
  

export default model('User', userSchema, 'users')