import React from "react";
import {curveCatmullRom} from 'd3-shape';
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  LabelSeries,
  LineSeries,
  DiscreteColorLegend,
  HexbinSeries,
  Borders,
  Hint
} from "react-vis";
// import "../../../node_modules/react-vis/dist/style.css";
const axios = require("axios");


const shotMarks = (shots) =>
  shots.map((shot) => {
    var symbol = shot.madeShot ? "●" : "×";
    var txtColor = shot.madeShot ? "#0B4D98" : "#ce1a1a";
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
var fgpByDistance = [];

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

  shots.forEach((shot) => {
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

  shotDistData.forEach((dist) => {
    distCount[dist] += 1;
  });

  makeDistData.forEach((dist) => {
    makeCount[dist] += 1;
  });

  missDistData.forEach((dist) => {
    missCount[dist] += 1;
  });

  var entriesD = Object.entries(distCount);

  entriesD.forEach((entry) => {
    var item = { x: entry[0].toString(), y: entry[1] };

    shotsByDistance.push(item);
  });

  var entriesMa = Object.entries(makeCount);

  entriesMa.forEach((entry) => {
    var item = { x: entry[0].toString(), y: entry[1] };
    makesByDistance.push(item);
  });

  var entriesMi = Object.entries(missCount);

  entriesMi.forEach((entry) => {
    var item = { x: entry[0].toString(), y: entry[1] };

    missesByDistance.push(item);
  });

  for (i = 1; i < 41; i++) {
    var total = shotsByDistance[i].y;
    var makes = makesByDistance[i].y;
    var fgp = 0;
    if(total !== 0) {
      fgp = Number.parseFloat(makes/total).toPrecision(3);
    }
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

// var distLabels = shotsByDistance.map((d, idx) => ({
//   x: d.x,
//   y: Math.max(shotsByDistance[idx].y),
// }));

var makeMissLabels = shotsByDistance.map((d, idx) => ({
  x: d.x,
  y: Math.max(makesByDistance[idx].y, missesByDistance[idx].y),
}));

var distChart = (shots) => {
  const allShots = shotDistance(shots);
  const makesByDistance = allShots[1];
  const missesByDistance = allShots[2];
  fgpByDistance = allShots[3];
  return (
    <div className='col-lg-12 mx-auto'>
      {/* <div className='col-6' style={{ position: "relative" }}>
        <h4>Shot Frequency by Distance</h4>
        <XYPlot xType='ordinal' width={500} height={472} xDistance={100} style={{background: '#f7f7f7'}} color="#0b4d98" colorType="literal">
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis 
            title="Distance in ft."
          />
          <YAxis 
            title="# of Shots"
          />
          <VerticalBarSeries
            className='vertical-bar-series-example'
            data={shotsByDistance}
          />
          <LabelSeries data={distLabels} getLabel={(d) => d.x} />
        </XYPlot>
      </div> */}
      <div className='mt-2'>
        <h4>Make/Miss Frequency by Distance</h4>
        <XYPlot xType='ordinal' width={1056} height={300} stackBy='y' style={{background: '#f7f7f7'}}>
          <DiscreteColorLegend
              style={{position: 'absolute', right: '50px', top: '10px'}}
              orientation="horizontal"
              items={[
                {
                  title: 'Make',
                  color: '#0b4d98'
                },
                {
                  title: 'Miss',
                  color: '#ce1a1a'
                }
              ]}
            />
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis 
            title="Distance in ft."
          />
          <YAxis 
            title="# of Shots"
          />
          <VerticalBarSeries data={makesByDistance} color={"#0b4d98"}/>
          <VerticalBarSeries data={missesByDistance} color={"#ce1a1a"}/>
          <LabelSeries data={makeMissLabels} getLabel={(d) => d.x} />
        </XYPlot>
      </div>

      
      <div className='mt-3'>
        <h4>FG% by Distance</h4>
        <XYPlot xType='ordinal' width={1056} height={300} style={{background: '#f7f7f7'}} stroke={"#0b4d98"}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis 
            title="Distance in ft."
          />
          <YAxis 
            title="FG%"
          />
          <LineSeries className='first-series' curve={curveCatmullRom.alpha(0.5)} data={fgpByDistance} />
        </XYPlot>
      </div>
    </div>
  );
};

var shotMap = (shots) => {
  var shotMapData = [];
  shots.forEach((shot) => {
    var item = {"xdist": ((shot.x-247)/10.417), "ydist":((shot.y-45)/10.417)}
    shotMapData.push(item);
  })

  return shotMapData;
  // return shotMapData.map(row => ({
  //   xdist: row.xdist + (Math.random() - 0.5) *10,
  //   ydist: row.ydist + (Math.random()-0.5) * 10
  // }));
}

class ShotChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shots: "",
      crosshairValues: [],
      data: [],
      hoveredNode: null,
      radius: 10,
      offset: 0
    };
  }

  componentDidMount() {
    if (this.state.shots === "") {
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

  /**
   * Event handler for onMouseLeave.
   * @private
   */
  _onMouseLeave = () => {
    this.setState({crosshairValues: []});
  };

  /**
   * Event handler for onNearestX.
   * @param {Object} value Selected value.
   * @param {index} index Index of the value in the data array.
   * @private
   */
  _onNearestX = (value, {index}) => {
    this.setState({crosshairValues: fgpByDistance.map(d => d[index])});
  };

  render() {
    const {radius, hoveredNode, offset} = this.state;
    if (this.state.shots === "") {
      return null;
    } else {
      // insert shot chart front-end component here
      return (
        <div className='container justify-content-center pb-4'>
          <div className="row">
            <div
              className='col-xl-6'
              style={{ position: "relative", height:'520px'}}
            >
              <h3>2019-20 Shot Chart</h3>
              <img
                src='http://d2p3bygnnzw9w3.cloudfront.net/req/1/images/bbr/nbahalfcourt.png'
                alt='nbahalfcourt'
                style={{
                  position: "absolute",
                  height: "472px",
                  width: "500px",
                }}
              ></img>
              <div style={{ position: "absolute" }}>
                {shotMarks(this.state.shots)}
              </div>
            </div>
            <div
              className='col-xl-6'
              style={{ position: "relative", height:'520px'}}
            >
              <h3>Shot Frequency Heat Map</h3>
              <XYPlot
                xDomain={[-24, 24]}
                yDomain={[35, -2]}
                width={500}
                height={472}
                getX={d => d.xdist}
                getY={d => d.ydist}
                onMouseLeave={() => this.setState({hoveredNode:null})}
                style={{background:'#f7f7f7'}}
              >
                <HexbinSeries
                  animation
                  countDomain={[1,15]}
                  className="hexbin-example"
                  style={{
                    stroke: '#125C77',
                    strokeLinejoin: 'round',
                  }}
                  onValueMouseOver={d => this.setState({hoveredNode: d})}
                  xOffset={offset}
                  yOffset={offset}
                  colorRange={['#0b4d98', '#ce1a1a']}
                  radius={radius}
                  data={shotMap(this.state.shots)}
                />
                <Borders style={{all: {fill: '#fff'}}} />
                <XAxis title="Distance in ft."/>
                <YAxis title="Distance in ft."/>
                {hoveredNode && (
                  <Hint
                    xType='literal'
                    yType='literal'
                    getX={d => d.x}
                    getY={d => d.y}
                    value={{
                      Shots: hoveredNode.length
                    }}
                  />
                )}
              </XYPlot>
            </div>
            {distChart(this.state.shots)}
          </div>
        </div>
      );
    }
  }
}

export default ShotChart;
