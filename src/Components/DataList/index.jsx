import React, { Component } from 'react'
import { Table } from 'antd';
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
];

export default class DataList extends Component {
    componentDidMount() {
        console.log("!!!!!!!!!!")
        console.log(this.props)
    }
    render() {
        return (
            <div>
                <Table {...this.props} columns={columns} size="small" pagination={false} />
            </div>
        )
    }
}
