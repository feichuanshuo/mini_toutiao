import React, {Component,Fragment} from 'react';
import { Form, Input, Button,message }from 'antd';
import axios from "axios";
const layout = {
    labelCol: {
        span: 3,
    },
    wrapperCol: {
        span: 18,
    },
};
class Edit extends Component {

    componentDidMount() {
        const {_id,article_title,publish_user}=this.props.location.state
        axios.post("https://qcotvg.fn.thelarkcloud.com/getContentsOfArticle",{_id}).then(
            response=> {
                this.formRef.setFieldsValue({
                    article_title:article_title,
                    publish_user:publish_user,
                    article_content:response.data.result
                })
            }
            ,
            error=>{console.log(error)}
        )
    }
    render() {
        const onFinish = (values) => {
            console.log(values)
            const {_id}=this.props.location.state
            const key = 'edit'
            axios.post("https://qcotvg.fn.thelarkcloud.com/saveArticle",{"article_id":_id,"article_title":values.article_title,
                "article_content":values.article_content}).then(
                response=>{
                    console.log(response)
                    if (response.data.tip==='success')
                        message.success({content:'更改成功！',key,duration:2})
                    else
                        message.error({content:'更改失败，请重试！',key,duration:2})
                }
            )
        };
        return (
            <Fragment>
                <Form {...layout}  name="article_message"  onFinish={onFinish} ref={c=>{this.formRef=c}}>
                    <Form.Item name="article_title" label="标题" rules={[{required: true,min:5,max:30,type:"string",message:"请输入文章标题！"}]} help="字符长度最小为5，最大为30">
                        <Input key="article_title"/>
                    </Form.Item>
                    <Form.Item name="publish_user" label="来源" rules={[{required: true}]}>
                        <Input disabled={true}/>
                    </Form.Item>
                    <Form.Item name="article_content" label="内容" rules={[{required:true,message:"请输入文章内容！"}]}>
                        <Input.TextArea autoSize={{ minRows: 15, maxRows: 15 }}/>
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 3 }}>
                        <Button type="primary" htmlType="submit">
                            保存
                        </Button>
                    </Form.Item>
                </Form>
            </Fragment>
        );
    }
}
export default Edit;