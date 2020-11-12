import Test, { ITest } from "../entities/Test";

import { Request, Response } from "express";
import fs from "fs";
import { PORT } from "../server";

export const createTest = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log(req.body);
  try {
    const test = await Test.create<ITest>(req.body);
    const tmpTest = await Test.create({
      ru: {
        name: "123",
        pages: [],
        emailSender: false,
        mainQusetion: "?",
      },
      lv: {
        name: "456",
        pages: [
          {
            QnAPairs: [
              {
                question: "lvq",
                answer: "lva",
              },
              {
                question: "lvq1",
                answer: "lva1",
              },
            ],
          },
        ],
        emailSender: false,
        mainQusetion: "??",
      },
      en: {
        name: "789",
        pages: [],
        emailSender: false,
        mainQusetion: "???",
      },
    });
    console.log(tmpTest);
    console.log(test);
  } catch (error) {
    console.log(error);
  }
  res.send("Recieved a test!");
};

export const imgSaving = (req: Request, res: Response) => {
  // if (!req.files || Object.keys(req.files).length === 0) {
  //   return res.status(400).send("No files were uploaded.");
  // }
  // const regex = /^data:.+\/(.+);base64,(.*)$/;
  console.log("recieved the img");
  if (req.body) {
    let imgsLocation: string[] = [];
    req.body.forEach((file: string, index: number) => {
      console.log("hello from the loop");
      console.log(file.length);
      console.log(file.slice(file.indexOf("/") + 1, file.indexOf(";")));
      let ext = file.slice(file.indexOf("/") + 1, file.indexOf(";"));
      let data = file.split(",")[1];
      let buffer = Buffer.from(data, "base64");
      console.log("starting to read the file");
      fs.writeFileSync(`dist/uploads/img_${index}.${ext}`, buffer);
      console.log(buffer);
      imgsLocation.push(`http://localhost:${PORT}/uploads/img_${index}.` + ext);
    });
    console.log("Done parsing the images");
    res.send(imgsLocation);
  }
  console.log("finish");
};
