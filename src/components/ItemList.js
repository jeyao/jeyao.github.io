/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import styled from '@emotion/styled';

import { List, Tag, Typography, Tooltip } from 'antd';
import { GithubOutlined,ReadOutlined } from '@ant-design/icons';

const TagStyle = {
    good : 'volcano',
    Common : 'gold',
    Node : 'cyan',
    React : 'blue',
    Vue : 'green',
    Build : 'purple'
}

const Container = styled.div`
  height: 150px;
  padding: 20px 10px;
  border-radius : 5px;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
  position: relative;
  display : flex;
  flex-direction: column;
  justify-content : center;
  background: #fafafa;
`;

const Title = styled.p`
  margin-bottom: 10px;
  font-size: 20px;
  line-height: 22px;
  font-weight: bold;
  color: #030852;
`;

const LinkContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 20px;
`

const Link = styled.a`
  margin-left: 20px;
  color: #8c8c8c;
`;


const ItemList = ({data}) => {
    return(
        <List
            grid={{ gutter: 16, xs: 1, sm : 2, md: 2, lg:3, xl:3, xxl:3 }}
            dataSource={data}
            renderItem={item => (
                <List.Item>
                    <Container>
                        <Title>{item.title || null }</Title>
                        <Tooltip title={item.description||null} placement='bottom'>
                            <Typography.Paragraph ellipsis style={{fontSize: 12,color:'#595959'}}>
                                {item.description || null }
                            </Typography.Paragraph>
                        </Tooltip>
                        <div>{item.tags.map(tag=>
                            <Tag
                                color={TagStyle[tag]}
                                style={{
                                    borderRadius:3,
                                    fontSize:5,
                                    marginRight:5
                                }}
                            >
                                {tag === 'good' ? '👍' : tag}
                            </Tag>
                        )}</div>
                        <LinkContainer>
                            <Link
                                href={item.link || null}
                                target = '_blank'
                            >
                                <GithubOutlined
                                    style={{
                                        color:"black",
                                        height:10,
                                        width:10
                                    }} />
                            </Link>
                            {
                                item.docLink?
                                    <Link
                                        href={item.docLink}
                                        target = '_blank'
                                    >
                                        <ReadOutlined
                                            style={{
                                                color:"black",
                                                height:10,
                                                width:10
                                            }} />
                                    </Link>:null
                            }
                        </LinkContainer>
                    </Container>
                </List.Item>
            )}
        />
    )
};

export default ItemList;
