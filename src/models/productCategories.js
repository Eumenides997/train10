import ProductCategories from '../services/ProductCategoriesData'

export default {
    namespace: 'productCategories',
    state: {
        CategoriesData: [],
        CategoriesData2: []
    },
    effects: {
        *GetData({ data }, { put, call }) {
            const res = yield call(ProductCategories.getCategories)
            console.log("res:", res)
            yield put({
                type: 'setCategoriesData',
                data: res.data.data
            })
        },
        *ScreenCategoriesData(data, { put }) {
            const res = data
            console.log("res:", res)
            yield put({
                type: 'screenCategoriesData',
                data: res.data
            })
        },
        *DeleteCategories(data, { put, call }) {
            const res = data
            console.log("res:", res)
            const result = yield call(ProductCategories.deleteProduct, res.data)
            console.log(result)
            yield put({
                type: 'deleteCategories',
                data: res.data
            })
        }
    },
    reducers: {
        setCategoriesData(state, payload) {
            // console.log(payload.data)
            return {
                ...state,
                CategoriesData: JSON.parse(JSON.stringify(payload.data)),
                CategoriesData2: JSON.parse(JSON.stringify(payload.data))
            }
        },
        screenCategoriesData(state, payload) {
            // console.log(payload.data)
            const { CategoriesData2 } = state
            const list = []
            CategoriesData2.map(item => {
                if (item.name === payload.data || payload.data === '') {
                    list.push(item)
                }
            })
            console.log("list:", list)
            return {
                ...state,
                CategoriesData: JSON.parse(JSON.stringify(list))
            }
        },
        deleteCategories(state, payload) {
            const res = payload.data
            console.log(res)
            const { CategoriesData } = state
            const list = CategoriesData
            CategoriesData.map((item, key) => {
                if (item.id === res) {
                    list.splice(key, 1)
                }
            })
            console.log(list)
            return {
                ...state,
                CategoriesData: JSON.parse(JSON.stringify(list))
            }
        }
    }
}