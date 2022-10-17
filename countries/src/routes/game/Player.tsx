import React from 'react';



interface PlayerProps{
    id: number;
    points: number;
    isCurrent: boolean;
}

const Player = (props: PlayerProps) => {


    return(
        <div className="Player">
            {props.isCurrent === true &&
                <h2>Player {props.id}: {props.points}</h2>
            }
            {props.isCurrent === false &&
                <h4>Player {props.id}: {props.points}</h4>
            }
        </div>
    )

}

export default Player;