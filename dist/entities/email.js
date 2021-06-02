"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.EmailSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true, unique: true },
    createdAt: {
        type: Date, default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    }
});
const Email = mongoose_1.default.model("Email", exports.EmailSchema);
exports.default = Email;
//# sourceMappingURL=email.js.map