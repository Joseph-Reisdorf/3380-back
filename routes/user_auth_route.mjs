import express from "express";
import { userAuthMiddleware }from "../controllers/userAuthMiddleware.mjs";

const router = express.Router();

router.get("/", userAuthMiddleware, (req, res) => {
    res.json({ auth: true, message: "You are authenticated", userId: req.userId });
});

export default router;