import React from 'react';

import styled from 'styled-components';

interface ContProps {
    active: boolean;
  }

const Cont = styled.div<ContProps>`
  border-radius: 20px;
  border: ${props=>props.active? 3 : 1}px solid black;
  box-shadow: ${props=>props.active? 3 : 0}px ${props=>props.active? 3 : 0}px;
  margin: 10px;
  padding: 10px;

`;

interface PlayerProps{
    name: string;
    id: number;
    points: number;
    isCurrent: boolean;
}

const Player = (props: PlayerProps) => {


    return(
        <Cont active={props.isCurrent}>
            {props.isCurrent === true &&
                <h2>{props.name}: {props.points}</h2>
            }
            {props.isCurrent === false &&
                <h4>{props.name}: {props.points}</h4>
            }
        </Cont>
    )

}

export default Player;