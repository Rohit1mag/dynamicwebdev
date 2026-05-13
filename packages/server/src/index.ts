import express, { Request, Response } from "express";
import { connect } from "./services/mongo.ts";
import investors from "./routes/investors.ts";
import auth, { authenticateUser } from "./routes/auth.ts";

connect("investing");

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use(express.static(staticDir));
app.use(express.json());

app.use("/auth", auth);
app.use("/api/investors", authenticateUser, investors);

app.get("/hello", (_req: Request, res: Response) => {
  res.send("Hello, World");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
