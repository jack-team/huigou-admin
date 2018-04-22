import React, { PureComponent } from 'react';

import { Button } from 'antd';

import styles from './../styles/login.scss';

import connect from './../common/connect';

import userActions from './../state/action/user';

const trim = str => {
    str = str || ``;
    return str.trim();
};

class Login extends PureComponent {
    constructor() {
        super();
        this.onLogin = this.onLogin.bind(this);
        this.state = {
            loading: false
        };
    }

    onLogin(e) {

        e.preventDefault();

        const { userActions } = this.props;

        const userName = trim(this.userName.value);
        const password = trim(this.password.value);

        const { history } = this.props;

        // $http.post(`/user/signUp`,{
        //     username:userName,
        //     password:password
        // });

        if (!userName) {
            return message.error(`用户名不能为空！`);
        }

        if (!password) {
            return message.error(`密码不能为空！`);
        }

        this.setState({
            loading: true
        });

        userActions.signIn(userName, password)
            .then((cb = () => {
            }) => {
                setTimeout(() => cb(), 800);
            })
            .finally(() => {
                setTimeout(() => {
                    this.setState({
                        loading: false
                    });
                }, 750);
            });
    }

    render() {

        const { loading } = this.state;
        return (
            <div className={styles.login_page}>
                <div className={styles.login_layer} onSubmit={this.onLogin}>
                    <p className={styles.welcome}>
                        欢迎登录
                    </p>
                    <p className={styles.title}>
                        会购商城后台管理系统
                    </p>
                    <div className={styles.form_contrl}>
                        <input
                            type="text"
                            placeholder="请输入用户名"
                            ref={e => this.userName = e}
                        />
                    </div>
                    <div className={styles.form_contrl}>
                        <input
                            type="password"
                            placeholder="请输入密码"
                            ref={e => this.password = e}
                        />
                    </div>
                    <Button
                        className={styles.submit}
                        loading={loading}
                        onClick={this.onLogin}
                    >
                        {loading ? `登录中...` : `登录`}
                    </Button>
                </div>
            </div>
        );
    }
}

export default connect({ userActions })(Login);
