import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';

import WE from 'wangeditor';

import styles from './styles.scss';

class Editor extends PureComponent {
    static uploadUrl = `http://upload.yutao2012.com`;
    static authStr = `CE3CA381E7675B4F61D6E316BA156131`;

    constructor() {
        super();
    }

    static propTypes = {
        htmlText: PropTypes.string,
        onChange:PropTypes.func
    };

    static defaultProps = {
        htmlText: ``,
        onChange:()=>{}
    };

    componentDidMount() {
        this.init();
    }

    componentWillReceiveProps(nextProps) {
        const {
            htmlText
        } = this.props;
        if (nextProps.htmlText !== htmlText) {
            this.setHtmlText(nextProps.htmlText);
        }
    }

    init() {
        const {
            onChange,
            htmlText
        } = this.props;
        const editor = this.editor = new WE(this.el);
        editor.customConfig.colors = [
            '#000000', '#eeece0',
            '#1c487f', '#4d80bf',
            '#c24f4a', '#8baa4a',
            '#7b5ba1', '#46acc8',
            '#f9963b', '#ffffff'
        ];
        editor.customConfig.fontNames = [
            '宋体',
            '微软雅黑',
            'Arial',
            'Tahoma',
            'Verdana'
        ];
        editor.customConfig.onchange = onChange;
        this.uploadImage();
        editor.create();
        this.setHtmlText(htmlText);
    }

    uploadImage(){
        const {
            editor
        } = this;
        editor.customConfig.uploadFileName = `file`;
        editor.customConfig.uploadImgServer = Editor.uploadUrl;
        editor.customConfig.uploadImgHeaders = { Authorization: Editor.authStr  };
    }

    setHtmlText = text => {
        this.editor.txt.html(text);
    };

    componentWillUnmount(){
        this.editor && this.editor._offAllEvent();
    }

    render() {
        return (
            <div
                ref={e => this.el = e}
                className={styles.editor_wrapper}
            />
        );
    }
}

export default Editor;