import React, { Component } from 'react'
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Space, Tabs } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

const { Option } = Select;
const { TabPane } = Tabs;
export default class SettingDrawer extends Component {
    state = { visible: false };

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <>
                <Button type="text" onClick={this.showDrawer} shape="circle" icon={<SettingOutlined />} />
                <Drawer
                    title="Setting"
                    width={720}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    bodyStyle={{ paddingBottom: 80 }}
                    extra={
                        <Space>
                            <Button onClick={this.onClose}>Cancel</Button>
                            <Button onClick={this.onClose} type="primary">
                                Confirm
                            </Button>
                        </Space>
                    }
                >
                    <Tabs defaultActiveKey="1" centered>
                        <TabPane tab="Tree Graph" key="1">
                            Setting of tree graph
                        </TabPane>
                        <TabPane tab="UML Graph" key="2">
                            Setting of UML graph
                        </TabPane>
                        <TabPane tab="Pie Graph" key="3">
                            Setting of Pie graph
                        </TabPane>
                        <TabPane tab="Map Graph" key="4">
                            Setting of Map graph
                        </TabPane>
                    </Tabs>
                </Drawer>
            </>
        );
    }
}

