import React from 'react';
import { Menu, Switch, Divider } from 'antd';
import {
    HomeOutlined,
    FileTextOutlined,
    HddOutlined,
    UserOutlined,
    SettingOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;

const Demo = () => {
    const [mode, setMode] = React.useState('inline');
    const [theme, setTheme] = React.useState('light');

    const changeMode = value => {
        setMode(value ? 'vertical' : 'inline');
    };

    const changeTheme = value => {
        setTheme(value ? 'dark' : 'light');
    };

    return (
        <>
            <Switch onChange={changeMode} /> <a>mode</a>
            <Divider type="vertical" />
            <Switch onChange={changeTheme} /> <a>dark</a>
            <br />
            <br />
            <Menu
                style={{ width: 256 }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode={mode}
                theme={theme}
            >
                <Menu.Item key="1" icon={<HomeOutlined />}>
                    <a>首页</a>
                </Menu.Item>
                <Menu.Item key="2" icon={<FileTextOutlined />}>
                    <a>订单</a>
                </Menu.Item>
                <SubMenu key="sub1" icon={<HddOutlined />} title="商品">
                    <Menu.Item key="3"><a>商品列表</a></Menu.Item>
                    <Menu.Item key="4"><a>分类列表</a></Menu.Item>
                </SubMenu>
                <Menu.Item key="5" icon={<UserOutlined />}>
                    <a>顾客</a>
                </Menu.Item>
                <Menu.Item key="6" icon={<SettingOutlined />}>
                    <a>设置</a>
                </Menu.Item>
            </Menu>
        </>
    );
};
class App extends React.Component {
    render() {
        return (
            <Demo />
        )
    }
}
export default App