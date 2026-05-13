import { Investor } from "../models/index.ts";
declare function index(): Promise<Investor[]>;
declare function get(id: string): Promise<Investor | undefined>;
declare function create(json: Investor): Promise<Investor>;
declare function update(id: string, investor: Investor): Promise<Investor | undefined>;
declare function remove(id: string): Promise<void>;
declare const _default: {
    index: typeof index;
    get: typeof get;
    create: typeof create;
    update: typeof update;
    remove: typeof remove;
};
export default _default;
