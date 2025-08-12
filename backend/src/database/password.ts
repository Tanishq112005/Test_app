require('dotenv').config();
const mongo_db = process.env.Mongo_db ; 
const mongoose = require('mongoose');

const password_schema = new mongoose.Schema({
  email : String , 
  otp_hased : String , 
  used : Boolean
});


export const db_password = mongoose.model("Password", password_schema);

export async function mongo_db_connect_password() {
  try {
    await mongoose.connect(mongo_db);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("Error in MongoDB connection:", err);
  }
}




