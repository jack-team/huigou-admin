import React, { PureComponent, Fragment } from 'react';

import { withRouter } from 'react-router-dom';

import { Layout, Menu, Icon } from 'antd';

import styles from './style.scss';

import menuList from './../../config/menuList';

class MenuNav extends PureComponent {

    constructor(props) {
        super();
        const pathName = this.getPathName(props);
        const openKeys = this.getOpenKeys(pathName);
        this.state = {
            collapsed: false,
            openKeys: openKeys,
            isTrigger: false,
            modalVisible: false
        };
    }

    menuList = menuList;

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
        const { path } = this.menuList.find(menu => {
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

    getMenuKeys(subKey) {
        const { menuList } = this;
        const pathName = this.getPathName(this.props);
        if (!!subKey) {
            const { children = [] } = menuList.find(({ path }) => (
                subKey === path
            )) || {};

            const { path } = children.find(({ path }) => (
                pathName.includes(`${subKey}${path}`)
            )) || {};

            return [`${subKey}${path}`];
        }
        const { path } = menuList.find(menu => (
            pathName.includes(menu.path)
        )) || {};
        return !!path ? [path] : [];
    }

    renderBaseItem = (item, sub, rootPath = '') => {
        const {
            icon,
            name,
            path
        } = item;
        return (
            <Menu.Item
                key={`${rootPath}${path}`}
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

    renderSubItem(menu) {
        const {
            name,
            path,
            icon,
            children = []
        } = menu;
        return (
            <Menu.SubMenu
                key={path}
                title={(
                    <Fragment>
                        <Icon type={icon}/>
                        <span>{name}</span>
                    </Fragment>
                )}
                className={styles.base_sub_menu}
                onTitleClick={() => this.openSubMenu(path)}
            >
                {children.map(child => (
                    this.renderBaseItem(child, true, path)
                ))}
            </Menu.SubMenu>
        );
    }

    render() {
        const {
            collapsed,
            isTrigger,
            openKeys
        } = this.state;
        const { history } = this.props;
        const menuKeys = this.getMenuKeys(openKeys[0]);
        return (
            <Layout.Sider
                trigger={null}
                collapsed={collapsed}
                className={styles.com_left_menu}
            >
                <div
                    onClick={this.toggle}
                    className={styles.com_trigger}
                >
                    <Icon
                        type={`menu-${collapsed ? `un` : ``}fold`}
                    />
                </div>
                <Menu
                    mode="inline"
                    theme="dark"
                    inlineIndent={20}
                    className={styles.base_menu}
                    openKeys={collapsed && isTrigger ? [] : openKeys}
                    selectedKeys={menuKeys}
                    defaultOpenKeys={openKeys}
                    defaultSelectedKeys={menuKeys}
                    onSelect={item => history.push(item.key)}
                >
                    {this.menuList.map(menu => {
                        const { children = [] } = menu;
                        return !!children.length ?
                            this.renderSubItem(menu) :
                            this.renderBaseItem(menu, false);
                    })}
                </Menu>
            </Layout.Sider>
        );
    }
}

export default withRouter(MenuNav);