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
exports.login = exports.createUser = void 0;
const user_1 = __importDefault(require("../entities/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app_1 = require("../app");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const uPasswordHashed = yield bcrypt_1.default.hash(req.body.password, 10);
    const newUser = yield user_1.default.create({
        name: req.body.name,
        password: uPasswordHashed,
    });
    console.log(newUser);
    res.send(newUser);
});
exports.createUser = createUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, password } = req.body;
    if ((name || password) < 0) {
        res.send("Error");
    }
    const user = yield user_1.default.findOne({ name: name });
    if (user !== null) {
        if (yield bcrypt_1.default.compare(password, user.password)) {
            const token = generateAccessToken(user.name);
            res.json(token);
        }
        else {
            res.send("Wrong password");
        }
    }
    else {
        res.send("Wrong username");
    }
});
exports.login = login;
function generateAccessToken(username) {
    return jsonwebtoken_1.default.sign(username, app_1.jwtNotSoSecretSecret, { expiresIn: '1800000s' });
}
//# sourceMappingURL=user-actions.js.map