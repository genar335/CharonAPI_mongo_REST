import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import * as UserController from "./resolvers/user-actions";
import bodyParser from "body-parser";
import session from "express-session";
import redis from "redis";
import connectRedis from "connect-redis";
import cors from "cors";

dotenv.config({
  //   path: "../.env",
});
const PORT = 4000;

const main = async () => {
  const app = express();
  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient();
  app.use(bodyParser.json());
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  app.use(
    session({
      name: "qid",
      store: new RedisStore({
        client: redisClient,
        disableTouch: true,
        disableTTL: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365,
        httpOnly: true,
        secure: true,
        sameSite: "lax",
      },
      secret: "fhjdskalfhdsjklafhfhguirjewhjkgwjkf",
      resave: false,
      saveUninitialized: false,
    })
  );
  try {
    mongoose.connect(process.env.DB_HOST as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error(error);
  }
  mongoose.set("debug", true);

  //* Routes configuration
  app.get("/", (res: express.Response) => {
    res.send("Hello there, general Kenobi🦾");
  });
  app.post("/users/create", UserController.createUser);
  app.post("/users/log_in", UserController.login);

  app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
  });
};

main();
