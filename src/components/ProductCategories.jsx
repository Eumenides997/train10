import React from 'react';
import { Table, Image, Input, Select, Row, Col, Button, Checkbox } from 'antd';
import { SearchOutlined, UndoOutlined, FileAddOutlined } from '@ant-design/icons';
import { connect } from 'dva'
import { Link } from 'dva/router';

@connect(({ productCategories }) => ({
    CategoriesData: productCategories.CategoriesData
}))

class ProductCategories extends React.Component {
    constructor() {
        super()
        this.state = {
            columnsKey: 0,
            data: [],//选中商品
            dataSource: [],
            search: ''
        }
    }
    async componentWillMount() {
        const { dispatch } = this.props
        await dispatch({
            type: 'productCategories/GetData'
        })
    }
    // setProduct = async (data) => {
    //     const { dispatch } = this.props
    //     // console.log("data:", data)
    //     await dispatch({
    //         type: 'products/SetProduct',
    //         data: data
    //     })
    // }
    render() {
        const DeleteProducts = (products) => {
            const { dispatch } = this.props
            products.map(item => {
                // console.log(item)
                dispatch({
                    type: "productCategories/DeleteCategories",
                    data: item.id
                })
            })
            this.setState({
                columnsKey: 0
            })
        }
        const screenProducts = (it) => {
            const { dispatch } = this.props
            // console.log(it)
            dispatch({
                type: "productCategories/ScreenCategoriesData",
                data: it
            })
        }
        // console.log("商品列表")
        const { CategoriesData } = this.props
        console.log('CategoriesData:', CategoriesData)
        this.state.data = []
        let length = 0
        {
            (CategoriesData || []).map(item => {
                if (item.checked) {
                    length++
                    this.state.data.push(item)
                }
            })
        }
        console.log('选中分类:', this.state.data)
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
        this.dataSource = (CategoriesData || []).map((item, key) => (
            {
                key: key,
                check: <Checkbox onChange={onChange}
                    data={item}
                    checked={item.checked}
                />,
                img: <Image src={item.path} width={50} />,
                name: item.name,
                count: item.product_count,
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
                title: '分类',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '商品数量',
                dataIndex: 'count',
                key: 'count',
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
                dataIndex: 'count',
                key: 'count',
            },
            {
                title: '',
                dataIndex: 'operation',
                key: 'operation',
            }
        ];
        const onSearch = () => {
            const value = this.refs.search.state.value
            // console.log(value)
            screenProducts(value === undefined ? "" : value)
        }
        return (
            <div style={{ marginTop: '10px' }}>
                <h1>
                    分类列表
                    <Link to="/ProductsEdit" onClick={() => this.setProduct([])}><Button style={{ float: "right" }} type="primary" icon={<FileAddOutlined />}>新增分类</Button></Link>
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
export default ProductCategories