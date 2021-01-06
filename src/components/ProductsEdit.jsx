import React from 'react';
import { connect } from 'dva'
import {
    Input,
    Layout,
    Form,
    Select,
    Button,
    Upload,
    Row,
    Col
} from 'antd';
import { UploadOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from 'dva/router';

const { Option } = Select;

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

const normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
}

@connect(({ products }) => ({
    productData: products.productData
}))

class ProductsEdit extends React.Component {
    constructor() {
        super()
        this.state = {
            productData: []
        }
    }
    async componentWillMount() {
        const { dispatch } = this.props
        await dispatch({
            type: 'products/setStorage'
        })
    }
    CreateProduct = async (data) => {
        // var product = {
        //     "title": data.title,
        //     "content": "facere",
        //     "post_status": data.post_status === "上架" ? "publish" : "下架",
        //     "regular_price": data.regular_price || 0,
        //     "price": data.price || 0,
        //     "sku": data.sku || "",
        //     "weight": 20,
        //     "weight_unit": "g",
        //     "manage_stock": "yes",
        //     "stock": 50,
        //     "backorders": "no",
        //     "tags": data.tags || [],
        //     "categories": data.categories || [],
        //     "gallery": [],
        //     "attrs": [],
        //     "variants": [],
        //     "slug": "ducimus"
        // }
        var product = {
            "title": data.title,
            "content": "facere",
            "post_status": data.post_status === "上架" ? "publish" : "publish",
            "regular_price": data.regular_price || 0,
            "price": data.regular_price || 0,
            "sku": data.sku || "111",
            "weight": 20,
            "weight_unit": "g",
            "manage_stock": "yes",
            "stock": 50,
            "backorders": "no",
            "tags": [],
            "categories": [],
            "gallery": [],
            "attrs": [],
            "variants": [],
            "slug": "ducimus"
        }
        // console.log(data)
        const { dispatch } = this.props
        await dispatch({
            type: "products/CreateProduct",
            data: product
        })
    }
    render() {
        const { Header, Content, Footer } = Layout;
        const { productData } = this.props
        this.state.productData = []
        this.state.productData = productData
        console.log("productData:", this.state.productData)
        const Demo = data => {

            const product = data.data
            const onFinish = values => {
                console.log('Received values of form: ', values, "ID: ", product.ID);
                product.ID ? console.log('修改') : (console.log("上传"), this.CreateProduct(values))
            };
            console.log('Received data: ', product);
            return (
                <Form
                    name="validate_other"
                    {...formItemLayout}
                    onFinish={onFinish}
                    initialValues={{
                        ['title']: product.title,
                        ['regular_price']: product.regular_price,
                        ['price']: product.price,
                        ['sku']: product.sku,
                        ['post_status']: (product.post_status === "publish" || product.post_status === "上架") ? "上架" : "下架",
                        ['categories']: product.categories,
                        ['tags']: product.tags,
                    }}
                >
                    <Form.Item name="title" label="商品名称:" rules={[{ required: true, message: '不能为空' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="regular_price" label="价格:">
                        <Input />
                    </Form.Item>
                    <Form.Item name="price" label="原价:">
                        <Input />
                    </Form.Item>
                    <Form.Item name="sku" label="SKU:" >
                        <Input />
                    </Form.Item>
                    <Form.Item label="商品分类:">
                        <Form.List name="categories">
                            {(categories, { add, remove }) => (
                                <Row>
                                    <>
                                        {
                                            // this.i = 0,
                                            // console.log(product.type, "-", this.i),
                                            categories.map(item => (
                                                <Col span={7} key={item.key} style={{ display: 'flex' }} align="baseline">
                                                    <Form.Item
                                                        {...item}
                                                        name={[item.name, 'name']}
                                                        itemkey={[item.itemkey, 'type']}
                                                        rules={[{ required: true, message: '不能为空' }]}
                                                    >
                                                        <Input placeholder="分类" />
                                                    </Form.Item>
                                                    <MinusCircleOutlined onClick={() => remove(item.name)} />
                                                </Col>
                                            ))}
                                        <Form.Item>
                                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>添加</Button>
                                        </Form.Item>
                                    </>
                                </Row>
                            )}
                        </Form.List>
                    </Form.Item>
                    <Form.Item label="商品标签:">
                        <Form.List name="tags">
                            {(label, { add, remove }) => (
                                <Row>
                                    <>
                                        {label.map(item => (
                                            <Col span={7} key={item.key} style={{ display: 'flex' }} align="baseline">
                                                <Form.Item
                                                    {...item}
                                                    name={[item.name, 'name']}
                                                    itemkey={[item.itemKey, 'label']}
                                                    rules={[{ required: true, message: '不能为空' }]}
                                                >
                                                    <Input placeholder="标签" />
                                                </Form.Item>
                                                <MinusCircleOutlined onClick={() => remove(item.name)} />
                                            </Col>
                                        ))}
                                        <Form.Item>
                                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>添加</Button>
                                        </Form.Item>
                                    </>
                                </Row>
                            )}
                        </Form.List>
                    </Form.Item>
                    <Form.Item
                        name="post_status"
                        label="是否上架"
                        hasFeedback
                        rules={[{ required: true, message: '不能为空' }]}
                    >
                        <Select placeholder="上架">
                            <Option value="已上架">上架</Option>
                            <Option value="已下架">下架</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="upload"
                        label="图片"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        extra=""
                    >
                        <Upload name="logo" action="/upload.do" listType="picture">
                            <Button icon={<UploadOutlined />}>上传</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                        <Button type="primary" htmlType="submit">提交</Button>
                        <Button style={{ marginLeft: '30px' }} type="primary"><Link to="/Products">返回</Link></Button>
                    </Form.Item>
                </Form >
            );
        };
        return (
            <div>
                <Layout>
                    <Header style={{ backgroundColor: '#f0f2f5' }}>
                        <h1>基本信息</h1>
                    </Header>
                    <Content >
                        <Demo data={this.state.productData} />
                    </Content>
                    <Footer>
                    </Footer>
                </Layout>
            </div>
        )
    }
}
export default ProductsEdit