import { Investor } from "../models/index.ts";
declare function index(): Promise<Investor[]>;
declare function get(id: string): Promise<Investor | undefined>;
declare const _default: {
    index: typeof index;
    get: typeof get;
};
export default _default;
