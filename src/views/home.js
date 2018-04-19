import React, { PureComponent } from 'react';

import { Layout, Menu, Icon } from 'antd';

const { Header, Sider, Content } = Layout;

const SubMenu = Menu.SubMenu;

import userActions from './../state/action/user';

import connect from './../common/connect';

import styles from './../styles/home.scss';

class Home extends PureComponent {
    state = {
        collapsed: false,
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    signOut() {
        const { userActions } = this.props;
        userActions.signOut().then(cb=>{
            setTimeout(()=>{
                cb()
            },1000)
        });
    }

    render() {

        const { collapsed } = this.state;
        return (
            <Layout className={styles.com_layout}>
                <Header className={styles.com_header}>
                    <div className={styles.com_header_left}>
                        <Icon
                            className={styles.com_trigger}
                            type={collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                        <div className={styles.max_band}>会购后台管理</div>
                    </div>
                    <div className={styles.com_header_right}>
                        <button style={{ float: 'right' }} onClick={() => this.signOut()}>退出登录
                        </button>
                    </div>
                </Header>
                <Layout className={styles.com_content}>
                    <Sider
                        trigger={null}
                        collapsible
                        collapsed={collapsed}
                        className={styles.com_left_menu}
                    >
                        <Menu
                            theme="dark"
                            defaultSelectedKeys={['1']}
                            className={styles.base_menu}
                        >
                            {Array.from({ length: 30 })
                                .map((item, i) => {
                                    return (
                                        <Menu.Item key={i}>
                                            <Icon type="user"/>
                                            <span>nav {i + 1}</span>
                                        </Menu.Item>
                                    );
                                })}
                            <SubMenu key="sub2" title={<span><Icon
                                type="appstore"/><span>Navigation Two</span></span>}>
                                <Menu.Item key="9">Option 9</Menu.Item>
                                <Menu.Item key="10">Option 10</Menu.Item>
                                <SubMenu key="sub3" title="Submenu">
                                    <Menu.Item key="11">Option 11</Menu.Item>
                                    <Menu.Item key="12">Option 12</Menu.Item>
                                </SubMenu>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Content style={{
                            margin: '24px 16px',
                            padding: 24,
                            background: '#fff',
                            minHeight: 280
                        }}>
                            Content
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

export default connect({ userActions })(Home);