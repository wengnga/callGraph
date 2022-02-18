import React, { Component } from 'react'
import { Tabs } from 'antd';
import { ApartmentOutlined, PieChartOutlined, AppstoreOutlined } from '@ant-design/icons';
import TreeGraph from '../TreeGraph';
import PieGraph from '../PieGraph';
import MapGraph from '../MapGraph';

const { TabPane } = Tabs;
export default class GraphArea extends Component {
    render() {
        return (
            <Tabs defaultActiveKey="2" tabPosition="top" centered>
                <TabPane
                    tab={
                        <span>
                            <ApartmentOutlined />
                            Tree Graph
                        </span>
                    }
                    key="1"
                >
                    <TreeGraph data={this.props.data} />
                </TabPane>
                <TabPane
                    tab={
                        <span>
                            <PieChartOutlined />
                            Pie Graph
                        </span>
                    }
                    key="2"
                >
                    <PieGraph data={this.props.data} />
                </TabPane>
                <TabPane
                    tab={
                        <span>
                            <AppstoreOutlined />
                            Map Graph
                        </span>
                    }
                    key="3"
                >
                    <MapGraph data={this.props.data} />
                </TabPane>
            </Tabs>
        )
    }
}
