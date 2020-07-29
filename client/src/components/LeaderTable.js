import React from 'react';

export default function LeaderTable(props) {

    const leaders = props.players.map((player) => {
        return (
            <tr key={player.player}>
                <td>{player.rank}</td>
                <td>{player.player}</td>
                <td>{player.team}</td>
                <td>{player.value}</td>
            </tr>
        );
    })
        

    return (
        <div>
            <table className="table table-striped table-dark table-hover">
                <thead>
                    <tr>
                        <th colSpan='4'>{props.stat}</th>
                    </tr>
                </thead>
                <tbody>
                    {leaders}
                </tbody>
            </table>
        </div>
    )
}
