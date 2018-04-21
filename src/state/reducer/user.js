const { user } = window.initJsData;
import types from './../const/user';

let initState = {
    ...user
};

export default (state = initState, action) => {
    const { type, data } = action;
    switch (type) {
        case types.SIGN_IN:
            return {
                ...state,
                ...data,
                isLogin: true
            };

        case types.SIGN_OUT:
            return {
                isLogin:false
            }
    }

    return state;
}