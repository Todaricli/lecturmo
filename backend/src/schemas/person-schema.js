import mongoose from "mongoose";

const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  email: { type: String, unique: true, required: true }
});

export const Person = mongoose.model("Person", personSchema);
