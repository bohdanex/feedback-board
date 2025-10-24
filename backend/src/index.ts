import "dotenv/config";
import express, { Application, Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { Review } from "./entity/Review";

const app: Application = express();
const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Express with TypeScript!");
});

AppDataSource.initialize().then(async (source) => {
  console.log("✅ Database connected!");

  app.get("/reviews", async (_req: Request, res: Response) => {
    const reviewEntity = source.getRepository(Review);
    const reviews = await reviewEntity.find();

    res.json(reviews);
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
