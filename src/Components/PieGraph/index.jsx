import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react';
import echartsTheme from '../../echartsTheme';
import { nanoid } from 'nanoid';
export default class PieGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.onEvents = {
            'click': this.switchToAnthorPie.bind(this), //配置点击事件处理程序
        }
    }
    componentDidMount() {
        console.log("pie graph props: ", this.props)
    }
    /*
    饼图的配置对象
    */
    getOption = () => {
        const data = this.props.data;
        const selfAvg = parseFloat(data[0]?.self?.split(" ")[1]);
        console.log("selfAvg: ", selfAvg);
        if (selfAvg > 0) {
            const len = data[0]?.children?.length;
            if (data[0]?.children[len - 1]?.name !== "self") {
                data[0]?.children?.push(
                    {
                        name: "self",
                        title: "self",
                        "category": "step",
                        text: "self",
                        key: `${data[0]?.key?.split("_"[0])}_self_${nanoid()}`,
                        total: "",
                        self: "",
                        children: [],
                        value: selfAvg
                    }
                )
            }

        }
        console.log("data: !!!!!", data);
        return {
            title: {
                text: this.props.title,
                // subtext: 'Fake Data',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            // legend: {
            //     orient: 'vertical',
            //     left: 'left',
            //     selectedMode: false //禁止点击左上角不显示
            // },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: '50%',
                    data: data,
                    tooltip: {
                        formatter: function (params) {
                            const { data: { name, value, self, total } } = params;
                            return `${name}: ${value}%<br/>${total}<br/>${self}`
                        }
                    },
                    label: {
                        normal: {
                            formatter: '{b}:{c}%: ({d}%)', /* a（系列名称），b（数据项名称），c（数值）, d（百分比） */
                            textStyle: {
                                fontWeight: 'normal',
                                fontSize: 12,
                                color: "white",
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
        console.log(e);
        const { setCurrentSelectNode, setExpandedTreeMenuKeys, expandedTreeMenuKeys } = this.props;
        if (e.data.children?.length > 0) { // 要有数据切换饼图
            setCurrentSelectNode([e.data.key], e.data);
            setExpandedTreeMenuKeys([...expandedTreeMenuKeys, e.data.key])
        }
    }

    render() {
        return (
            <ReactEcharts option={this.getOption()} ref={node => { this.echartspie = node }} onEvents={this.onEvents}
                theme={echartsTheme}
                style={{ width: '100%', height: '50%' }} />
        )
    }
}
