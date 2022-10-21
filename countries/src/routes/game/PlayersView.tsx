import React from 'react';
import styled from 'styled-components';
import Player from './Player';

interface ContainerProps {
    count: number;
  }

const Cont = styled.div<ContainerProps>`
    display: grid;
    grid-template-columns: repeat(${props => props.count}, 1fr);
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
}

const PlayersView = (props: PlayerViewProps) => {
    return(
        <div>
            {!props.ended &&
                <Cont count={props.players.length}> {props.players.map(({pname,  points, isActive}, index) => {return (<Player name={pname} points={points} isCurrent={isActive} id={index+1}/>)})}
                </Cont>
            }
            {props.ended &&
                <Cont count={props.players.length}> {props.players.map(({pname,  points}, index) => {return (<Player name={pname} points={points} isCurrent={false} id={index+1}/>)})}
                </Cont>
            }
       </div>
    )

}

export default PlayersView;