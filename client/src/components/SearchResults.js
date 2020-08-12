import React from 'react';
import PlayerCard from "./PlayerCard";
import { Redirect } from 'react-router-dom';
const playerList = require('../utils/playerList');


class SearchResults extends React.Component {
    constructor() {
        super();
        this.state = {
            isPlayer: false,
            playerOptions: [],
            id: ""
        }
        this.getInfo = this.getInfo.bind(this);
    }

    componentDidMount() {
        this.getInfo(this.props.match.params.playerID);
    }

    getInfo(ID) {
        if (playerList.includes(ID)) {
            this.setState({isPlayer: true, id: ID});
        } else {
            const filteredOptions = playerList.filter(
                (player) => player.toLowerCase().indexOf(ID.toLowerCase()) > -1
            );
            this.setState({playerOptions: filteredOptions, id: ID});
        }
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.match.params.playerID !== prevState.id){
            return {id: "", playerOptions: []};
        } 
        else {
            return null;
        }
     }

    componentDidUpdate(nextProps) {
        if (this.state.id === "") {
            this.getInfo(nextProps.match.params.playerID);
        }
    }

    render() {
        let results = (
            <div className="player justify-content-center">
                <div className="text-light">
                    <div className="d-inline-block align-items-center container-fluid m-auto dark-overlay justify-content-center">
                        <h3>Search Results</h3>
                        <hr></hr>
                        <div className="row p-2">
                            {this.state.playerOptions.length === 0 ? <h4>No Results</h4> : this.state.playerOptions.map((player) => {
                                return (<PlayerCard player={player} />);
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
        return (
            this.state.isPlayer ? <Redirect to={`/player/${this.props.match.params.playerID}`} /> : results
        );
    }
}
export default SearchResults;