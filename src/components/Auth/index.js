import React, { PureComponent } from 'react';

import { withRouter, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

export default (Component, isAuth = true) => {
    class Auth extends PureComponent {

        to() {
            const { isLogin } = this.props.user;

            if (isLogin && !isAuth) return (
                <Redirect to="/" />
            );

            if (!isLogin && isAuth) return (
                <Redirect to="/login" />
            );

            if (isLogin && isAuth) return (
                <Component {...this.props} />
            );

            if (!isLogin && !isAuth) return (
                <Component {...this.props} />
            );
        }

        render() {
            return this.to();
        }

    }

    return connect(({ user }) => ({ user }))(Auth);
}
