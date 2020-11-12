import QnAPair from "../entities/QnAPair";
import Page from "../entities/page";
import Test from "../entities/Test";
import { Types } from "mongoose";
import { Request, Response } from "express";
import fs from "fs";

const regex = /^data:.+\/(.+);base64,(.*)$/;

export const createTest = async (
  req: Request,
  res: Response
): Promise<void> => {
  //console.log(req.body);

  // const { ru, lv, en } = req.body;

  const enPages = en.pages;
  //console.log(enPages);
  enPages.forEach((element: any) => {
    // console.log(element);
    console.log(typeof element);
  });
  res.send(req.body);
};

export const imgTest = (req: Request, res: Response) => {
  // if (!req.files || Object.keys(req.files).length === 0) {
  //   return res.status(400).send("No files were uploaded.");
  // }

  const matches = req.body[1].match(regex);
  let ext = matches[1];
  let data = matches[2];
  let buffer = Buffer.from(data, "base64");
  fs.writeFileSync("data." + ext, buffer);
  console.log(console.log(buffer));
  if (req.body) {
    req.body.forEach((file: string, index: number) => {
      let matches = file.match(regex);
      let ext = matches[1];
      let data = matches[2];
      let buffer = Buffer.from(data, "base64");
      fs.writeFileSync(`./uploads/img_${index}.` + ext, buffer);
      console.log(console.log(buffer));
    });
    res.send("Success" );
  }
};
