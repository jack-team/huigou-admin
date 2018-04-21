import React, { PureComponent, Fragment } from 'react';

import { NavLink } from 'react-router-dom';

import { Layout, Menu, Icon, Popover, Avatar } from 'antd';

import userActions from './../state/action/user';

import connect from './../common/connect';

import styles from './../styles/home.scss';

import menuList from './../config/menuList';

class Home extends PureComponent {
    constructor(props) {
        super();
        const pathName = this.getPathName(props);
        const openKeys = this.getOpenKeys(pathName);
        this.state = {
            collapsed: false,
            openKeys: openKeys
        };
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
            isTrigger: true
        });
    };

    componentWillReceiveProps(nextProps) {
        const curPathName = this.getPathName(this.props),
            nextPathName = this.getPathName(nextProps);
        if (curPathName !== nextPathName) {
            this.setOpenKeys(nextPathName);
        }
    }

    setOpenKeys(nextPathName) {
        const openKeys = this.getOpenKeys(nextPathName);
        const { state } = this;
        const has = !!state.openKeys.find(key => key === openKeys[0]);
        if (openKeys.length !== state.openKeys.length || !has) {
            this.setState({
                openKeys: openKeys
            });
        }
    }

    getOpenKeys(pathname) {
        const { path } = menuList.find(menu => {
            const { path, children = [] } = menu;
            return pathname.includes(path) && !!children.length;
        }) || {};
        return !!path ? [path] : [];
    }

    getPathName = props => {
        const { pathname } = props.location;
        return pathname;
    };

    openSubMenu(path) {
        const { openKeys } = this.state;
        const has = openKeys.find(key => path === key);
        const openKey = has ? [] : [path];
        this.setState({
            openKeys: openKey,
            isTrigger: false
        });
    }

    renderBaseItem = (item, sub) => {
        const { icon, name, path } = item;
        return (
            <Menu.Item
                key={path}
                className={className(
                    styles.menu_item,
                    sub ? styles.menu_nav_next : styles.menu_nav
                )}
            >
                {!!icon && <Icon type={icon}/>}
                <span>{name}</span>
            </Menu.Item>
        );
    };


    signOut() {
        const { userActions } = this.props;
        userActions.signOut()
            .then(cb => {
                setTimeout(() => {
                    cb();
                }, 1000);
            });
    }

    userContent() {
        const { history } = this.props;
        return (
            <div className={styles.user_content}>
                <div
                    className={styles.set_item}
                    onClick={() => history.push(`/home/system/info`)}
                >
                    修改密码
                </div>
                <div className={styles.set_item} onClick={() => this.signOut()}>
                    退出
                </div>
            </div>
        );
    }

    render() {
        const { collapsed, openKeys, isTrigger } = this.state;
        const { history, user = {} } = this.props;
        const pathname = this.getPathName(this.props);
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
                            trigger="click"
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
                    <Layout.Sider
                        trigger={null}
                        collapsed={collapsed}
                        className={styles.com_left_menu}
                    >
                        <div
                            onClick={this.toggle}
                            className={styles.com_trigger}
                        >
                            <Icon type={`menu-${collapsed ? `un` : ``}fold`}/>
                        </div>
                        <Menu
                            mode="inline"
                            theme="dark"
                            inlineIndent={20}
                            className={styles.base_menu}
                            openKeys={collapsed && isTrigger ? [] : openKeys}
                            selectedKeys={[pathname]}
                            defaultOpenKeys={openKeys}
                            defaultSelectedKeys={[pathname]}
                            onSelect={item => history.push(item.key)}
                        >
                            {menuList.map(menu => {
                                const { name, path, icon, children = [] } = menu;
                                if (!!children.length) {
                                    const title = (
                                        <Fragment>
                                            <Icon type={icon}/>
                                            <span>{name}</span>
                                        </Fragment>
                                    );
                                    return (
                                        <Menu.SubMenu
                                            key={path}
                                            title={title}
                                            className={styles.base_sub_menu}
                                            onTitleClick={() => this.openSubMenu(path)}
                                        >
                                            {children.map(child => {
                                                return this.renderBaseItem(child, true);
                                            })}
                                        </Menu.SubMenu>
                                    );
                                }
                                return this.renderBaseItem(menu, false);
                            })}
                        </Menu>
                    </Layout.Sider>
                    <Layout>
                        <Layout.Content
                            className={styles.center_content}
                        >
                            {this.props.children}
                        </Layout.Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

export default connect({ userActions })(Home);