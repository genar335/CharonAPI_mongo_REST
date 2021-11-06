import { Request, Response } from "express";
import Email, { IEmail } from "../entities/email";

export const saveEmail = async (req: Request, res: Response) => {
  const email = req.body;
  try {
    const newEmail = await Email.create<IEmail>({
      email: req.body.email,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log(email);
    console.log(newEmail);
    res.status(200).send();
  } catch (error) {
    res.send(error);
  }
};

export const getAllEmails = async (_: Request, res: Response) => {
  const emails = await Email.find();
  //   console.log(emails);
  res.send(emails);
};
