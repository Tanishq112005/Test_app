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
exports.new_user = new_user;
const database_1 = require("./database");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = require("../jwt");
function new_user(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, password, email } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email, and password are required." });
        }
        try {
            const existingUser = yield database_1.User.findOne({ email: email });
            if (existingUser) {
                return res.status(409).json({
                    message: "A user with this email already exists."
                });
            }
            const salt = yield bcryptjs_1.default.genSalt(10);
            const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
            const newUser = new database_1.User({
                name: name,
                email: email,
                password: hashedPassword,
                total_contest: 0,
                total_question: 0,
                contest_information: []
            });
            const savedUser = yield newUser.save();
            const userForToken = {
                id: savedUser._id.toString(),
                name: savedUser.name,
                email: savedUser.email,
                password: savedUser.password,
            };
            const token = (0, jwt_1.generateToken)(userForToken);
            res.status(201).json({
                message: "User created successfully",
                token: token,
                user: newUser,
            });
        }
        catch (error) {
            console.error("Error during user registration:", error);
            res.status(500).json({
                message: "Internal Server Error. Please try again later."
            });
        }
    });
}
