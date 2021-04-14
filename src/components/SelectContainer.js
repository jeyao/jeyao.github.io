/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import styled from '@emotion/styled';
import React, {useState} from "react";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 10px;
  background: #f0f5ff;
`

const Left = styled.div`
  flex: 3;
`
const Right = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
`

const SelectItemContainer = styled.div`
  width: 100%;
  height: 50px;
  padding: 30px 10px;
  margin: 10px;
  border: ${props=>props.selfProp===props.curProp?'2px #2f54eb solid;':'2px #bfbfbf solid;'};
  border-radius: 3px;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family : 'Shadows Into Light',serif;
  background: aliceblue;
  cursor: pointer;
`

const SelectContainer = ({propsList,children}) => {
    const [cssProp,setCssProp] = useState(propsList[0]);

    const SelectItem = (prop,index)=>{
        return(
            <SelectItemContainer
                selfProp={prop}
                curProp = {cssProp}
                onClick={()=>setCssProp(prop)}
                key={`cssProps-${index}`}
            >
                {prop}
            </SelectItemContainer>
        )
    }

    return(
            <Container>
                <Left>
                    {propsList.map((prop,index)=>SelectItem(prop,index))}
                </Left>
                <Right>
                    {React.cloneElement(children, {cssProp})}
                </Right>
            </Container>
    )
};

export default SelectContainer;
