import express from "express";
import { db } from "./dbConnections.js";

const router = express.Router();


router.post("/mypage/save", async (req, res) => {
  const { userId, images, textBoxes } = req.body;

  try {
    await db.query(
      `UPDATE users
       SET mypage_images = $1,
           mypage_text   = $2
       WHERE id = $3`,
      [JSON.stringify(images), JSON.stringify(textBoxes), userId]
    );

    res.json({ message: "MyPage saved successfully" });
  } catch (err) {
    console.error("Error saving MyPage:", err);
    res.status(500).json({ error: "Failed to save MyPage" });
  }
});

router.get("/mypage/:userId", async (req, res) => {
  const { userId } = req.params;

  if (!userId) return res.status(400).json({ error: "User ID required" });

  try {
    const result = await db.query(
      "SELECT mypage_images, mypage_text FROM users WHERE id = $1",
      [userId]
    );

    if (!result.rows.length) {
      return res.json({ images: [], textBoxes: [] });
    }

    
    const images = result.rows[0].mypage_images || [];
    const textBoxes = result.rows[0].mypage_text || [];

    res.json({ images, textBoxes });
  } catch (err) {
    console.error("Error loading MyPage:", err);
    res.status(500).json({ error: "Failed to load MyPage" });
  }
});

export default router;
