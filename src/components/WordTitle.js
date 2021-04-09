/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { Tag } from 'antd'

const tagProps = {
    define    : {color:'#1d39c4',colorName:'geekblue',background:'#f0f5ff',value:'定义'},
    abstract     : {color:'#d48806',colorName:'gold',background:'#fffbe6',value:'关键词'},
    key     : {color:'#d4380d',colorName:'volcano',background:'#fff2e8',value:'核心'},
}

const WordTitle = ({children,type ='define'}) => (
    <div
        css={css`
              display: flex;
              align-items: center;
              font-size: 14px;
              line-height: 18px;
              margin-top: 20px;
              margin-bottom: 20px;         
        `}
    >
        <Tag
            color={tagProps[type].colorName}
            css={css`
              font-weight: bold;
              margin-right: 10px;
              border-radius: 2px;
            `}
        >
            {tagProps[type].value}
        </Tag>
        <span css={css`font-weight: bold; color:${tagProps[type].color}`}>{children}</span>
    </div>
);

export default WordTitle;
