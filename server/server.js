import express from "express";
import cors from "cors";
import { config } from "dotenv";
import weatherRoutes from "./src/routes/weatherRoutes.js";

config();

const app = express();
app.use(cors());

// Routing to server
app.use("/api/weather", weatherRoutes);

let port = process.env.PORT;
app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
});
