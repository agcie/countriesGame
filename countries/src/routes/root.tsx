import styled from 'styled-components';


const Cont = styled.div`
margin-left: 25%;
margin-top: 15%;
padding: 10px;
background-color: lightgreen;
`;

const Link = styled.a`

  font-size: 5em;
  margin: 50px;
  padding: 15px;
  border-radius: 20px;
  color: white;
  box-shadow: 10px 10px 5px;
  background-image: linear-gradient(pink, purple);
  text-decoration: none;
  
  &:hover {
    color: black;
  }
`
export default function Root() 

{
    return (
      <Cont id="menu">
          <Link href={`game`}>Game</Link>
          <Link href={`add`}>Add</Link>
      </Cont>
    );
  }