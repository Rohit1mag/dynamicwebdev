import express, { Request, Response } from "express";
import Investors from "./services/investor-svc.ts";

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use(express.static(staticDir));
app.use(express.json());

app.get("/hello", (_req: Request, res: Response) => {
  res.send("Hello, World");
});

app.get("/api/investors", (_req: Request, res: Response) => {
  res.send(Investors.index());
});

app.get("/api/investors/:id", (req: Request, res: Response) => {
  const id = String(req.params.id);
  const data = Investors.get(id);
  if (data) res.send(data);
  else res.status(404).send();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
