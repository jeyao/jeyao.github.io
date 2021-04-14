/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import styled from '@emotion/styled';

const BlueTitleContainer = styled.p`
  margin-bottom: 10px;
  padding-left: 5px;
  font-size: 16px;
  font-weight: bold;
  color: #1d39c4;
  background: #e6f7ff;
  border-radius: 3px;
`

const BlueTitle = ({children}) => (
    <BlueTitleContainer> {children} </BlueTitleContainer>
);

export default BlueTitle;
