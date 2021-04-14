/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import styled from '@emotion/styled';
import {EditOutlined,SearchOutlined} from "@ant-design/icons";

const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 20px 20px 20px;
  margin-bottom : 20px;
  background: #f0f5ff;
  font-family : 'Shadows Into Light',serif;
`

const Header = styled.div`
  width: 100%;
  position: relative;
  padding: 25px 20px 10px 20px;
  border-radius: 3px;
  background: #fff;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  
`

const HashTag = styled.div`
  position: absolute;
  top : 0;
  left : 10px;
  padding: 3px 5px;
  border-radius: 0 0 3px 3px;
  background: #1d39c4;
  color:#fff;
  font-size: 15px;
  line-height: 20px;
`

const Line = styled.p`
  margin: 10px 0 ;
  font-size: 15px;
  line-height: 18px;
`

const HashContainer = styled.div`
  width: 100%;
  display : flex;
  justify-content: center;
  align-items: center;
`

const HashContainerItem = styled.div`
  display : flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 3px;
  padding: 10px 20px;
  margin : 0 5px;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
`

const HashContainerTitle = styled.p`
  margin: 0;
  font-weight: 1400;
  font-size: 12px;
  color: #0C0C0C;
`

const BraceText = styled.div`
  font-weight: bolder;
  font-size: 20px;
  margin: 0 30px;
`

const renderMapContainer = ({brace='{}',key='Key',value='Value',keyValue,valueValue})=>{
    const container = (keyVal,valueVal)=>(
        <HashContainer>
            <BraceText>{brace[0]}</BraceText>
            {key!=='set'?
                <HashContainerItem style={{background:'#e6f7ff'}}>
                    <HashContainerTitle>{key}</HashContainerTitle>
                    <Line style={{margin:0}}>{keyVal}</Line>
                </HashContainerItem>:null
            }
            <HashContainerItem style={{background:'#fffbe6'}}>
                <HashContainerTitle>{value}</HashContainerTitle>
                <Line style={{margin:0}}>{valueVal}</Line>
            </HashContainerItem>
            <BraceText>{brace[1]}</BraceText>
        </HashContainer>
    )

    if( typeof valueValue === 'string') return container(keyValue,valueValue);
    else return valueValue.map((item,index)=>(container(keyValue[index],item)));
}

const renderNumContainer = (props)=>{
    return renderMapContainer({
        brace:'[]',key : 'index',...props
    })
}

const renderSetContainer = (props)=>{
    return renderMapContainer({
        key : 'set',...props
    })
}

const renderHashContainer = (type,keyValue,valueValue)=>{

    switch (type){
        case 'map' :
            return renderMapContainer({keyValue,valueValue});
        case 'set' :
            return renderSetContainer({keyValue,valueValue});
        case 'num' :
            return renderNumContainer({keyValue,valueValue});
    }
}

const typeName = {
    num : '数组',
    set : 'SET',
}

const HashExplain = ({type,target,targetValue,hashDesc,keyValue,valueValue}) => {
    return(
        <Container>
            <HashTag style={{background:'#08979c'}} >
                适用于{type==='map'?null:typeName[type]+','} MAP
            </HashTag>
            <Header>
                <HashTag>
                    { target === 'search' ? <SearchOutlined /> : <EditOutlined /> }
                    { target === 'search' ? '查找' : '记录' }
                </HashTag>
                <Line>{targetValue}</Line>
            </Header>
            <div>
                <Line style={{margin:'10px 10px'}}>{hashDesc}</Line>
                {renderHashContainer(type,keyValue,valueValue)}
            </div>
        </Container>
    )
};

export default HashExplain;
