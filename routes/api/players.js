const express = require("express");
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');
const playerKey = require('../../utils/playerKey')
// const nba = require('nba-api-client');
// const nbaGetData = require('../../utils/nbaStats');
// const formatData = require('../../utils/formatData');

// @routeGET    api/players
// @desc        Test route
// @access      Public
router.get("/:playerID", (req, res) => {
    //const regex = /%20/g;
    //const ID = nba.getPlayerID(req.params.playerID.replace(regex, " ")).PlayerID;
    getPlayer(playerKey[req.params.playerID], res);

});

router.get("/:playerID/basics", (req, res) => {
    getMinimalPlayerInfo(playerKey[req.params.playerID], res);
});

// get player basic info (cur stats, weight, height, etc)
function getPlayerBasics(html) {
    let $ = cheerio.load(html);

    let $playerName = $('h1.PlayerHeader__Name span').toArray();
    let $playerBio = $('ul.PlayerHeader__Bio_List li div.fw-medium div').toArray();
    let $playerTeamInfo = $('ul.PlayerHeader__Team_Info li').toArray();
    let $curSeasonStats = $('ul.StatBlock__Content li div.StatBlockInner__Value').toArray();
    let basics = {
        firstName: $playerName[0].children[0].data,
        lastName: $playerName[1].children[0].data,
        height: $playerBio[0].children[0].data.split(", ")[0],
        weight: $playerBio[0].children[0].data.split(", ")[1],
        age: $playerBio[1].children[0].data.split(" ")[1].replace("(", "").replace(")", ""),
        team: $playerTeamInfo[0].children[0].children[0].data,
        number: $playerTeamInfo[1].children[0].data,
        position: $playerTeamInfo[2].children[0].data,
        ppg: $curSeasonStats[0].children[0].data,
        rpg: $curSeasonStats[1].children[0].data,
        apg: $curSeasonStats[2].children[0].data,
        per: $curSeasonStats[3].children[0].data,
    }
    return basics;
}

// get player regular season averages per season
function getPlayerStats(html){
    let $ = cheerio.load(html);
    let $playerStats = $('section.ResponsiveTable.ResponsiveTable--fixed-left tbody').toArray();
    let stats = [];
    for (let i = $playerStats[0].children.length - 3; i >= 0; i--) {
        let season = $playerStats[0].children[i].children[0].children[0].data;
        let team;
        try {
            team = $playerStats[0].children[i].children[1].children[0].children[1].children[0].data;
        }
        catch (err) {
            team = $playerStats[0].children[i].children[1].children[0].children[0].children[0].data;
        }
        stats.push({
            season: season,
            team: team,
            GP: $playerStats[1].children[i].children[0].children[0].data,
            MIN: $playerStats[1].children[i].children[2].children[0].data,
            FGA: $playerStats[1].children[i].children[3].children[0].data.split("-")[1],
            FGM: $playerStats[1].children[i].children[3].children[0].data.split("-")[0],
            FG_PCT: $playerStats[1].children[i].children[4].children[0].data,
            FG3A: $playerStats[1].children[i].children[5].children[0].data.split("-")[1],
            FG3M: $playerStats[1].children[i].children[5].children[0].data.split("-")[0],
            FG3_PCT: $playerStats[1].children[i].children[6].children[0].data,
            FTA: $playerStats[1].children[i].children[7].children[0].data.split("-")[1],
            FTM: $playerStats[1].children[i].children[7].children[0].data.split("-")[0],
            FT_PCT: $playerStats[1].children[i].children[8].children[0].data,
            OREB: $playerStats[1].children[i].children[9].children[0].data,
            DREB: $playerStats[1].children[i].children[10].children[0].data,
            REB: $playerStats[1].children[i].children[11].children[0].data,
            AST: $playerStats[1].children[i].children[12].children[0].data,
            BLK: $playerStats[1].children[i].children[13].children[0].data,
            STL: $playerStats[1].children[i].children[14].children[0].data,
            TOV: $playerStats[1].children[i].children[16].children[0].data,
            PTS: $playerStats[1].children[i].children[17].children[0].data,
        });
    }
    return stats;
}

function getPlayerPhoto(ID) {
     return `https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/${ID}.png&w=350&h=254`
}

function getPlayer(ID, res) {
    axios.get(`https://www.espn.com/nba/player/stats/_/id/${ID}`)
    .then((response) => {
        res.send({
            basics: getPlayerBasics(response.data),
            stats: getPlayerStats(response.data),
            photo: getPlayerPhoto(ID)
        })
    })
    .catch((error) => {
        if(error.response) {
            console.log(error.response);
            res.send({errors: error.response});
        } else if (error.request) {
            console.log(error.request);
            res.send({errors: error.request});
        } else {
            console.log(error);
            res.send({errors: error});
        }
    });
}

function getMinimalPlayerInfo(ID, res){
    axios.get(`https://www.espn.com/nba/player/stats/_/id/${ID}`)
    .then((response) => {
        res.send({
            basics: getPlayerBasics(response.data),
            photo: getPlayerPhoto(ID)
        })
    })
    .catch((error) => {
        if(error.response) {
            console.log(error.response);
            res.send({errors: error.response});
        } else if (error.request) {
            console.log(error.request);
            res.send({errors: error.request});
        } else {
            console.log(error);
            res.send({errors: error});
        }
    });
}

module.exports = router;