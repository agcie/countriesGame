import React from 'react';



interface PlayerProps{
    name: string;
    id: number;
    points: number;
    isCurrent: boolean;
}

const Player = (props: PlayerProps) => {


    return(
        <div className="Player">
            {props.isCurrent === true &&
                <h2>{props.name}: {props.points}</h2>
            }
            {props.isCurrent === false &&
                <h4>{props.name}: {props.points}</h4>
            }
        </div>
    )

}

export default Player;