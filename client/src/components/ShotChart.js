import React from 'react';
const axios = require('axios');

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
                    This is the Shot Chart when data has loaded.
                </div>
            );
        }
    }
}
        


export default ShotChart;
