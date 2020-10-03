import QnAPair from "../entities/QnAPair";
import Page from "../entities/page";
import Test from "../entities/Test";
import { Types } from "mongoose";
import { Request, Response } from "express";

export const createTest = async (
  req: Request,
  res: Response
): Promise<void> => {
  //console.log(req.body);

  const { ru, lv, en } = req.body;

  const enPages = en.pages;
  //console.log(enPages);
  enPages.forEach((element: any) => {
    // console.log(element);
    console.log(typeof element);
  });
  res.send(req.body);
};
