import React from "react";
import { Layout, Menu } from 'antd';
import { Link } from 'dva/router';
import {
    HomeOutlined,
    FileTextOutlined,
    HddOutlined,
    UserOutlined,
    SettingOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class App extends React.Component {
    state = {
        collapsed: true,
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    render() {
        const { collapsed } = this.state;
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                    <h1 style={{ width: '100%', backgroundColor: 'rgb(9, 68, 121)', textAlign: 'center', color: 'white', fontSize: '16px' }}>
                        <img alt=' ' src='./src/assets/yay.jpg' style={{ marginTop: '8px', marginBottom: '5px', marginRight: '10px', marginLeft: '10px', width: '60px' }} />
                        趣购物</h1>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1" icon={<HomeOutlined />}>
                            <a>首页</a>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<FileTextOutlined />}>
                            <a>订单</a>
                        </Menu.Item>
                        <SubMenu key="sub1" icon={<HddOutlined />} title="商品">
                            <Menu.Item key="3"><Link to="/Products"><p>商品列表</p></Link></Menu.Item>
                            <Menu.Item key="4"><Link to="/ProductsTags"><p>分类列表</p></Link></Menu.Item>
                        </SubMenu>
                        <Menu.Item key="5" icon={<UserOutlined />}>
                            <a>顾客</a>
                        </Menu.Item>
                        <Menu.Item key="6" icon={<SettingOutlined />}>
                            <a>设置</a>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ backgroundColor: "white" }} >
                        <p>用户状态栏</p>
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        {this.props.children}
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default App