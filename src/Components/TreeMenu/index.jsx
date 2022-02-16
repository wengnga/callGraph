import React, { Component } from 'react'
import { Tree } from 'antd';
import { DownOutlined } from '@ant-design/icons';
export default class TreeMenu extends Component {
    onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    };
    render() {
        return (
            <Tree
                showLine
                switcherIcon={<DownOutlined />}
                defaultExpandedKeys={['0-0-0']}
                onSelect={this.onSelect}
                height={250}
                treeData={this.props.treeMenuData}
            />
        )
    }
}
