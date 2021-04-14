/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import styled from "@emotion/styled";

const ArticleEndingContainer = styled.div`
  width: 100%;
  margin: 50px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family : 'Shadows Into Light',serif;
  font-size: 32px;
  font-weight: bolder;
`

const ArticleEnding = () => (
    <ArticleEndingContainer>
        Thanks for reading
    </ArticleEndingContainer>
);

export default ArticleEnding;
