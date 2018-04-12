import React ,{ PureComponent } from 'react';

import ReactDom from 'react-dom';

import styles from './style.scss';


class App extends PureComponent {
    render(){
        return (
            <div className={styles.wrapper}>this is my app</div>
        )
    }
}


ReactDom.render(
    <App /> ,
    document.getElementById("root")
);