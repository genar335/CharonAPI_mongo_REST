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
exports.createTest = void 0;
const Test_1 = __importDefault(require("../entities/Test"));
const mongoose_1 = require("mongoose");
exports.createTest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const newTest = new Test_1.default({
        _id: new mongoose_1.Types.ObjectId(),
        ru: [
            {
                name: req.body.ru.name,
            },
        ],
        lv: [
            {
                name: req.body.lv.name,
            },
        ],
        en: [
            {
                name: req.body.lv.name,
            },
        ],
    });
    console.log(newTest);
    res.send(newTest);
});
//# sourceMappingURL=test-actions.js.map