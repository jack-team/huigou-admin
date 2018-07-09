import types from './../../const/mall/goods';

const initState = {
    goods: {
        list: {}
    }
};

export default (state = initState, action) => {
    const { type, data } = action;
    switch (type) {
        case types.GET_GOODS_LIST: {
            const {
                page,
                list,
                pageSize,
                pageTotal
            } = data;
            state.goods.list[page] = list;
            state.goods.page = page;
            state.goods.pageSize = pageSize;
            state.goods.pageTotal = pageTotal;
            return {
                ...state
            };
        }
        case types.UPDATE_ONE_GOODS : {
            const {
                item,
                page
            } = data;

            const list = state.goods.list[page] || [];

            if (list.length) {
                const index = list.findIndex(it => it.goodsId === item.goodsId);
                list[index] = item;
                state.goods.list[page] = list;
                return {
                    ...state
                };
            }
        }
        case types.DELETE_GOODS: {
            const {
                id,
                page
            } = data;

            const list = state.goods.list[page] || [];

            if (list.length) {
                const index = list.findIndex(it => it.goodsId === id);
                list.splice(index, 1);
                state.goods.list[page] = list;
                return {
                    ...state
                };
            }
        }
    }
    return state;
}