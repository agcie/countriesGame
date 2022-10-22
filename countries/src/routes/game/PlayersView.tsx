import React from 'react';
import styled from 'styled-components';
import Player from './Player';

interface ContainerProps {
    count: number;
  }

const Cont = styled.div<ContainerProps>`
    display: grid;
    grid-template-rows: repeat(${props => props.count}, 1fr);
`;

interface PlayerProps{
    pname: string;
    points: number;
    isActive: boolean;
}
type playersArr = PlayerProps[];

interface PlayerViewProps{
    players: playersArr;
    ended: boolean
    currentPoints: number;
}

const PlayersView = (props: PlayerViewProps) => {
    return(
        <div>
            {!props.ended &&
                <Cont count={props.players.length}> 
                {props.players.map(({pname,  points, isActive}, index) => 
                {return (<Player name={pname} points={points} isCurrent={isActive} id={index+1} currentPoints={props.currentPoints}/>)})}
                </Cont>
            }
            {props.ended &&
                <Cont count={props.players.length}>
                     {props.players.map(({pname,  points}, index) =>
                      {return (<Player name={pname} points={points} isCurrent={false} id={index+1} currentPoints={props.currentPoints}/>)})}
                </Cont>
            }
       </div>
    )

}

export default PlayersView;