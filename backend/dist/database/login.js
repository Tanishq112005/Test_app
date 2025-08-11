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
exports.login = login;
const database_1 = require("./database");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = require("../jwt");
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            const user = yield database_1.User.findOne({ email: email });
            if (!user) {
                return res.status(401).json({ message: "Invalid credentials." });
            }
            const isMatch = yield bcryptjs_1.default.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: "Invalid credentials." });
            }
            const userForToken = {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                password: user.password
            };
            const token = (0, jwt_1.generateToken)(userForToken);
            res.status(200).json({
                message: "Login successful",
                token: token,
                user: user
            });
        }
        catch (error) {
            console.error("Login Error:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    });
}
