/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, keyframes } from "@emotion/react";
import styled from '@emotion/styled';

const Container = styled.div`
  margin: 100px auto;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 10px solid black;
  position: relative;
  
  > div{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
`

const rot = keyframes`
  from{
    transform: rotateZ(0);
  }
  to{
    transform: rotateZ(180deg);
  }
`

const SecContainer = styled.div`
  width: 90%;
  height: 90%;
  animation: 60s ${rot} infinite steps(60);
`

const Sec = styled.div`
  width: 2px;
  height: 50%;
  background: red;
  margin: 0 auto;
`

const MinContainer = styled.div`
  width: 70%;
  height: 70%;
  animation: 3600s ${rot} infinite steps(60);
`

const Min = styled.div`
  width: 4px;
  height: 50%;
  background: black;
  margin: 0 auto;
`

const HourContainer = styled.div`
  width: 50%;
  height: 50%;
  animation: 43200s ${rot} infinite steps(12);
`

const Hour = styled.div`
  width: 6px;
  height: 50%;
  background: black;
  margin: 0 auto;
`

const Clock = () => {
    return(
        <Container>
            <SecContainer>
                <Sec/>
            </SecContainer>
            <MinContainer>
                <Min/>
            </MinContainer>
            <HourContainer>
                <Hour/>
            </HourContainer>
        </Container>
    )
};

export default Clock;
