/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

const SelectTransformExample = ({beforeProps,cssProp}) => {
    return(
        <div
            css={css`
              border-radius: 5px;
              ${beforeProps}
              
              &:hover{ ${cssProp} }
              `}
        />
    )
};

export default SelectTransformExample;
