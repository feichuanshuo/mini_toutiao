import React, { useState } from 'react';
import { Form, Input, Button ,Modal,Select, InputNumber,message} from 'antd';
import axios from "axios";
const {Option}=Select
const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 16,
    },
};
const Register = () => {
    var formRef
    const [isModalVisible, setIsModalVisible] = useState(false);
    const onFinish = (values) => {
        const key='register'
        message.loading({content:'注册中...',key})
        console.log('Success:', values);
        axios.post("https://qcotvg.fn.thelarkcloud.com/register",values).then(
            response=>{
                console.log(response)
                if (response.data.tip==='success')
                    message.success({content:response.data.message,key,duration:2})
                else
                    message.error({content:response.data.message,key,duration:2})
                },
            error=>{console.log(error)}
        )

    };

    const onFinishFailed = (errorInfo) => {
        setIsModalVisible(true);
        console.log('Failed:', errorInfo);
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        formRef.submit()
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal} >
                注册
            </Button>
            <Modal title="注册" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} okText="注册" cancelText="取消">
                <Form {...layout} ref={c=>{formRef=c}} name="basic" initialValues={{remember: true,}} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                    <Form.Item label="用户名" name="user_name" rules={[{required: true, message: '请输入您的用户名',},]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="密码" name="password" hasFeedback rules={[{required: true, message: '请输入您的密码！',},]}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item label="确认密码" name="confirm" dependencies={['password']} hasFeedback rules={[{required: true, message: '请确认您的密码',},({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject('输入的两次密码不一致');
                        },
                    }),]}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item label="性别" name="sex" rules={[{required: true,message:'请输入您的性别！'},]} initialValue="男">
                        <Select style={{ width: 120 }}>
                            <Option value="男">男</Option>c
                            <Option value="女">女</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="年龄" name="age" rules={[{required: true,message:'请输入您的年龄！'},]}>
                            <InputNumber min={0} max={99}/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
export default Register;