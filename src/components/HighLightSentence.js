/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

const highlight = {
    default : '#000000',
    warning : '#ff4d4f',
    calm    : '#13c2c2',
}

const HighLightSentence = ({ children, type = 'default'}) => (
    <div
        css={css`
          font-weight: bold;
          color: ${highlight[type]};
          margin-bottom: 20px;
        `}
    >
        {children}
    </div>
);

export default HighLightSentence;
