import { Request, Response } from "express";
import Email, { IEmail } from '../entities/email';

export const saveEmail = async (req: Request, res: Response) => {
    const newEmail = await Email.create<IEmail>({
        email: req.body.email,
        createdAt: new Date(),
        updatedAt: new Date()
    })
    res.status(200).send();
    console.log(newEmail);
}


export const getAllEmails = (_: Request, res: Response) => {
    const emails =  Email.find();
    res.send(emails);
}