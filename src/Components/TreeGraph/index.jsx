import React, { PureComponent } from 'react'
import ReactEcharts from 'echarts-for-react'
import echartsTheme from '../../echartsTheme'
import echartsThemeLight from '../../echartsThemeLight'
export default class TreeGraph extends PureComponent {
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
                        fontSize: 9,
                        color: this.props.themeColor === 'custom-light' ? 'black' : "white",
                    },
                    tooltip: {
                        trigger: 'item',
                        triggerOn: 'mousemove',
                        enterable: true,//鼠标是否可进入提示框浮层中
                        formatter: function (params) {
                            const { data: { name, value, self, total } } = params;
                            return `${name}: ${value}%<br/>${total}<br/>${self}`
                        }
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
        // echarts.registerTheme('theme', echartsTheme);
        console.log("treeGraph:   ", this.props)


    }


    render() {
        return (
            <ReactEcharts option={this.getOptions()} ref={node => { this.echartspie = node }} onEvents={this.onEvents}
                theme={echartsThemeLight}
                style={{
                    width: '100%', height: '100%', backgroundColor: this.props.themeColor === 'custom-light' ? '#fff' : '#1e1e1e'
                }}
            />
        )
    }
}
