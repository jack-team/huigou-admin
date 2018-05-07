import React, { PureComponent, Fragment } from 'react';
import Breadcrumb from './../../components/Breadcrumb';
import { Link } from 'react-router-dom';
import styles from './manage.scss';
import {
    Form,
    Button
} from 'antd';

const routes = [{
    path: 'manage',
    breadcrumbName: '商品管理'
}];

class Manage extends PureComponent{
    render(){
        const { history } = this.props;
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
            </div>
        )
    }
}

export default Manage;