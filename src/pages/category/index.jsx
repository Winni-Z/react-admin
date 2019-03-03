// import React, {Component}from 'react';
// import { Card,Button,Icon,Table,message,Modal} from 'antd';
// import  PropTypes from 'prop-types'
//
// import AddCategoryForm from '../../components/add-category-form'
// import UpdateCategoryNameForm from '../../components/update-gategory-name-form'
//
// import {reqCategory,reqAddCategory,reqUpdateCategoryName} from '../../api/index'

// / import UpdateCategoryNameForm from '../../components/update-category-name-form';
// export default class Category extends Component {
//     state={
//         categaries:[],
//         isShowAdd:false,
//         isShowUpdate:false,
//         category:{},
//         subCategaries:[],
//         parentId:'0',
//         parentName: '',
//      }
//
// addCategory=async()=>{
//        const {parentId,categoryName}=this.form.getFieldsValue()
//          // console.log(parentId);
//          // console.log(categoryName);
//          const result=await reqAddCategory(parentId,categoryName);
//        let updateState={isShowUpdate:false};
//          // console.log(result);
//          if(result.status===0){
//              message.success('添加分类成功');
//              const currentId=this.state.parentId;
//              if(parentId==='0'){
//                  updateState.categaries=[...this.state.categaries,result.data]
//              } else{
//                  if (currentId===parentId){
//                      updateState.subCategaries=[...this.state.subCategaries,result.data]
//                  }
//              }
//          } else {
//              message.error('添加分类失败')
//          }
//          this.form.resetFields()
//         this.setState(updateState)
//      }
//
// getCatagory=async parentId=>{
//  const result= await reqCategory(parentId);
//     if(result.status===0){
//      if(parentId==='0'){
//          this.setState({
//              categaries:  result.data
//          })
//      }else {
//          this.setState({
//              subCategaries:  result.data
//          })
//      }
//
//     } else {
//        message.error('获取列表失败~~~')
//     }
// }
//
// updateCategoryName=async()=> {
//         const categoryName = this.form.getFieldValue('categoryName')
//         console.log(categoryName);
//         const {name,_id}=this.state.category;
//             if(categoryName===name){
//                 message.warn('请修改分类名称')
//             } else {
//                 const result=await reqUpdateCategoryName(_id,categoryName)
//                 if(result.status===0){
//                     message.success('修改分类名称成功')
//                     this.setState({isShowUpdate:false,categaries:this.state.categaries.map(item=>{
//                       if(item._id===_id){
//                          item.name=categoryName
//                       }
//                       return item;
//                     })})
//                 } else {
//                     message.error('修改分类名称失败')
//                     this.setState({isShowUpdate:false})
//
//                 }
//             }
//
//     }
//
// componentWillMount(){
//         this.columns = [{
//             title: '品类名称',
//             dataIndex: 'name',
//         }, {
//             title: '操作',
//             // dataIndex: 'money',
//             width:450,
//             render:category=>{
//                 // console.log(category);undifined
//                 const {parentId}=this.state;
//                 if(parentId==='0'){
//                     return <div>
//                         <a onClick={()=>this.setState({isShowUpdate:true,category})} href="javascript:;" >修改名称</a>&nbsp;&nbsp;&nbsp;&nbsp;
//                         <a onClick={()=>{
//                             this.setState({parentId:category._id,parentName:category.name})
//                             this.getCatagory(category._id)
//                         }
//                         } href="javascript:;">查看其子品类</a>
//                     </div>
//                 }else {
//                     return <a onClick={()=>this.setState({isShowUpdate:true,category})} href="javascript:;" >修改名称</a>
//                 }
//
//             }
//         }];
//     }
// componentDidMount(){
//         this.getCatagory('0');
//     }
//
//         render() {
//     const {categaries,isShowAdd,isShowUpdate,category,subCategaries,parentId,parentName}=this.state;
//         // console.log(categaries);
//             const isCategory=parentId==='0';
//             const data=isCategory?categaries:subCategaries;
//         return (
//                 <Card
//                     title={
//                         isCategory?'一级分类列表':<div>
//                             <a onClick={()=>this.setState({parentId:'0'})} href="javascript:;" ><Icon type="arrow-right" />&nbsp&nbsp{parentName}</a>
//                         </div>
//                     }
//                     extra={<Button type='primary' onClick={()=>this.setState({isShowAdd:true})}><Icon type="plus" />添加分类</Button>}
//                 >
//                     <Table
//                         columns={this.columns}
//                         dataSource={categaries}
//                         bordered
//                         defaultExpandAllRows
//                         rowKey='_id'
//                         pagination ={{pageSize:3,
//                             showSizeChanger:true,
//                             pageSizeOptions:['2','4','6','8','10','12'],
//                             showQuickJumper:true
//                         }}
//                     />
//                     <Modal
//                         visible={isShowAdd}
//                         title={'添加分类'}
//                         okText='确认'
//                         cancelText='取消'
//                         onOk={this.addCategory}
//                         onCancel={()=>this.setState({isShowAdd:false})}
//                     >
//                         <AddCategoryForm categaries={categaries} setForm={form=>this.form=form } />
//                     </Modal>
//                     <Modal
//                         visible={isShowUpdate}
//                         title={'更新分类'}
//                         okText='确认'
//                         cancelText='取消'
//                         width={300}
//                         onOk={this.updateCategoryName}
//                         onCancel={()=>this.setState({isShowUpdate:false})}
//                     >
//                         <UpdateCategoryNameForm categoryName={category.name} setForm={form=>this.form=form } />
//                     </Modal>
//                 </Card>
//         )
//     }
// }


import React, {Component} from 'react';
import {
    Card,
    Button,
    Icon,
    Table,
    message,
    Modal,
} from 'antd';

// import MyButton from '../../components/my-button';
import AddCategoryForm from '../../components/add-category-form';
import UpdateCategoryNameForm from '../../components/update-gategory-name-form';

import {reqCategory, reqAddCategory, reqUpdateCategoryName} from '../../api';

export default class Category extends Component {
    state = {
        categories: [],  //保存所有一级分类数据
        subCategories: [], //保存所有二级分类数据
        isShowAdd: false,
        isShowUpdate: false,
        parentId: '0',  //保存该显示父分类，如果是0就是一级分类，不是就是二级分类
        parentName: '',
        isSubCategoriesLoading: true,
        category: {}, //保存当前选中单个分类数据
    }

    //获取分类列表的方法
    getCategories = async parentId => {
        //发送请求
        const result = await reqCategory(parentId);
        if (result.status === 0) {
            //获取列表数据成功
            if (parentId === '0') {
                this.setState({
                    categories: result.data
                })
            } else {
                if (result.data.length) {
                    this.setState({
                        subCategories: result.data,
                        isSubCategoriesLoading: true
                    })
                } else {
                    this.setState({
                        subCategories: result.data,
                        isSubCategoriesLoading: false
                    })
                }
            }
        } else {
            message.error('获取分类列表数据失败~');
        }
    }

    //添加分类的函数
    addCategory = async () => {
        //获取当前填写表单数据
        const {parentId, categoryName} = this.form.getFieldsValue();
        //发送请求，后台添加分类
        const result = await reqAddCategory(parentId, categoryName);
        //初始化更新状态的对象
        let updateState = {isShowAdd: false};

        if (result.status === 0) {
            message.success('添加分类成功~');
            const currentId = this.state.parentId;
            //更新数据
            if (parentId === '0') {
                updateState.categories = [...this.state.categories, result.data];
            } else {
                if (currentId === parentId) {
                    updateState.subCategories = [...this.state.subCategories, result.data];
                }
            }
        } else {
            message.error('添加分类失败~');
        }

        //清空用户的输入
        this.form.resetFields();

        //统一更新状态
        this.setState(updateState);

    }

    //修改分类名称的方法
    updateCategoryName = async () => {
        //获取修改后名称
        const categoryName = this.form.getFieldValue('categoryName');
        // console.log(categoryName);
        //获取修改前的名称
        const {name, _id} = this.state.category;
        //判断修改前后是否一致，一致就不修改
        if (categoryName === name) {
            message.warn('请修改分类名称~');
        } else {
            //发送请求
            const result = await reqUpdateCategoryName(_id, categoryName);
            if (result.status === 0) {
                message.success('修改分类名称成功');
                //关闭对话框, 更新页面显示
                this.setState({
                    isShowUpdate: false,
                    categories: this.state.categories.map(item => {
                        if (item._id === _id) {
                            item.name = categoryName;
                        }
                        //不管成功和失败都要返回item
                        return item;
                    })
                })
            } else {
                message.error('修改分类名称失败');
                this.setState({
                    isShowUpdate: false
                })
            }
        }
    }

    componentWillMount () {
        this.columns = [
            {
                title: '品类名称',  //表头名称
                dataIndex: 'name',
                // render: text => text,  //自定义渲染文本的规则
            }, {
                title: '操作',
                width: 300,
                render: category => {
                    const {parentId} = this.state;

                    if (parentId === '0') {
                        return <div>
                            <a onClick={()=>this.setState({isShowUpdate:true,category})} href="javascript:;" >修改名称</a>&nbsp;&nbsp;&nbsp;&nbsp;
                                                   <a onClick={()=>{
                            this.setState({parentId:category._id,parentName:category.name})
                            this.getCatagory(category._id)
                        }
                       } href="javascript:;">查看其子品类</a>



                            {/*<MyButton name='修改名称' onClick={() => this.setState({isShowUpdate: true, category})}/> &nbsp;&nbsp;&nbsp;*/}
                            {/*<MyButton name='查看其子品类' onClick={() => {*/}
                                {/*//让tabel显示二级分类数据*/}
                                {/*this.setState({parentId: category._id, parentName: category.name});*/}
                                {/*//请求二级分类数据*/}
                                {/*this.getCategories(category._id);*/}
                            {/*}}/>*/}
                        </div>
                    } else {
                        return <a onClick={()=>this.setState({isShowUpdate:true,category})} href="javascript:;" >修改 修改名称</a>
                    }
                }
            }];
    }

    componentDidMount () {
        this.getCategories('0');
    }
    render () {

        const {categories, subCategories, isShowAdd, isShowUpdate, category, parentId, parentName, isSubCategoriesLoading} = this.state;
        //判断是否显示一级分类
        const isCategory = parentId === '0';

        const data = isCategory ? categories : subCategories;
        const isLoading = isCategory ? categories.length === 0 : isSubCategoriesLoading && subCategories.length === 0;

        return (
            <Card
                title={
                    isCategory?'一级分类列表':
                        <div>
                        < a onClick={()=>this.setState({parentId:'0'})} href="javascript:;" ><Icon type="arrow-right" />&nbsp&nbsp{parentName}</a>
                        </div>
                }
                    // isCategory
                //         ? '一级分类列表'
                //         : <div><MyButton onClick={() => {
                //         this.setState({parentId: '0'})
                //     }} name='一级分类'/><Icon type="arrow-right" />&nbsp;&nbsp;{parentName}</div>
                // }
                extra={<Button type='primary' onClick={() => this.setState({isShowAdd: true})}><Icon type="plus" />添加品类</Button>}
            >
                <Table
                    columns={this.columns}
                    dataSource={data}
                    bordered
                    pagination={{
                        pageSize: 3,
                        showSizeChanger: true,
                        pageSizeOptions: ['3', '6', '9', '12'],
                        showQuickJumper: true
                    }}
                    rowKey='_id'
                    loading={isLoading}
                />

                <Modal
                    title="更新分类"
                    visible={isShowUpdate}
                    okText='确认'
                    cancelText='取消'
                    onOk={this.updateCategoryName}
                    onCancel={() => this.setState({isShowUpdate: false})}
                    width={300}
                >
                    <UpdateCategoryNameForm categoryName={category.name} setForm={form => this.form = form}/>
                </Modal>

                <Modal
                    title="添加分类"
                    visible={isShowAdd}
                    okText='确认'
                    cancelText='取消'
                    onOk={this.addCategory}
                    onCancel={() => this.setState({isShowAdd: false})}
                >
                    <AddCategoryForm categories={categories} setForm={form => this.form = form}/>
                </Modal>
            </Card>
        )
    }
}