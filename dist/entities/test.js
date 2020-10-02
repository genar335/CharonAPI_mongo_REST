"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestSchema = void 0;
const mongoose_1 = require("mongoose");
exports.TestSchema = new mongoose_1.Schema({
    ru: [
        {
            name: String,
            mainQuesiton: String,
            emailSender: Boolean,
            pages: [
                {
                    type: mongoose_1.Types.ObjectId,
                    ref: "Page",
                },
            ],
        },
    ],
    lv: [
        {
            name: String,
            mainQuesiton: String,
            emailSender: Boolean,
            pages: [
                {
                    type: mongoose_1.Types.ObjectId,
                    ref: "Page",
                },
            ],
        },
    ],
    en: [
        {
            name: String,
            mainQuesiton: String,
            emailSender: Boolean,
            pages: [
                {
                    type: mongoose_1.Types.ObjectId,
                    ref: "Page",
                },
            ],
        },
    ],
});
const Test = mongoose_1.model("Test", exports.TestSchema);
exports.default = Test;
//# sourceMappingURL=Test.js.map