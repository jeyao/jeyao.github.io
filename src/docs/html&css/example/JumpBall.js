/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx,keyframes } from "@emotion/react";
import styled from '@emotion/styled';
import  {useState} from 'react';

const Container = styled.div`
  width: 100%;
  background: #f0f5ff;
`

const Space = styled.div`
  margin: 0 auto;
  width: 400px;
  height: 400px;
  border-bottom: #0C0C0C solid 2px;
  overflow: hidden;
`

const Ball = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: orange;
`
const ballDrop = keyframes`
  from{
    margin-top: 0;
  }
  33%{
    margin-top: 300px;
    animation: ease-out;
  }
  66%{
    margin-top: 100px;
    animation: ease-in;
  }
  to{
    margin-top: 300px;
  }
`

const BallMove = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: orange;
  animation: ${ballDrop} 3s forwards ease-in;
  animation-iteration-count:infinite;
`


const JumpBall = ({move}) => {
    const [ pause , setPause ] = useState(true)
    return(
        <Container onClick = {()=>setPause(!pause)}>
            <Space>
                {move && !pause?
                    <BallMove/>
                    :
                    <Ball/>
                }
            </Space>
        </Container>
    )
};

export default JumpBall;
