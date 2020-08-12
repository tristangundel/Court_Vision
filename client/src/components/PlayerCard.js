import React from 'react';
import axios from 'axios';
import { Card } from "react-bootstrap";
import { Redirect, Link } from 'react-router-dom';
const playerList = require('../utils/playerList');


class PlayerCard extends React.Component {
    constructor() {
        super();
        this.state = {
            playerInfo: {},
            playerPhoto: "",
            errors: []
        }
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        console.log(this.props.player);
        axios.get(`/api/players/${this.props.player}/basics`)
        .then((results) => {
            if (results.data.basics === undefined) {
                this.setState({errors: "Could not retrieve player information"});
            } else {
                this.setState({
                    playerInfo: results.data.basics,
                    playerPhoto: results.data.photo
                });
            }
        })
        .catch((error) => {
            this.setState({errors: error});
        })
    }

    handleClick(event) {
        event.preventDefault();
        console.log(event.target.name);
        return (<Redirect to={{pathname: "/player/" + event.target.name}} push />);
    }

    render() {
        if (typeof(this.state.errors) === "object" && !(Object.keys(this.state.errors).length === 0)) {
            return null;
        }
        if (typeof(this.state.playerInfo) === "object" && (Object.keys(this.state.playerInfo).length === 0)) {
            return null;
        } else {
            return(
                <div className="col-sm-6 col-lg-4 col-xl-3 my-2">
                    <Link to={"/player/" + this.state.playerInfo.firstName + "%20" + this.state.playerInfo.lastName} style={{textDecoration: "none", color: "white"}}>
                        <Card bg="dark">
                            <Card.Img variant="top" src={this.state.playerPhoto}
                            />
                            <Card.Body>
                                <Card.Title>{this.state.playerInfo.firstName} {this.state.playerInfo.lastName}</Card.Title>
                                <Card.Text>{this.state.playerInfo.team}</Card.Text>
                                <Card.Text>{this.state.playerInfo.position} {this.state.playerInfo.number}</Card.Text>
                            </Card.Body>
                            </Card>
                    </Link>
                </div>
            );
        }
    }
}
export default PlayerCard;