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
const database_1 = require("./database");
function adding_contest_information(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, email, time_duration, codeforces_question, rating_codeforces, leetcode_question, solved_leetcode_question, rating_leetcode, solved_codeforces_question, total_question, date } = req.body;
        try {
            const result = yield database_1.User.findOne({ name, email });
            if (result === null) {
                return res.status(404).json({
                    msg: "No such user is found"
                });
            }
            const newContest = {
                total_question,
                time_duration,
                codeforces_question,
                leetcode_question,
                rating_codeforces,
                rating_leetcode,
                solved_codeforces_question,
                solved_leetcode_question,
                date: date
            };
            const updatedUser = yield database_1.User.findOneAndUpdate({ name, email }, {
                $push: { contest_information: newContest },
                $inc: {
                    total_contest: 1,
                    total_question: solved_codeforces_question + solved_leetcode_question,
                }
            }, { new: true });
            res.status(200).json({
                msg: "Contest info added successfully",
                user: updatedUser
            });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                err: error
            });
        }
    });
}
exports.default = adding_contest_information;
