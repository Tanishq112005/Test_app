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
Object.defineProperty(exports, "__esModule", { value: true });
exports.db_password = void 0;
exports.mongo_db_connect_password = mongo_db_connect_password;
require('dotenv').config();
const mongo_db = process.env.Mongo_db;
const mongoose = require('mongoose');
const password_schema = new mongoose.Schema({
    email: String,
    otp_hased: String,
    used: Boolean
});
exports.db_password = mongoose.model("Password", password_schema);
function mongo_db_connect_password() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose.connect(mongo_db);
            console.log("MongoDB connected");
        }
        catch (err) {
            console.error("Error in MongoDB connection:", err);
        }
    });
}
