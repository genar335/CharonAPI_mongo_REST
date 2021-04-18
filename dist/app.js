"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.upload = exports.PORT = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const mongoose_1 = __importDefault(require("mongoose"));
const UserController = __importStar(require("./resolvers/user-actions"));
const TestController = __importStar(require("./resolvers/test-actions"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const mongoDBConnectionURI = `mongodb+srv://db_admin:INUTcbXenaioaF6F@cluster0.dgurj.mongodb.net/quiz_db?retryWrites=true&w=majority`;
exports.PORT = process.env.PORT || 4000;
exports.upload = multer_1.default({
    storage: multer_1.default.diskStorage({
        destination: (_req, _file, cb) => cb(null, `dist/public/uploads`),
        filename: (_req, file, cb) => cb(null, `${file.originalname}`),
    }),
});
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = express_1.default();
    try {
        mongoose_1.default.connect(mongoDBConnectionURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
    catch (error) {
        console.error(error);
    }
    mongoose_1.default.set(`debug`, true);
    app.use(express_1.default.json({ limit: `50mb` }));
    app.use(express_1.default.urlencoded({ limit: `50mb` }));
    app.use(cors_1.default({
        origin: `*`,
    }));
    app.use(express_1.default.static(path_1.default.join(__dirname, `public`)));
    const host_url = '/api/quiz/';
    app.post(`${host_url}users/create`, UserController.createUser);
    app.get(`${host_url}users/login`, ((req, res) => res.send(req.originalUrl)));
    app.post(`${host_url}create`, TestController.createTest);
    app.post(`${host_url}testIMG`, TestController.imgSaving);
    app.post(`${host_url}toggleTestActiveState`, TestController.toggleTestActiveState);
    app.get(`${host_url}getTest`, TestController.getTestsByActiveParam);
    app.get(`${host_url}getTestByID`, TestController.getTestByID);
    app.get(`${host_url}allTests`, TestController.getAllTests);
    app.get(`${host_url}deleteTestByID`, TestController.deleteTestByID);
    app.post(`${host_url}testimg`, exports.upload.single(`image`), TestController.testFile);
    app.get(`${host_url}`, ((req, res) => res.json(req)));
    app.use(function (req, res, next) {
        res.status(404).send("Sorry can't find that!");
    });
    app.listen(exports.PORT, () => {
        console.log(`Server started on port: ${exports.PORT}`);
    });
});
main();
//# sourceMappingURL=app.js.map