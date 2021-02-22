import Test, { IPageV2, ITest } from "../entities/Test";

import { Request, Response } from "express";
import fs from "fs";
import { PORT } from "../server";

export const createTest = async (
  req: Request,
  res: Response
): Promise<void> => {
  // console.log(req.body);
  const arrivedData: ITest = req.body;
  if (!arrivedData._id) {
    try {
      if (arrivedData.type !== "TT") {
        for (let property in arrivedData) {
          // console.log(
          //   arrivedData[
          //     property as "ru" | "lv" | "en" | "pages" | "type" | "active"
          //   ]
          // );
          if (property === "ru" || property === "lv" || property === "en") {
            // console.log(property, "What a prop?");
            arrivedData[property as "ru" | "lv" | "en"].pages.forEach(
              (page: IPageV2, pageIndex) => {
                // console.log(page, "Hey a first loop");
                page.QnAPairs.forEach(
                  (qORa: { question: string; answer: string }, index) => {
                    // console.log(qORa, "Hello there");
                    if (/data:image/.test(qORa.question)) {
                      // console.log(qORa.question, "After regex match");
                      dataURICoversion(qORa, "question", index, pageIndex);
                    } else if (/data:image/.test(qORa.answer)) {
                      dataURICoversion(qORa, "answer", index, pageIndex);
                    }
                  }
                );
              }
            );
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
    try {
      const test = await Test.create<ITest>(arrivedData);

      res.send(test);
      // console.log(test);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  } else {
    Test.updateOne(
      {
        _id: req.body._id,
      },
      req.body,
      (err: any, result: any) => {
        if (err) {
          res.send(err);
        }
        res.send(result);
      }
    );
    // res.send("Duplicate test");
  }
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

export const saveIMG = (req: Request, res: Response) => {
  console.log(req.body);
  if (req.body) {
    const {
      fileName,
      fileContents,
    }: { fileName: string; fileContents: string } = req.body;
    console.log(fileName, "fName");
    let data = fileContents.split(",")[1];
    let buffer = Buffer.from(data, "base64");
    fs.writeFileSync(`dist/uploads/${fileName}`, buffer);
    res.send(`http://localhost:${PORT}/uploads/${fileName}`);
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

export const getAllTests = (_req: Request, res: Response) => {
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
function dataURICoversion(
  qORa: { question: string; answer: string },
  whatToChange: "question" | "answer",
  index: number,
  pageIndex: number
) {
  let tmp = qORa[whatToChange];
  let ext = tmp.slice(tmp.indexOf("/") + 1, tmp.indexOf(";"));
  if (ext.indexOf("+") !== -1) {
    console.log("Found a plus", ext);
    ext = ext.slice(0, ext.indexOf("+"));
  }
  let data = tmp.split(",")[1];
  let buffer = Buffer.from(data, "base64");
  console.log(buffer);
  fs.writeFileSync(
    `dist/uploads/img_question_pair-${index}_page-${pageIndex}.${ext}`,
    buffer
  );
  qORa[
    whatToChange
  ] = `http://localhost:${PORT}/uploads/img_question_pair-${index}_page-${pageIndex}.${ext}`;
}

export const testFile = (req: Request, res: Response, _: any) => {
  console.log(req.body);
  console.log(req.file.originalname);

  res.send(`http://192.168.8.100:${PORT}/uploads/${req.file.originalname}`);
};
