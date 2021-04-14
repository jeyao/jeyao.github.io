/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import styled from '@emotion/styled';

const StepTitleContainer = styled.div`
  padding: 5px 10px;
  margin: 10px 0;
  border-radius: 3px;
  font-family: 'Shadows Into Light', serif;
  font-size: ${props=>!props.type ? '16px' : '14px'};
  font-weight: bolder;
  color: #030852;
  ${props=>!props.type ? 'border-left: 3px solid #030852' : ''}
`

const StepTitle = ({title,index,type=0}) => (
    <StepTitleContainer type={type}>
        Step { index } - {title}
    </StepTitleContainer>
);

export default StepTitle;
