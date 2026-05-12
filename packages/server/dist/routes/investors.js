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
export default router;
