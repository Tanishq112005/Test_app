
import { User } from "./database"; 
import { Request, Response } from 'express'; 

export async function finding_user(req: Request, res: Response) {

    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ msg: "Email is required in the request body." });
    }

    try {
      
        const user = await User.findOne({ email: email });

    
        if (!user) {
            return res.status(404).json({ msg: `User with email ${email} not found.` });
        }

 
        res.status(200).json(user);

    } catch (err) {
        console.error("Error finding user:", err);
        res.status(500).json({ msg: "Server error while finding user." });
    }
}
