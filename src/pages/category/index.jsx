import React, {Component}from 'react';
import { Card,Button,Icon,Table} from 'antd';
import { Pagination } from 'antd';
export default class Category extends Component {
    render() {
        const columns = [{
            title: '品类名称',
            dataIndex: 'name',
            // render: text => <a href="javascript:;">{text}</a>,
        }, {
            title: '操作',
            dataIndex: 'money',
            width:450,
            render:xxx=>{
                return <div>
                    <a href="javascript:;">修改名称</a>&nbsp;&nbsp;&nbsp;&nbsp;
                    <a href="javascript:;">查看其子品类</a>
                </div>
        }
        }];

        const data = [{
            key: '1',
            name: 'AAA'
        }, {
            key: '2',
            name:' BBB'
        }, {
            key: '3',
            name: 'CCC'
        },
            {
            key: '4',
            name: 'DDD'
        },
            // {
        //     key: '5',
        //     name: 'EEE'
        // }, {
        //     key: '6',
        //     name: 'FFF'
        // },{
        //     key: '7',
        //     name: 'GGG'
        // }, {
        //     key: '8',
        //     name: 'HHH'
        // }, {
        //     key: '9',
        //     name: 'III'
        // }
        ];

        return (
                <Card
                    title="一级分类列表"
                    extra={<Button type='primary'><Icon type="plus" />添加分类</Button>}
                >
                    <Table
                        columns={columns}
                        dataSource={data}
                        bordered
                        defaultExpandAllRows
                        Pagination ={{pageSize:3
                        //     showSizeChanger:true,
                        //     pageSizeOptions:['2','4','6','8','10','12'],
                        //     showQuickJumper:true
                        }}
                    />

                </Card>
        )
    }
}