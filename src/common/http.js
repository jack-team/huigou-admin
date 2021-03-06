import axios from 'axios';

const token = 'CE3CA381E7675B4F61D6E316BA156131';

const instance = axios.create({
    baseURL: '',
    timeout: 1000 * 10
});

const get = (url, para) => (
    instance.get(url, {
        params: para,
    }).then(({ data }) => {
        if (data.code === 200) {
            return data.data;
        }
        return Promise.reject(data);
    }).catch(err => {
        err = !err.code ? {
            code: 500,
            message: `服务异常，请稍后重试！`
        } : err;
        return Promise.reject(err)
    })
);

const post = (url, para) => (
    instance.post(url, para) .then(({ data }) => {
        if (data.code === 200) {
            return data.data;
        }
        return Promise.reject(data);
    }).catch(err => {
        err = !err.code ? {
            code: 500,
            message: `服务异常，请稍后重试！`
        } : err;
        return Promise.reject(err);
    })
);

const upload = (para) => {
    const uploadUrl = 'http://upload.yutao2012.com';
    return axios.put(uploadUrl, para, {
        headers: { Authorization: token },
    })
        .then(({ data }) => {
            if (data.code === 200) {
                return data.data;
            }
            return Promise.reject(`上传失败`);
        })
        .catch(() => (
            Promise.reject(`上传失败`)
        ));
};


window.$http = {
    get,
    post,
    upload
};
