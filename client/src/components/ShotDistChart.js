import React from 'react';
import {XYPlot,XAxis,YAxis,VerticalGridLines,HorizontalGridLines,VerticalBarSeries,VerticalBarSeriesCanvas,LabelSeries} from 'react-vis';

const shotDistData = {
    "At Rim": {
        FG: 223,
        FGA: 337,
        FGP:.662,
        TP:0,
        TPA:0,
        TPP: 0,
        EFGP: .662,
        AST: 31,
        PAST: .139
    },
    "3ft - <10ft": {
        FG: 106,
        FGA: 260,
        FGP:.408,
        TP:0,
        TPA:0,
        TPP: 0,
        EFGP: .408,
        AST: 12,
        PAST: .113
    },
    "10ft - <16ft": {
        FG: 12,
        FGA: 26,
        FGP:.462,
        TP:0,
        TPA:0,
        TPP: 0,
        EFGP: .462,
        AST: 3,
        PAST: .250
    },
    "16 ft - <3-pt": {
        FG: 4,
        FGA: 7,
        FGP:.571,
        TP:0,
        TPA:0,
        TPP: 0,
        EFGP: .571,
        AST: 0,
        PAST: .000
    },
    "3-pt": {
        FG: 277,
        FGA: 790,
        FGP:.351,
        TP:277,
        TPA:790,
        TPP: .351,
        EFGP: .526,
        AST: 43,
        PAST: .155
    }
}

const fgp_dist = [
    {x: 'At Rim', y: shotDistData["At Rim"].FGP},
    {x: '3ft - <10ft', y: shotDistData["3ft - <10ft"].FGP},
    {x: '10ft - <16ft', y: shotDistData["10ft - <16ft"].FGP},
    {x: '16 ft - <3-pt', y: shotDistData["16 ft - <3-pt"].FGP},
    {x: '3-pt', y: shotDistData["3-pt"].FGP}
];

const fg_dist = [
    {x: 'At Rim', y: shotDistData["At Rim"].FG},
    {x: '3ft - <10ft', y: shotDistData["3ft - <10ft"].FG},
    {x: '10ft - <16ft', y: shotDistData["10ft - <16ft"].FG},
    {x: '16 ft - <3-pt', y: shotDistData["16 ft - <3-pt"].FG},
    {x: '3-pt', y: shotDistData["3-pt"].FG}
];

const fga_dist = [
    {x: 'At Rim', y: shotDistData["At Rim"].FGA},
    {x: '3ft - <10ft', y: shotDistData["3ft - <10ft"].FGA},
    {x: '10ft - <16ft', y: shotDistData["10ft - <16ft"].FGA},
    {x: '16 ft - <3-pt', y: shotDistData["16 ft - <3-pt"].FGA},
    {x: '3-pt', y: shotDistData["3-pt"].FGA}
];

// const labelData = fgp_dist.map((d, idx) => ([{
//     x: d.x,
//     y: Math.max(fgp_dist[idx].y)
// }]));

// export default function ShotDistChart() {
//     return (
//         <div>
//             <XYPlot xType="ordinal" width={300} height={300} xDistance={100}>
//                 <VerticalGridLines />
//                 <HorizontalGridLines />
//                 <XAxis />
//                 <YAxis />
//                 <VerticalBarSeries className="vertical-bar-series-example" data={fgp_dist}/>
//                 {/* <LabelSeries data={labelData} getLabel={d => d.x} /> */}
//             </XYPlot>
//         </div>
//     )
// }

const labelData = fgp_dist.map((d, idx) => ({
  x: d.x,
  y: Math.max(fgp_dist[idx].y)
}));

export default class ShotDistChart extends React.Component {
  

  render() {
    return (
      <div>
        
        <XYPlot xType="ordinal" width={300} height={300} xDistance={100}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <VerticalBarSeries className="vertical-bar-series-example" data={fgp_dist} />
          {/* <LabelSeries data={labelData} getLabel={d => d.x} /> */}
        </XYPlot>
      </div>
    );
  }
}