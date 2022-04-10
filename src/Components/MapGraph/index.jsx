import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react';
import echartsTheme from '../../echartsTheme';
import axios from 'axios'
export default class MapGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.onEvents = {
            'click': this.switchToAnthorPie.bind(this), //配置点击事件处理程序
        }
    }
    switchToAnthorPie(e) {
        console.log(e);
        // const { setCurrentSelectNode, setExpandedTreeMenuKeys, expandedTreeMenuKeys } = this.props;
        // if (e.data.children?.length > 0) { // 要有数据切换饼图
        //     setCurrentSelectNode([e.data.key], e.data);
        //     setExpandedTreeMenuKeys([...expandedTreeMenuKeys, e.data.key])
        // }
    }
    /*
    块状映射图的配置对象
    */
    getOption = (tempData, settings) => {
        const { leafDepth, treeMapWidth, treeMapHeight, treeMapVisibleMin, childrenVisibleMin } = settings;
        return {
            title: {
                // text: 'Map Graph',
                // subtext: '2016/04',
                left: 'leafDepth'
            },
            tooltip: {
                formatter: function (params) {
                    const { data: { name, value, self, total } } = params;
                    return `${name}: ${value}%<br/>${total}<br/>${self}`
                }
            },
            series: [
                {
                    name: 'func',
                    type: 'treemap',
                    width: `${treeMapWidth}%`,
                    height: `${treeMapHeight}%`,
                    visibleMin: treeMapVisibleMin,
                    childrenVisibleMin: childrenVisibleMin,
                    label: {
                        show: true,
                        formatter: '{b}',
                    },
                    upperLabel: {
                        normal: {
                            show: true,
                            height: 30,
                            textStyle: {
                                fontWeight: 'normal',
                                fontSize: 12,
                                color: "white",
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            borderColor: 'black'
                        },
                        // emphasis: {
                        //     borderColor: '#ddd',
                        // }
                    },
                    data: tempData.children,
                    // itemStyle: {
                    //     // borderWidth: 2,
                    //     // gapWidth: 2,
                    //     // borderColor: "rgba(190, 190, 190, 1)",
                    //     // borderColorSaturation: 1,

                    // },
                    leafDepth: leafDepth, //能看见的深度
                    levels: [
                        // 1
                        {

                            itemStyle: {
                                normal: {
                                    color: '#dd6b66',
                                    borderColor: '#555',
                                    borderWidth: 0,
                                    gapWidth: 5
                                }
                            },
                        },
                        // 2
                        {
                            itemStyle: {
                                normal: {
                                    color: '#759aa0',
                                    borderColor: '#777',
                                    borderWidth: 5,
                                    gapWidth: 5
                                },
                            }
                        },
                        // 3
                        {
                            colorSaturation: [0.35],
                            itemStyle: {
                                normal: {
                                    color: '#e69d87',
                                    borderWidth: 3,
                                    gapWidth: 5,
                                    borderColorSaturation: 0.6
                                }
                            }
                        },
                        // 4
                        {
                            colorSaturation: [0.4],
                            itemStyle: {
                                normal: {
                                    color: '#8dc1a9',
                                    borderWidth: 3,
                                    gapWidth: 5,
                                    borderColorSaturation: 0.55
                                }
                            }
                        },
                        // 5
                        {
                            colorSaturation: [0.35],
                            itemStyle: {
                                normal: {
                                    color: '#ea7e53',
                                    borderWidth: 3,
                                    gapWidth: 5,
                                    borderColorSaturation: 0.45
                                }
                            }
                        },
                        // 6
                        {
                            colorSaturation: [0.35],
                            itemStyle: {
                                normal: {
                                    color: '#c12e34',
                                    borderWidth: 3,
                                    gapWidth: 5,
                                    borderColorSaturation: 0.6
                                }
                            }
                        },
                        // 7
                        {
                            colorSaturation: [0.4],
                            itemStyle: {
                                normal: {
                                    color: '#616130',
                                    borderWidth: 3,
                                    gapWidth: 5,
                                    borderColorSaturation: 0.55
                                }
                            }
                        },
                        // 8
                        {
                            colorSaturation: [0.35],
                            itemStyle: {
                                normal: {
                                    color: '#484891',
                                    borderWidth: 3,
                                    gapWidth: 5,
                                    borderColorSaturation: 0.45
                                }
                            }
                        },
                        // 9
                        {
                            colorSaturation: [0.35],
                            itemStyle: {
                                normal: {
                                    color: '#6C3365',
                                    borderWidth: 3,
                                    gapWidth: 5,
                                    borderColorSaturation: 0.6
                                }
                            }
                        },
                        // 10
                        {
                            colorSaturation: [0.4],
                            itemStyle: {
                                normal: {
                                    color: '#616130',
                                    borderWidth: 3,
                                    gapWidth: 5,
                                    borderColorSaturation: 0.55
                                }
                            }
                        },
                        // 11
                        {
                            colorSaturation: [0.35],
                            itemStyle: {
                                normal: {
                                    color: '#eedd78',
                                    borderWidth: 3,
                                    gapWidth: 5,
                                    borderColorSaturation: 0.45
                                }
                            }
                        },
                        // 12
                        {
                            colorSaturation: [0.35],
                            itemStyle: {
                                normal: {
                                    color: '#73a373',
                                    borderWidth: 3,
                                    gapWidth: 5,
                                    borderColorSaturation: 0.6
                                }
                            }
                        },
                        // 13
                        {
                            colorSaturation: [0.4],
                            itemStyle: {
                                normal: {
                                    color: '#73b9bc',
                                    borderWidth: 3,
                                    gapWidth: 5,
                                    borderColorSaturation: 0.55
                                }
                            }
                        },
                        // 14
                        {
                            colorSaturation: [0.35],
                            itemStyle: {
                                normal: {
                                    color: '#7289ab',
                                    borderWidth: 3,
                                    gapWidth: 5,
                                    borderColorSaturation: 0.45
                                }
                            }
                        },
                        // 15
                        {
                            colorSaturation: [0.35],
                            itemStyle: {
                                normal: {
                                    color: '#91ca8c',
                                    borderWidth: 3,
                                    gapWidth: 5,
                                    borderColorSaturation: 0.6
                                }
                            }
                        },
                        // 16
                        {
                            colorSaturation: [0.4],
                            itemStyle: {
                                normal: {
                                    color: '#f49f42',
                                    borderWidth: 3,
                                    gapWidth: 5,
                                    borderColorSaturation: 0.55
                                }
                            }
                        },
                        // 17
                        {
                            colorSaturation: [0.35],
                            itemStyle: {
                                normal: {
                                    color: '#c12e34',
                                    borderWidth: 3,
                                    gapWidth: 5,
                                    borderColorSaturation: 0.45
                                }
                            }
                        },
                        // 18
                        {
                            colorSaturation: [0.35],
                            itemStyle: {
                                normal: {
                                    color: '#e6b600',
                                    borderWidth: 3,
                                    gapWidth: 5,
                                    borderColorSaturation: 0.6
                                }
                            }
                        },
                        // 19
                        {
                            colorSaturation: [0.4],
                            itemStyle: {
                                normal: {
                                    color: '#0098d9',
                                    borderWidth: 3,
                                    gapWidth: 5,
                                    borderColorSaturation: 0.55
                                }
                            }
                        },
                        // 20
                        {
                            colorSaturation: [0.35],
                            itemStyle: {
                                normal: {
                                    color: '#2b821d',
                                    borderWidth: 3,
                                    gapWidth: 5,
                                    borderColorSaturation: 0.45
                                }
                            }
                        },
                        // 21
                        {
                            colorSaturation: [0.35],
                            itemStyle: {
                                normal: {
                                    color: '#005eaa',
                                    borderWidth: 3,
                                    gapWidth: 5,
                                    borderColorSaturation: 0.6
                                }
                            }
                        },
                        // 22
                        {
                            colorSaturation: [0.4],
                            itemStyle: {
                                normal: {
                                    color: '#339ca8',
                                    borderWidth: 3,
                                    gapWidth: 5,
                                    borderColorSaturation: 0.55
                                }
                            }
                        },
                        // 23
                        {
                            colorSaturation: [0.35],
                            itemStyle: {
                                normal: {
                                    color: '#cda819',
                                    borderWidth: 3,
                                    gapWidth: 5,
                                    borderColorSaturation: 0.45
                                }
                            }
                        },
                        // 24
                        {
                            colorSaturation: [0.35],
                            itemStyle: {
                                normal: {
                                    color: '#32a487',
                                    borderWidth: 3,
                                    gapWidth: 5,
                                    borderColorSaturation: 0.6
                                }
                            }
                        },
                        // 25
                        {
                            colorSaturation: [0.4],
                            itemStyle: {
                                normal: {
                                    color: '#9b8bba',
                                    borderWidth: 3,
                                    gapWidth: 5,
                                    borderColorSaturation: 0.55
                                }
                            }
                        },
                        // 26
                        {
                            colorSaturation: [0.35],
                            itemStyle: {
                                normal: {
                                    color: '#e098c7',
                                    borderWidth: 3,
                                    gapWidth: 5,
                                    borderColorSaturation: 0.45
                                }
                            }
                        },
                        // 27
                        {
                            colorSaturation: [0.35],
                            itemStyle: {
                                normal: {
                                    color: '#8fd3e8',
                                    borderWidth: 3,
                                    gapWidth: 5,
                                    borderColorSaturation: 0.6
                                }
                            }
                        },
                        // 28
                        {
                            colorSaturation: [0.4],
                            itemStyle: {
                                normal: {
                                    color: '#71669e',
                                    borderWidth: 3,
                                    gapWidth: 5,
                                    borderColorSaturation: 0.55
                                }
                            }
                        },
                        // 29
                        {
                            colorSaturation: [0.35],
                            itemStyle: {
                                normal: {
                                    color: '#cc70af',
                                    borderWidth: 3,
                                    gapWidth: 5,
                                    borderColorSaturation: 0.45
                                }
                            }
                        },
                        // 30
                        {
                            colorSaturation: [0.35],
                            itemStyle: {
                                normal: {
                                    color: '#c12e34',
                                    borderWidth: 3,
                                    gapWidth: 5,
                                    borderColorSaturation: 0.45
                                }
                            }
                        },
                        // 3
                        {
                            colorSaturation: [0.35],
                            itemStyle: {
                                normal: {
                                    color: '#e69d87',
                                    borderWidth: 3,
                                    gapWidth: 5,
                                    borderColorSaturation: 0.6
                                }
                            }
                        },
                        // 4
                        {
                            colorSaturation: [0.4],
                            itemStyle: {
                                normal: {
                                    color: '#8dc1a9',
                                    borderWidth: 3,
                                    gapWidth: 5,
                                    borderColorSaturation: 0.55
                                }
                            }
                        },
                        // 5
                        {
                            colorSaturation: [0.35],
                            itemStyle: {
                                normal: {
                                    color: '#ea7e53',
                                    borderWidth: 3,
                                    gapWidth: 5,
                                    borderColorSaturation: 0.45
                                }
                            }
                        },
                        // 6
                        {
                            colorSaturation: [0.35],
                            itemStyle: {
                                normal: {
                                    color: '#642100',
                                    borderWidth: 3,
                                    gapWidth: 5,
                                    borderColorSaturation: 0.6
                                }
                            }
                        },
                        // 7
                        {
                            colorSaturation: [0.4],
                            itemStyle: {
                                normal: {
                                    color: '#616130',
                                    borderWidth: 3,
                                    gapWidth: 5,
                                    borderColorSaturation: 0.55
                                }
                            }
                        },
                        // 8
                        {
                            colorSaturation: [0.35],
                            itemStyle: {
                                normal: {
                                    color: '#484891',
                                    borderWidth: 3,
                                    gapWidth: 5,
                                    borderColorSaturation: 0.45
                                }
                            }
                        },
                        // 9
                        {
                            colorSaturation: [0.35],
                            itemStyle: {
                                normal: {
                                    color: '#6C3365',
                                    borderWidth: 3,
                                    gapWidth: 5,
                                    borderColorSaturation: 0.6
                                }
                            }
                        },
                        // 10
                        {
                            colorSaturation: [0.4],
                            itemStyle: {
                                normal: {
                                    color: '#616130',
                                    borderWidth: 3,
                                    gapWidth: 5,
                                    borderColorSaturation: 0.55
                                }
                            }
                        },
                        // 11
                        {
                            colorSaturation: [0.35],
                            itemStyle: {
                                normal: {
                                    color: '#eedd78',
                                    borderWidth: 3,
                                    gapWidth: 5,
                                    borderColorSaturation: 0.45
                                }
                            }
                        },
                        // 12
                        {
                            colorSaturation: [0.35],
                            itemStyle: {
                                normal: {
                                    color: '#73a373',
                                    borderWidth: 3,
                                    gapWidth: 5,
                                    borderColorSaturation: 0.6
                                }
                            }
                        },
                        // 13
                        {
                            colorSaturation: [0.4],
                            itemStyle: {
                                normal: {
                                    color: '#73b9bc',
                                    borderWidth: 3,
                                    gapWidth: 5,
                                    borderColorSaturation: 0.55
                                }
                            }
                        },
                        // 14
                        {
                            colorSaturation: [0.35],
                            itemStyle: {
                                normal: {
                                    color: '#7289ab',
                                    borderWidth: 3,
                                    gapWidth: 5,
                                    borderColorSaturation: 0.45
                                }
                            }
                        },
                        // 15
                        {
                            colorSaturation: [0.35],
                            itemStyle: {
                                normal: {
                                    color: '#91ca8c',
                                    borderWidth: 3,
                                    gapWidth: 5,
                                    borderColorSaturation: 0.6
                                }
                            }
                        },
                        // 16
                        {
                            colorSaturation: [0.4],
                            itemStyle: {
                                normal: {
                                    color: '#f49f42',
                                    borderWidth: 3,
                                    gapWidth: 5,
                                    borderColorSaturation: 0.55
                                }
                            }
                        },
                        // 17
                        {
                            colorSaturation: [0.35],
                            itemStyle: {
                                normal: {
                                    color: '#c12e34',
                                    borderWidth: 3,
                                    gapWidth: 5,
                                    borderColorSaturation: 0.45
                                }
                            }
                        },
                        // 18
                        {
                            colorSaturation: [0.35],
                            itemStyle: {
                                normal: {
                                    color: '#e6b600',
                                    borderWidth: 3,
                                    gapWidth: 5,
                                    borderColorSaturation: 0.6
                                }
                            }
                        },
                        // 19
                        {
                            colorSaturation: [0.4],
                            itemStyle: {
                                normal: {
                                    color: '#0098d9',
                                    borderWidth: 3,
                                    gapWidth: 5,
                                    borderColorSaturation: 0.55
                                }
                            }
                        },
                        // 20
                        {
                            colorSaturation: [0.35],
                            itemStyle: {
                                normal: {
                                    color: '#2b821d',
                                    borderWidth: 3,
                                    gapWidth: 5,
                                    borderColorSaturation: 0.45
                                }
                            }
                        },
                        // 21
                        {
                            colorSaturation: [0.35],
                            itemStyle: {
                                normal: {
                                    color: '#005eaa',
                                    borderWidth: 3,
                                    gapWidth: 5,
                                    borderColorSaturation: 0.6
                                }
                            }
                        },
                        // 22
                        {
                            colorSaturation: [0.4],
                            itemStyle: {
                                normal: {
                                    color: '#339ca8',
                                    borderWidth: 3,
                                    gapWidth: 5,
                                    borderColorSaturation: 0.55
                                }
                            }
                        },
                        // 23
                        {
                            colorSaturation: [0.35],
                            itemStyle: {
                                normal: {
                                    color: '#cda819',
                                    borderWidth: 3,
                                    gapWidth: 5,
                                    borderColorSaturation: 0.45
                                }
                            }
                        },
                        // 24
                        {
                            colorSaturation: [0.35],
                            itemStyle: {
                                normal: {
                                    color: '#32a487',
                                    borderWidth: 3,
                                    gapWidth: 5,
                                    borderColorSaturation: 0.6
                                }
                            }
                        },
                        // 25
                        {
                            colorSaturation: [0.4],
                            itemStyle: {
                                normal: {
                                    color: '#9b8bba',
                                    borderWidth: 3,
                                    gapWidth: 5,
                                    borderColorSaturation: 0.55
                                }
                            }
                        },
                        // 26
                        {
                            colorSaturation: [0.35],
                            itemStyle: {
                                normal: {
                                    color: '#e098c7',
                                    borderWidth: 3,
                                    gapWidth: 5,
                                    borderColorSaturation: 0.45
                                }
                            }
                        },
                        // 27
                        {
                            colorSaturation: [0.35],
                            itemStyle: {
                                normal: {
                                    color: '#8fd3e8',
                                    borderWidth: 3,
                                    gapWidth: 5,
                                    borderColorSaturation: 0.6
                                }
                            }
                        },
                        // 28
                        {
                            colorSaturation: [0.4],
                            itemStyle: {
                                normal: {
                                    color: '#71669e',
                                    borderWidth: 3,
                                    gapWidth: 5,
                                    borderColorSaturation: 0.55
                                }
                            }
                        },
                        // 29
                        {
                            colorSaturation: [0.35],
                            itemStyle: {
                                normal: {
                                    color: '#cc70af',
                                    borderWidth: 3,
                                    gapWidth: 5,
                                    borderColorSaturation: 0.45
                                }
                            }
                        },
                        // 30
                        {
                            colorSaturation: [0.35],
                            itemStyle: {
                                normal: {
                                    color: '#c12e34',
                                    borderWidth: 3,
                                    gapWidth: 5,
                                    borderColorSaturation: 0.45
                                }
                            }
                        }
                    ]
                }
            ]
        }
    };

    componentDidMount() {
        // this.setState({
        //     options: this.getOption(this.props.allData)
        // })

    }

    render() {
        return (
            <ReactEcharts option={this.getOption(this.props.allData, this.props.settings)}
                onEvents={this.onEvents}
                theme={echartsTheme}
                style={{ width: '100%', height: '50%' }} />
        )
    }
}
