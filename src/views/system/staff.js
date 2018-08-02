import React, { 
    PureComponent,
    Fragment 
} from 'react';

import styles from './staff.scss';

import Breadcrumb from './../../components/Breadcrumb';

const routes = [{
    path: 'staff',
    breadcrumbName: '员工管理'
}];


class StaffMange extends PureComponent{
    render(){
        return (
            <div className={styles.wrapper}>
                <Breadcrumb routes={routes}/>
            </div>
        )
    }
}


export default StaffMange;


