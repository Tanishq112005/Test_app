import { type Request, type Response } from "express";
import { User } from "./database";
import bcrypt from 'bcryptjs';
import { generateToken } from "../jwt"; 

export async function new_user(req: Request, res: Response) {
   const { name, password, email } = req.body;


   if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required." });
   }

   try {
     const existingUser = await User.findOne({ email: email });

     if (existingUser) {
      
        return res.status(409).json({
            message: "A user with this email already exists."
        });
     }

  
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(password, salt);

     const newUser = new User({
        name: name,
        email: email,
        password: hashedPassword, 
        total_contest: 0,
        total_question: 0,
        contest_information: []
     });
      
     const savedUser = await newUser.save();
   
   
     const userForToken = {
         id: savedUser._id.toString(), 
         name: savedUser.name,
         email: savedUser.email , 
         password : savedUser.password ,
     };


     const token = generateToken(userForToken);

     res.status(201).json({
        message: "User created successfully",
        token: token,
        user:  newUser, 
     });

   } catch (error) {
    console.error("Error during user registration:", error); 

    res.status(500).json({
        message: "Internal Server Error. Please try again later."
    });
   }
}