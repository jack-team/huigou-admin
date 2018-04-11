import React ,{ PureComponent } from 'react';

import ReactDom from 'react-dom';



class App extends PureComponent {
    render(){
        return (
            <div>this is my app</div>
        )
    }
}


ReactDom.render(
    <App /> ,
    document.getElementById("root")
);