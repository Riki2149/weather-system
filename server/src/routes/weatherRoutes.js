import { Router } from "express";
import getWeatherData from "../Controllers/weatherController.js"


const router = Router();
router.get("/:place", getWeatherData)

export default router;