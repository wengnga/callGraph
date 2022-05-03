import React, { PureComponent } from 'react'
import { Tree } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import PubSub from 'pubsub-js'

export default class TreeMenu extends PureComponent {
    constructor(props) {
        super(props);
    }

    onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
        PubSub.publish("switchFunc", info.node);

        const { expandedTreeMenuKeys, setExpandedTreeMenuKeys } = this.props;
        // 当前已展开的节点不含现在所选的结点的话，就展开现在所选的结点
        if (!expandedTreeMenuKeys.includes(selectedKeys[0])) {
            setExpandedTreeMenuKeys([...expandedTreeMenuKeys, ...selectedKeys])
        }
        if (info.node.children?.length > 0) this.props.setCurrentSelectNode(selectedKeys, info.node);
    };

    onExpand = (expandedKeys, info) => {
        console.log('expanded', expandedKeys, info);
        this.props.setExpandedTreeMenuKeys(expandedKeys);
    };

    render() {
        const { expandedTreeMenuKeys, treeMenuData } = this.props;
        return (
            <Tree
                {...this.props}
                showLine
                switcherIcon={<DownOutlined />}
                onSelect={this.onSelect}
                // height={250}
                treeData={treeMenuData}
                expandedKeys={expandedTreeMenuKeys}
                // selectedKeys={this.props.selectedKeys}
                onExpand={this.onExpand}
            />
        )
    }
}
