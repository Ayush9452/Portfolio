import express from "express";
import { deleteMessage, getAllMessage, sendMessage } from "../controller/messageControler.js";

const router = express.Router();

router.post("/send",sendMessage)
router.get("/getall",getAllMessage)
router.delete("/delete:id",deleteMessage)

export default router;