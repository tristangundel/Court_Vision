import React from 'react';

const shotMarks = (shots) => shots.map((shot) => {
    var symbol = (shot.madeShot ? '●' : '×');
    var txtColor = (shot.madeShot ? '#3a7711' : '#aa3333')
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
    
    // <div style={"top:"+shot.y+"px;left:"+shot.x+"px;"}>x</div>

export default function ShotChart(props) {
    var shots = JSON.parse(props.shots);
    return (
        <div className="container" style={{position: "relative"}}>
            <img src="http://d2p3bygnnzw9w3.cloudfront.net/req/1/images/bbr/nbahalfcourt.png" alt="nbahalfcourt" style={{position: "absolute", height:'472px', width:'500px'}}></img>
            {shotMarks(shots)}
        </div>
    )
}
