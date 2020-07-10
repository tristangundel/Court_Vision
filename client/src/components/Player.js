import React from 'react';
import { Link } from 'react-router-dom';

// const playerInfo = {
//     "firstName":"LeBron",
//     "lastName":"James",
//     "teamId":"17",
//     "yearsPro":"16",
//     "collegeName":" ",
//     "country":"USA",
//     "playerId":"265",
//     "dateOfBirth":"1984-12-30",
//     "affiliation":"St. Vincent-St. Mary HS (OH)/USA",
//     "startNba":"2003",
//     "heightInMeters":"2.06",
//     "weightInKilograms":"113.4",
//     "leagues":{
//         "standard":{
//             "jersey":"23",
//             "active":"1",
//             "pos":"F"
//         }
//     }
// }
const playerInfo = {
    "firstName":"James",
    "lastName":"Harden",
    "teamId":"14",
    "yearsPro":"10",
    "collegeName":"Arizona State",
    "country":"USA",
    "playerId":"216",
    "dateOfBirth":"1989-08-26",
    "affiliation":"Arizona State/USA",
    "startNba":"2009",
    "heightInMeters":"1.96",
    "weightInKilograms":"99.8",
    "leagues": {
        "standard":{
            "jersey":"13",
            "active":"1",
            "pos":"G"
        }
    }
}

function getAge() {
    var today = new Date();
    var birthDate = new Date(playerInfo.dateOfBirth);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age = age - 1;
    }

    return age;
}

function getHeight() {
    var hinm = playerInfo.heightInMeters;
    var feet = Math.floor(hinm * 3.281);
    var inches = Math.floor(hinm * 39.37 % 12);
    var height = feet + "' " + inches + "\""

    return height;
}

function getWeight() {
    var wik = playerInfo.weightInKilograms;

    return Math.floor(wik * 2.205);
}
class Player extends React.Component {
    
    render() {
        return (
            <div className="player justify-content-center">
                <div className="text-light">
                    <div className="container  dark-overlay center">
                        <div className="row">
                            <div className="col-4">
                                <img src={ require('../img/201935.png')}></img>
                            </div>
                            <div className="col-8">
                                <h1>
                                    {playerInfo.firstName} {playerInfo.lastName}
                                    <small class="text-muted"> - {playerInfo.leagues.standard.pos}</small>
                                </h1>
                                <h3>
                                    Houston Rockets
                                    <small class="text-muted"> - #{playerInfo.leagues.standard.jersey}</small>
                                </h3>
                                <div className="row">
                                    <div className="col-3">
                                        <div>Height: {getHeight()}</div>
                                        <div>Weight: {getWeight()} lb</div>
                                    <div>Age: {getAge()}</div>
                                    </div>
                                    <div className="col-3 text-center">
                                        <h2>PPG</h2>
                                        <h3>34.4</h3>
                                    </div>
                                    <div className="col-3 text-center">
                                        <h2>RPG</h2>
                                        <h3>6.4</h3>
                                    </div>
                                    <div className="col-3 text-center">
                                        <h2>APG</h2>
                                        <h3>7.4</h3>
                                    </div>  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Player;
