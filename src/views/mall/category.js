import React, { PureComponent, Fragment } from 'react';
import { Link } from 'react-router-dom';
import connect from './../../common/connect';
import {
    Button,
    Modal,
    Form,
    Input,
    Table,
    Popconfirm,
    Divider
} from 'antd';

const routes = [{
    path: 'category',
    breadcrumbName: '商品分类'
}];

import Breadcrumb from './../../components/Breadcrumb';

import mallCategoryActions from '../../state/action/mall/category';

import styles from './category.scss';

class Category extends PureComponent {

    constructor(props) {
        super();
        this.columns = [{
            title: `排序`,
            dataIndex: `limit`,
            className: styles.table_body,
            width: 150,
            onHeaderCell: () => ({
                className: styles.table_head
            })
        }, {
            title: `分类名称`,
            dataIndex: `categoryName`,
            className: styles.table_body,
            onHeaderCell: () => ({
                className: styles.table_head
            })
        }, {
            title: `更新时间`,
            dataIndex: `updateAt`,
            width: 210,
            className: styles.table_body,
            onHeaderCell: () => ({
                className: styles.table_head
            })
        },{
            title: `添加时间`,
            dataIndex: `createAt`,
            width: 210,
            className: styles.table_body,
            onHeaderCell: () => ({
                className: styles.table_head
            })
        }, {
            title: `操作`,
            width: 230,
            key: 'action',
            className: styles.table_body,
            render: this.renderTableAction,
            onHeaderCell: () => ({
                className: styles.table_head
            })
        }];
        this.state = {
            limit: '',
            categoryId: '',
            categoryName: '',
            isEditor: false,
            loading: false,
            showModal: false,
            tableLoading:false,
            page: this.getPage(props),
        };
    };

    limit = null;
    categoryName = null;

    componentDidMount() {
        this.loadList();
    }

    componentWillReceiveProps(nextProps) {
        const page = this.getPage(nextProps);
        if (page !== this.state.page) {
            this.goPage(page).then(()=>{
                this.loadList();
            })
        }
    }

    getPage = ({ location }) => {
        let page = getUrlArgument(location.search, 'page') || 1;
        page = ~~page;
        return page;
    };

    renderTableAction = item => {
        return (
            <Fragment>
                <a className={styles.action_btn} onClick={() =>this.openEditor(item)}>
                    编辑
                </a>
                <Divider type="vertical" />
                <Popconfirm
                    title="确定要删除吗？"
                    okText="确定"
                    cancelText="取消"
                    onConfirm={() => this.delete(item)}
                >
                    <a className={styles.action_btn}>删除</a>
                </Popconfirm>
            </Fragment>
        );
    };

    openEditor = item => {
        this.setState({
            limit: item.limit,
            categoryName: item.categoryName,
            categoryId: item.categoryId,
            isEditor: true
        }, () => this.openModal());
    };

    editor() {
        const { categoryId, page } = this.state;
        const { form, mallCategoryActions } = this.props;
        const limit = form.getFieldValue('limit'),
            categoryName = form.getFieldValue('categoryName');
        this.setState({
            loading: true
        });
        mallCategoryActions.updateCategory(
            categoryId,
            categoryName,
            limit,
            page
        ).then(()=>{
            setTimeout(() => {
                this.closeModal();
            },100)
        }).finally(() => {
            this.setState({
                loading: false
            });
        });
    }

    delete = item => {
        const { categoryId } = item;
        const { mallCategoryActions } = this.props;
        loading();
        mallCategoryActions.deleteCategory(
            categoryId,
            this.state.page
        ).finally(() => {
            loadingClose();
        });
    };

    openModal = () => {
        this.setState({
            showModal: true
        });
    };

    vailForm = () => {
        const { form } = this.props;
        const { isEditor } = this.state;
        form.validateFields(err => {
            if (!err) {
                if (isEditor) {
                    this.editor();
                } else {
                    this.addCategory();
                }
            }
        });
    };

    addCategory = () => {
        const { mallCategoryActions, form } = this.props;
        const limit = form.getFieldValue('limit'),
            categoryName = form.getFieldValue('categoryName');

        this.setState({
            loading: true
        });
        mallCategoryActions.addCategory(
            categoryName,
            ~~limit
        ).then(() => {
            setTimeout(() =>{
                this.closeModal();
                this.tableChange({ current:1 });
            }, 100);
        }).finally(() => {
            this.setState({
                loading: false
            });
        });
    };

    clearState = () => {
        this.setState({
            limit: '',
            categoryName: '',
            isEditor: false
        }, () => this.openModal());
    };

    closeModal = () => {
        const { loading } = this.state;
        if (loading) return false;
        this.setState({
            showModal: false
        });
    };

    loadList() {

        const {
            mallCategoryActions
        } = this.props;

        const {
            page,
            searchName
        } = this.state;

        this.setState({
            tableLoading:true
        });

        mallCategoryActions.getCategoryList(
            page,
            searchName
        ).finally(()=>{
            this.setState({
                tableLoading:false
            });
        });
    }

    tableChange = ({ current }) => {
        const { history, location } = this.props;
        const { page } = this.state;
        this.goPage(current).then(currentPage => {
            this.loadList();
            if(page !== currentPage) {
                history.push(
                    `${location.pathname}?page=${currentPage}`
                );
            }
        });
    };

    goPage = page => (
        new Promise(resolve => (
            this.setState({
                page: page
            }, () => resolve(page))
        ))
    );

    handleSubmit=e=>{
        e.preventDefault();
        this.tableChange({
            current:1
        })
    };

    render() {
        const {
            showModal,
            loading,
            limit,
            categoryName,
            page,
            isEditor,
            searchName,
            tableLoading
        } = this.state;
        const { mallCategory, form } = this.props;
        const { getFieldDecorator } = form;
        const { list, pageTotal, pageSize } = mallCategory;
        const dataSource = list[`page${page}`] || [];
        return (
            <div className={styles.mall_category}>
                <Breadcrumb
                    routes={routes}
                />
                <div className={styles.add_btn}>
                    <Form layout="inline" onSubmit={this.handleSubmit}>
                        <Form.Item>
                            <Input
                                placeholder="分类名称"
                                value={searchName}
                                onChange={e=>this.setState({
                                    searchName:e.target.value
                                })}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                搜索
                            </Button>
                        </Form.Item>
                    </Form>
                    <Button type="primary" onClick={this.clearState}>
                        添加
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
                    rowKey={({ categoryId }) => categoryId}
                    onChange={this.tableChange}
                />
                <Modal
                    visible={showModal}
                    wrapClassName="base-modal-center"
                    title={isEditor ? `编辑分类` : '添加分类'}
                    okText={isEditor ? '修改' : '保存'}
                    width={400}
                    cancelText="取消"
                    destroyOnClose={true}
                    onOk={this.vailForm}
                    onCancel={this.closeModal}
                    confirmLoading={loading}
                >
                    <div className={styles.form_box}>
                        <Form.Item
                            label="类别名称"
                            className={styles.from_item_base}
                        >
                            {getFieldDecorator('categoryName', {
                                rules: [{
                                    required: true,
                                    message: '类别名称不能为空！'
                                }],
                                initialValue: categoryName
                            })(
                                <Input placeholder="请输入类别名称"/>
                            )}
                        </Form.Item>
                        <Form.Item
                            label="类别排序"
                            className={styles.from_item_base}
                        >
                            {getFieldDecorator('limit', {
                                rules: [{
                                    required: true,
                                    message: '类别排序不能为空！',
                                }],
                                initialValue: limit
                            })(
                                <Input placeholder="请输入类别排序"/>
                            )}
                        </Form.Item>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default connect(['mallCategory'], {
    mallCategoryActions
})(
    Form.create()(Category)
);