const express = require("express");

// internal imports
const User = require("../models/People");

const router = express.Router();

router.patch("/patch", async (req, res) => {
  const users = await User.updateMany({}, { isSalesMan: true });

  res.json(users);
});

// get user
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.json({ error: "no user found" });
  }
});

// add user signature
router.patch("/addSignature/:id", async (req, res) => {
  try {
    const stats = await User.updateOne(
      { _id: req.params.id },
      {
        signature: req?.body?.fileURL,
      }
    );

    res.json(stats);
  } catch (err) {
    res.json({ error: err });
  }
});

//add users
router.post("/", async (req, res) => {
  console.log(req.body);
  const userData = { ...req.body };
  const allUser = await User.find();
  console.log(allUser.length);

  if (allUser.length < 9) {
    userData.employeeId = "0" + (allUser.length + 1);
  } else {
    userData.employeeId = "" + (allUser.length + 1);
  }

  const newUser = new User(userData);
  const user = await User.findOne({ email: req.body.email });

  // save user or send error
  if (!user) {
    try {
      const result = await newUser.save();
      res.json(result);
    } catch (err) {
      res.status(500).json({
        errors: {
          common: {
            msg: "Unknown error occured!",
          },
        },
      });
    }
  } else {
    res.json(user);
  }
});

//get user by email
router.get("/:email", async (req, res) => {
  console.log(req.params.email);
  try {
    const user = await User.findOne({ email: req.params.email });
    res.json(user);
  } catch (err) {
    res.json({ error: "user not found" });
  }
});

//get user by id
router.get("userById/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    res.json(user);
  } catch (err) {
    res.json({ error: "user not found" });
  }
});

//update user
router.patch("/:id", async (req, res) => {
  console.log(req.params.id);
  const userId = req.params.id;
  const data = req.body;

  try {
    const stats = await User.updateOne(
      { _id: userId },
      {
        authorized: data?.authorized,
        emailVerified: data?.emailVerified,
      }
    );

    res.json(stats);
  } catch (err) {
    res.json({ error: err });
  }
});

router.patch("/permission/:id", async (req, res) => {
  console.log(req.params.id);
  const userId = req.params.id;
  const data = req.body;
  console.log(data);
  try {
    const stats = await User.updateOne(
      { _id: userId },
      {
        "authorized.windows.status": data?.isWindows,
        "authorized.mobile.status": data?.isMobile,
        isSuperAdmin: data?.isSuperAdmin,
        isAdmin: data?.isAdmin,
        isInspector: data?.isInspector,
        status: data?.status,
      }
    );
    console.log(stats);
    res.json(stats);
  } catch (err) {
    res.json({ error: err });
  }
});

// remove user
router.delete("/:id", async (req, res) => {
  try {
    const data = await User.findByIdAndDelete({
      _id: req.params.id,
    });
    res.send(data);
  } catch {
    res.send("Wrong parameter detected");
  }
});

module.exports = router;
