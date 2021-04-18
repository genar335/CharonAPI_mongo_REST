"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestSchema = void 0;
const mongoose_1 = require("mongoose");
exports.TestSchema = new mongoose_1.Schema({
    ru: {
        name: String,
        mainQuesiton: String,
        finalPageTextHeading: String,
        finalPageTextBody: String,
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
        finalPageTextHeading: String,
        finalPageTextBody: String,
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
        finalPageTextHeading: String,
        finalPageTextBody: String,
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
    type: String,
    pages: Number,
    active: Boolean,
    emailSender: Boolean,
}, { timestamps: true });
const Test = mongoose_1.model("Test", exports.TestSchema);
exports.default = Test;
//# sourceMappingURL=test.js.map