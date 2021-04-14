/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from '@emotion/styled';
import React, {useEffect, useState} from "react";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 20px;
  margin-bottom : 20px;
  background: #f0f5ff;
  font-family : 'Shadows Into Light',serif;
`

const Header = styled.div`
  width: 100%;
  padding: 20px;
  border-radius: 3px;
  background: #d6e4ff;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)
`

const Tag = styled.span`
  padding: 2px 5px;
  font-weight: bolder;
  font-size: 15px;
  border-radius: 3px;
  color:white;
  background: #597ef7;
`

const SubContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  background: #f0f5ff;
`

const Left = styled.div`
  flex: 3;
`

const Right = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  position: relative;
`

const Circle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 50px;
  width: 50px;
  border-radius: 50%;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  font-weight: bolder;
  line-height: 50px;
  text-align: center;
  cursor: pointer;
`

const Line = styled.p`
  margin: 10px 0 ;
  font-size: 15px;
  line-height: 18px;
`

const orderIndex = {
    pre : 0,
    in : 1,
    post : 2
}
const orderTitle = ['前序遍历', '中序遍历', '后序遍历']

const TreeExplain = ({bounding,order,nodeList,buildFun=null,returnVal=null}) => {
    const [clickedItem,setClickedItem] = useState(0);
    const [titleList,setTitleList] = useState(['左子树','右子树']);

    useEffect(()=>{
        const tmp = [...titleList];
        tmp.splice(orderIndex[order],0,'节点');
        setTitleList(tmp)
    },[]);

    const SelectItem = (prop,index)=>{
        return(
            <div
                onClick={()=>setClickedItem(index)}
                key={`TreeNode-${index}`}
                css={css`
                  position: relative;
                  width: 100%;
                  cursor: pointer;
                  border: ${index===clickedItem?'2px #ffc53d solid;':'1px #f6ffed solid;'}
                  border-radius: 3px;
                  padding: 25px 10px 5px 10px;
                  margin-top: 10px;
                  background: #fff;
                  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
                `}
            >
                <Tag
                    css={
                        css`
                        border-radius: 0 0 3px 3px;
                        position: absolute;
                        left: 10px;
                        top:0;`
                    }
                >
                    {titleList[index]}
                </Tag>
                {typeof prop === 'string' ? <Line>{prop}</Line> : prop.map(item => <Line>{item}</Line>)}
            </div>
        )
    }

    return(
        <Container>
            <Tag style={{marginBottom:'10px'}} >{orderTitle[orderIndex[order]]}</Tag>
            <Header>
                {buildFun? ( <React.Fragment><Tag>造树函数</Tag><Line>{buildFun.trim()}</Line></React.Fragment>) : null}
                {returnVal? ( <React.Fragment><Tag>返回值</Tag><Line>{returnVal.trim()}</Line></React.Fragment>) : null}
                {!buildFun? (
                    <React.Fragment><Tag>边界条件</Tag>{bounding.map(item=><Line>{item.trim()}</Line>)}</React.Fragment>)
                    :
                    <React.Fragment><Tag style={{display:'inline'}}>跳出条件</Tag><Line style={{display:'inline',marginLeft:'10px'}}>{bounding}</Line></React.Fragment>}
            </Header>
            <SubContainer>
                <Left>
                    {nodeList.map((prop,index)=>SelectItem(prop, index))}
                </Left>
                <Right>
                    <Circle
                        onClick={()=>setClickedItem(0)}
                        css={css`
                          transform: translate(-50%, -125%);
                          background: ${ titleList[clickedItem] === '节点' ? '#ffc53d':'#73d13d' }
                        `
                        }
                    >
                        Root
                    </Circle>
                    <Circle
                        onClick={()=>setClickedItem(1)}
                        css={css`
                          transform: translate(-125%, 0);
                          background: ${ titleList[clickedItem] === '左子树' ? '#ffc53d':'#73d13d' }
                        `
                        }
                    >
                        l
                    </Circle>
                    <Circle
                        onClick={()=>setClickedItem(2)}
                        css={css`
                          transform: translate(25%, 0);
                          background: ${ titleList[clickedItem] === '右子树' ? '#ffc53d':'#73d13d' }
                        `
                        }
                    >
                        r
                    </Circle>
                </Right>
            </SubContainer>
        </Container>
    )
};

export default TreeExplain;
