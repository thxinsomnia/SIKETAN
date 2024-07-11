import express from "express";
import configurationMiddleware from "../config/middleware.js";
import supabase from "../config/supabase.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
configurationMiddleware(app);
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase.from("pangan").select("*");
    if (error) {
      return res.json(error.message);
    }

    return res.json(data);
  } catch (error) {
    return res.json(error);
  }
});










export default router;