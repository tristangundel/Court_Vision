const express = require("express");
const router = express.Router();
const nba = require('nba-api-client');
const fs = require('fs');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

async function newPage(browser) {
    page = await browser.newPage();
    page.setDefaultTimeout(20000);

    await page.setUserAgent('Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36');

    await page.setViewport({
        width: 1980,
        height: 1080
    });

    return page;
}

async function fetchUrl(browser, url) {
    const page = await newPage(browser);
    
    await page.goto(url, {
        timeout: 20000,
        waitUntil: 'domcontentloaded'
    });

    const html = await page.content();
    await page.close();

    return html;
}

async function downloadShootingData(browser, first, last) {
    const fl = last.charAt(0);
    const nameid = last.toLowerCase().slice(0,5) + first.toLowerCase().slice(0,2);

    const url = 'https://www.basketball-reference.com/players/'+fl+'/'+nameid+'01/shooting/2020';
    const htmlFilename = './shotdata/shots.html'

    // const fileExists = fs.existsSync(htmlFilename);
    // if (fileExists) {
    //     console.log(`Skipping download for ${url} since ${htmlFilename} already exists.`);
    //     return;
    // }
    
    console.log(`Downloading HTML from ${url}...`);
    const html = await fetchUrl(browser, url);

    await fs.promises.writeFile(htmlFilename, html).catch((shootingDataError) => {console.log(shootingDataError)});
}

async function getData(first, last) {
    console.log('starting...');

    const browser = await puppeteer.launch();
    await downloadShootingData(browser, first, last);
    await browser.close();

    const shots = await parseShots();

    // await fs.promises.writeFile('./shotdata/shots.json', JSON.stringify(shots, null, 2));

    console.log('Done');
    const shotData = JSON.stringify(shots, null, 2);
    return shotData;
}

async function parseShots() {
    console.log('Parsing shots HTML...');

    const htmlFilename = './shotdata/shots.html';

    var html = await fs.promises.readFile(htmlFilename).catch((shootingDataError) => {console.log(shootingDataError)});

    const $ = cheerio.load(html);

    const divs = $('.shot-area > div').toArray();

    const shots = divs.map(div => {
        const $div = $(div);

        const x = +$div.css('left').slice(0, -2);
        const y = +$div.css('top').slice(0, -2);

        const madeShot = $div.hasClass('make');

        const shotPts = $div.attr('tip').includes('3-pointer') ? 3 : 2;

        return { x, y, madeShot, shotPts };
    });
    
    return shots;
}

// @routeGET    api/players
// @desc        Test route
// @access      Public
router.get("/:playerID", (req, res) => {
    const regex = /%20/g;
    const ID = nba.getPlayerID(req.params.playerID.replace(regex, " ")).PlayerID;
    getPlayer(ID, res);
});

function getPlayerInfo(ID) {
    return nba.playerInfo({PlayerID: ID});
}

function getPlayerStats(ID) {
    return nba.playerSplitsByYear({PlayerID: ID});
}

function getPlayer(ID, res) {
    getPlayerInfo(ID).then((infoData) => {
        getPlayerStats(ID).then(function(statData) {
            getData(infoData.CommonPlayerInfo.FIRST_NAME, infoData.CommonPlayerInfo.LAST_NAME).then((shotData) => {
                res.send({
                    Info: infoData,
                    Stats: statData,
                    Picture: nba.getPlayerHeadshotURL({PlayerID: ID, TeamID: infoData.CommonPlayerInfo.TEAM_ID}),
                    Shots: shotData
                });
            })
        })
        .catch((statError) => {
            console.log(statError);
        });
    })
    .catch((infoError) => {
        console.log(infoError);
    });
}

module.exports = router;