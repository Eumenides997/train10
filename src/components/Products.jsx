import React from 'react';
import { Table, Image, Input, Select, Row, Col, Button, Checkbox } from 'antd';
import { SearchOutlined, UndoOutlined, FileAddOutlined } from '@ant-design/icons';
import { connect } from 'dva'
import { Link } from 'dva/router';

@connect(({ products }) => ({
    productsData: products.productsData
}))

class Products extends React.Component {
    constructor() {
        super()
        this.state = {
            columnsKey: 0,
            data: [],//选中商品
            dataSource: []
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
        const DeleteProducts = async (products) => {
            const { dispatch } = this.props
            await products.map(item => {
                console.log(item)
                dispatch({
                    type: "products/DeleteProducts",
                    data: item
                })
            })
            this.dataSource.map(item => {
                console.log(item.check)
            })
            this.setState({
                columnsKey: 0
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
        const checkAll = () => {
            this.setState({
                columnsKey: length
            })
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
                />,
                img: <Image src={item.image} width={50} />,
                name: item.title,
                type: elements,
                saleState: item.post_status,
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
                title: <Checkbox onChange={checkAll} ref={(ref) => { this.myCheck = ref }} />,
                dataIndex: 'check',
                key: 'check',
            },
            {
                title: <div>
                    <a style={{ marginRight: "20px" }} onClick={() => alert('上架')}>上架</a>
                    <a style={{ marginRight: "20px" }} onClick={() => alert('下架')}>下架</a>
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
            // alert(this.myInput.input.value);
            console.log(this.myInput)
            console.log(this.myCheck.input.checked)
        }
        return (
            <div style={{ marginTop: '10px' }}>
                <h1>
                    商品列表
                    <Link to="/ProductsEdit" onClick={() => this.setProduct([])}><Button style={{ float: "right" }} type="primary" icon={<FileAddOutlined />}>添加商品</Button></Link>
                </h1>
                <Row gutter={[16, 16]}>
                    <Col span={4}>
                        <Select placeholder="全部分类">
                            {type.map(it => (
                                <Select.Option key={it} value={it}>
                                    {it}
                                </Select.Option>
                            ))}
                        </Select>
                    </Col>
                    <Col span={4}>
                        <Select
                            className='Select'
                            placeholder="全部标签"
                        >
                            {label.map(it => (
                                <Select.Option key={it} value={it}>
                                    {it}
                                </Select.Option>
                            ))}
                        </Select>
                    </Col>
                    <Col span={4}>
                        <Select
                            placeholder="全部状态"
                        >
                            {saleState.map(it => (
                                <Select.Option key={it} value={it}>
                                    {it}
                                </Select.Option>
                            ))}
                        </Select>
                    </Col>
                    <Col span={8}>
                        <Input placeholder="请输入商品名或SKU" ref={(ref) => { this.myInput = ref }} />
                    </Col>
                    <Col span={1}>
                        <Button type="primary" shape="circle" icon={<SearchOutlined onClick={onSearch} />} />
                    </Col>
                    <Col span={1}>
                        <Button type="primary" shape="circle" icon={<UndoOutlined />} />
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