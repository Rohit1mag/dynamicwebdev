import { Investor } from "../models/index.ts";

const investors: { [key: string]: Investor } = {
  rohit: {
    id: "rohit",
    fullName: "Rohit Kota",
    age: 38,
    job: "Software Engineer",
    riskTolerance: "high",
    horizonYears: 15,
    income: { amount: 145000, currency: "USD" },
    netWorth: { amount: 520000, currency: "USD" },
    memberSince: 2015,
    blurb: "growth investor, long time horizon",
    portfolios: [
      { id: "growth", name: "Aggressive Growth Portfolio" }
    ]
  },
  akhil: {
    id: "akhil",
    fullName: "Akhil Rao",
    age: 61,
    job: "Retired Accountant",
    riskTolerance: "low",
    horizonYears: 5,
    income: { amount: 62000, currency: "USD" },
    netWorth: { amount: 1200000, currency: "USD" },
    memberSince: 2008,
    blurb: "conservative, wants income, almost retired",
    portfolios: [
      { id: "income", name: "Conservative Income Portfolio" }
    ]
  }
};

function get(id: string): Investor | undefined {
  return investors[id];
}

function index(): Array<Investor> {
  return Object.values(investors);
}

export default { get, index };
