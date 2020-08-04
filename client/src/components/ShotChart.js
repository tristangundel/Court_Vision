import React from 'react';
import {XYPlot,XAxis,YAxis,VerticalGridLines,HorizontalGridLines,VerticalBarSeries,VerticalBarSeriesCanvas,LabelSeries, ChartLabel, LineSeries} from 'react-vis';
import '../../node_modules/react-vis/dist/style.css';
const axios = require('axios');

const shotMarks = (shots) => shots.map((shot) => {
    var symbol = (shot.madeShot ? '●' : '×');
    var txtColor = (shot.madeShot ? '#11b801' : '#b80110');
    return (
        <div
            style={{
                marginTop: shot.y+'px', 
                marginLeft:shot.x+'px', 
                position: "absolute",
                color: txtColor,
                fontWeight: 'bold'
            }}
        >
        {symbol}
        </div>
    );
})

var shotsByDistance = [];
var makesByDistance = [];
var missesByDistance = [];

var shotDistance = (shots) => {
    var shotDistData = [];
    var makeDistData = [];
    var missDistData = [];
    var distCount = {};
    var makeCount = {};
    var missCount = {};
    var shotsByDistance = [];
    var makesByDistance = [];
    var missesByDistance = [];
    var fgpByDistance = [];

    shots.map((shot) => {
        var distance = Math.round(Math.sqrt(((shot.x-247)**2)+((shot.y-45)**2))/10.417);
        if (shot.madeShot){
            makeDistData.push(distance);
        }
        else{
            missDistData.push(distance);
        }
        shotDistData.push(distance);
    })

    var i;
    for (i = 0; i<36; i++) {
        distCount[i] = 0;
        makeCount[i] = 0;
        missCount[i] = 0;
    }

    shotDistData.map((dist) => {
        distCount[dist] += 1
    })

    makeDistData.map((dist) => {
        makeCount[dist] += 1
    })

    missDistData.map((dist) => {
        missCount[dist] += 1
    })

    var entriesD = Object.entries(distCount);

    entriesD.map((entry) => {
        var item = {x: entry[0].toString(), y: entry[1]};

        shotsByDistance.push(item);
    })

    var entriesMa = Object.entries(makeCount);

    entriesMa.map((entry) => {
        var item = {x: entry[0].toString(), y: entry[1]};
        makesByDistance.push(item);
    })

    var entriesMi = Object.entries(missCount);

    entriesMi.map((entry) => {
        var item = {x: entry[0].toString(), y: entry[1]};

        missesByDistance.push(item);
    })

    for (i = 0; i<shotsByDistance.length; i++){
        var total = shotsByDistance[i].y;
        var makes = makesByDistance[i].y;
        var fgp = makes/total;
        var item = {x: shotsByDistance[i].x, y: fgp};

        fgpByDistance.push(item);
    }

    var allShots = [];
    allShots.push(shotsByDistance);
    allShots.push(makesByDistance);
    allShots.push(missesByDistance);
    allShots.push(fgpByDistance);

    return allShots;
}

var distLabels = shotsByDistance.map((d, idx) => ({
    x: d.x,
    y: Math.max(shotsByDistance[idx].y)
  }));

var makeMissLabels = shotsByDistance.map((d, idx) => ({
    x: d.x,
    y: Math.max(makesByDistance[idx].y, missesByDistance[idx].y)
  }));

var distChart = (shots) => {
    const allShots = shotDistance(shots);
    const shotsByDistance = allShots[0];
    const makesByDistance = allShots[1];
    const missesByDistance = allShots[2];
    const fgpByDistance = allShots[3];
    return (
        <div>
            <div style={{color: 'black'}}>Shot Frequency by Distance</div>
            <XYPlot xType="ordinal" width={800} height={300} xDistance={100}>
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis />
                <YAxis />
                <VerticalBarSeries className="vertical-bar-series-example" data={shotsByDistance} />
                <LabelSeries data={distLabels} getLabel={d => d.x} />
            </XYPlot>
            <div style={{color: 'black'}}>Make/Miss Frequency by Distance</div>
            <XYPlot xType="ordinal" width={800} height={300} stackBy="y">
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis />
                <YAxis />
                <VerticalBarSeries data={makesByDistance}/>
                <VerticalBarSeries data={missesByDistance}/>
                <LabelSeries data={makeMissLabels} getLabel={d => d.x} />
            </XYPlot>
            <div style={{color: 'black'}}>FG% by Distance</div>
            <XYPlot xType="ordinal" width={800} height={300}>
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis />
                <YAxis />
                <ChartLabel 
                    text="Distance in ft."
                    className="alt-x-label"
                    includeMargin={false}
                />
                <ChartLabel 
                    text="FG%"
                    includeMargin={false}
                    style={{transform: 'rotate(-90)', textAnchor: 'end'}}
                />
                <LineSeries className="first-series" data={fgpByDistance}/>
            </XYPlot>
        </div>
    );
}

class ShotChart extends React.Component {

    constructor() {
        super();
        this.state = {
            shots: [],
        };
    }

    componentDidMount() {
        if (this.state.shots.length === 0) {
            axios.get(`/api/shots/${this.props.player}`)
            .then((results) => {
                console.log(results);
                this.setState({
                    shots: results.data.shots,
                });
            })
            .catch((error) => console.log(error));
        }
    }

    render() {
        if (this.state.shots.length === 0) {
            return (
                <div>
                    This is the Shot Chart
                </div>
            );
        } else {
            // insert shot chart front-end component here
            return (
                <div>
                    <div className="container" style={{position: "relative", height: '472px'}}>
                        <img src="http://d2p3bygnnzw9w3.cloudfront.net/req/1/images/bbr/nbahalfcourt.png" alt="nbahalfcourt" style={{position: "absolute", height:'472px', width:'500px'}}></img>
                        <div style={{position: 'absolute'}}>
                            {shotMarks(this.state.shots)}
                        </div>
                    </div>
                    <div className="container" style={{position: "relative"}}>
                        {distChart(this.state.shots)}
                    </div>
                </div>
            );
        }
    }
}

export default ShotChart;
