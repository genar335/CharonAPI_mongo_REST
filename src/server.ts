import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config({
  //   path: "../.env",
});
const PORT = 4000;

const app = express();

const main = async () => {
  try {
    mongoose.connect(process.env.DB_HOST as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error(error);
  }

  //* Routes configuration
  app.get("/", (res: express.Response) => {
    res.send("Hello there, general Kenobi🦾");
  });

  app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
  });
};

main();
