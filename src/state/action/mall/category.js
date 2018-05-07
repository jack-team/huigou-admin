import types from '../../const/mall/category';

export default {
    //添加分类
    addCategory(categoryName,limit){
        return dispatch => (
            $http.post(`/mall/category/add`,{
                categoryName,
                limit
            }).catch(data=>{
                message.error(data.message);
                return Promise.reject();
            })
        )
    },
    //获取分类列表
    getCategoryList(page=1,searchName,pageSize=15){
        return dispatch => (
            $http.get(`/mall/category/list`,{
                page:page,
                pageSize:pageSize,
                searchName:searchName
            }).then(data=>{
                dispatch({
                    type:types.GET_LIST,
                    data:data
                });
            })
        )
    },
    //修改分类
    updateCategory(categoryId,categoryName,limit,page){
        const para = {
            categoryId,
            categoryName,
            limit
        };
        return dispatch => (
            $http.post('/mall/category/editor', para).then(data=>{
                dispatch({
                    type:types.UPDATE_CATEGORY,
                    data:{
                        ...data,
                        page
                    }
                });
                message.success('修改成功！');
            }).catch(err=>{
                message.error(err.message);
                return Promise.reject();
            })
        )
    },
    //删除分类
    deleteCategory(categoryId,page){
        return dispatch => (
            $http.post('/mall/category/delete', {
                categoryId
            }).then(()=>{
                dispatch({
                    type:types.DELETE_CATEGORY,
                    data:{
                        categoryId,
                        page
                    }
                });
                message.success('删除成功！');
            }).catch(err=>{
                message.error(err.message);
                return Promise.reject();
            })
        )
    },
    //添加商品
    addGoods(params) {
        return dispatch => (
            $http.post(`mall/goods/add`,{
                ...params
            })
        )
    }
}