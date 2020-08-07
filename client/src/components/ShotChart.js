import React from "react";
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  VerticalBarSeriesCanvas,
  LabelSeries,
  ChartLabel,
  LineSeries,
  DiscreteColorLegend
} from "react-vis";
import "../../node_modules/react-vis/dist/style.css";
const axios = require("axios");

const shotMarks = (shots) =>
  shots.map((shot) => {
    var symbol = shot.madeShot ? "●" : "×";
    var txtColor = shot.madeShot ? "#11b801" : "#b80110";
    return (
      <div
        style={{
          marginTop: shot.y + "px",
          marginLeft: shot.x + "px",
          position: "absolute",
          color: txtColor,
          fontWeight: "bold",
        }}
      >
        {symbol}
      </div>
    );
  });

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
    var distance = Math.round(
      Math.sqrt((shot.x - 247) ** 2 + (shot.y - 45) ** 2) / 10.417
    );
    if (shot.madeShot) {
      makeDistData.push(distance);
    } else {
      missDistData.push(distance);
    }
    shotDistData.push(distance);
  });

  var i;
  for (i = 0; i < 41; i++) {
    distCount[i] = 0;
    makeCount[i] = 0;
    missCount[i] = 0;
  }

  shotDistData.map((dist) => {
    distCount[dist] += 1;
  });

  makeDistData.map((dist) => {
    makeCount[dist] += 1;
  });

  missDistData.map((dist) => {
    missCount[dist] += 1;
  });

  var entriesD = Object.entries(distCount);

  entriesD.map((entry) => {
    var item = { x: entry[0].toString(), y: entry[1] };

    shotsByDistance.push(item);
  });

  var entriesMa = Object.entries(makeCount);

  entriesMa.map((entry) => {
    var item = { x: entry[0].toString(), y: entry[1] };
    makesByDistance.push(item);
  });

  var entriesMi = Object.entries(missCount);

  entriesMi.map((entry) => {
    var item = { x: entry[0].toString(), y: entry[1] };

    missesByDistance.push(item);
  });

  for (i = 0; i < 41; i++) {
    var total = shotsByDistance[i].y;
    var makes = makesByDistance[i].y;
    var fgp = makes / total;
    var item = { x: shotsByDistance[i].x, y: fgp };

    fgpByDistance.push(item);
  }

  var allShots = [];
  allShots.push(shotsByDistance);
  allShots.push(makesByDistance);
  allShots.push(missesByDistance);
  allShots.push(fgpByDistance);

  return allShots;
};

var distLabels = shotsByDistance.map((d, idx) => ({
  x: d.x,
  y: Math.max(shotsByDistance[idx].y),
}));

var makeMissLabels = shotsByDistance.map((d, idx) => ({
  x: d.x,
  y: Math.max(makesByDistance[idx].y, missesByDistance[idx].y),
}));

var distChart = (shots) => {
  const allShots = shotDistance(shots);
  const shotsByDistance = allShots[0];
  const makesByDistance = allShots[1];
  const missesByDistance = allShots[2];
  const fgpByDistance = allShots[3];
  return (
    <div>
      <h4>Shot Frequency by Distance</h4>
      <XYPlot xType='ordinal' width={600} height={300} xDistance={100} style={{background: '#f7f7f7'}}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
        <ChartLabel
          text='Distance in ft.'
          className='alt-x-label'
          includeMargin={false}
          style={{textAnchor: 'end'}}
        />
        <ChartLabel
          text='# of Shots'
          includeMargin={false}
          style={{ transform: "rotate(-90)", textAnchor: "end" }}
        />
        <VerticalBarSeries
          className='vertical-bar-series-example'
          data={shotsByDistance}
        />
        <LabelSeries data={distLabels} getLabel={(d) => d.x} />
      </XYPlot>
      <h4>Make/Miss Frequency by Distance</h4>
      <XYPlot xType='ordinal' width={600} height={300} stackBy='y' style={{background: '#f7f7f7'}}>
        <DiscreteColorLegend
            style={{position: 'absolute', right: '50px', top: '10px'}}
            orientation="horizontal"
            items={[
              {
                title: 'Make',
                color: '#12939A'
              },
              {
                title: 'Miss',
                color: '#79C7E3'
              }
            ]}
          />
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
        <ChartLabel
          text='Distance in ft.'
          className='alt-x-label'
          includeMargin={false}
        />
        <ChartLabel
          text='# of Shots'
          includeMargin={false}
          style={{ transform: "rotate(-90)", textAnchor: "end" }}
        />
        <VerticalBarSeries data={makesByDistance} />
        <VerticalBarSeries data={missesByDistance} />
        <LabelSeries data={makeMissLabels} getLabel={(d) => d.x} />
      </XYPlot>
      <h4>FG% by Distance</h4>
      <XYPlot xType='ordinal' width={600} height={300} style={{background: '#f7f7f7'}}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
        <ChartLabel
          text='Distance in ft.'
          className='alt-x-label'
          includeMargin={false}
        />
        <ChartLabel
          text='FG%'
          includeMargin={false}
          style={{ transform: "rotate(-90)", textAnchor: "end" }}
        />
        <LineSeries className='first-series' data={fgpByDistance} />
      </XYPlot>
    </div>
  );
};

class ShotChart extends React.Component {
  constructor() {
    super();
    this.state = {
      shots: [],
    };
  }

  componentDidMount() {
    if (this.state.shots.length === 0) {
      axios
        .get(`/api/shots/${this.props.player}`)
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
      return <div className='mx-2'>
        <h1 className="display-4">Shot Data Loading...</h1>
      </div>;
    } else {
      // insert shot chart front-end component here
      return (
        <div className='container mx-2'>
          <div className="row">
            <div
              className='col-6'
              style={{ position: "relative", height: "500px" }}
            >
              <h3>2019-20 Shot Chart</h3>
              <img
                src='http://d2p3bygnnzw9w3.cloudfront.net/req/1/images/bbr/nbahalfcourt.png'
                alt='nbahalfcourt'
                style={{ position: "absolute", height: "472px", width: "500px" }}
              ></img>
              <div style={{ position: "absolute" }}>
                {shotMarks(this.state.shots)}
              </div>
            </div>
            <div className='col-6' style={{ position: "relative" }}>
              {distChart(this.state.shots)}
            </div>
          </div>
        </div>
      );
    }
  }
}

export default ShotChart;
