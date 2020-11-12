"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestSchema = void 0;
const mongoose_1 = require("mongoose");
exports.TestSchema = new mongoose_1.Schema({
    ru: {
        name: String,
        mainQuesiton: String,
        emailSender: Boolean,
        pages: [
            {
                QnAPairs: [
                    {
                        question: String,
                        answer: String,
                    },
                ],
            },
        ],
    },
    lv: {
        name: String,
        mainQuesiton: String,
        emailSender: Boolean,
        pages: [
            {
                QnAPairs: [
                    {
                        question: String,
                        answer: String,
                    },
                ],
            },
        ],
    },
    en: {
        name: String,
        mainQuesiton: String,
        emailSender: Boolean,
        pages: [
            {
                QnAPairs: [
                    {
                        question: String,
                        answer: String,
                    },
                ],
            },
        ],
    },
});
const Test = mongoose_1.model("Test", exports.TestSchema);
exports.default = Test;
//# sourceMappingURL=Test.js.map