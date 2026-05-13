import { Schema, model } from "mongoose";
const investorSchema = new Schema({
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
}, { collection: "investors" });
const InvestorModel = model("Investor", investorSchema);
function index() {
    return InvestorModel.find();
}
function get(id) {
    return InvestorModel.findOne({ id }).then((doc) => doc ?? undefined);
}
function create(json) {
    const t = new InvestorModel(json);
    return t.save();
}
function update(id, investor) {
    return InvestorModel.findOneAndUpdate({ id: id }, investor, {
        new: true
    }).then((updated) => {
        if (!updated)
            throw `${id} not updated`;
        else
            return updated;
    });
}
function remove(id) {
    return InvestorModel.findOneAndDelete({ id: id }).then((deleted) => {
        if (!deleted)
            throw `${id} not deleted`;
    });
}
export default { index, get, create, update, remove };
