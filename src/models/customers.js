import CustomersData from '../services/CustomersData'

export default {
    namespace: 'customers',
    state: {
        customersData: [],
        customer: [],
        orders: []
    },
    effects: {
        *GetData({ data }, { put, call }) {
            const res = yield call(CustomersData.getCustomers)
            console.log("res:", res)
            yield put({
                type: 'setCustomers',
                data: res.data.data
            })
        },
        *ScreenCustomers(data, { put, call }) {
            const res = data.data
            console.log("res:", res)
            const res2 = yield call(CustomersData.screenCustomers, res)
            console.log("res2:", res2)
            yield put({
                type: 'setCustomersData',
                data: res2.data.data
            })
        },
        *setStorage({ payload }, { put }) {
            // console.log("res:",  JSON.parse(window.localStorage.getItem("productData")))
            yield put({
                type: 'storageData',
                data: {
                    customer: JSON.parse(window.localStorage.getItem("customer")),
                }
            })
        },
        *SetCustomer(data, { put }) {
            const res = data.data
            console.log("res:", res)
            yield put({
                type: 'setCustomer',
                data: res
            })
        },
        *getOrders(data, { call, put }) {
            const res = data.data.ID
            console.log("res:", res)
            const res2 = yield call(CustomersData.getOrders, res)
            console.log("res2:", res2)
            yield put({
                type: 'setOrders',
                data: res2.data.data
            })
        }
    },
    reducers: {
        setCustomers(state, payload) {
            const res = payload.data
            console.log(res)
            return {
                ...state,
                customersData: JSON.parse(JSON.stringify(res))
            }
        },
        setCustomersData(state, payload) {
            const res = payload.data
            console.log(res)
            return {
                ...state,
                customersData: JSON.parse(JSON.stringify(res))
            }
        },
        setCustomer(state, payload) {
            const res = payload.data
            console.log(res)
            const storage = window.localStorage
            storage.setItem("customer", JSON.stringify(res))
            return {
                ...state,
                customer: JSON.parse(JSON.stringify(res))
            }
        },
        storageData(state, payload) {
            console.log(payload.data.customer)
            return {
                ...state,
                customer: payload.data.customer
            }
        },
        setOrders(state, payload) {
            console.log(payload.data)
            return {
                ...state,
                orders: payload.data
            }
        },
    }
}