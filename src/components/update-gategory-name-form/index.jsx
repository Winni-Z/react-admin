import React, {Component}from 'react';
import {Input,Form} from 'antd';
import  PropTypes from 'prop-types';

const Item=Form.Item;

class UpdateCategoryNameForm extends Component {
    static propTypes={
        categoryName: PropTypes.string.isRequired,
        setForm:PropTypes.func.isRequired
    };

    // UpdateCategoryNameForm(){
    //
    // }

    componentWillMount (){
        this.props.setForm(this.props.form)
    }
    render() {
        const {getFieldDecorator}=this.props.form;
        const {categoryName}=this.props;

        return (
            <Form>
                <Item label='分类名称'>
                    {
                        getFieldDecorator(
                            'categoryName',
                            {
                                initialValue:categoryName
                            }
                        )(
                            <Input />
                        )
                    }
                </Item>
            </Form>
        )
    }
}

export default Form.create()(UpdateCategoryNameForm);