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

    console.log(test);
  } catch (error) {
    console.log(error);
  }
  res.send("Recieved a test!");
};

export const getTestsByActiveParam = async (req: Request, res: Response) => {
  console.log(req.query);
  if (req.query.active) {
    Test.find(
      {
        active: (req.query.active as unknown) as boolean,
      },
      (err: any, result: ITest[]) => {
        if (err) {
          res.send(`Error has occured: err`);
        } else {
          res.send(result);
        }
      }
    );
  }
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

export const getAllTests = (req: Request, res: Response) => {
  Test.find((err: any, result: ITest[]): void => {
    if (err) {
      res.send(err);
    } else {
      console.log("success");
      res.send(result);
    }
  });
};

export const toggleTestActiveState = async (req: Request, res: Response) => {
  const { testID, isActive } = req.body;
  console.log(testID, isActive);
  const changedTest = await Test.findOneAndUpdate(
    { _id: testID },
    {
      active: isActive,
    },
    { new: true }
  );
  console.log(changedTest);
  res.send(changedTest);
};

export const getTestByID = async (req: Request, res: Response) => {
  console.log(req.query, "hello");
  if (req.query.testToEdit !== undefined) {
    try {
      const testToEditFromDB = await Test.findById(req.query.testToEdit);
      console.log(testToEditFromDB);
      res.send(testToEditFromDB);
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(400).send("Sorry, no correct ID was supplied");
  }
};

export const deleteTestByID = async (req: Request, res: Response) => {
  if (req.query.testToDelete) {
    try {
      const deletedTest = await Test.findByIdAndDelete(req.query.testToDelete);
      res.send(deletedTest);
    } catch (error) {
      console.log(error);
      res.send("Error has occured");
    }
  }
};
