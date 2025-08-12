

import bcrypt from "bcryptjs";
import { User } from "./database/database";
import { db_password } from "./database/password";

const nodemailer = require('nodemailer');
require('dotenv').config();
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
}


export async function forgot_password(req : any, res : any) {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(200).json({
                msg: "ok"
            });
        }
        
        
        await db_password.updateMany({ email: email, used: false }, { $set: { used: true } });

        const otp = generateOTP();
        const otpString = otp.toString();
       
        const salt = await bcrypt.genSalt(10);
        const hashedOtp = await bcrypt.hash(otpString, salt);

        const otpRecord = new db_password({
            email: email,
            otp_hased: hashedOtp,
            used: false,
            
        });

       
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.Company_mail,
                pass: process.env.Company_password
            }
        });

        let mailOptions = {
            from: process.env.Company_mail,
            to: email,
            subject: "Password Reset Request",
            text: `Your One-Time Password (OTP) for resetting your password is: ${otp}`
        };

      
        await transporter.sendMail(mailOptions);
        await otpRecord.save();
        
        res.status(200).json({
            msg: "ok"
        });

    } catch (err) {
        console.error("Forgot Password Error:", err);
        res.status(500).json({
            msg: "An internal server error occurred."
        });
    }
}



export async function verification_password(req : any, res : any) {
    const { email, otp, new_password } = req.body;

    try {
      
        const otpRecord = await db_password.findOne({
            email: email,
            used: false
        }).sort({ createdAt: -1 }); 

        if (!otpRecord) {
            return res.status(400).json({
                msg: "OTP is invalid or has expired. Please request a new one."
            });
        }
        
        
        const isOtpValid = await bcrypt.compare(otp, otpRecord.otp_hased);

        if (!isOtpValid) {
            return res.status(400).json({
                msg: "Invalid OTP. Please check the code and try again."
            });
        }
        
       
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(new_password, salt);
        
      
        await User.updateOne(
            { email: email },
            { $set: { password: hashedPassword } }
        );

        otpRecord.used = true;
        await otpRecord.save();

        res.status(200).json({
            msg: "ok"
        });

    } catch (err) {
        console.error("Password Verification Error:", err);
        res.status(500).json({
            msg: "An internal server error occurred."
        });
    }
}