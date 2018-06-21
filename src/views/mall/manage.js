import React, { PureComponent, Fragment } from 'react';
import Breadcrumb from './../../components/Breadcrumb';
import { Link } from 'react-router-dom';
import styles from './manage.scss';
import {
    Form,
    Button,
    Table,
    Divider,
    Popconfirm
} from 'antd';

import connect from './../../common/connect';

const routes = [{
    path: 'manage',
    breadcrumbName: '商品管理'
}];

import goodsActions from './../../state/action/mall/goods';

class Manage extends PureComponent{

    constructor(){
        super();
        this.columns = [{
            title: `排序`,
            dataIndex: `limit`,
            className: styles.table_body,
            onHeaderCell: () => ({
                className: styles.table_head
            })
        }, {
            title: `商品名称`,
            dataIndex: `goodsName`,
            width:200,
            className: styles.table_body,
            onHeaderCell: () => ({
                className: styles.table_head
            })
        },{
            title: `库存`,
            dataIndex: `stock`,
            width:150,
            className: styles.table_body,
            onHeaderCell: () => ({
                className: styles.table_head
            })
        },{
            title: `上架时间`,
            dataIndex: `liveStart`,
            width: 190,
            className: styles.table_body,
            onHeaderCell: () => ({
                className: styles.table_head
            })
        },{
            title: `下架时间`,
            dataIndex: `liveEnd`,
            width: 190,
            className: styles.table_body,
            onHeaderCell: () => ({
                className: styles.table_head
            })
        },{
            title: `更新时间`,
            dataIndex: `updateAt`,
            width: 190,
            className: styles.table_body,
            onHeaderCell: () => ({
                className: styles.table_head
            })
        },{
            title: `添加时间`,
            dataIndex: `createAt`,
            width: 190,
            className: styles.table_body,
            onHeaderCell: () => ({
                className: styles.table_head
            })
        }, {
            title: `操作`,
            width: 160,
            key: 'action',
            className: styles.table_body,
            render: this.renderTableAction,
            onHeaderCell: () => ({
                className: styles.table_head
            })
        }];
        this.state = {
            tableLoading:true
        }
    }

    openEditor( item ){
        const { goodsId } = item;
        const { history } = this.props;
        history.push(`/home/mall/manage/${goodsId}`);
    }

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

    componentDidMount(){
        this.getList(1);
    }

    getList( page , filters = {} ) {
        const { goodsActions } = this.props;
        this.setState({
            tableLoading:true
        });
        goodsActions.getGoodsList(page,filters).finally(()=>{
            this.setState({
                tableLoading:false
            })
        })
    }

    tableChange(){

    }

    render(){
        const {
            history ,
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
                    <Form>
                        <Form.Item>

                        </Form.Item>
                    </Form>
                    <Button type="primary" onClick={()=>{
                        history.push('/home/mall/manage/add')
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
        )
    }
}

export default connect([`mallGoods`],{
    goodsActions:goodsActions
})(Manage);