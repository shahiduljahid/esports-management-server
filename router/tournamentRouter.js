const express = require('express')
const Tournament = require('../models/Tournament')

const router = express.Router()

//get AllTournament
router.get('/', async (req, res) => {
  try {
    const docs = await Tournament.find()
    res.json(docs)
  } catch {
    res.json({ error: 'unknown error' })
  }
})

//get Tournament by Tournament id
router.get('/TournamentById/:id', async (req, res) => {
  try {
    const Tournament = await Tournament.findOne({ _id: req.params.id })
    res.json(Tournament)
  } catch (err) {
    res.json({ error: 'Tournament not found' })
  }
})

//add Tournament
router.post('/', async (req, res) => {
  try {
    const newData = new Tournament(req.body)
    const result = await newData.save()

    if (result) {
      const doc = await Tournament.find()
      res.json(doc)
    }
  } catch (error) {
    res.json({ err: 'unknown error' })
  }
})

//update Tournament details by id

router.patch('/TournamentDetails/:id', async (req, res) => {
  const userId = req.params.id
  const body = req.body

  try {
    const stats = await Tournament.updateOne(
      { _id: userId },
      {
        tourFormat: body.tourFormat,
        orgLogo: body.orgLogo,
        tourLogo: body.tourLogo,
        tournament_Title: body.tournament_Title,
        org_name: body.org_name,
      },
    )

    if (stats) {
      const Tournament = await Tournament.findOne({ _id: req.params.id })
      res.json(Tournament)
    }
  } catch (err) {
    res.json({ error: err })
  }
})

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




module.exports = router
