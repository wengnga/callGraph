import React, { Component } from 'react'
import { Tabs } from 'antd';
import { ApartmentOutlined, PieChartOutlined, AppstoreOutlined, ClusterOutlined } from '@ant-design/icons';
import TreeGraph from '../TreeGraph';
import PieGraph from '../PieGraph';
import MapGraph from '../MapGraph';
import DiagramWrapper from '../DiagramWrapper';

const { TabPane } = Tabs;
export default class GraphArea extends Component {
    render() {
        return (
            <Tabs defaultActiveKey="treeGraph" tabPosition="top" centered>
                <TabPane
                    tab={
                        <span>
                            <ApartmentOutlined />
                            Tree Graph
                        </span>
                    }
                    key="treeGraph"
                >
                    <TreeGraph {...this.props} />
                </TabPane>
                <TabPane
                    tab={
                        <span>
                            <ClusterOutlined />
                            UML Graph
                        </span>
                    }
                    key="umlGraph"
                >
                    <DiagramWrapper {...this.props} />
                </TabPane>
                <TabPane
                    tab={
                        <span>
                            <PieChartOutlined />
                            Pie Graph
                        </span>
                    }
                    key="pieGraph"
                >
                    <PieGraph {...this.props} />
                </TabPane>
                <TabPane
                    tab={
                        <span>
                            <AppstoreOutlined />
                            Map Graph
                        </span>
                    }
                    key="mapGraph"
                >
                    <MapGraph {...this.props} />
                </TabPane>
            </Tabs>
        )
    }
}
