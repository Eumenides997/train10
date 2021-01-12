import ProductTagsData from '../services/ProductTagsData'

export default {
    namespace: 'productTags',
    state: {
        tagsData: []
    },
    effects: {
        *GetData({ data }, { put, call }) {
            const res = yield call(ProductTagsData.getTags)
            console.log("res:", res)
            yield put({
                type: 'setTagsData',
                data: res.data.data
            })
        }
    },
    reducers: {
        setTagsData(state, payload) {
            const res = payload.data
            console.log(res)
            return {
                ...state,
                tagsData: JSON.parse(JSON.stringify(res))
            }
        }
    }
}