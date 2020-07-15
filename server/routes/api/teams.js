const express = require("express");
const router = express.Router();
const nba = require('nba-api-client');
const teamKeys = require('../../utils/teamKeys');

// @routeGET    api/teams
// @desc        Test route
// @access      Public
router.get("/:teamKey", (req, res) => {
    getTeam(teamKeys, req.params.teamKey, res);
});

function getRoster(teamKeys, key) {
    return nba.teamRoster({TeamID: nba.getTeamID(teamKeys[key]).TeamID, Season: "2019-20"});
};

function getTeamInfo(teamKeys, key) {
    return nba.teamDetails({TeamID: nba.getTeamID(teamKeys[key]).TeamID})
};

function getTeamLogo(teamKeys, key) {
    return nba.getTeamLogoURLs(teamKeys[key])[0];
}

function getTeam(teamKeys, key, res) {
    getRoster(teamKeys, key).then((rosterData) => {
        getTeamInfo(teamKeys, key).then((infoData) => {
            res.send({
                Roster: rosterData,
                Info: infoData,
                Logo: getTeamLogo(teamKeys, key)
            });
        })
        .catch((infoError) => console.log(infoError))
    })
    .catch((rosterError) => console.log(rosterError));
}

module.exports = router;