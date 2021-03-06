import React, { PureComponent } from 'react'
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Space, Tabs, InputNumber, Slider, Tooltip, Switch } from 'antd';
import { SettingOutlined, RedoOutlined } from '@ant-design/icons';
import PubSub from 'pubsub-js'
import './index.css';

const { Option } = Select;
const { TabPane } = Tabs;
export default class SettingDrawer extends PureComponent {
    state = { visible: false, formRef: React.createRef() };

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
    onReset = (e) => {
        const resetSettings = {
            themeDark: true,
            composeLeft: 'pie',
            composeRight: 'map',
            leftRadio: 1,
            rightRadio: 1,
            leafDepth: 5,
            treeMapWidth: 80,
            treeMapHeight: 80,
            treeMapVisibleMin: 100,
            childrenVisibleMin: 200,
        };
        this.state.formRef.current.setFieldsValue(resetSettings);

    }
    onFinish = (values) => {
        console.log('>>>>>>>>>>>> Success:', values);
        this.props.setSettings({
            ...values,
        });
    };

    onFinishFailed = (errorInfo) => {
        console.log('>>>>>>>>>>>> Failed:', errorInfo);
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
                        ref={this.state.formRef}
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
                                <Button onClick={this.onReset} type="danger" htmlType="button">
                                    Reset
                                </Button>
                            </Form.Item>
                            <Form.Item style={{ marginLeft: '10px' }}>
                                <Button onClick={this.onClose} type="primary" htmlType="submit">
                                    Confirm
                                </Button>
                            </Form.Item>
                        </Space>
                        <Form.Item
                            name="themeDark"
                            label="theme"
                            valuePropName="checked"
                        >
                            <Switch checkedChildren="dark" unCheckedChildren="light" defaultChecked />
                        </Form.Item>
                        <Form.Item
                            name="composeLeft"
                            label="Compose Left"
                        >
                            <Select style={{ width: 120 }}>
                                <Option value="tree">Tree</Option>
                                <Option value="uml">UML</Option>
                                <Option value="pie" >
                                    Pie
                                </Option>
                                <Option value="map">Map</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="composeRight"
                            label="Compose Right"
                        >
                            <Select style={{ width: 120 }} >
                                <Option value="tree">Tree</Option>
                                <Option value="uml">UML</Option>
                                <Option value="pie" >
                                    Pie
                                </Option>
                                <Option value="map">Map</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Compose left radio"
                            name="leftRadio"
                        >
                            <InputNumber min={1} />
                        </Form.Item>
                        <Form.Item
                            label="Compose right radio"
                            name="rightRadio"
                        >
                            <InputNumber min={1} />
                        </Form.Item>
                        <Tabs defaultActiveKey="4" centered>
                            {/* <TabPane tab="Tree Graph" key="1">
                                Setting of tree graph
                            </TabPane>
                            <TabPane tab="UML Graph" key="2">
                                Setting of UML graph
                            </TabPane>
                            <TabPane tab="Pie Graph" key="3">
                                Setting of Pie graph
                            </TabPane> */}
                            <TabPane tab="Map Graph" key="4">
                                <Form.Item
                                    label="width"
                                    name="treeMapWidth"
                                    tooltip="treemap?????????"
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
                                    tooltip="treemap?????????"
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
                                    tooltip="??????????????????????????????????????????????????????????????????????????????????????????????????????????????????"
                                >
                                    <InputNumber min={1} max={50} />
                                </Form.Item>
                                <Form.Item
                                    label="visibleMin"
                                    name="treeMapVisibleMin"
                                    tooltip="?????????????????????????????????????????????????????????????????????px???????????????????????????????????????"
                                >
                                    <InputNumber min={1} />
                                </Form.Item>
                                <Form.Item
                                    label="childrenVisibleMin"
                                    name="childrenVisibleMin"
                                    tooltip="??????????????????????????????????????????????????????????????????px??????????????????????????????????????????????????? ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????"
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

