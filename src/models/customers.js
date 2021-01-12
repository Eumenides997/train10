import CustomersData from '../services/CustomersData'

export default {
    namespace: 'customers',
    state: {
        customersData: []
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
    }
}