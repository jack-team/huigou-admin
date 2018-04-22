import types from './../const/user';

export default {
    signIn( userName, password ) {
        return dispatch => (
            $http.post(`/user/signIn`, {
                username: userName,
                password: password
            }).then(data => {
                return () => {
                    dispatch({
                        type:types.SIGN_IN,
                        data:data.data
                    });
                    message.success(data.message);
                };
            }).catch(err => {
                message.error(err.message);
                return Promise.reject(err);
            })
        );
    },
    signOut(){
        return dispatch=> (
            $http.post(`/user/signOut`).then(()=>{
                return () => {
                    dispatch({
                        type:types.SIGN_OUT,
                        data:{}
                    });
                }
            }).catch((err)=>{
                message.error(`退出失败!`);
                return Promise.reject(err);
            })
        )
    },
    updatePassword(oldPassword,newPassword){
        return dispatch=> (
            $http.post(`/user/updatePassword`,{
                oldPassword,
                newPassword
            }).then(data=>{
                message.success(data.message);
                return data;
            }).catch((err)=>{
                message.error(err.message);
                return Promise.reject(err);
            })
        )
    },
    updateUser(nickName, avatarUrl){
        return dispatch=> (
            $http.post(`/user/updateUser`,{
                nickName,
                avatarUrl
            }).then(data=>{
                message.success(data.message);
                dispatch({
                    type:types.UPDATE_USER,
                    data:data.data
                });
                return data;
            }).catch((err)=>{
                message.error(err.message);
                return Promise.reject(err);
            })
        )
    }
};