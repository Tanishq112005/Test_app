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
exports.User = void 0;
exports.mongo_db_connect = mongo_db_connect;
const keys_1 = require("../keys");
const mongoose = require('mongoose');
const contestSchema = new mongoose.Schema({
    total_question: Number,
    time_duration: Number,
    codeforces_question: Number,
    leetcode_question: Number,
    rating_codeforces: Number,
    rating_leetcode: String,
    solved_codeforces_question: Number,
    solved_leetcode_question: Number,
    date: String
});
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    total_contest: Number,
    total_question: Number,
    contest_information: [contestSchema],
});
exports.User = mongoose.model("User", userSchema);
function mongo_db_connect() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose.connect(keys_1.mongo_db);
            console.log("MongoDB connected");
        }
        catch (err) {
            console.error("Error in MongoDB connection:", err);
        }
    });
}
