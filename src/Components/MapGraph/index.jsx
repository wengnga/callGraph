import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react';
import axios from 'axios'
export default class MapGraph extends Component {
    state = {
        options: {}
    }
    /*
    块状映射图的配置对象
    */
    getOption = (tempData) => {
        return {
            title: {
                text: 'ECharts Options',
                subtext: '2016/04',
                left: 'leafDepth'
            },
            tooltip: {},
            series: [
                {
                    name: 'option',
                    type: 'treemap',
                    visibleMin: 300,
                    data: tempData.children,
                    leafDepth: 4, //能看见的深度
                    levels: [
                        {
                            itemStyle: {
                                borderColor: '#555',
                                borderWidth: 4,
                                gapWidth: 4
                            }
                        },
                        {
                            colorSaturation: [0.3, 0.6],
                            itemStyle: {
                                borderColorSaturation: 0.7,
                                gapWidth: 2,
                                borderWidth: 2
                            }
                        },
                        {
                            colorSaturation: [0.3, 0.5],
                            itemStyle: {
                                borderColorSaturation: 0.6,
                                gapWidth: 1
                            }
                        },
                        {
                            colorSaturation: [0.3, 0.5]
                        }
                    ]
                }
            ]
        }
    };

    componentDidMount() {
        this.setState({
            options: this.getOption(this.props.data)
        })

    }
    render() {
        return (
            <ReactEcharts option={this.state.options} />
        )
    }
}
