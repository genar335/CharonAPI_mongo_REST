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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv = __importStar(require("dotenv"));
const UserController = __importStar(require("./resolvers/user-actions"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_session_1 = __importDefault(require("express-session"));
const redis_1 = __importDefault(require("redis"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const cors_1 = __importDefault(require("cors"));
dotenv.config({});
const PORT = 4000;
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = express_1.default();
    try {
        mongoose_1.default.connect(process.env.DB_HOST, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
    catch (error) {
        console.error(error);
    }
    mongoose_1.default.set("debug", true);
    const RedisStore = connect_redis_1.default(express_session_1.default);
    const redisClient = redis_1.default.createClient();
    redisClient.on("error", (err) => {
        console.log("Redis error: ", err);
    });
    app.use(body_parser_1.default.json());
    app.use(cors_1.default({
        origin: "http://localhost:3000",
        credentials: true,
    }));
    app.use(express_session_1.default({
        name: "qid",
        store: new RedisStore({
            client: redisClient,
            disableTouch: true,
            disableTTL: true,
            host: "localhost",
            port: 6379,
            ttl: 86400,
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365,
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        },
        secret: "fhjdskalfhdsjklafhfhguirjewhjkgwjkf",
        resave: false,
        saveUninitialized: false,
    }));
    app.get("/", (res) => {
        res.send("Hello there; General Kenobi🦾");
    });
    app.post("/users/create", UserController.createUser);
    app.post("/users/log_in", UserController.login);
    app.listen(PORT, () => {
        console.log(`Server started on port: ${PORT}`);
    });
});
main();
//# sourceMappingURL=server.js.map