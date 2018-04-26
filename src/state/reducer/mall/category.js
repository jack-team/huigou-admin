import types from '../../const/mall/category';

const initState = {
    list: {},
    pageTotal: 0,
    pageSize: 0
};
export default (state = initState, action) => {
    const { type, data } = action;
    switch (type) {
        case types.GET_LIST: {
            const { page, pageSize , pageTotal } = data;
            const { list } = state;
            list[`page${page}`] = data.list;
            return {
                ...state,
                page,
                pageTotal,
                pageSize
            };
        }

        case types.UPDATE_CATEGORY: {
            const { list } = state;
            const {
                categoryName,
                limit,
                categoryId,
                page
            } = data;

            const pageKey = `page${page}`;
            const pageList = list[pageKey];
            const findIndex = pageList.findIndex(item=>item.categoryId===categoryId);
            pageList[findIndex].categoryName=categoryName;
            pageList[findIndex].limit = limit;
            list[pageKey]=pageList;
            return {
                ...state,
                list:list
            }
        }

        case types.DELETE_CATEGORY: {
            const { list } = state;
            const {
                categoryId,
                page
            } = data;
            const pageKey = `page${page}`;
            const pageList = list[pageKey];
            const findIndex = pageList.findIndex(item=>item.categoryId===categoryId);
            pageList.splice(findIndex,1);
            list[pageKey]=pageList;
            return {
                ...state,
                list:list
            }
        }
    }
    return state;
}

