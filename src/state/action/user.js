import types from './../const/user';

export default {
    signIn(userName, passWord) {
        return dispatch => (
            $http.post(`/user/signIn`, {
                userName: userName,
                passWord: passWord
            })
                .then(data => {
                    return () => {
                        dispatch({
                            type: types.SIGN_IN,
                            data: data
                        });
                        message.success('欢迎来到会购后台管理系统！');
                    };
                })
                .catch(err => {
                    message.error(err.message);
                    return Promise.reject(err);
                })
        );
    },
    signOut() {
        return dispatch => (
            $http.post(`/user/signOut`)
                .then(() => {
                    return () => {
                        dispatch({
                            type: types.SIGN_OUT,
                            data: {}
                        });
                        message.success('已退出登录！');
                    };
                })
                .catch((err) => {
                    message.error(`退出失败!`);
                    return Promise.reject(err);
                })
        );
    },
    updatePassword(oldPassword, newPassword) {
        return dispatch => (
            $http.post(`/user/updatePassword`, {
                oldPassword,
                newPassword
            })
                .then(data => {
                    message.success('修改成功');
                    return data;
                })
                .catch((err) => {
                    message.error(err.message);
                    return Promise.reject(err);
                })
        );
    },
    updateUser(nickName, avatarUrl) {
        return dispatch => (
            $http.post(`/user/updateUser`, {
                nickName,
                avatarUrl
            })
                .then(data => {
                    message.success('修改成功！');
                    dispatch({
                        type: types.UPDATE_USER,
                        data: data
                    });
                    return data;
                })
                .catch((err) => {
                    message.error(err.message);
                    return Promise.reject(err);
                })
        );
    }
};