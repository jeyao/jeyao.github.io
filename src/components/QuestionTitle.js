/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

const QuestionTitle = ({children}) => (
    <div
        css={css`
              font-size: 16px;
              font-weight: bold;
              line-height: 18px;
              margin-top: 40px;
              margin-bottom: 20px;
              color:#434343;
        `}
    >
        🤔
        <span
            css={css`
              margin-left: 10px;
            `}
        >{children}</span>
    </div>
);

export default QuestionTitle;
