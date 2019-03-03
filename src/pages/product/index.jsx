import React, {Component}from 'react';
import PropTypes from 'prop-types'
import {Card,Select,Button,Input,Table,Icon,message} from 'antd'
import {reqProductsLists,reqSearchProductsLists} from '../../api/index'

// [searchType]:searchName

const Option = Select.Option;
export default class Index extends Component {
    state={
        products:[],
        total:0,
        searchType:'productName',
        searchName:''

    }

    componentWillMount (){
        this.columns = [
            {
            title: '商品名称',
            dataIndex: 'name',
        }, {
            title: '商品描述',
            className: 'column-money',
            dataIndex: 'desc',
        }
        ,
            {
            title: '价格',
            dataIndex: 'price',
            width:180,
                render:price=>'￥'+price
        },
         {
             title: '状态',
             dataIndex: 'name',
             width:180,
                 render: catagory => {
                    return <div>
                        <Button onClick={()=>{}} type='primary' style={{marginRight:10}}>上架</Button>
                        已下架
                    </div>
                 }
         }, {
            title: '操作',
            className: 'column-money',
            dataIndex: 'name',
            width:180,
                render: catagory => {
                    return <div>
                        <a onClick={()=>{}} style={{marginRight:10}} href="javascript:;">详情</a>
                        <a onClick={()=>{}} href="">修改</a>
                    </div>
                }
        }];

    }
    //获取商品列表
    getProducts=async(pageNum,pageSize)=>{
        const {searchType,searchName}=this.state
        let result;
        if(searchName){
            result=await reqSearchProductsLists({searchType,searchName,pageNum,pageSize})
        } else {
            result=await reqProductsLists(pageNum,pageSize)
        }
        if(result.status===0){
                this.setState({
                    products: result.data.list,
                    total:result.data.total
                })

            } else {
                message.error('请求商品列表失败')
            }

}
    //受控（searchType，searchName）
    handleChange(key,value){
        this.setState({
            [key]:value
        })
    }

    componentDidMount(){
        this.getProducts(1,3)
    }

    render() {
        const columns=this.columns
        const {products,total}=this.state
        // const data =  [
        //     {
        //         "status": 1,
        //         "imgs": [],
        //         "_id": "5c7b72917977003320e00c0a",
        //         "categoryId": "5c2ed65df352726338607049",
        //         "pCategoryId": "5c2ed64cf352726338607048",
        //         "name": "商品31",
        //         "price": 300,
        //         "desc": "商品31描述",
        //         "__v": 0
        //     },
        //     {
        //         "status": 1,
        //         "imgs": [],
        //         "_id": "5c7b72917977003320e00c0a",
        //         "categoryId": "5c2ed65df352726338607049",
        //         "pCategoryId": "5c2ed64cf352726338607048",
        //         "name": "商品31",
        //         "price": 300,
        //         "desc": "商品31描述",
        //         "__v": 0
        //     },
        //     {
        //         "status": 1,
        //         "imgs": [],
        //         "_id": "5c7b72917977003320e00c0a",
        //         "categoryId": "5c2ed65df352726338607049",
        //         "pCategoryId": "5c2ed64cf352726338607048",
        //         "name": "商品31",
        //         "price": 300,
        //         "desc": "商品31描述",
        //         "__v": 0
        //     }
        // ]

        return (
            <Card
                title={
                    <div>
                        <Select onChange={value=>this.handleChange('searchType',value)} defaultValue='productName' style={{ width: 130 }} >
                            <Option value='productName'>根据商品名称</Option>
                            <Option value='productDesc'>根据商品描述</Option>
                        </Select>
                        <Input onChange={e=>this.handleChange('searchName',e.target.value) }style={{width:180,marginRight:10,marginLeft:10}} placeholder='关键字' />
                        <Button onClick={()=>this.getProducts(1,3)}  type='primary'>搜索</Button >
                    </div>
                }
                 extra={<Button onClick={()=>this.props.history.push('/product/saveupdate')} type="primary"><Icon type="plus" />添加产品</Button>}
            >
                <Table
                    columns={columns}
                    dataSource={products}
                    bordered
                    pagination={{
                        defaultPageSize: 3,
                        showSizeChanger: true,
                        onShowSizeChange:this.getProducts,
                        pageSizeOptions: ['3', '6', '9', '12'],
                        showQuickJumper: true,
                        total,
                        onChange:this.getProducts,
                    }}
                    rowKey='_id'
                    loading={products.length===0}

                />
            </Card>

        )
    }
}