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
exports.upload = exports.PORT = exports.host_url = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const mongoose_1 = __importDefault(require("mongoose"));
const UserController = __importStar(require("./resolvers/user-actions"));
const TestController = __importStar(require("./resolvers/test-actions"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
exports.host_url = '/api/quiz/';
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
    let accessLogStream = fs_1.default.createWriteStream(path_1.default.join(__dirname, 'access.log'), { flags: 'a' });
    app.use(morgan_1.default('dev', { stream: accessLogStream }));
    console.log(__dirname);
    app.use(express_1.default.json({ limit: `50mb` }));
    app.use(express_1.default.urlencoded({ limit: `50mb` }));
    app.use(cors_1.default({
        credentials: true,
        origin: '*'
    }));
    app.use(cookie_parser_1.default());
    app.use('/api/quiz/static', express_1.default.static(path_1.default.join(__dirname, 'public')));
    console.log(express_1.default.static(path_1.default.join(__dirname, `public`)));
    app.post(`${exports.host_url}users/create`, UserController.createUser);
    app.post(`${exports.host_url}users/log_in`, UserController.login);
    app.post(`${exports.host_url}tests/create`, TestController.createTest);
    app.post(`${exports.host_url}tests/toggleTestActiveState`, TestController.toggleTestActiveState);
    app.get(`${exports.host_url}tests/getTest`, TestController.getTestsByActiveParam);
    app.get(`${exports.host_url}tests/getTestByID`, TestController.getTestByID);
    app.get(`${exports.host_url}tests/allTests`, TestController.getAllTests);
    app.get(`${exports.host_url}tests/deleteTestByID`, TestController.deleteTestByID);
    app.post(`${exports.host_url}tests/testimg`, exports.upload.single(`image`), TestController.testFile);
    app.get(`${exports.host_url}`, ((_, res) => res.send("Hello, there")));
    app.use(function (_, res, __) {
        res.status(404).send("Sorry can't find that!");
    });
    app.listen(exports.PORT, () => {
        console.log(`Server started on port: ${exports.PORT}`);
    });
});
main();
//# sourceMappingURL=app.js.map