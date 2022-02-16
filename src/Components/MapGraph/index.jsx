import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react';
import axios from 'axios'
export default class MapGraph extends Component {
    state = {
        data: {
            children: []
        },
        options: {}
    }
    convert = (source, target, basePath) => {
        for (let key in source) {
            let path = basePath ? basePath + '.' + key : key;
            if (!key.match(/^\$/)) {
                target.children = target.children || [];
                const child = {
                    name: path
                };
                target.children.push(child);
                this.convert(source[key], child, path);
            }
        }
        if (!target.children) {
            target.value = source.$count || 1;
        } else {
            target.children.push({
                name: basePath,
                value: source.$count
            });
        }
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
                    leafDepth: 2,
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
        const _this = this;
        let rawData = '';
        let tempData = {
            children: []
        };
        axios.get('http://localhost:3000' + '/data/asset/data/ec-option-doc-statistics-201604.json')
            .then(function (response) {
                rawData = response.data;
                console.log(response);
                _this.convert(rawData, tempData, '');
                console.log(tempData);
                _this.setState({
                    options: _this.getOption(tempData)
                })
            })
            .catch(function (error) {
                console.log(error);
            })


    }
    render() {
        return (
            <ReactEcharts option={this.state.options} />
        )
    }
}
