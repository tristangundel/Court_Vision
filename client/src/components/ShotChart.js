import React from 'react';
import {XYPlot,XAxis,YAxis,VerticalGridLines,HorizontalGridLines,VerticalBarSeries,VerticalBarSeriesCanvas,LabelSeries} from 'react-vis';
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

const shotsByDistance = [];

const shotDistance = (shots) => {
    const shotDistData = [];
    const distCount = {};

    shots.map((shot) => {
        var distance = Math.round(Math.sqrt(((shot.x-247)**2)+((shot.y-45)**2))/10.417);
        shotDistData.push(distance);
    })

    shotDistData.map((dist) => {
        if (distCount[dist]){
            distCount[dist] += 1
        }
        else {
            distCount[dist] = 1
        }
    })

    const entries = Object.entries(distCount);

    entries.map((entry) => {
        var item = {x: entry[0].toString(), y: entry[1]};

        shotsByDistance.push(item);
    })
}

const labelData = shotsByDistance.map((d, idx) => ({
    x: d.x,
    y: Math.max(shotsByDistance[idx].y)
  }));

const distChart = (shots) => {
    shotDistance(shots);

    return (
        <div>
            <XYPlot xType="ordinal" width={700} height={300} xDistance={100}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis />
            <YAxis />
            <VerticalBarSeries className="vertical-bar-series-example" data={shotsByDistance} />
            <LabelSeries data={labelData} getLabel={d => d.x} />
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
