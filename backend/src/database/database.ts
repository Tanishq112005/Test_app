import { mongo_db } from "../keys";
const mongoose = require('mongoose');

const contestSchema = new mongoose.Schema({
  total_question : Number ,
  time_duration: Number,
  codeforces_question: Number,
  leetcode_question: Number,
  rating_codeforces: Number,
  rating_leetcode: String,
  solved_codeforces_question: Number,
  solved_leetcode_question: Number,
  date : String
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  total_contest: Number,
  total_question : Number ,
  contest_information: [contestSchema],
});


export const User = mongoose.model("User", userSchema);

export async function mongo_db_connect() {
  try {
    await mongoose.connect(mongo_db);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("Error in MongoDB connection:", err);
  }
}


