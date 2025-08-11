"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgot_password = forgot_password;
exports.verification_password = verification_password;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const database_1 = require("./database/database");
const password_1 = require("./database/password");
const keys_1 = require("./keys");
const nodemailer = require('nodemailer');
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
}
function forgot_password(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email } = req.body;
        try {
            const user = yield database_1.User.findOne({ email: email });
            // SECURITY: To prevent user enumeration attacks, we send a success-like
            // response even if the user is not found. The user will simply not receive an email.
            if (!user) {
                return res.status(200).json({
                    msg: "ok"
                });
            }
            // Invalidate any previous, unused OTPs for this email to prevent confusion
            yield password_1.db_password.updateMany({ email: email, used: false }, { $set: { used: true } });
            const otp = generateOTP();
            const otpString = otp.toString();
            // Hash the OTP before saving
            const salt = yield bcryptjs_1.default.genSalt(10);
            const hashedOtp = yield bcryptjs_1.default.hash(otpString, salt);
            const otpRecord = new password_1.db_password({
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
                    user: keys_1.company_mail,
                    pass: keys_1.company_password
                }
            });
            let mailOptions = {
                from: keys_1.company_mail,
                to: email,
                subject: "Password Reset Request",
                text: `Your One-Time Password (OTP) for resetting your password is: ${otp}`
            };
            // Send the email and save the OTP record to the database
            yield transporter.sendMail(mailOptions);
            yield otpRecord.save();
            res.status(200).json({
                msg: "ok"
            });
        }
        catch (err) {
            console.error("Forgot Password Error:", err);
            res.status(500).json({
                msg: "An internal server error occurred."
            });
        }
    });
}
// VERIFY OTP AND RESET PASSWORD ENDPOINT
function verification_password(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, otp, new_password } = req.body;
        try {
            // Find the most recent, unused OTP record for the given email
            const otpRecord = yield password_1.db_password.findOne({
                email: email,
                used: false
            }).sort({ createdAt: -1 }); // Get the latest OTP
            if (!otpRecord) {
                return res.status(400).json({
                    msg: "OTP is invalid or has expired. Please request a new one."
                });
            }
            // Compare the provided OTP with the hashed OTP from the database
            const isOtpValid = yield bcryptjs_1.default.compare(otp, otpRecord.otp_hased);
            if (!isOtpValid) {
                return res.status(400).json({
                    msg: "Invalid OTP. Please check the code and try again."
                });
            }
            // OTP is valid. Hash the new password.
            const salt = yield bcryptjs_1.default.genSalt(10);
            const hashedPassword = yield bcryptjs_1.default.hash(new_password, salt);
            // Update the user's password in the main User collection
            yield database_1.User.updateOne({ email: email }, { $set: { password: hashedPassword } });
            // Mark this OTP as used so it cannot be used again
            otpRecord.used = true;
            yield otpRecord.save();
            res.status(200).json({
                msg: "ok"
            });
        }
        catch (err) {
            console.error("Password Verification Error:", err);
            res.status(500).json({
                msg: "An internal server error occurred."
            });
        }
    });
}
