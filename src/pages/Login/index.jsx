import React, { useState } from 'react';
import { Form, Input, Button ,Modal,message} from 'antd';
import axios from "axios";
const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 16,
    },
};
const Login = () => {
    var formRef
    const [isModalVisible, setIsModalVisible] = useState(false);
    const onFinish = (values) => {
        const key='login'
        message.loading({content:'登录中...',key})
        console.log('Success:', values);
        axios.post("https://qcotvg.fn.thelarkcloud.com/login",values).then(
            response=>{console.log(response)
                if (response.data.tip==='success'){
                    message.success({content:response.data.message,key,duration:2})
                    document.cookie = values.user_name
                    window.history.pushState(null,null,"/author_home")
                    window.history.go(0)
                }
                else
                    message.error({content:response.data.message,key,duration:2})
            },
            error=>{console.log(error)}
        )
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        setIsModalVisible(true);
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
                登录
            </Button>
            <Modal title="登录" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} okText="登录" cancelText="取消" >
                <Form {...layout} ref={c=>{formRef=c}} name="basic" initialValues={{remember: true,}} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                    <Form.Item label="用户名" name="user_name" rules={[{required: true, message: 'Please input your username!',},]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="密码" name="password" rules={[{required: true, message: 'Please input your password!',},]}>
                        <Input.Password />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
export default Login;