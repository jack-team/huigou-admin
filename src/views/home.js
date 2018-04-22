import React, { PureComponent, Fragment } from 'react';

import { NavLink } from 'react-router-dom';

import { Layout, Popover, Avatar, Modal } from 'antd';

import MenuNav from './../components/MenuNav';

import userActions from './../state/action/user';

import connect from './../common/connect';

import styles from './../styles/home.scss';

import UpdatePassWord from './system/password';

class Home extends PureComponent {
    constructor(props) {
        super();
        this.state = {
            modalVisible: false
        };
    }

    signOut() {
        const { userActions } = this.props;
        userActions.signOut()
            .then(cb => {
                setTimeout(() => cb(), 100);
            });
    }

    userContent() {
        return (
            <div className={styles.user_content}>
                <div
                    className={styles.set_item}
                    onClick={() => {
                        this.setState({
                            modalVisible: true
                        });
                    }}
                >
                    修改密码
                </div>
                <div
                    className={styles.set_item}
                    onClick={() => this.signOut()}
                >
                    退出
                </div>
            </div>
        );
    }

    closeModal = () => {
        this.setState({
            modalVisible: false
        });
    };

    render() {
        const { modalVisible } = this.state;
        const { user = {} } = this.props;
        return (
            <Layout className={styles.com_layout}>
                <Layout.Header className={styles.com_header}>
                    <div className={styles.com_header_left}>
                        <div className={styles.max_band}>
                            会购后台管理
                        </div>
                    </div>
                    <div className={styles.com_header_right}>
                        <Popover
                            trigger="hover"
                            placement="bottomRight"
                            content={this.userContent()}
                        >
                            <div className={styles.user_desc}>
                                <Avatar
                                    shape="square"
                                    src={user.avatar}
                                    className={styles.user_avatar}
                                />
                                <div className={styles.user_name}>
                                    {user.nickname}
                                </div>
                            </div>
                        </Popover>
                    </div>
                </Layout.Header>
                <Layout className={styles.com_content}>
                    <MenuNav/>
                    <Layout>
                        <Layout.Content className={styles.center_content}>
                            {this.props.children}
                        </Layout.Content>
                    </Layout>
                </Layout>
                <Modal
                    title="修改密码"
                    visible={modalVisible}
                    wrapClassName="vertical-center-modal"
                    footer={null}
                    width={400}
                    destroyOnClose={true}
                    onCancel={this.closeModal}
                >
                    <UpdatePassWord
                        onSuccess={this.closeModal}
                    />
                </Modal>
            </Layout>
        );
    }
}

export default connect({ userActions })(Home);