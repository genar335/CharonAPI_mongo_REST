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
exports.getAllEmails = exports.saveEmail = void 0;
const email_1 = __importDefault(require("../entities/email"));
const saveEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newEmail = yield email_1.default.create({
        email: req.body.email,
        createdAt: new Date(),
        updatedAt: new Date()
    });
    res.status(200).send();
    console.log(newEmail);
});
exports.saveEmail = saveEmail;
const getAllEmails = (_, res) => {
    const emails = email_1.default.find();
    res.send(emails);
};
exports.getAllEmails = getAllEmails;
//# sourceMappingURL=email-actions.js.map