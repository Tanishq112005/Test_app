

import bcrypt from "bcryptjs";
import { User } from "./database/database";
import { db_password } from "./database/password";
import { company_mail, company_password } from "./keys";
const nodemailer = require('nodemailer');

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
}


export async function forgot_password(req : any, res : any) {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email: email });

        // SECURITY: To prevent user enumeration attacks, we send a success-like
        // response even if the user is not found. The user will simply not receive an email.
        if (!user) {
            return res.status(200).json({
                msg: "ok"
            });
        }
        
        // Invalidate any previous, unused OTPs for this email to prevent confusion
        await db_password.updateMany({ email: email, used: false }, { $set: { used: true } });

        const otp = generateOTP();
        const otpString = otp.toString();
        
        // Hash the OTP before saving
        const salt = await bcrypt.genSalt(10);
        const hashedOtp = await bcrypt.hash(otpString, salt);

        const otpRecord = new db_password({
            email: email,
            otp_hased: hashedOtp,
            used: false,
            // Optional: Add an expiry for the OTP
            // expiresAt: new Date(new Date().getTime() + 10 * 60 * 1000) // 10 minutes from now
        });

        // Setup Nodemailer
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: company_mail,
                pass: company_password
            }
        });

        let mailOptions = {
            from: company_mail,
            to: email,
            subject: "Password Reset Request",
            text: `Your One-Time Password (OTP) for resetting your password is: ${otp}`
        };

        // Send the email and save the OTP record to the database
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


// VERIFY OTP AND RESET PASSWORD ENDPOINT
export async function verification_password(req : any, res : any) {
    const { email, otp, new_password } = req.body;

    try {
        // Find the most recent, unused OTP record for the given email
        const otpRecord = await db_password.findOne({
            email: email,
            used: false
        }).sort({ createdAt: -1 }); // Get the latest OTP

        if (!otpRecord) {
            return res.status(400).json({
                msg: "OTP is invalid or has expired. Please request a new one."
            });
        }
        
        // Compare the provided OTP with the hashed OTP from the database
        const isOtpValid = await bcrypt.compare(otp, otpRecord.otp_hased);

        if (!isOtpValid) {
            return res.status(400).json({
                msg: "Invalid OTP. Please check the code and try again."
            });
        }
        
        // OTP is valid. Hash the new password.
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(new_password, salt);
        
        // Update the user's password in the main User collection
        await User.updateOne(
            { email: email },
            { $set: { password: hashedPassword } }
        );

        // Mark this OTP as used so it cannot be used again
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