import express from "express";
import configurationMiddleware from "../config/middleware.js";
import supabase from "../config/supabase.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const app = express();
configurationMiddleware(app);
const router = express.Router();


router.post("/registration", async (req, res) => {
  try {
    const { username, password, namapengguna} = req.body;
    const saltRound = 10;
    const hash = await bcrypt.hash(password, saltRound);

    const { data, error } = await supabase
      .from("users")
      .insert({ username: username, password: hash, namapengguna: namapengguna})
      .select("*");

    if (error) {
        return res.json(error.message);
    }
    

    return res.json({ message: "Registration successfully!", data });
  } catch (error) {
    return res.json(error);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .or(`username.eq.${username}`, `password.eq.${password}`);
    if (error) {
        return res.json({ error: error.message })}
      if (data.length > 0) {
        bcrypt.compare(password, data[0].password, (error, response) => {
          if (error) {
            return res.json({ error: error.message });
          }
  
          if (response) {
            const user = data[0];


  
  
            return res.json({
              message: `Welcome to SIKETAN, ${user.username}`,
              dataUser: user,
            });
          } else {
            return res.json({
              message: "Wrong username/email or password combination!",
            });
          }
        });
      } else {
        return res.json({ loggedIn: false, message: "User doesn't exist" });
      }
    } catch (error) {
    return res.json({ error: error.message });
  }
});

export default router;