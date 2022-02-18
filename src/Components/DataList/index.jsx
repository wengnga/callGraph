import React, { Component } from 'react'
import { Table } from 'antd';
const columns = [
    {
        title: 'Function',
        dataIndex: 'name',
    },
    {
        title: 'persentage',
        dataIndex: 'value',
    },
    {
        title: 'Description',
        dataIndex: 'description',
    },
];
const data = [
    {
        key: '1',
        name: 'func1',
        value: 45 + "%",
        description: 'some description',
    },
    {
        key: '2',
        name: 'func2',
        value: 55 + "%",
        description: 'some description',
    }
];

export default class DataList extends Component {

    render() {
        return (
            <div>
                <Table columns={columns} dataSource={data} size="small" pagination={false} />
            </div>
        )
    }
}
