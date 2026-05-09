export type CurrencyCode = "USD" | "EUR" | "GBP" | "JPY" | "INR";

export interface Currency {
  amount: number;
  currency: CurrencyCode;
}
