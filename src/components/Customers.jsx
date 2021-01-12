import React from 'react';
import { Table, DatePicker, Space, Input, Select, Row, Col, Button, Checkbox } from 'antd';
import { SearchOutlined, UndoOutlined, FileAddOutlined } from '@ant-design/icons';
import { connect } from 'dva'
import { Link } from 'dva/router';

@connect(({ customers }) => ({
    customersData: customers.customersData
}))

class Products extends React.Component {
    constructor() {
        super()
        this.state = {
            dataSource: [],
            subscribed: '',
            country: '',
            date: '',
            search: ''
        }
    }
    async componentWillMount() {
        const { dispatch } = this.props
        await dispatch({
            type: 'customers/GetData'
        })
    }
    setProduct = async (data) => {
        const { dispatch } = this.props
        // console.log("data:", data)
        await dispatch({
            type: 'products/SetProduct',
            data: data
        })
    }
    render() {
        const screenProducts = (type, it) => {
            const { dispatch } = this.props
            if (type === "subscribed") {
                this.state.subscribed = it
            } else if (type === "country") {
                this.state.country = it
            } else if (type === "date") {
                this.state.date = it
            } else {
                this.state.search = it
            }
            const path = "filter[subscribed]=" + this.state.subscribed
                + "&" + "filter[country]=" + this.state.country
                + "&" + "filter[date]=" + this.state.date
                + "&" + "filter[search]=" + this.state.search
            dispatch({
                type: "customers/ScreenCustomers",
                data: path
            })
        }
        // console.log("商品列表")
        const { customersData } = this.props
        console.log('customersData:', customersData)
        this.dataSource = (customersData || []).map((item, key) => (
            {
                key: key,
                name: item.first_name + "-" + item.last_name,
                country: item.country,
                state: item.subscribed ? "已订阅" : "未订阅",
                count: item.order_count,
                amount: item.order_total,
            }
        ))
        const columns1 = [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '地区',
                dataIndex: 'country',
                key: 'country',
            },
            {
                title: '订阅状态',
                dataIndex: 'state',
                key: 'state',
            },
            {
                title: '订单数',
                dataIndex: 'count',
                key: 'count',
            },
            {
                title: '订单总金额',
                dataIndex: 'amount',
                key: 'amount',
            }
        ];
        const type = ['全部订阅状态', '已订阅', '未订阅'];
        const label = ['全部地区', '福建', '北京'];//没有地区数据接口
        const onSearch = () => {
            const value = this.refs.search.state.value
            console.log(this.refs.search)
            screenProducts("search", value === undefined ? "" : value)
        }
        const { RangePicker } = DatePicker;
        const handleDate = (value, dataString) => {
            // console.log(dataString[0] + "->" + dataString[1])
            const date = dataString[0] + "," + dataString[1]
            screenProducts("date", date === undefined ? "" : date === "," ? "" : date)
        }
        return (
            <div style={{ marginTop: '10px' }}>
                <h1>
                    顾客列表
                </h1>
                <Row gutter={[16, 16]}>
                    <Col span={4}>
                        <Select placeholder="全部订阅状态">
                            {type.map(it => (
                                <Select.Option key={it} value={it} >
                                    <span onClick={() => screenProducts("subscribed", it === "全部订阅状态" ? "" : it === "已订阅" ? 1 : 0)}>{it}</span>
                                </Select.Option>
                            ))}
                        </Select>
                    </Col>
                    <Col span={4}>
                        <Select
                            placeholder="全部地区"
                        >
                            {label.map(it => (
                                <Select.Option key={it} value={it}>
                                    <span onClick={() => screenProducts("country", it === "全部地区" ? "" : it)}>{it}</span>
                                </Select.Option>
                            ))}
                        </Select>
                    </Col>
                    <Col span={6}>
                        <Space direction="vertical" size={12}>
                            <RangePicker
                                format="YYYY-MM-DD"
                                onChange={handleDate} />
                        </Space>
                    </Col>
                    <Col span={6}>
                        <Input placeholder="请输入姓名/邮箱/手机" ref="search" />
                    </Col>
                    <Col span={1}>
                        <Button type="primary" shape="circle" icon={<SearchOutlined onClick={onSearch} />} />
                    </Col>
                    <Col span={1}>
                        <Button type="primary" shape="circle" icon={<UndoOutlined />} onClick={() => { this.refs.search.state.value = "" }} />
                    </Col>
                </Row>
                <Table dataSource={this.dataSource} columns={columns1} />
            </div >
        )
    }
}
export default Products