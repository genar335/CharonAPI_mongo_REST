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
exports.deleteTestByID = exports.getTestByID = exports.toggleTestActiveState = exports.getAllTests = exports.imgSaving = exports.getTestsByActiveParam = exports.createTest = void 0;
const Test_1 = __importDefault(require("../entities/Test"));
const fs_1 = __importDefault(require("fs"));
const server_1 = require("../server");
exports.createTest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        const test = yield Test_1.default.create(req.body);
        console.log(test);
    }
    catch (error) {
        console.log(error);
    }
    res.send("Recieved a test!");
});
exports.getTestsByActiveParam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.query);
    if (req.query.active) {
        Test_1.default.find({
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
exports.imgSaving = (req, res) => {
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
            imgsLocation.push(`http://localhost:${server_1.PORT}/uploads/img_${index}.` + ext);
        });
        console.log("Done parsing the images");
        res.send(imgsLocation);
    }
    console.log("finish");
};
exports.getAllTests = (req, res) => {
    Test_1.default.find((err, result) => {
        if (err) {
            res.send(err);
        }
        else {
            console.log("success");
            res.send(result);
        }
    });
};
exports.toggleTestActiveState = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { testID, isActive } = req.body;
    console.log(testID, isActive);
    const changedTest = yield Test_1.default.findOneAndUpdate({ _id: testID }, {
        active: isActive,
    }, { new: true });
    console.log(changedTest);
    res.send(changedTest);
});
exports.getTestByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.query, "hello");
    if (req.query.testToEdit !== undefined) {
        try {
            const testToEditFromDB = yield Test_1.default.findById(req.query.testToEdit);
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
exports.deleteTestByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.query.testToDelete) {
        try {
            const deletedTest = yield Test_1.default.findByIdAndDelete(req.query.testToDelete);
            res.send(deletedTest);
        }
        catch (error) {
            console.log(error);
            res.send("Error has occured");
        }
    }
});
//# sourceMappingURL=test-actions.js.map