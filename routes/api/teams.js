const express = require("express");
const router = express.Router();
const nba = require('nba-api-client');
const teamKeys = require('../../utils/teamKeys');
const nbaGetData = require('../../utils/nbaStats');
const formatData = require('../../utils/formatData');

// @routeGET    api/teams
// @desc        Test route
// @access      Public
router.get("/:teamKey", (req, res) => {
    getTeam(teamKeys, req.params.teamKey, res);
});

function getRoster(teamKeys, key) {
    //return nba.teamRoster({TeamID: nba.getTeamID(teamKeys[key]).TeamID, Season: "2019-20"});
    return nbaGetData('commonteamroster', {TeamID: nba.getTeamID(teamKeys[key]).TeamID, Season: "2019-20"});
};

function getTeamInfo(teamKeys, key) {
    //return nba.teamInfoCommon({TeamID: nba.getTeamID(teamKeys[key]).TeamID})
    return nbaGetData('teaminfocommon', {TeamID: nba.getTeamID(teamKeys[key]).TeamID, LeagueID: "00"});
};

function getTeamLogo(key) {
    return nba.getTeamLogoURLs(key)[0];
}

function getTeam(teamKeys, key, res) {
    getRoster(teamKeys, key).then((rosterData) => {
        if (rosterData.data.resultSets){
            rosterData = formatData(rosterData.data);
        }
        getTeamInfo(teamKeys, key).then((infoData) => {
            if (infoData.data.resultSets){
                infoData = formatData(infoData.data);
            }
            res.send({
                Roster: rosterData,
                Info: infoData,
                Logo: getTeamLogo(key)
            });
        })
        .catch((infoError) => console.log(infoError))
    })
    .catch((rosterError) => console.log(rosterError));
}

module.exports = router;