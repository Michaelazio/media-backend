import express from "express";
import { mongo } from "./mongo.js";
import cors from "cors"
import adSubmitRoute from "./adSubmitRoute.js";
import bidRoute from "./bidRoute.js";
import getServedAddRoute from "./getServedAddRoute.js";
import vmap from "./vmap.js";

const app = express();
const PORT = 3001;
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT,PATCH,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  })
);

app.post("/submit-bid", adSubmitRoute);
app.get("/bid", bidRoute);
app.get("/serve-ad/:id", getServedAddRoute);
app.get('/vmap', vmap)

Promise.all([mongo()]).then(() =>
  app.listen(PORT, () => console.log(`The Server is running on ${PORT}`))
);
