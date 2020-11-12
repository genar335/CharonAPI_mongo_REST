import QnAPair, { IQnAPair, QnAPairSchema } from "../entities/QnAPair";
import Page from "../entities/page";
import Test, { ITest } from "../entities/Test";
import { Types } from "mongoose";
import { Request, Response } from "express";
import fs from "fs";

const regex = /^data:.+\/(.+);base64,(.*)$/;

export const createTest = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log(req.body);
  try {
    const test = await Test.create<ITest>(req.body);
    const tmp = await QnAPair.create({
      answer: "123",
      question: "qq",
    });
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
  } catch (error) {
    console.log(error);
  }
  res.send("Recieved a test!");
};

export const imgSaving = (req: Request, res: Response) => {
  // if (!req.files || Object.keys(req.files).length === 0) {
  //   return res.status(400).send("No files were uploaded.");
  // }

  if (req.body) {
    req.body.forEach((file: string, index: number) => {
      let matches = file.match(regex);
      let ext = matches![1];
      let data = matches![2];
      let buffer = Buffer.from(data, "base64");
      fs.writeFileSync(`./uploads/img_${index}.` + ext, buffer);
      console.log(console.log(buffer));
    });
    console.log("Done parsing the images");
    res.send("Success, images have been saved");
  }
};
