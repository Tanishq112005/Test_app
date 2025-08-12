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
const nodemailer = require('nodemailer');
require('dotenv').config();
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
}
function forgot_password(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email } = req.body;
        try {
            const user = yield database_1.User.findOne({ email: email });
            if (!user) {
                return res.status(200).json({
                    msg: "ok"
                });
            }
            yield password_1.db_password.updateMany({ email: email, used: false }, { $set: { used: true } });
            const otp = generateOTP();
            const otpString = otp.toString();
            const salt = yield bcryptjs_1.default.genSalt(10);
            const hashedOtp = yield bcryptjs_1.default.hash(otpString, salt);
            const otpRecord = new password_1.db_password({
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
function verification_password(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, otp, new_password } = req.body;
        try {
            const otpRecord = yield password_1.db_password.findOne({
                email: email,
                used: false
            }).sort({ createdAt: -1 });
            if (!otpRecord) {
                return res.status(400).json({
                    msg: "OTP is invalid or has expired. Please request a new one."
                });
            }
            const isOtpValid = yield bcryptjs_1.default.compare(otp, otpRecord.otp_hased);
            if (!isOtpValid) {
                return res.status(400).json({
                    msg: "Invalid OTP. Please check the code and try again."
                });
            }
            const salt = yield bcryptjs_1.default.genSalt(10);
            const hashedPassword = yield bcryptjs_1.default.hash(new_password, salt);
            yield database_1.User.updateOne({ email: email }, { $set: { password: hashedPassword } });
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
