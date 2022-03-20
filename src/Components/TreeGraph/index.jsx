import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react'
export default class TreeGraph extends Component {
    state = {
        options: {}
    }
    onEvents = {
        'click': this.switchToAnthorPie.bind(this), //配置点击事件处理程序
    }
    switchToAnthorPie(e) {
        console.log(e)
    }
    getOptions = () => {
        console.log("treeGraph:   ", this.props)

        return {
            tooltip: {
                trigger: 'item',
                triggerOn: 'mousemove'
            },
            series: [
                {
                    type: 'tree',
                    data: [this.props.allData],
                    top: '1%',
                    left: '7%',
                    bottom: '1%',
                    right: '20%',
                    initialTreeDepth: 10, // 树节点全部展开
                    symbolSize: 7,
                    label: {
                        position: 'left',
                        verticalAlign: 'middle',
                        align: 'right',
                        fontSize: 9
                    },
                    leaves: {
                        label: {
                            position: 'right',
                            verticalAlign: 'middle',
                            align: 'left'
                        }
                    },
                    emphasis: {
                        focus: 'descendant'
                    },
                    expandAndCollapse: true,
                    animationDuration: 550,
                    animationDurationUpdate: 750,
                    symbolSize: 10,
                    roam: true
                },

            ],

        }
    }
    componentDidMount() {
        console.log("treeGraph:   ", this.props)


    }


    render() {
        return (
            <ReactEcharts option={this.getOptions()} ref={node => { this.echartspie = node }} onEvents={this.onEvents} />
        )
    }
}
