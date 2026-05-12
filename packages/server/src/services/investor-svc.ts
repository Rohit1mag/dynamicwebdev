import { Schema, model } from "mongoose";
import { Investor } from "../models/index.ts";

const investorSchema = new Schema<Investor>(
  {
    id: { type: String, required: true, trim: true },
    fullName: { type: String, required: true, trim: true },
    age: { type: Number, required: true },
    job: { type: String, required: true, trim: true },
    riskTolerance: {
      type: String,
      enum: ["low", "medium", "high"],
      required: true
    },
    horizonYears: { type: Number, required: true },
    income: {
      amount: { type: Number, required: true },
      currency: { type: String, required: true }
    },
    netWorth: {
      amount: { type: Number, required: true },
      currency: { type: String, required: true }
    },
    memberSince: { type: Number, required: true },
    blurb: { type: String },
    portfolios: [
      {
        id: { type: String, required: true },
        name: { type: String, required: true }
      }
    ]
  },
  { collection: "investors" }
);

const InvestorModel = model<Investor>("Investor", investorSchema);

function index(): Promise<Investor[]> {
  return InvestorModel.find();
}

function get(id: string): Promise<Investor | undefined> {
  return InvestorModel.findOne({ id }).then((doc) => doc ?? undefined);
}

export default { index, get };
