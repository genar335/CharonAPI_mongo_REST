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
const QnAPair_1 = __importDefault(require("../entities/QnAPair"));
const Test_1 = __importDefault(require("../entities/Test"));
const fs_1 = __importDefault(require("fs"));
const regex = /^data:.+\/(.+);base64,(.*)$/;
exports.createTest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        const test = yield Test_1.default.create(req.body);
        const tmp = yield QnAPair_1.default.create({
            answer: "123",
            question: "qq",
        });
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
    }
    catch (error) {
        console.log(error);
    }
    res.send("Recieved a test!");
});
exports.imgSaving = (req, res) => {
    if (req.body) {
        req.body.forEach((file, index) => {
            let matches = file.match(regex);
            let ext = matches[1];
            let data = matches[2];
            let buffer = Buffer.from(data, "base64");
            fs_1.default.writeFileSync(`./uploads/img_${index}.` + ext, buffer);
            console.log(console.log(buffer));
        });
        console.log("Done parsing the images");
        res.send("Success, images have been saved");
    }
};
//# sourceMappingURL=test-actions.js.map