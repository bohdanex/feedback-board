import "dotenv/config";
import express, { Application, Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { Review } from "./entity/Review";
import cors from "cors";

const app: Application = express();
const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;
app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello from Express with TypeScript!");
});

AppDataSource.initialize().then(async (dataSource) => {
  console.log("✅ Database connected!");

  app.get("/reviews", async (_req: Request, res: Response) => {
    const reviewsRepo = dataSource.getRepository(Review);
    const reviews = await reviewsRepo.find();

    res.json(reviews);
  });

  app.post("/reviews", async (req: Request, res: Response) => {
    const reviewsRepo = dataSource.getRepository(Review);
    const createResult = reviewsRepo.create(req.body as {});
    const saveResult = await reviewsRepo.save(createResult);

    res
      .status(201)
      .send(`The review has been added with the id ${saveResult.id}`);
  });

  app.delete("/reviews/:id", async (req: Request, res: Response) => {
    if (req.params.id === undefined || req.params.id === null) {
      res.status(400).send("the id parameter is required");
      return;
    }

    const reviewsRepo = dataSource.getRepository(Review);
    await reviewsRepo.delete(req.params.id);

    res.send(`Review with the id ${req.params.id} has been deleted`);
  });

  app.delete("/reviews-all", async (_req: Request, res: Response) => {
    const reviewsRepo = dataSource.getRepository(Review);
    const deleteResult = await reviewsRepo.deleteAll();
    res.send("Affected " + deleteResult.affected);
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
