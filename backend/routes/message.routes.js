import express from "express";
import { downvoteMessage, getMessages, sendMessage, upvoteMessage } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);
router.post("/upvote/:id", protectRoute, upvoteMessage);
router.post("/downvote/:id", protectRoute, downvoteMessage);

export default router;