import React, {
    PureComponent,
    Fragment
} from 'react';

import Breadcrumb from './../../components/Breadcrumb';

import {
    Link
} from 'react-router-dom';

import styles from './manage.scss';

import {
    Form,
    Button,
    Table,
    Divider,
    Popconfirm,
    Input,
    Icon,
    Select
} from 'antd';

import connect from './../../common/connect';

const routes = [{
    path: 'manage',
    breadcrumbName: '商品管理'
}];

import goodsActions from './../../state/action/mall/goods';

class Manage extends PureComponent {

    constructor() {
        super();
        this.columns = [{
            title: `排序`,
            dataIndex: `limit`,
            width: 80,
            className: styles.table_body,
            onHeaderCell: () => ({
                className: styles.table_head
            })
        }, {
            title: `商品名称`,
            dataIndex: `goodsName`,
            className: styles.table_body,
            onHeaderCell: () => ({
                className: styles.table_head
            })
        }, {
            title: `库存`,
            dataIndex: `stock`,
            width: 150,
            className: styles.table_body,
            onHeaderCell: () => ({
                className: styles.table_head
            })
        }, {
            title: `更新时间`,
            dataIndex: `updateAt`,
            width: 180,
            className: styles.table_body,
            onHeaderCell: () => ({
                className: styles.table_head
            })
        }, {
            title: `上次修改`,
            dataIndex: `updateUser`,
            width: 180,
            className: styles.table_body,
            onHeaderCell: () => ({
                className: styles.table_head
            })
        }, {
            title: `操作`,
            width: 200,
            key: 'action',
            className: styles.table_body,
            render: this.renderTableAction,
            onHeaderCell: () => ({
                className: styles.table_head
            })
        }];

        this.statusList = [
            {
                label: `请选择`,
                value: ``
            },
            {
                label: `已下架`,
                value: 1
            },
            {
                label: `已上架`,
                value: 2
            }
        ];

        this.state = {
            tableLoading: true,
            searchForm:{
                status:'',
                goodsName:''
            }
        };
    }

    openEditor(item) {
        const { goodsId } = item;
        const { history } = this.props;
        history.push(`/home/mall/manage/${goodsId}`);
    }

    upOrDown(item) {
        const {
            mallGoods,
            goodsActions
        } = this.props;

        const {
            goods
        } = mallGoods;

        const {
            page
        } = goods;

        const {
            status
        } = item;

        const upText = status === 1 ? `上架` : `下架`;

        loading(`${upText}中..`);

        goodsActions.upOrDown(item.goodsId, page)
            .finally(() => {
                loadingClose();
            });
    }

    delete = item => {
        const {
            mallGoods,
            goodsActions
        } = this.props;
        const {
            goods
        } = mallGoods;
        const {
            goodsId
        } = item;
        const {
            page
        } = goods;
        loading(`删除中...`);
        goodsActions.deleteGoods(goodsId, page)
            .finally(() => {
                loadingClose();
            });
    };

    renderTableAction = item => {
        const {
            status
        } = item;

        const upText = status === 1 ? `上架` : `下架`;
        return (
            <Fragment>
                <Popconfirm
                    title={`确定要${upText}吗？`}
                    okText={`${upText}`}
                    cancelText="取消"
                    onConfirm={() => this.upOrDown(item)}
                >
                    <a className={styles.action_btn}>
                        {upText}
                    </a>
                </Popconfirm>
                <Divider type="vertical"/>
                <a className={styles.action_btn}
                    onClick={() => this.openEditor(item)}>
                    编辑
                </a>
                <Divider type="vertical"/>
                <Popconfirm
                    title="确定要删除吗？"
                    okText="确定"
                    cancelText="取消"
                    onConfirm={() => this.delete(item)}
                >
                    <a className={styles.action_btn}>
                        删除
                    </a>
                </Popconfirm>
            </Fragment>
        );
    };

    componentDidMount() {
        this.getList(1);
    }

    getList(page, filters = {}) {
        const { goodsActions } = this.props;
        this.setState({
            tableLoading: true
        });
        goodsActions.getGoodsList(page, filters)
            .finally(() => {
                this.setState({
                    tableLoading: false
                });
            });
    }

    tableChange=({current})=> {
        const {
            searchForm
        } = this.state;
        this.getList(current,{
            ...searchForm
        })
    };

    formChange = (filed , value ) => {
        const {
            searchForm
        } = this.state;
        searchForm[filed] = value;
        this.setState({
            searchForm:Object.assign({},searchForm)
        })
    };

    search= () => {
        const {
            searchForm
        } = this.state;
        this.getList(1,{
            ...searchForm
        })
    };

    render() {
        const {
            history,
            mallGoods
        } = this.props;

        const {
            tableLoading
        } = this.state;

        const {
            goods
        } = mallGoods;

        const {
            page,
            pageSize,
            pageTotal,
            list
        } = goods;
        const dataSource = list[page] || [];
        return (
            <div className={styles.mall_manage}>
                <Breadcrumb routes={routes}/>
                <div className={styles.form}>
                    <div className={styles.form_container}>
                        <Form prefixCls={styles.form_box}>
                            <div className={styles.form_box_inner}>
                                <Form.Item label="商品名称">
                                    <Input
                                        placeholder="商品名称"
                                        onChange={({target})=>(
                                            this.formChange(`goodsName`,target.value)
                                        )}
                                    />
                                </Form.Item>
                            </div>
                            <div className={styles.form_box_inner}>
                                <Form.Item label="商品状态">
                                    <Select
                                        defaultValue=""
                                        onChange={value=>(
                                            this.formChange(`status`,value)
                                        )}
                                    >
                                        {this.statusList.map(item => {
                                            return (
                                                <Select.Option
                                                    key={item.value}
                                                    value={item.value}
                                                >{item.label}</Select.Option>
                                            );
                                        })}
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className={styles.search_button}>
                                <Button type="primary" onClick={this.search}>
                                    搜索
                                </Button>
                            </div>
                        </Form>
                    </div>
                    <Button type="primary" onClick={() => {
                        history.push('/home/mall/manage/add');
                    }}>
                        添加商品
                    </Button>
                </div>
                <Table
                    className={styles.table_list}
                    pagination={{
                        current: page,
                        pageSize: pageSize,
                        total: pageSize * pageTotal
                    }}
                    useFixedHeader={true}
                    loading={tableLoading}
                    bordered
                    columns={this.columns}
                    dataSource={[].concat(dataSource)}
                    rowKey={({ goodsId }) => goodsId}
                    onChange={this.tableChange}
                />
            </div>
        );
    }
}

export default connect([`mallGoods`], {
    goodsActions: goodsActions
})(Manage);
