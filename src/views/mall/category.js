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
    Pagination
} from 'antd';

const routes = [{
    path: 'category',
    breadcrumbName: '商品分类'
}];

import Breadcrumb from './../../components/Breadcrumb';

import mallCategoryActions from '../../state/action/mall/category';

import styles from './category.scss';

class Category extends PureComponent {

    constructor( {location} ) {
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
            title: `添加时间`,
            dataIndex: `createAt`,
            width: 300,
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
        const page = getUrlArgument(location.search,'page') || 1;
        this. state = {
            showModal: false,
            page:~~page,
            loading: false,
            limit: '',
            categoryName: '',
            isEditor: false,
            categoryId: ''
        };
    };

    limit = null;
    categoryName = null;

    renderTableAction = item => {
        return (
            <Fragment>
                <a className={styles.table_action}
                    onClick={() => this.openEditor(item)}>编辑</a>
                <Popconfirm
                    title="确定要删除吗？"
                    okText="确定"
                    cancelText="取消"
                    onConfirm={() => this.delete(item)}
                >
                    <a className={styles.table_action}>删除</a>
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
        const { categoryId , page } = this.state;
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
        )
            .finally(() => {
                this.setState({
                    loading: false
                }, () => this.closeModal());
            });
    }

    delete = item => {
        const { categoryId } = item;
        const { mallCategoryActions } = this.props;
        loading();
        mallCategoryActions.deleteCategory(categoryId,this.state.page)
            .finally(() => {
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

    componentWillReceiveProps({location}){
        let page = getUrlArgument(location.search,'page') || 1;
        page = ~~page;
        if(page !== this.state.page) {
            this.setState({
                page:page
            },()=>{
                this.loadList();
            });
        }
    }

    addCategory = () => {
        const { mallCategoryActions, form ,history , location} = this.props;
        const limit =  form.getFieldValue('limit'),
            categoryName = form.getFieldValue('categoryName');

        this.setState({
            loading: true
        });

        mallCategoryActions.addCategory(categoryName, ~~limit)
            .then(() => {
                setTimeout(() => {
                    this.closeModal();
                }, 100);
                this.goPage(1).then(page => {
                    history.push(`${location.pathname}?page=${page}`);
                    this.loadList();
                });
            })
            .finally(() => {
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

    componentDidMount() {
        this.loadList();
    }

    loadList(){
        const {
            mallCategoryActions
        } = this.props;
        const { page } = this.state;
        mallCategoryActions.getCategoryList(page);
    }

    handleTableChange = ({ current }) => {
        const { history , location } = this.props;
        this.goPage(current).then(page => {
            history.push(`${location.pathname}?page=${page}`);
            this.loadList();
        });
    };

    goPage(page){
        return new Promise(resolve => {
            this.setState({
                page:page
            },()=>resolve(page));
        })
    }

    render() {
        const {
            showModal,
            loading,
            limit,
            categoryName,
            page,
            isEditor
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
                    <Button type="primary" onClick={this.clearState}>
                        添加
                    </Button>
                </div>
                <Table
                    className={styles.table_list}
                    pagination={{
                        current:page,
                        pageSize: pageSize,
                        total: pageSize * pageTotal
                    }}
                    bordered
                    columns={this.columns}
                    dataSource={[].concat(dataSource)}
                    rowKey={({ categoryId }) => categoryId}
                    onChange={this.handleTableChange}
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