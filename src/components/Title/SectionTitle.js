/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import styled from "@emotion/styled";

const SectionTitleContainer = styled.div`
  margin-top: 50px;
  margin-bottom: -20px;
  font-family : 'Shadows Into Light',serif;
  font-size: 40px;
  font-weight: bolder;
  color: #030852;
`

const SectionTitle = ({children,slug=''}) =>
    <SectionTitleContainer> Part {children} {slug?'|':null} {slug} </SectionTitleContainer>;

export default SectionTitle;
