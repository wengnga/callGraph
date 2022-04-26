import React, { Component } from 'react'
import { Table } from 'antd';
const postVscode = (record) => {
    console.log(record);
    window.vscode?.postMessage({
        message: record
    });
}
const columns = [
    {
        title: 'Function',
        dataIndex: 'name',
    },
    {
        title: 'persentage (%)',
        dataIndex: 'value',
    },
    {
        title: 'total',
        dataIndex: 'total',
    },
    {
        title: 'self',
        dataIndex: 'self',
    },
    {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        width: 100,
        render: (record) =>
            <a onClick={() => postVscode(record)}>click</a>,
    },
];

export default class DataList extends Component {
    componentDidMount() {
        console.log("!!!!!!!!!!")
        console.log(this.props)
    }
    render() {
        return (
            <div>
                <Table {...this.props} columns={columns} size="small" pagination={false}
                // onRow={record => {
                //     return {
                //         onClick: event => { }, // 点击行
                //         onDoubleClick: event => { event.persist(); console.log(event) },
                //         onContextMenu: event => { },
                //         onMouseEnter: event => { }, // 鼠标移入行
                //         onMouseLeave: event => { },
                //     };
                // }}
                />
            </div>
        )
    }
}
