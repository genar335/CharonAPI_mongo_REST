import express from "express";
// import socket from "socket.io";
import multer from "multer";
import mongoose from "mongoose";
// import * as dotenv from "dotenv";
import * as UserController from "./resolvers/user-actions";
import * as TestController from "./resolvers/test-actions";
// import bodyParser from "body-parser";
// import session from "express-session";
import cors from "cors";
// import Test, { ITest } from "./entities/Test";
// import fileUpload from "express-fileupload";
// import Test from "./entities/Test";
// import fs from "fs";
import path from "path";

const mongoDBConnectionURI = 
`mongodb+srv://db_admin:INUTcbXenaioaF6F@cluster0.dgurj.mongodb.net/quiz_db?retryWrites=true&w=majority`


export const PORT = ((process.env.PORT as unknown) as number) || 4000;

export const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, `dist/public/uploads`),
    filename: (_req, file, cb) => cb(null, `${file.originalname}`),
  }),
});

const main = async () => {
  const app = express();
  try {
    mongoose.connect(/* process.env.DB_HOST */ mongoDBConnectionURI as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error(error);
  }
  mongoose.set(`debug`, true);

  app.use(express.json({ limit: `50mb` }));
  app.use(express.urlencoded({ limit: `50mb` }));
  app.use(
    cors({
      origin: `*`,
      // credentials: true,
    })
  );

  // app.use(fileUpload());
  app.use(express.static(path.join(__dirname, `public`)));

  //* Routes configuration
  // app.all('*', function(req,res){ res.send(200, req.originalUrl) });
    const host_url: string = '/api/quiz/';

  app.post(`${host_url}users/create`, UserController.createUser);
  // app.post(`${host_url}users/log_in`, UserController.login);
  app.get(`${host_url}users/login`, ((req: express.Request, res: express.Response) => res.send(req.originalUrl)))

  app.post(`${host_url}create`, TestController.createTest);
  app.post(`${host_url}testIMG`, TestController.imgSaving);
  app.post(
    `${host_url}toggleTestActiveState`,
    TestController.toggleTestActiveState
  );
  app.get(`${host_url}getTest`, TestController.getTestsByActiveParam);
  app.get(`${host_url}getTestByID`, TestController.getTestByID);
  app.get(`${host_url}allTests`, TestController.getAllTests);
  app.get(`${host_url}deleteTestByID`, TestController.deleteTestByID);

  // app.post(`/imgSaving`, TestController.saveIMG);
  app.post(`${host_url}testimg`, upload.single(`image`), TestController.testFile);

  // app.get(`${host_url}`, TestController.getAllTests /* (_, res) => res.send('Hello there!') */)
  app.get(`${host_url}`, ((req: express.Request, res: express.Response) => res.json(req)))

  app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
  })

  app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
  });


};

main();
