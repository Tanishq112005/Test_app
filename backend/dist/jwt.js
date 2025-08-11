"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const keys_1 = require("./keys");
const JWT_KEY = keys_1.JWT_SECRET;
if (!JWT_KEY) {
    throw new Error("FATAL ERROR: JWT_SECRET is not defined in .env file.");
}
function generateToken(user) {
    const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password
    };
    const token = jsonwebtoken_1.default.sign(payload, keys_1.JWT_SECRET, {
        expiresIn: '1d',
    });
    return token;
}
