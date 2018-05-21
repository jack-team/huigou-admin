import types from './../../const/mall/goods';

export default {
    getGoodsList( page , filters ){
        const pageSize = 30;

        return dispatch => (
            $http.get(`/mall/goods/list`,{
                page:page,
                pageSize,
                ...filters
            }).then(data=>{
                dispatch({
                    type:types.GET_GOODS_LIST,
                    data:{
                        ...data,
                        pageSize
                    }
                });
                return data;
            })
        )
    }
}