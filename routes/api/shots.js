const express = require("express");
const router = express.Router();
const fs = require('fs');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');


router.get("/:playerID", (req, res) => {
    //const regex = /%20/g;
    //const ID = nba.getPlayerID(req.params.playerID.replace(regex, " ")).PlayerID;
    getShots(req.params.playerID, res);

});

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

    //console.log(html);
    return html;
}

async function downloadShootingData(browser, first, last) {
    const fl = last.charAt(0);
    const nameid = last.toLowerCase().slice(0,5) + first.toLowerCase().slice(0,2);

    const url = 'https://www.basketball-reference.com/players/'+fl+'/'+nameid+'01/shooting/2020';
    const htmlFilename = './shotdata/shots.html'

    console.log(`Downloading HTML from ${url}...`);
    const html = await fetchUrl(browser, url);

    // await fs.promises.writeFile(htmlFilename, html).catch((shootingDataError) => {console.log(shootingDataError)});
    return html;
}

async function getShotData(first, last) {

    const browser = await puppeteer.launch();
    let html = await downloadShootingData(browser, first, last);
    browser.close();

    const shots = await parseShots(html);
    return shots;
}

async function parseShots(html) {
    const $ = await cheerio.load(html);

    const divs = await $('.shot-area div').toArray();

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

async function getShots(ID, res) {
    let firstName = ID.split(" ")[0];
    let lastName = ID.split(" ")[1];
    let results = [];
    let count = 0;
    while (results.length === 0 && count < 10) {
        results = await getShotData(firstName, lastName);
        count++;
    }
    res.send({
        shots: results
    });
}

module.exports = router;