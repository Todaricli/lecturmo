import express from 'express';

const router = express.Router();

router.get("/", async (req, res) => {
  console.log("request.session:", req.session);
  console.log("request.session.id:", req.session.id);
  req.session.visited = true;
  res.cookie("hello", "world", { maxAge: 30000, signed: true });
  res.status(201).send({ msg: "hello" });
});


export default router;