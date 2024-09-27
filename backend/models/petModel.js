import { Schema, model } from 'mongoose';

// Define a schema for the User collection
const petSchema = new Schema({
    ownerEmail: String,
    species: String,
    name: String,
    breed: String,
    age: String,
    weight: String,
    altered: String,
    birthdate: Date,
    adoptiondate: Date,
  });
  

export default model('Pet', petSchema, 'pets')