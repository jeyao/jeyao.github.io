/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { Tag } from 'antd'

const tagProps = {
    note     : {color:'#eb2f96',background:'#fff2e8',value:'Note'},
    example  : {color:'#13c2c2',background:'#e6fffb',value:'实例'},
    summary  : {color:'#722ed1',background:'#f9f0ff',value:'总结'},
    show  : {color:'#1890ff',background:'#e6f7ff',value:'阐述'},
}

const RegularTitle = ({ type = 'note' , title }) => (
    <div
        css={css`
              position: relative;
              display: flex;
              align-items: center;
              font-size: 15px;
              line-height: 18px;
              padding: 15px;
              margin-top: 20px;
              margin-bottom: 20px;
              border-radius: 10px;
              background: ${tagProps[type].background};
              box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
            `}
    >
        <Tag
            color={tagProps[type].color}
            style={{borderRadius: '0 0 5px 5px'}}
            css={css`
              position: absolute;
              top:0;
              font-weight: bold;
            `}
        >
            {tagProps[type].value}
        </Tag>
        {
            title?
                <span
                    css={css`
                      font-weight: bold;
                      color:${tagProps[type].color};
                      margin-top: 20px;
                    `
                    }
                >{title}</span>
                :null
        }
    </div>
);

export default RegularTitle;
