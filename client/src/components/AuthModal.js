import React from 'react'
import { Modal, Button, Form, Input,message } from "antd";
import { useAppContext } from '../context/appContext';


const AuthModal = ({ open}) => {
  const {authenticateUser, alertType,alertText } = useAppContext();

  const onFinish = (values) => {
    authenticateUser(values)
    if(alertText== "Invalid code"){
      message.error(alertText);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const validateCode = (_, value) => {
    if (alertText) {
      return Promise.reject(alertText);
    }
    return Promise.resolve();
  };

  return (
    <>
      <Modal title="Authenticate" footer={null} closeIcon={false} maskClosable={false} open={open}>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Code"
            name="code"
            rules={[
              {
                required: true,
                message: "Please input your code!",
              },
              // {
              //   validator: validateCode,
              // },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default AuthModal
