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
exports.user_details_getting = user_details_getting;
const database_1 = require("./database");
function user_details_getting(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, email } = req.body;
        try {
            const result = yield database_1.User.findOne({
                name: name,
                email: email
            });
            if (result === null) {
                res.status(200).json({
                    msg: "No Such Type of the User is Not present"
                });
            }
            else {
                const data = result.contest_information;
                res.status(200).json({
                    name: name,
                    email: email,
                    contest: data
                });
            }
        }
        catch (error) {
            res.status(404).json({
                err: error
            });
        }
    });
}
