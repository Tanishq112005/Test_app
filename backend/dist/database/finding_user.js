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
exports.finding_user = finding_user;
const database_1 = require("./database");
function finding_user(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ msg: "Email is required in the request body." });
        }
        try {
            const user = yield database_1.User.findOne({ email: email });
            if (!user) {
                return res.status(404).json({ msg: `User with email ${email} not found.` });
            }
            res.status(200).json(user);
        }
        catch (err) {
            console.error("Error finding user:", err);
            res.status(500).json({ msg: "Server error while finding user." });
        }
    });
}
