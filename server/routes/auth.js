const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { EcommerceAuth } = require("../models/product");

const JWT_SECRET = process.env.JWT_SECRET;

router.post("/register", async (req, res) => {
  const { userType, uname, email, password } = req.body;
  const encryptedpassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await EcommerceAuth.findOne({
      email,
    });
    if (oldUser) {
      return res.json({ error: "user exists!" });
    }
    if (uname !== "" && email !== "" && password !== "") {
      await EcommerceAuth.create({
        userType,
        uname,
        email,
        password: encryptedpassword,
      });
      console.log(req.body);
      res.send({ status: "ok", data: req.body });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await EcommerceAuth.findOne({
      email,
    });
    if (!user) {
      return res.json({ error: "User not Exists" });
    }
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ email: user.email }, JWT_SECRET, {
        expiresIn: "24h",
      });

      return res
        .status(201)
        .send({ status: "ok", useremail: user.email, data: token });
    }
    res.json({ status: "error", error: "Invalid Password" });
  } catch (error) {
    console.log(error);
  }
});

router.post("/userData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET, (err, res) => {
      if (err) {
        return "token expired";
      }
      return res;
    });
    console.log("User", user);
    if (user == "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }
    await EcommerceAuth.findOne({ email: user.email }).then((data) => {
      res.send({ status: "ok", data: data });
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const allDatas = await EcommerceAuth.find({});

    res.json({ status: "ok", data: allDatas });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params._id;
    const allDatas = await EcommerceAuth.find({});
    const temp = [...allDatas];
    const prevValue = temp.find((i) => i._id === id);
    const newValue = req.body;
    const db = await EcommerceAuth.deleteOne(prevValue, newValue);
    res.json({ status: "deleted" });
  } catch (error) {
    console.log(error);
    res.send(500).send(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params._id;
    const allDatas = await EcommerceAuth.find({});
    const temp = [...allDatas];
    const prevValue = temp.find((i) => i._id === id);
    const newValue = req.body;
    const db = await EcommerceAuth.updateOne(prevValue, newValue);
    res.json({ status: "updated", data: req.body });
  } catch (error) {
    console.log(error);
    res.send(500).send(error);
  }
});
module.exports = router;
