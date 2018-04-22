import React, { PureComponent, Fragment } from 'react';

import PropTypes from 'prop-types';

import connect from './../../common/connect';

import styles from './password.scss';

import { Form, Input, Button, Checkbox } from 'antd';
import userActions from '../../state/action/user';

const FormItem = Form.Item;

class Password extends PureComponent {

    static propTypes = {
        onSuccess:PropTypes.func
    };

    static defaultProps = {
        onSuccess:()=>{}
    };

    state = {
        loading: false
    };

    check = () => {
        this.props.form.validateFields(err => {
            if (!err) this.update();
        });
    };

    update() {
        const { userActions , onSuccess } = this.props;
        this.setState({
            loading: true
        });
        userActions.updatePassword(
            this.oldValue,
            this.newValue
        )
            .then((data) => {
                onSuccess(data);
            })
            .finally(() => {
                this.setState({
                    loading: false
                });
            });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { loading } = this.state;
        return (
            <div className={styles.form_box}>
                <FormItem label="原密码" className={styles.from_item_base}>
                    {getFieldDecorator('username', {
                        rules: [{
                            required: true,
                            message: '原密码不能为空！',
                        }],
                    })(
                        <Input
                            type="password"
                            placeholder="请输入原密码"
                            onChange={(e) => this.oldValue = e.target.value}
                        />
                    )}
                </FormItem>
                <FormItem label="新密码" className={styles.from_item_base}>
                    {getFieldDecorator('nickname', {
                        rules: [{
                            required: true,
                            message: '新密码不能为空！',
                        }],
                    })(
                        <Input
                            type="password"
                            placeholder="请输入新密码"
                            onChange={(e) => this.newValue = e.target.value}
                        />
                    )}
                </FormItem>
                <FormItem className={styles.footer}>
                    <Button
                        loading={loading}
                        type="primary"
                        onClick={this.check}
                    >
                        修改
                    </Button>
                </FormItem>
            </div>
        );
    }
}

const PasswordForm = Form.create()(Password);
export default connect({
    userActions: userActions
})(PasswordForm);