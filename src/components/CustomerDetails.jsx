import React from 'react';
import { connect } from 'dva'
import { List, Divider, Row, Col } from 'antd';

@connect(({ customers }) => ({
    customer: customers.customer,
    orders: customers.orders
}))

class CustomerDetails extends React.Component {
    constructor() {
        super()
        this.state = {
            data: []
        }
    }
    async componentWillMount() {
        const { dispatch } = this.props
        await dispatch({
            type: 'customers/setStorage'
        })
        await dispatch({
            type: 'customers/getOrders',
            data: this.props.customer
        })
    }
    render() {
        const { customer, orders } = this.props
        console.log("customer:", customer)
        console.log("orders:", orders)
        const shipping_address = customer.shipping_address
        console.log("shipping_address:", shipping_address)
        this.state.data = [];
        orders.map(item => {
            this.state.data.push(
                <div>
                    <a>订单编号:</a>{item.ID}
                    <a>时间:</a>{item.post_date}
                    <a>商品名:</a>{item.line_items[0].order_item_name}
                    <a>下单类型:</a>{item.line_items[0].order_item_type}
                    {item.line_items[0].price}
                    {item.line_items[0].line_total}
                    {item.line_items[0].line_subtotal}
                </div>
            )
        })
        return (
            <div style={{ marginTop: '10px' }}>
                <h1>
                    顾客列表/顾客详情
                </h1>
                <div style={{ float: 'left', width: '70%', backgroundColor: 'white' }}>
                    <Divider orientation="left">顾客信息</Divider>
                    <List
                        bordered
                    >
                        <List.Item>
                            <a>姓名:</a>{customer.first_name + "-" + customer.last_name}
                        </List.Item>
                        <List.Item>
                            <a>电话:</a>{customer.phone}
                        </List.Item>
                        <List.Item>
                            <a>地区:</a>{customer.country}
                        </List.Item>
                        <List.Item>
                            <a>邮箱:</a>{customer.user_email}
                        </List.Item>
                        <List.Item>
                            <a>顾客类型:</a>{customer.type}
                        </List.Item>
                        <List.Item>
                            <a>加入时间:</a>{customer.user_registered}
                        </List.Item>
                        <List.Item>
                            <a>总单量:</a>{customer.order_count}
                        </List.Item>
                        <List.Item>
                            <a>总消费:</a>{customer.order_total}
                        </List.Item>
                    </List>
                </div>
                <div style={{ float: 'left', width: '20%', marginLeft: '2%', backgroundColor: 'white' }}>
                    <Divider orientation="left">收货地址</Divider>
                    <List
                        bordered
                    >
                        <List.Item>
                            <a>姓名:</a>{shipping_address === undefined ? ''
                                : shipping_address.first_name + "-" + shipping_address.last_name}
                        </List.Item>
                        <List.Item>
                            <a>电话:</a>{shipping_address === undefined ? ''
                                : shipping_address.phone}
                        </List.Item>
                        <List.Item>
                            <a>地址:</a>{shipping_address === undefined ? ''
                                : shipping_address.address_1 + "-" + shipping_address.address_2}
                        </List.Item>
                        <List.Item>
                            <a>邮箱:</a>{shipping_address === undefined ? ''
                                : shipping_address.postcode}
                        </List.Item>
                    </List>
                </div>
                <div style={{ float: 'left', width: '70%', backgroundColor: 'white' }}>
                    <Divider orientation="left">历史订单</Divider>
                    <List
                        bordered
                        dataSource={this.state.data}
                        renderItem={item => (
                            <List.Item>
                                {item}
                            </List.Item>
                        )}
                    />
                </div>

            </div >
        )
    }
}
export default CustomerDetails