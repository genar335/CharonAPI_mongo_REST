import express from "express";
import socket from "socket.io";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import * as UserController from "./resolvers/user-actions";
import * as TestController from "./resolvers/test-actions";
import bodyParser from "body-parser";
import session from "express-session";
import redis from "redis";
import connectRedis from "connect-redis";
import cors from "cors";
import Test, { ITest } from "./entities/Test";
import fileUpload from "express-fileupload";

dotenv.config({
  //   path: "../.env",
});
const PORT = 4000;

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

  app.use(fileUpload());

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
  app.get("/", (res: express.Response) => {
    res.send("Hello there; General Kenobi🦾");
  });
  app.post("/users/create", UserController.createUser);
  app.post("/users/log_in", UserController.login);

  app.post("/tests/create", TestController.createTest);
  app.post("/tests/testIMG", TestController.imgSaving);

  const server = app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
  });

  const io = socket(server);

  // io.on("connection", (socket) => {
  //   console.log("socket connected");
  //   socket.on("Pages update", (msg) => console.log(msg));
  //   socket.on("Test changed", (data: ITest) => console.log(data.ru));
  //   socket.on("disconnect", () => console.log("User disconnected"));
  // });
};

main();
