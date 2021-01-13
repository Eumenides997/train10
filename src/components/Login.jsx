import { Form, Input, Button, Checkbox,Card } from 'antd';
import React from 'react';
import logo from './img/logo.jpg';

class Login extends React.Component {
    render() {
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const Demo = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
      <Card size="default" bordered={true}style={{width:'500px',paddingRight:'70px',backgroundColor:'#E6E6FA',}}>
          <>
            <img src={logo} alt="logo" style={{marginLeft:'190px'}}/>
        </>
    <Form
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}

    >
        <img src="train10/train10/src/img/" alt=""/>
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
      
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </Card>
  );
};

        return (
            
            <div style={{marginTop:'200px',marginRight:'400px',marginLeft:'400px',width:'500px',height:'400px'}}><Demo /></div>
            
        )
    }
}
export default Login;