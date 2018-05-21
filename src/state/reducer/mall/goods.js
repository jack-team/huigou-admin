import types from './../../const/mall/goods';
const initState = {
    goods:{
        list:{}
    }
};

export default (state = initState , action ) => {
    const { type , data } = action;
    switch (type) {
        case types.GET_GOODS_LIST: {
            const {
                page ,
                list,
                pageSize ,
                pageTotal
            } = data;
            state.goods.list[page] = list;
            state.goods.page = page;
            state.goods.pageSize = pageSize;
            state.goods.pageTotal = pageTotal;
            return {
                ...state
            }
        }
    }
    return state;
}