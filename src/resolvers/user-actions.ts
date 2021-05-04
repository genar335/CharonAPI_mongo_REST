// import User from "../entities/user";
import { Request, Response } from "express";
import User, { IUser } from "../entities/user";
import bcrypt from "bcrypt";

type User = {
  name: string;
  password: string;
};

/**
 * Creates a new user.
 * @param req incoming request from the TMS.
 * @param res - info regarding the operation state.
 */
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

/**
 * Logs the user in and checks whether the user has logged in before, as well as sets a cookie.
 * @param req - incoming request from the TMS.
 * @param res - info regarding the operation state.
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  //* Checking whether the user has already logged in
  // if (req.session!.userID) {
    // res.send("Already logged in!");
  // } else {
    const { name, password } = req.body;
    res.send("Hello")
    // if ((name || password) < 0) {
    //   res.send("Error");
    // }
    // //* Finding user
    // const user: IUser | null = await User.findOne({ name: name });
    // if (user !== null) {
    //   if (await bcrypt.compare(password, user.password)) {
    //     //* Setting a cookei with the user id
    //     req.session!.userID = user._id;
    //     // res.send(user);
    //     res.cookie('user', `${user.name}`, { maxAge: 15778476000 }).send("Logged in!")
    //   } else {
    //     res.send("Wrong password");
    //   }
    // } else {
    //   res.send("Wrong username");
    // }
  // }
};
