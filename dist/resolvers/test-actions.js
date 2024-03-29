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
exports.testFile = exports.HOST = exports.deleteTestByID = exports.getTestByID = exports.toggleTestActiveState = exports.getAllTests = exports.imgSaving = exports.saveIMG = exports.getTestsByActiveParam = exports.createTest = void 0;
const test_1 = __importDefault(require("../entities/test"));
const fs_1 = __importDefault(require("fs"));
const app_1 = require("../app");
const createTest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const arrivedData = req.body;
    if (!arrivedData._id) {
        try {
            if (arrivedData.type !== "TT") {
                for (let property in arrivedData) {
                    if (property === "ru" || property === "lv" || property === "en") {
                        arrivedData[property].pages.forEach((page, pageIndex) => {
                            page.QnAPairs.forEach((qORa, index) => {
                                if (/data:image/.test(qORa.question)) {
                                    dataURICoversion(qORa, "question", index, pageIndex);
                                }
                                else if (/data:image/.test(qORa.answer)) {
                                    dataURICoversion(qORa, "answer", index, pageIndex);
                                }
                            });
                        });
                    }
                }
            }
        }
        catch (error) {
            console.log(error);
        }
        try {
            const test = yield test_1.default.create(arrivedData);
            res.send(test);
        }
        catch (error) {
            console.log(error);
            res.send(error);
        }
    }
    else {
        test_1.default.updateOne({
            _id: req.body._id,
        }, req.body, (err, result) => {
            if (err) {
                res.send(err);
            }
            res.send(result);
        });
    }
});
exports.createTest = createTest;
const getTestsByActiveParam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.query);
    if (req.query.active) {
        test_1.default.find({
            active: req.query.active,
        }, (err, result) => {
            if (err) {
                res.send(`Error has occured: err`);
            }
            else {
                res.send(result);
            }
        });
    }
});
exports.getTestsByActiveParam = getTestsByActiveParam;
const saveIMG = (req, res) => {
    console.log(req.body);
    if (req.body) {
        const { fileName, fileContents, } = req.body;
        console.log(fileName, "fName");
        let data = fileContents.split(",")[1];
        let buffer = Buffer.from(data, "base64");
        fs_1.default.writeFileSync(`dist/uploads/${fileName}`, buffer);
        res.send(`http://localhost:${app_1.PORT}/uploads/${fileName}`);
    }
};
exports.saveIMG = saveIMG;
const imgSaving = (req, res) => {
    console.log("recieved the img");
    if (req.body) {
        let imgsLocation = [];
        req.body.forEach((file, index) => {
            let ext = file.slice(file.indexOf("/") + 1, file.indexOf(";"));
            let data = file.split(",")[1];
            let buffer = Buffer.from(data, "base64");
            console.log("starting to read the file");
            fs_1.default.writeFileSync(`dist/uploads/img_${index}.${ext}`, buffer);
            console.log(buffer);
            imgsLocation.push(`http://localhost:${app_1.PORT}/uploads/img_${index}.` + ext);
        });
        console.log("Done parsing the images");
        res.send(imgsLocation);
    }
    console.log("finish");
};
exports.imgSaving = imgSaving;
const getAllTests = (_req, res) => {
    test_1.default.find((err, result) => {
        if (err) {
            res.send(err);
        }
        else {
            console.log("success");
            res.send(result);
        }
    });
};
exports.getAllTests = getAllTests;
const toggleTestActiveState = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { testID, isActive } = req.body;
    console.log(testID, isActive);
    const changedTest = yield test_1.default.findOneAndUpdate({ _id: testID }, {
        active: isActive,
    }, { new: true });
    console.log(changedTest);
    res.send(changedTest);
});
exports.toggleTestActiveState = toggleTestActiveState;
const getTestByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.query, "hello");
    if (req.query.testToEdit !== undefined) {
        try {
            const testToEditFromDB = yield test_1.default.findById(req.query.testToEdit);
            console.log(testToEditFromDB);
            res.send(testToEditFromDB);
        }
        catch (error) {
            console.log(error);
        }
    }
    else {
        res.status(400).send("Sorry, no correct ID was supplied");
    }
});
exports.getTestByID = getTestByID;
const deleteTestByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.query.testToDelete) {
        try {
            const deletedTest = yield test_1.default.findByIdAndDelete(req.query.testToDelete);
            res.send(deletedTest);
        }
        catch (error) {
            console.log(error);
            res.send("Error has occured");
        }
    }
});
exports.deleteTestByID = deleteTestByID;
function dataURICoversion(qORa, whatToChange, index, pageIndex) {
    let tmp = qORa[whatToChange];
    let ext = tmp.slice(tmp.indexOf("/") + 1, tmp.indexOf(";"));
    if (ext.indexOf("+") !== -1) {
        console.log("Found a plus", ext);
        ext = ext.slice(0, ext.indexOf("+"));
    }
    let data = tmp.split(",")[1];
    let buffer = Buffer.from(data, "base64");
    console.log(buffer);
    fs_1.default.writeFileSync(`dist/uploads/img_question_pair-${index}_page-${pageIndex}.${ext}`, buffer);
    qORa[whatToChange] = `http://localhost:${app_1.PORT}/uploads/img_question_pair-${index}_page-${pageIndex}.${ext}`;
}
exports.HOST = `modesmuzejs.lv/api/quiz`;
const testFile = (req, res, _) => {
    console.log(req.body);
    console.log(req.file);
    res.send(`http://${exports.HOST}/static/uploads/${req.file.originalname}`);
    res.send("hello");
};
exports.testFile = testFile;
//# sourceMappingURL=test-actions.js.map