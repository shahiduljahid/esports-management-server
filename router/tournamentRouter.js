const express = require("express");
const Tournament = require("../models/Tournament");

const router = express.Router();

//get AllTournament
router.get("/", async (req, res) => {
  try {
    const docs = await Tournament.find();
    res.json(docs);
  } catch {
    res.json({ error: "unknown error" });
  }
});

//get User Tournament by userId
router.get("/singleUserTournament/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const docs = await Tournament.find({ creator: userId });
    res.json(docs);
  } catch {
    res.json({ error: "unknown error" });
  }
});

//get Tournament by Tournament id
router.get("/TournamentById/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const docs = await Tournament.findOne({ _id: req.params.id });
    console.log(docs);
    res.json(docs);
  } catch (err) {
    res.json({ error: "Tournament not found" });
  }
});

//add Tournament
router.post("/", async (req, res) => {
  try {
    const newData = new Tournament(req.body);
    const result = await newData.save();

    if (result) {
      const doc = await Tournament.find({});
      res.json(doc);
    }
  } catch (error) {
    res.json({ err: "unknown error" });
  }
});

//update Tournament details by id

router.patch("/TournamentDetails/:id", async (req, res) => {
  const userId = req.params.id;
  const body = req.body;

  try {
    const stats = await Tournament.updateOne(
      { _id: userId },
      {
        tourFormat: body.tourFormat,
        orgLogo: body.orgLogo,
        tourLogo: body.tourLogo,
        tournament_Title: body.tournament_Title,
        org_Name: body.org_Name,
        creator: body.creator,
        roadMap: body.roadMap,
        teams: body.teams,
      }
    );

    if (stats) {
      const docs = await Tournament.find();
      res.json(docs);
    }
  } catch (err) {
    res.json({ error: err });
  }
});

router.post("/deleteTournament", async (req, res) => {
  const ids = req.body;
  try {
    const result = await Tournament.deleteMany({ _id: { $in: ids } });
    if (result) {
      const documents = await Tournament.find();
      res.json(documents);
    }
  } catch {
    res.json({ err: "delete failed" });
  }
});

//delete Tournament by Id

router.delete("/:id", async (req, res) => {
  try {
    const data = await Tournament.findByIdAndDelete({
      _id: req.params.id,
    });
    res.send(data);
  } catch {
    res.send("Wrong parameter detected");
  }
});

module.exports = router;
