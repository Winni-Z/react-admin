import React, {Component}from 'react';
import { Card,Button,Icon,Table,message,Modal} from 'antd';
import  PropTypes from 'prop-types'

import AddCategoryForm from '../../components/add-category-form'
import UpdateCategoryNameForm from '../../components/update-gategory-name-form'

import {reqCategory,reqAddCategory,reqUpdateCategoryName} from '../../api/index'

// / import UpdateCategoryNameForm from '../../components/update-category-name-form';
export default class Category extends Component {
    state={
        categaries:[],
        isShowAdd:false,
        isShowUpdate:false,
        category:{},
     }

addCategory=async()=>{
       const {parentId,categoryName}=this.form.getFieldsValue()
         console.log(parentId);
         console.log(categoryName);
         const result=await reqAddCategory(parentId,categoryName);
         console.log(result);
         if(result.status===0){
             message.success('添加分类成功');
             this.setState({
                 categaries:[...this.state.categaries,result.data],
                 isShowAdd:false
             })
         } else {
             message.error('添加分类失败')
         }
         this.setState({
             isShowAdd:false
         })
         this.form.resetFields()
     }

getCatagory=async parentId=>{
 const result= await reqCategory(parentId)
    if(result.status===0){
     this.setState({
         categaries:  result.data
     })
    } else {
       message.error('获取列表失败~~~')
    }
}

    updateCategoryName=async()=> {
        const categoryName = this.form.getFieldValue('categoryName')
        console.log(categoryName);
        const {name,_id}=this.state.category;
            if(categoryName===name){
                message.warn('请修改分类名称')
            } else {
                const result=await reqUpdateCategoryName(_id,categoryName)
                if(result.status===0){
                    message.success('修改分类名称成功')
                    this.setState({isShowUpdate:false,categaries:this.state.categaries.map(item=>{
                      if(item._id===_id){
                         item.name=categoryName
                      }
                      return item;
                    })})
                } else {
                    message.error('修改分类名称失败')
                    this.setState({isShowUpdate:false})

                }
            }

    }

    componentWillMount(){
        this.columns = [{
            title: '品类名称',
            dataIndex: 'name',
        }, {
            title: '操作',
            // dataIndex: 'money',
            width:450,
            render:category=>{
                // console.log(category);
                return <div>
                    <a onClick={()=>this.setState({isShowUpdate:true,category})} href="javascript:;" >修改名称</a>&nbsp;&nbsp;&nbsp;&nbsp;
                    <a href="javascript:;">查看其子品类</a>
                </div>
            }
        }];
    }
    componentDidMount(){
        this.getCatagory('0');
    }

        render() {
    const {categaries,isShowAdd,isShowUpdate,category}=this.state;
        console.log(categaries);
        return (
                <Card
                    title="一级分类列表"
                    extra={<Button type='primary' onClick={()=>this.setState({isShowAdd:true})}><Icon type="plus" />添加分类</Button>}
                >
                    <Table
                        columns={this.columns}
                        dataSource={categaries}
                        bordered
                        defaultExpandAllRows
                        rowKey='_id'
                        pagination ={{pageSize:3,
                            showSizeChanger:true,
                            pageSizeOptions:['2','4','6','8','10','12'],
                            showQuickJumper:true
                        }}
                    />
                    <Modal
                        visible={isShowAdd}
                        title={'添加分类'}
                        okText='确认'
                        cancelText='取消'
                        onOk={this.addCategory}
                        onCancel={()=>this.setState({isShowAdd:false})}
                    >
                        <AddCategoryForm categaries={categaries} setForm={form=>this.form=form } />
                    </Modal>
                    <Modal
                        visible={isShowUpdate}
                        title={'更新分类'}
                        okText="确认"
                        cancelText="取消"
                        width={300}
                        onOk={this.updateCategoryName}
                        onCancel={()=>this.setState({isShowUpdate:false})}
                    >
                        <UpdateCategoryNameForm categoryName={category.name} setForm={form=>this.form=form } />
                    </Modal>
                </Card>
        )
    }
}