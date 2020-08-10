const express = require("express");
const router = express.Router();
// const nba = require('nba-api-client');
const teamKeys = require('../../utils/teamKeys');
// const nbaGetData = require('../../utils/nbaStats');
// const formatData = require('../../utils/formatData');
const cheerio = require('cheerio');
const axios = require('axios');

// @routeGET    api/teams
// @desc        Test route
// @access      Public
router.get("/:teamKey", (req, res) => {
    getTeam(teamKeys, req.params.teamKey, res);
});

// combine functions and layer api promise resolutions
function getTeam(teamKeys, key, res) {
    let name = key;
    if (key === "UTA") {
        name = "utah";
    } else if (key === "NYN") {
        name = "ny";
    } else if ( key === "NOP") {
        name = "no";
    }
    axios.get(`https://www.espn.com/nba/team/roster/_/name/${name}`)
    .then((rosterHTML) => {
        let roster = getRoster(rosterHTML.data);
        axios.get(`https://www.espn.com/nba/team/_/name/${name}`)
        .then((statsHTML) => {
            // console.log(statsHTML.data);
            let stats = getStats(statsHTML.data);
            axios.get("https://www.espn.com/nba/standings")
            .then((standingsHTML) => {
                let standings = getStandings(standingsHTML.data, teamKeys, key);
                let logo = getLogo(name);
                res.send({
                    Roster: roster,
                    Stats: stats,
                    Standings: standings,
                    Logo: logo
                });
            })
            .catch((standingsError) => {
                if(standingsError.response) {
                    console.log(standingsError.response);
                    res.send({errors: standingsError.response});
                } else if (standingsError.request) {
                    console.log(standingsError.request);
                    res.send({errors: standingsError.request});
                } else {
                    console.log(standingsError);
                    res.send({errors: standingsError.message});
                }
            });
        })
        .catch((statsError) => {
            if(statsError.response) {
                console.log(statsError.response);
                res.send({errors: statsError.response});
            } else if (statsError.request) {
                console.log(statsError.request);
                res.send({errors: statsError.request});
            } else {
                console.log(statsError);
                res.send({errors: statsError.message});
            }
        });
    })
    .catch((rosterError) => {
        if(rosterError.response) {
            console.log(rosterError.response);
            res.send({errors: rosterError.response});
        } else if (rosterError.request) {
            console.log(rosterError.request);
            res.send({errors: rosterError.request});
        } else {
            console.log(rosterError);
            res.send({errors: rosterError.message});
        }
    });
}

// get team roster data
function getRoster(html){
    let $ = cheerio.load(html);
    let $playerRows = $('.Table__TR.Table__TR--lg.Table__even').toArray();

    let players = $playerRows.map((player) => {
        return({
            name: player.children[1].children[0].children[0].children[0].data,
            number: player.children[1].children[0].children[1].children[0].data,
            position: player.children[2].children[0].children[0].data,
            age: player.children[3].children[0].children[0].data,
            height: player.children[4].children[0].children[0].data,
            weight: player.children[5].children[0].children[0].data,
            school: player.children[6].children[0].children[0].data
        })
    });
    return players;
}

// get team stat data
function getStats(html) {
    let $ = cheerio.load(html);
    let $statRankings = $('article.sub-module.rankings div.content div.grid-rank').toArray();

    let statRankings = {
        ppg: $statRankings[0].children[2].children[0].data,
        rpg: $statRankings[1].children[2].children[0].data,
        apg: $statRankings[2].children[2].children[0].data,
        oppg: $statRankings[3].children[2].children[0].data
    }

    return statRankings;
}

// get team standings data
function getStandings(html, teamKeys, key) {
    let $ = cheerio.load(html);
    let $standings = $('.Table__TR img.Image.Logo.Logo__sm').toArray();

    let team = {name: teamKeys[key]};
    for (let i =0; i < $standings.length; i++) {
        if($standings[i].attribs.title === teamKeys[key]) {
            let idx = $standings[i].parent.parent.parent.parent.parent.attribs['data-idx'];
            team.rank = Number(idx) + 1;
            team.conference = ($standings[i].parent.parent.parent.parent.parent.parent.parent.parent.prev.children[0].data);
            let tableRow;
            if (team.conference === "Eastern Conference"){
                tableRow = 1;
            } else {
                tableRow = 3;
            }
            let $recordRow = $(`.Table__TR.Table__TR--sm.Table__even[data-idx=${idx}]`).toArray();
            team.W = $recordRow[tableRow].children[0].children[0].children[0].data;
            team.L = $recordRow[tableRow].children[1].children[0].children[0].data;
            team.PCT = $recordRow[tableRow].children[2].children[0].children[0].data;
        }
    }
    return team;
}

// return team logo
function getLogo(key) {
    return `https://a.espncdn.com/i/teamlogos/nba/500/${key}.png`;
}

module.exports = router;