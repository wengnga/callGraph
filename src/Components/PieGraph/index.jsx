import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react';
export default class PieGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.onEvents = {
            'click': this.switchToAnthorPie.bind(this), //配置点击事件处理程序
        }
    }
    /*
    饼图的配置对象
    */
    getOption = () => {
        return {
            title: {
                text: 'Referer of a Website',
                subtext: 'Fake Data',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                selectedMode: false //禁止点击左上角不显示
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: '50%',
                    data: this.props.data.children[1].children,
                    tooltip: {
                        formatter: `{b} {c}<br/>100% 100% 100%<br/>100% 100% 100%`
                    },
                    label: {
                        normal: {
                            formatter: '{b}:{c}: ({d}%)', /* a（系列名称），b（数据项名称），c（数值）, d（百分比） */
                            textStyle: {
                                fontWeight: 'normal',
                                fontSize: 12
                            }
                        }
                    },
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
    };



    switchToAnthorPie(e) {
        console.log(e)
    }

    render() {
        return (
            <ReactEcharts option={this.getOption()} ref={node => { this.echartspie = node }} onEvents={this.onEvents} />
        )
    }
}
