import QnAPair from "../entities/QnAPair";
import Page from "../entities/page";
import Test from "../entities/Test";
import { Types } from "mongoose";
import { Request, Response } from "express";

export const createTest = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log(req.body);

  const newTest = new Test({
    _id: new Types.ObjectId(),
    ru: [
      {
        name: req.body.ru.name,
      },
    ],
    lv: [
      {
        name: req.body.lv.name,
      },
    ],
    en: [
      {
        name: req.body.lv.name,
      },
    ],
  });

  console.log(newTest);

  res.send(newTest);
};
