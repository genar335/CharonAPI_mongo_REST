import express from "express";
import socket from "socket.io";
import multer from "multer";
import mongoose, { get } from "mongoose";
import * as dotenv from "dotenv";
import * as UserController from "./resolvers/user-actions";
import * as TestController from "./resolvers/test-actions";
// import bodyParser from "body-parser";
import session from "express-session";
import redis from "redis";
import connectRedis from "connect-redis";
import cors from "cors";
// import Test, { ITest } from "./entities/Test";
import fileUpload from "express-fileupload";
import Test from "./entities/Test";
// import fs from "fs";
import path from "path";

dotenv.config({
  //   path: "../.env",
});
export const PORT = ((process.env.PORT as unknown) as number) || 4000;

export const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, "dist/public/uploads"),
    filename: (req, file, cb) => cb(null, `${file.originalname}`),
  }),
});

const main = async () => {
  const app = express();
  try {
    mongoose.connect(process.env.DB_HOST as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error(error);
  }
  mongoose.set("debug", true);
  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient();

  redisClient.on("error", (err) => {
    console.log("Redis error: ", err);
  });

  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb" }));
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  // app.use(fileUpload());
  app.use(express.static(path.join(__dirname, "public")));
  console.log(__dirname);
  app.use(
    session({
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
    })
  );

  //* Routes configuration

  app.post("/users/create", UserController.createUser);
  app.post("/users/log_in", UserController.login);

  app.post("/tests/create", TestController.createTest);
  app.post("/tests/testIMG", TestController.imgSaving);
  app.post(
    "/tests/toggleTestActiveState",
    TestController.toggleTestActiveState
  );
  app.get("/tests/getTest", TestController.getTestsByActiveParam);
  app.get("/tests/getTestByID", TestController.getTestByID);
  app.get("/tests/allTests", TestController.getAllTests);
  app.get("/tests/deleteTestByID", TestController.deleteTestByID);

  app.post("/imgSaving", TestController.saveIMG);
  app.post("/testimg", upload.single("image"), TestController.testFile);

  app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
  });

  //? Not sure whether sockets are gonna be useful
  // const io = require("socket.io")(4001);

  // io.on("connection", (socket) => {
  //   console.log("socket connected");
  //   socket.on("Pages update", (msg) => console.log(msg));
  //   socket.on("Test changed", (data: ITest) => console.log(data.ru));
  //   socket.on("disconnect", () => console.log("User disconnected"));
  // });
};

main();
