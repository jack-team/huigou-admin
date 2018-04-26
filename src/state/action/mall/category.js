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
    getCategoryList(page=1,pageSize=15){
        loading();
        return dispatch => (
            $http.get(`/mall/category/list`,{
                page:page,
                pageSize:pageSize
            }).then(data=>{
                dispatch({
                    type:types.GET_LIST,
                    data:data
                });
            }).finally(()=>loadingClose())
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
            $http.post('/mall/category/editor', para).then(()=>{
                dispatch({
                    type:types.UPDATE_CATEGORY,
                    data:{
                        ...para,
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
    }
}