import express from "express";
import Investors from "../services/investor-svc.js";
const router = express.Router();
router.get("/", (_req, res) => {
    Investors.index()
        .then((list) => res.json({ count: list.length, data: list }))
        .catch((err) => res.status(500).send(err));
});
router.get("/:id", (req, res) => {
    const id = String(req.params.id);
    Investors.get(id)
        .then((investor) => {
        if (!investor)
            res.status(404).send();
        else
            res.json(investor);
    })
        .catch((err) => res.status(500).send(err));
});
router.post("/", (req, res) => {
    const newInvestor = req.body;
    Investors.create(newInvestor)
        .then((investor) => res.status(201).json(investor))
        .catch((err) => res.status(500).send(err));
});
router.put("/:id", (req, res) => {
    const id = String(req.params.id);
    const newInvestor = req.body;
    Investors.update(id, newInvestor)
        .then((investor) => res.json(investor))
        .catch((err) => res.status(404).end());
});
router.delete("/:id", (req, res) => {
    const id = String(req.params.id);
    Investors.remove(id)
        .then(() => res.status(204).end())
        .catch((err) => res.status(404).send(err));
});
export default router;
