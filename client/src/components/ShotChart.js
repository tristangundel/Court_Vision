import React from 'react';
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
                <div className="container" style={{position: "relative"}}>
                    <img src="http://d2p3bygnnzw9w3.cloudfront.net/req/1/images/bbr/nbahalfcourt.png" alt="nbahalfcourt" style={{position: "absolute", height:'472px', width:'500px'}}></img>
                    {shotMarks(this.state.shots)}
                </div>
            );
        }
    }
}
        


export default ShotChart;
