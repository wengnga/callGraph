import React, { PureComponent } from 'react'
import { Tabs } from 'antd';
import { ApartmentOutlined, PieChartOutlined, AppstoreOutlined, ClusterOutlined, GroupOutlined } from '@ant-design/icons';
import TreeGraph from '../TreeGraph';
import PieGraph from '../PieGraph';
import MapGraph from '../MapGraph';
import DiagramWrapper from '../DiagramWrapper';
import "./index.css"
const { TabPane } = Tabs;
export default class GraphArea extends PureComponent {
    render() {
        const { composeLeft, composeRight, leftRadio, rightRadio } = this.props.settings;
        return (
            <Tabs defaultActiveKey="mapGraph" tabPosition="top" centered>
                <TabPane
                    style={{ height: '800px' }}
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
                    style={{ height: '1000px' }}
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
                    style={{ height: '800px' }}
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
                <TabPane
                    style={{ height: '1000px' }}
                    tab={
                        <span>
                            <GroupOutlined />
                            Compose
                        </span>
                    }
                    key="compose"
                >
                    <div className='compose'>
                        <div className='composeItem' style={{ flexGrow: String(leftRadio) }}>
                            {composeLeft === 'pie' && <PieGraph {...this.props} />}
                            {composeLeft === 'tree' && <TreeGraph {...this.props} />}
                            {composeLeft === 'map' && <MapGraph {...this.props} />}
                            {composeLeft === 'uml' && <DiagramWrapper {...this.props} />}
                        </div>
                        <div className='composeItem' style={{ flexGrow: String(rightRadio) }}>
                            {composeRight === 'pie' && <PieGraph {...this.props} />}
                            {composeRight === 'tree' && <TreeGraph {...this.props} />}
                            {composeRight === 'map' && <MapGraph {...this.props} />}
                            {composeRight === 'uml' && <DiagramWrapper {...this.props} />}                        </div>
                    </div>
                </TabPane>
            </Tabs>
        )
    }
}
