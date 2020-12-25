import { Document, model, Schema } from "mongoose";
// import { IPage, PageSchema } from "./Page";
// import QnAPair from "./QnAPair";

export interface IPageV2 {
  QnAPairs: [
    {
      question: string;
      answer: string;
    }
  ];
}
export interface ITest extends Document {
  ru: {
    name: string;
    mainQusetion: string;
    emailSender: Boolean;
    pages: Array<IPageV2>;
  };
  lv: {
    name: string;
    mainQusetion: string;
    emailSender: Boolean;
    pages: Array<IPageV2>;
  };
  en: {
    name: string;
    mainQusetion: string;
    emailSender: Boolean;
    pages: Array<IPageV2>;
  };
  pages: number;
  type: "TT" | "TP" | "PP" | "PT";
  active: boolean;
}

export const TestSchema = new Schema(
  {
    ru: {
      name: String,
      mainQuesiton: String,
      emailSender: Boolean,
      pages: [
        {
          QnAPairs: [
            {
              question: String,
              answer: String,
            },
          ],
        },
      ],
    },

    lv: {
      name: String,
      mainQuesiton: String,
      emailSender: Boolean,
      pages: [
        {
          QnAPairs: [
            {
              question: String,
              answer: String,
            },
          ],
        },
      ],
    },

    en: {
      name: String,
      mainQuesiton: String,
      emailSender: Boolean,
      pages: [
        {
          QnAPairs: [
            {
              question: String,
              answer: String,
            },
          ],
        },
      ],
    },
    type: String,
    pages: Number,
    active: Boolean,
  },
  { timestamps: true }
);

const Test = model<ITest>("Test", TestSchema);

export default Test;
