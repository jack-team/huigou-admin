import React, { PureComponent, Fragment } from 'react';
import connect from './../../common/connect';
import styles from './info.scss';

import {
    Form,
    Input,
    Button,
    Upload,
    Icon
} from 'antd';

import userActions from '../../state/action/user';

const FormItem = Form.Item;

class Info extends PureComponent {
    constructor(props) {

        super();
        const { user } = props;

        this.state = {
            loading: false,
            uploading: false,
            nickName:user.nickname,
            imageUrl: user.avatar
        };
    }

    check = () => {
        this.props.form.validateFields(err => {
            if (!err) this.update();
        });
    };

    update() {
        const { userActions , history } = this.props;
        this.setState({
            loading: true
        });
        userActions.updateUser(
            this.state.nickName,
            this.state.imageUrl
        ).then(()=>{
            setTimeout(()=>{
                history.push('/');
            },100)
        }).finally(()=>{
            this.setState({
                loading: false
            });
        });
    }

    beforeUpload = file => {
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isLt5M) {
            message.error('上传图片不能大于5M！');
        }
        return  isLt5M;
    };

    handleChange = () => {

    };

    customRequest = evt => {
        const formData = new FormData();
        formData.append('file', evt.file);
        this.setState({
            uploading: true
        });
        $http.upload(formData)
            .then(data => {
                this.setState({
                    imageUrl: data[0]
                });
            })
            .catch(() => {
                message.error(`上传失败，请重试！`);
            })
            .finally(() => {
                this.setState({
                    uploading: false
                });
            });
    };

    getDisabled(){
        const {
            user
        } = this.props;
        const {
            nickName ,
            imageUrl
        } = this.state;
        return nickName === user.nickname && imageUrl===user.avatar;
    }

    render() {
        const {
            loading,
            imageUrl,
            uploading ,
            nickName
        } = this.state;
        const uploadButton = (
            <Fragment>
                <Icon type="plus"/>
                <div className="ant-upload-text">点击上传</div>
            </Fragment>
        );
        return (
            <div className={styles.form_box}>
                <FormItem label="昵称" className={styles.from_item_base}>
                    <Input
                        placeholder="请输入昵称"
                        value={nickName}
                        onChange={(e) => {
                            this.setState({
                                nickName:e.target.value
                            })
                        }}
                    />
                </FormItem>
                <FormItem label="头像" className={styles.from_item_base}>
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        accept="image/*"
                        beforeUpload={this.beforeUpload}
                        onChange={this.handleChange}
                        customRequest={this.customRequest}
                    >
                        {!!imageUrl ? (
                            uploading ? (
                                <div className={styles.uploading}>
                                    <Icon type="loading"/>
                                    <p className={styles.uploading_text}>上传中...</p>
                                </div>
                            ) : <div
                                className={styles.review_image}
                                style={{ backgroundImage: `url(${imageUrl})` }}
                            />
                        ) : uploadButton}
                    </Upload>
                </FormItem>
                <FormItem>
                    <Button
                        loading={loading}
                        type="primary"
                        disabled={this.getDisabled()}
                        onClick={this.check}
                    >
                        修改
                    </Button>
                </FormItem>
            </div>
        );
    }
}

const InfoForm = Form.create()(Info);
export default connect(['user'], {
    userActions: userActions
})(InfoForm);