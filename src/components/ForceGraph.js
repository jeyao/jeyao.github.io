import Echarts from "./Echarts";
import React from 'react';

const graphOption = (data)=>{
    const shortCategories= data.categories.map(function (a) {
        if( a.name === "root" || a.name === "node1"|| a.name === "node2") return ''
        return a.name;
    })
    return {
        tooltip: {
            hideDelay: 10,
            formatter: '{c}'
        },
        animation:true,
        legend: [{
            orient: 'vertical',
            left: 10,
            data: shortCategories
        }],
        toolbox: {
            show: true,
            feature: {
                restore: {},
                saveAsImage: {},
            }
        },
        animationDuration: 1500,
        animationEasingUpdate: 'quinticInOut',
        series:
            [
                {
                    type: 'graph',
                    layout: 'force',
                    emphasis: {
                        focus: 'adjacency',
                        blurScope:'series',
                        lineStyle: {
                            type: 'solid',
                            width: 10
                        }
                    },
                    draggable: true,
                    roam: true,
                    force: {
                        repulsion: 200
                    },
                    label: {
                        show: true,
                        position: 'bottom',
                        distance: 20
                    },
                    lineStyle: {
                        color: 'target',
                        type: 'dashed',
                        width: 3,
                        curveness: 0.5
                    },
                    selectedMode:'single',
                    select:{
                        itemStyle:{
                            borderWidth:2,
                        }
                    },
                    edgeLabel: {show: false},
                    edgeSymbol: ['circle', 'arrow'],
                    edgeSymbolSize: [2, 8],
                    symbolSize: 30,
                    categories: data.categories,
                    data: data.nodes ,
                    links: data.links.map((item)=>{
                        return {...item,emphasis:{label:{show:true,formatter:function(params){
                                        return params.data.name
                                    }}}}
                    }),
                }
            ]
    }
}

export const ForceGraph = (props)=>{
    const {data,onEvents} = props;

    if( data === null) return null;

    return(
        <Echarts
            option={graphOption(data)}
            style={{height:'800px'}}
            onEvents={onEvents}
        />
    )
}


export default ForceGraph;
