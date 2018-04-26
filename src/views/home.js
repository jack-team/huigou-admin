import React, { PureComponent } from 'react';

import styles from '../styles/home.scss';

export default class Home extends PureComponent {
    render(){
        return(
            <div className={styles.home_index}>
                <p>欢迎来到会购商城管理平台...</p>
            </div>
        )
    }
}