import React, { Component } from 'react'
import { Tree } from 'antd';
import { DownOutlined } from '@ant-design/icons';
export default class TreeMenu extends Component {
    onSelect = (selectedKeys, info) => {

        console.log('selected', selectedKeys, info);
    };
    onExpand(expandedKeys, info) {
        console.log('expanded', expandedKeys, info);

    }
    render() {
        return (
            <Tree
                showLine
                switcherIcon={<DownOutlined />}
                onSelect={this.onSelect}
                // height={250}
                treeData={this.props.treeMenuData}
                // expandedKeys={this.props.expandedKeys}
                // selectedKeys={this.props.selectedKeys}
                onExpand={this.onExpand}
            />
        )
    }
}
