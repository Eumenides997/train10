import ProductsData from '../services/ProductsData'

export default {
    namespace: 'products',
    state: {
        productsData: [],
        productData: []
    },
    effects: {
        *GetData({ data }, { put, call }) {
            const res = yield call(ProductsData.getProducts)
            console.log("res:", res)
            yield put({
                type: 'setProductsData',
                data: res.data.data
            })
        },
        *SetProduct({ data }, { put }) {
            const res = data
            // console.log("res:", res)
            yield put({
                type: 'setProductData',
                data: res
            })
        },
        *setStorage({ payload }, { put }) {
            // console.log("res:",  JSON.parse(window.localStorage.getItem("productData")))
            yield put({
                type: 'storageData',
                data: {
                    productData: JSON.parse(window.localStorage.getItem("productData")),
                }
            })
        },
        *CreateProduct({ data }, { call }) {
            const res = data
            console.log("res:", res)
            const result = yield call(ProductsData.createProduct, res)
            console.log(result)
        },
        *DeleteProducts({ data }, { call, put }) {
            const res = data
            console.log("res:", res)
            const result = yield call(ProductsData.deleteProduct, res.ID)
            console.log(result)
            yield put({
                type: 'deleteProducts',
                data: res
            })
        },
        *UpdataProducts({ data }, { call, put }) {
            const res = data
            console.log("res:", res)
            const result = yield call(ProductsData.updataProducts, res.item, res.poststate)
            console.log(result)
            yield put({
                type: 'updataProducts',
                data: res
            })
        },
        *ScreenProducts(data, { put, call }) {
            const res = data.data
            console.log("res:", res)
            const res2 = yield call(ProductsData.screenProducts, res)
            console.log("res2:", res2)
            yield put({
                type: 'setProductsData',
                data: res2.data.data
            })
        }
    },
    reducers: {
        setProductsData(state, payload) {
            // console.log(payload.data)
            return {
                ...state,
                productsData: JSON.parse(JSON.stringify(payload.data)),
                productsData2: JSON.parse(JSON.stringify(payload.data))
            }
        },
        setProductData(state, payload) {
            // console.log("data:", payload.data)
            const storage = window.localStorage
            storage.setItem("productData", JSON.stringify(payload.data))
            return {
                ...state,
                productData: payload.data
            }
        },
        storageData(state, payload) {
            // console.log(payload.data.productData)
            return {
                ...state,
                productData: payload.data.productData
            }
        },
        deleteProducts(state, payload) {
            const res = payload.data
            const { productsData } = state
            const products = productsData
            productsData.map((item, key) => {
                if (item.ID === res.ID) {
                    products.splice(key, 1)
                }
            })
            // console.log('products:', products)
            return {
                ...state,
                productsData: JSON.parse(JSON.stringify(products))
            }
        },
        updataProducts(state, payload) {
            const res = payload.data
            // console.log("updataProducts:", res)
            const { productsData } = state
            // console.log('productsData:', productsData)
            productsData.map(item => {
                if (item.ID === res.item.ID) {
                    item.post_status = res.poststate
                }
            })
            // console.log('productsData:', productsData)
            return {
                ...state,
                productsData: JSON.parse(JSON.stringify(productsData))
            }
        }
    }
}