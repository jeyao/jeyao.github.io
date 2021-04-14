import React, { useEffect } from 'react';
import * as echarts from 'echarts';

export const MyEcharts = (props)=>{
    const {
        option,
        style,
        className,
        lazyUpdate,
        onEvents,
    } = props;

    let chartsDom;
    useEffect(()=>{
        const instance = renderEchartsDom();
        if(instance!==null){
            bindEvents(instance, onEvents || {});
            // 大小自适应
            const resize = ()=> instance.resize();
            window.removeEventListener("resize", resize);
            window.addEventListener("resize", resize);
            return ()=> {
                echarts.dispose(instance);
                window.removeEventListener("resize", resize);
            };
        }
    }, [chartsDom, props]);

    const bindEvents = (instance, events) => {
        const _bindEvent = (eventName, func) => {
            instance.on(eventName, (param) => {
                func(param, instance);
            });
        };

        // loop and bind
        for (const eventName in events) {
            if (Object.prototype.hasOwnProperty.call(events, eventName)) {
                _bindEvent(eventName, events[eventName]);
            }
        }
    };
    const renderEchartsDom = () => {
        if(chartsDom){
            const echartsObj = echarts.getInstanceByDom(chartsDom) || echarts.init(chartsDom);
            // set the echart option
            echartsObj.setOption(option, lazyUpdate || false);
            return echartsObj;
        }
        return null;
    };


    return <div
        ref={(el) => chartsDom = el}
        style={style}
        className={className}
    />
}

MyEcharts.defaultProps = {
    style : {height:'800px'}
}
export default MyEcharts;
