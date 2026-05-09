import { Currency } from "./currency.ts";

export type RiskTolerance = "low" | "medium" | "high";

export interface PortfolioRef {
  id: string;
  name: string;
}

export interface Investor {
  id: string;
  fullName: string;
  age: number;
  job: string;
  riskTolerance: RiskTolerance;
  horizonYears: number;
  income: Currency;
  netWorth: Currency;
  memberSince: number;
  blurb?: string;
  portfolios: Array<PortfolioRef>;
}
