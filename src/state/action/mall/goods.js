import types from './../../const/mall/goods';

export default {
    getGoodsList( page , filters ){
        const pageSize = 10;

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
    },

    upOrDown(id,page){
        return dispatch => (
            $http.post(`/mall/goods/upOrDown`,{
                goodsId:id
            }).then((data)=>{
                dispatch({
                    type:types.UPDATE_ONE_GOODS,
                    data:{
                        item:data,
                        page:page
                    }
                });
                return data;
            }).catch(()=>{
                message.error(`操作失败!`)
            })
        )
    },
    deleteGoods(id,page){
        return dispatch => (
            $http.post(`/mall/goods/delete`,{
                goodsId:id
            }).then((data)=>{
                dispatch({
                    type:types.DELETE_GOODS,
                    data:{
                        id:id,
                        page:page
                    }
                });
                return data;
            }).catch(err=>{
                message.error(err.message)
            })
        )
    },
    //添加商品
    addGoods(params) {
        return dispatch => (
            $http.post(`/mall/goods/add`,{
                ...params
            })
        )
    },
    //获取商品
    getGoods( id ){
        return dispatch => (
            $http.get(`/mall/goods/detail`,{
                id:id
            })
        )
    },
    updateGoods( id , update) {
        return dispatch => (
            $http.post(`/mall/goods/update` ,{
                goodsId:id,
                update:update
            })
        )
    }
}