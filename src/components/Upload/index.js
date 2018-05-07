import React, { PureComponent, Fragment } from 'react';
import {
    Upload
} from 'antd';

import PropTypes from 'prop-types';

class BaseUpload extends PureComponent {
    static propTypes = {
        fileMaxSize: PropTypes.number,
        uploadBefore: PropTypes.func,
        uploadSuccess: PropTypes.func,
        uploadError: PropTypes.func
    };

    static defaultProps = {
        fileMaxSize: 5,
        uploadBefore: () => {},
        uploadSuccess: () => {},
        uploadError: () => {}
    };

    beforeUpload = file => {
        const { fileMaxSize , uploadBefore } = this.props;
        if(uploadBefore() === false) {
            return false
        }
        const size = file.size / 1024 / 1024;
        if (size > fileMaxSize) {
            message.error(`图片大小不能超过${fileMaxSize}M！`);
            return false;
        }
        return true;
    };

    customRequest = evt => {
        const {
            uploadBefore ,
            uploadSuccess ,
            uploadError
        } = this.props;
        const formData = new FormData();
        formData.append('file', evt.file);
        uploadBefore();
        $http.upload(formData).then(data => {
            uploadSuccess(data[0])
        }).catch(err => {
            uploadError(err);
            message.error(`上传失败，请重试！`);
        })
    };

    render() {
        const { children } = this.props;
        return (
            <Upload
                accept="image/*"
                beforeUpload={this.beforeUpload}
                customRequest={this.customRequest}
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
            >
                {children}
            </Upload>
        );
    }
}

export default BaseUpload;