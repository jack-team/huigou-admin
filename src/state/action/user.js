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
                    message.success(`退出成功`);
                }
            }).catch(()=>{
                message.error(`退出失败!`)
            })
        )
    }
};