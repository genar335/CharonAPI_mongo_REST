import { Document, model, Schema, Types } from "mongoose";
import { IPage } from "./Page";

export interface ITest extends Document {
  ru: [
    {
      name: string;
      mainQusetion: string;
      emailSender: Boolean;
      pages: Array<IPage>;
    }
  ];
  lv: [
    {
      name: string;
      mainQusetion: string;
      emailSender: Boolean;
      pages: Array<IPage>;
    }
  ];
  en: [
    {
      name: string;
      mainQusetion: string;
      emailSender: Boolean;
      pages: Array<IPage>;
    }
  ];
}

export const TestSchema = new Schema({
  ru: [
    {
      name: String,
      mainQuesiton: String,
      emailSender: Boolean,
      pages: [
        {
          type: Types.ObjectId,
          ref: "Page",
        },
      ],
    },
  ],
  lv: [
    {
      name: String,
      mainQuesiton: String,
      emailSender: Boolean,
      pages: [
        {
          type: Types.ObjectId,
          ref: "Page",
        },
      ],
    },
  ],
  en: [
    {
      name: String,
      mainQuesiton: String,
      emailSender: Boolean,
      pages: [
        {
          type: Types.ObjectId,
          ref: "Page",
        },
      ],
    },
  ],
});

const Test = model<ITest>("Test", TestSchema);

export default Test;
