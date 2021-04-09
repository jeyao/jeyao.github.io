/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";


const ArticleEnding = () => (
    <div
        css={css`
          width: 100%;
          font-family : 'Shadows Into Light',serif;
          font-size: 32px;
          font-weight: bolder;
          
          margin: 50px 0;
          
          display: flex;
          justify-content: center;
          align-items: center;
        `}
    >
        Thanks for reading
    </div>
);

export default ArticleEnding;
