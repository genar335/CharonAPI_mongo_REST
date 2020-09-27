// import User from "../entities/user";
import { Request, Response } from "express";
import User, { IUser } from "../entities/user";
import bcrypt from "bcrypt";

type User = {
  name: string;
  password: string;
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log(req.body);
  const uPasswordHashed = await bcrypt.hash(req.body.password, 10);

  const newUser = await User.create<User>({
    name: req.body.name,
    password: uPasswordHashed,
  });

  console.log(newUser);
  res.send(newUser);
};

export const login = async (req: Request, res: Response): Promise<void> => {
  console.log(req.session!.userID);
  const user = User.findOne(
    {
      name: req.body.name,
    },
    async (err: any, result: IUser) => {
      if (err) {
        res.send(err);
      } else {
        const match = await bcrypt.compare(req.body.password, result.password);
        if (match) {
          console.log("Yaaay!");
          req.session!.userID = result.id;
          res.send("Correct");
        } else {
          res.send("Incorrect password");
        }
      }
    }
  );
  console.log(user);
};
