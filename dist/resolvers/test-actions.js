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
exports.imgSaving = exports.createTest = void 0;
const Test_1 = __importDefault(require("../entities/Test"));
const fs_1 = __importDefault(require("fs"));
const server_1 = require("../server");
exports.createTest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        const test = yield Test_1.default.create(req.body);
        const tmpTest = yield Test_1.default.create({
            ru: {
                name: "123",
                pages: [],
                emailSender: false,
                mainQusetion: "?",
            },
            lv: {
                name: "456",
                pages: [
                    {
                        QnAPairs: [
                            {
                                question: "lvq",
                                answer: "lva",
                            },
                            {
                                question: "lvq1",
                                answer: "lva1",
                            },
                        ],
                    },
                ],
                emailSender: false,
                mainQusetion: "??",
            },
            en: {
                name: "789",
                pages: [],
                emailSender: false,
                mainQusetion: "???",
            },
        });
        console.log(tmpTest);
        console.log(test);
    }
    catch (error) {
        console.log(error);
    }
    res.send("Recieved a test!");
});
exports.imgSaving = (req, res) => {
    console.log("recieved the img");
    if (req.body) {
        let imgsLocation = [];
        req.body.forEach((file, index) => {
            console.log("hello from the loop");
            console.log(file.length);
            console.log(file.slice(file.indexOf("/") + 1, file.indexOf(";")));
            let ext = file.slice(file.indexOf("/") + 1, file.indexOf(";"));
            let data = file.split(",")[1];
            let buffer = Buffer.from(data, "base64");
            console.log("starting to read the file");
            fs_1.default.writeFileSync(`dist/uploads/img_${index}.${ext}`, buffer);
            console.log(buffer);
            imgsLocation.push(`http://localhost:${server_1.PORT}/uploads/img_${index}.` + ext);
        });
        console.log("Done parsing the images");
        res.send(imgsLocation);
    }
    console.log("finish");
};
//# sourceMappingURL=test-actions.js.map