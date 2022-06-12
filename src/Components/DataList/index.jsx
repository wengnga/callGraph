import React, { PureComponent } from 'react'
import { Table } from 'antd';
import { postVscode } from '../../utils/vscode';

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
    window.vscodeExtention ?
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            // width: 100,
            render: (record) =>
                <a onClick={() => postVscode(record)}>Go To Definition</a>,
        } : {}
];

export default class DataList extends PureComponent {
    componentDidMount() {
        console.log(this.props)
    }
    render() {
        return (
            <div>
                <Table {...this.props} columns={columns} size="small" pagination={false}
                />
            </div>
        )
    }
}
