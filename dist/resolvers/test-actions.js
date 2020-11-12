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
exports.imgTest = exports.createTest = void 0;
const fs_1 = __importDefault(require("fs"));
const regex = /^data:.+\/(.+);base64,(.*)$/;
exports.createTest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const enPages = en.pages;
    enPages.forEach((element) => {
        console.log(typeof element);
    });
    res.send(req.body);
});
exports.imgTest = (req, res) => {
    const matches = req.body[1].match(regex);
    let ext = matches[1];
    let data = matches[2];
    let buffer = Buffer.from(data, "base64");
    fs_1.default.writeFileSync("data." + ext, buffer);
    console.log(console.log(buffer));
    if (req.body) {
        req.body.forEach((file, index) => {
            let matches = file.match(regex);
            let ext = matches[1];
            let data = matches[2];
            let buffer = Buffer.from(data, "base64");
            fs_1.default.writeFileSync(`./uploads/img_${index}.` + ext, buffer);
            console.log(console.log(buffer));
        });
        res.send("Success");
    }
};
//# sourceMappingURL=test-actions.js.map