var Team = require("../models/teams");

module.exports = {
    team: async (req, res) => {
        try {
            const teamExist = await Team.findOne({name : req.body.name});
            if(teamExist) return res.json({ status : false, message: "team already exist!"});
            console.log(req.body.members)
            const team = new Team({
                name: req.body.name,
                members: req.body.members,
              });
              await Team.create(team);
            res.json({status: true, message: "Update Successful!"});
        }
        catch {
            res.json({status: true, message: "Update Failed!"});
        }
    },

    teams: async (req, res) => {
        try {
            const teams = await Team.find();
            console.log(teams)
            res.json({status: true, message: "Update Successful!", data: teams});
        }
        catch {
            res.json({status: true, message: "Update Failed!"});
        }
    },
}