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
import fs from "fs";
import morgan from "morgan";

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

  let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
  app.use(morgan('dev', { stream: accessLogStream }))

  console.log(__dirname);

  app.use(express.json({ limit: `50mb` }));
  app.use(express.urlencoded({ limit: `50mb` }));
  app.use(cors({
    origin: 'https://vigilant-torvalds-39724e.netlify.app',
    
  }))
  // app.use(function(req, res, next) {
  //   res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  //   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //   next();
  // });

  // app.use(fileUpload());
  app.use(express.static(path.join(__dirname, `public`)));

  //* Routes configuration
  // app.all('*', function(req,res){ res.send(200, req.originalUrl) });
    const host_url: string = '/api/quiz/';

  app.post(`${host_url}users/create`, UserController.createUser);
  // app.post(`${host_url}users/log_in`, UserController.login);
  app.get(`${host_url}users/login`, ((req: express.Request, res: express.Response) => res.send(req.originalUrl)))

  app.post(`${host_url}tests/create`, TestController.createTest);
  app.post(`${host_url}tests/testIMG`, TestController.imgSaving);
  app.post(
    `${host_url}tests/toggleTestActiveState`,
    TestController.toggleTestActiveState
  );
  app.get(`${host_url}tests/getTest`, TestController.getTestsByActiveParam);
  app.get(`${host_url}tests/getTestByID`, TestController.getTestByID);
  app.get(`${host_url}tests/allTests`, TestController.getAllTests);
  app.get(`${host_url}tests/deleteTestByID`, TestController.deleteTestByID);

  // app.post(`/imgSaving`, TestController.saveIMG);
  app.post(`${host_url}tests/testimg`, upload.single(`image`), TestController.testFile);

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
