import React, { Component } from 'react'
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Space, Tabs, InputNumber, Slider, Tooltip } from 'antd';
import { SettingOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import './index.css';

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
    onFinish = (values) => {
        console.log('Success:', values);
        this.props.setSettings({
            ...values,
        });
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
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
                >
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={this.props.settings}
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                        autoComplete="off"
                    >
                        <Space className="submitBtns">
                            <Form.Item>
                                <Button onClick={this.onClose}>Cancel</Button>
                            </Form.Item>
                            <Form.Item style={{ marginLeft: '10px' }}>
                                <Button onClick={this.onClose} type="primary" htmlType="submit">
                                    Confirm
                                </Button>
                            </Form.Item>
                        </Space>
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
                                <Form.Item
                                    label="width"
                                    name="treeMapWidth"
                                    tooltip="treemap的宽度"
                                >
                                    <Slider
                                        tipFormatter={(value) => `${value}%`}
                                        min={0}
                                        max={100}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="height"
                                    name="treeMapHeight"
                                    tooltip="treemap的高度"
                                >
                                    <Slider
                                        tipFormatter={(value) => `${value}%`}
                                        min={0}
                                        max={100}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="leafDepth"
                                    name="leafDepth"
                                    tooltip="表示『展示几层』，层次更深的节点则被隐藏起来。点击则可下钻看到层次更深的节点"
                                >
                                    <InputNumber min={1} max={50} />
                                </Form.Item>
                                <Form.Item
                                    label="visibleMin"
                                    name="treeMapVisibleMin"
                                    tooltip="如果某个节点的矩形的面积，小于这个数值（单位：px平方），这个节点就不显示。"
                                >
                                    <InputNumber min={1} />
                                </Form.Item>
                                <Form.Item
                                    label="childrenVisibleMin"
                                    name="childrenVisibleMin"
                                    tooltip="如果某个节点的矩形面积，小于这个数值（单位：px平方），则不显示这个节点的子节点。 这能够在矩形面积不足够大时候，隐藏节点的细节。当用户用鼠标缩放节点时，如果面积大于此阈值，又会显示子节点。"
                                >
                                    <InputNumber min={1} />
                                </Form.Item>
                            </TabPane>
                        </Tabs>
                    </Form>

                </Drawer>

            </>
        );
    }
}

