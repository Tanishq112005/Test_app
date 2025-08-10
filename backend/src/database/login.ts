import { type Request, type Response } from "express";
import { User } from "./database";
import bcrypt from 'bcryptjs';
import { generateToken } from "../jwt";

export async function login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

       
        const userForToken = {
            id: user._id.toString(),
            name: user.name,
            email: user.email , 
            password : user.password
        };
        const token = generateToken(userForToken);

        res.status(200).json({
            message: "Login successful",
            token: token,
            user: user
        });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}