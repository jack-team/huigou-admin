import React , { PureComponent } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
export default class Test extends PureComponent{
    render(){
        return (
            <Editor></Editor>
        )
    }
}