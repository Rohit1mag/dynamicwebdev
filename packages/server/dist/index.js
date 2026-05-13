import express from "express";
import { connect } from "./services/mongo.js";
import investors from "./routes/investors.js";
import auth, { authenticateUser } from "./routes/auth.js";
connect("investing");
const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";
app.use(express.static(staticDir));
app.use(express.json());
app.use("/auth", auth);
app.use("/api/investors", authenticateUser, investors);
app.get("/hello", (_req, res) => {
    res.send("Hello, World");
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
