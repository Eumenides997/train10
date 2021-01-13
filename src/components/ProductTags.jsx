import React from 'react';
import { Table, Image, Input, Select, Row, Col, Button, Checkbox } from 'antd';
import { SearchOutlined, UndoOutlined, FileAddOutlined } from '@ant-design/icons';
import { connect } from 'dva'
import { Link } from 'dva/router';

@connect(({ products }) => ({
    productsData: products.productsData,
    deleteFlag: products.deleteFlag
}))

class Products extends React.Component {
    constructor() {
        super()
        this.state = {
            columnsKey: 0,
            data: [],//选中商品
            dataSource: [],
            status: '',
            tag: '',
            category: '',
            search: ''
        }
    }
    async componentWillMount() {
        const { dispatch } = this.props
        await dispatch({
            type: 'products/GetData'
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
        const DeleteProducts = (products) => {
            const { dispatch } = this.props
            products.map(item => {
                console.log(item)
                dispatch({
                    type: "products/DeleteProducts",
                    data: item
                })
            })
            this.setState({
                columnsKey: 0
            })
        }
        const UpdataProducts = (products, poststate) => {
            const { dispatch } = this.props
            console.log(products, poststate)
            products.map(item => {
                dispatch({
                    type: "products/UpdataProducts",
                    data: { item, poststate }
                })
            })
        }
        const screenProducts = (type, it) => {
            const { dispatch } = this.props
            if (type === "category") {
                this.state.category = it
            } else if (type === "tag") {
                this.state.tag = it
            } else if (type === "status") {
                this.state.status = it
            } else {
                this.state.search = it
            }
            const path = "filter[category]=" + this.state.category
                + "&" + "filter[tag]=" + this.state.tag
                + "&" + "filter[status]=" + this.state.status
                + "&" + "filter[search]=" + this.state.search
            dispatch({
                type: "products/ScreenProducts",
                data: path
            })
        }
        // console.log("商品列表")
        const { productsData } = this.props
        console.log('productsData:', productsData)
        this.state.data = []
        let length = 0
        {
            (productsData || []).map((item, key) => {
                if (item.checked) {
                    length++
                    this.state.data.push(item)
                }
            })
        }
        console.log('选中商品:', this.state.data)
        const onChange = e => {
            // console.log(e)
            e.target.data.checked = e.target.checked
            if (e.target.checked) {
                this.setState({
                    columnsKey: this.state.columnsKey + 1
                })
            } else {
                this.setState({
                    columnsKey: this.state.columnsKey - 1
                })
            }
        }
        const checkAll = e => {
            if (e.target.checked) {
                (this.dataSource || []).map(item => {
                    item.check.props.data.checked = true
                })
                this.setState({
                    columnsKey: this.dataSource.length
                })
            } else {
                (this.dataSource || []).map(item => {
                    item.check.props.data.checked = false
                })
                this.setState({
                    columnsKey: 0
                })
            }
            // console.log(e.target.checked)
            // console.log(this.state.columnsKey)
        }
        let elements = ''
        this.dataSource = (productsData || []).map((item, key) => (
            elements = [],
            item.categories.map(ite => {
                elements += ite.name + " "
            }),
            {
                key: key,
                check: <Checkbox onChange={onChange}
                    data={item}
                    checked={item.checked}
                />,
                img: <Image src={item.image} width={50} />,
                name: item.title,
                type: elements,
                saleState: item.post_status === "publish" ? "上架" : "下架",
                operation: <Link to="/ProductsEdit" onClick={() => this.setProduct(item)}>编辑</Link>
            }
        ))
        const columns1 = [
            {
                title: <Checkbox onChange={checkAll} ref={(ref) => { this.myCheck = ref }} />,
                dataIndex: 'check',
                key: 'check',
            },
            {
                title: '图片',
                dataIndex: 'img',
                key: 'img',
            },
            {
                title: '商品',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '分类',
                dataIndex: 'type',
                key: 'type',
            },
            {
                title: '状态',
                dataIndex: 'saleState',
                key: 'saleState',
            },
            {
                title: '操作',
                dataIndex: 'operation',
                key: 'operation',
            }
        ];
        const columns2 = [
            {
                title: <Checkbox onChange={checkAll} ref="myCheck" />,
                dataIndex: 'check',
                key: 'check',
            },
            {
                title: <div>
                    <a style={{ marginRight: "20px" }} onClick={() => UpdataProducts(this.state.data, 'publish')}>上架</a>
                    <a style={{ marginRight: "20px" }} onClick={() => UpdataProducts(this.state.data, 'private')}>下架</a>
                    <a style={{ marginRight: "20px" }} onClick={() => DeleteProducts(this.state.data)}>删除</a>
                </div>,
                dataIndex: 'img',
                key: 'img',
            },
            {
                title: '',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '',
                dataIndex: 'type',
                key: 'type',
            },
            {
                title: '',
                dataIndex: 'saleState',
                key: 'saleState',
            },
            {
                title: '',
                dataIndex: 'operation',
                key: 'operation',
            }
        ];
        const type = ['全部分类', '衣服', '裤子', '鞋子'];
        const label = ['全部标签', '标签', '标签2', '标签3', '标签n'];
        const saleState = ['全部分类', '已上架', '已下架'];
        const onSearch = () => {
            const value = this.refs.search.state.value
            console.log(this.refs.search)
            screenProducts("search", value === undefined ? "" : value)
        }
        return (
            <div style={{ marginTop: '10px' }}>
                <h1>
                    商品列表
                    <Link to="/ProductsEdit" onClick={() => this.setProduct([])}><Button style={{ float: "right" }} type="primary" icon={<FileAddOutlined />}>添加商品</Button></Link>
                </h1>
                <Row gutter={[16, 16]}>
                    <Col span={8}>
                        <Input placeholder="请输入分类名称" ref="search" />
                    </Col>
                    <Col span={1}>
                        <Button type="primary" shape="circle" icon={<SearchOutlined onClick={onSearch} />} />
                    </Col>
                    <Col span={1}>
                        <Button type="primary" shape="circle" icon={<UndoOutlined />} onClick={() => { this.refs.search.state.value = "" }} />
                    </Col>
                </Row>
                {
                    this.state.columnsKey ?
                        <Table dataSource={this.dataSource} columns={columns2} />
                        : <Table dataSource={this.dataSource} columns={columns1} />
                }
            </div >
        )
    }
}
export default Products