const mongoose = require('mongoose')

const TournamentSchema = mongoose.Schema(
  {
    tourFormat: String,
    orgLogo: String,
    tourLogo: String,
    tournament_Title: String,
    org_Name: String,
    creator: String,
    roadMap:Array
  },
  {
    timestamps: true,
  },
)

const Tournament = mongoose.model('Tournament', TournamentSchema)

module.exports = Tournament
