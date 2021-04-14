/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

const SelectHoverExample = ({beforeProps,afterProps,cssProp}) => {
    return(
        <div
            css={css`
              border-radius: 5px;
              ${beforeProps}
              ${cssProp}
              &:hover{ ${afterProps}}
              `}
        />
    )
};

export default SelectHoverExample;
