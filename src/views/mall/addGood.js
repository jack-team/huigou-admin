import React, { PureComponent, Fragment } from 'react';
import { Link } from 'react-router-dom';
import styles from './addGood.scss';
import Breadcrumb from './../../components/Breadcrumb';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import {
    EditorState,
    convertToRaw,
    ContentState
} from 'draft-js';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import {
    Form,
    Select,
    InputNumber,
    Button,
    Icon,
    Input,
    Spin,
    DatePicker
} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

import connect from './../../common/connect';
import categoryActions from './../../state/action/mall/category';

import BaseUpload from './../../components/Upload';

import enZh from 'antd/lib/date-picker/locale/zh_CN';

const routes = [{
    path: '/home/mall/manage',
    breadcrumbName: '商品分类'
}, {
    path: '',
    breadcrumbName: '添加商品'
}];

class AddGood extends PureComponent {
    constructor() {
        super();
        this.state = {
            startValue: null,
            categoryId:null,
            endValue: null,
            endOpen: false,
            uploadCover: false,
            coverUrl: null,
            uploadItemImg:false,
            itemImg:[],
            isSearching:false,
            editorState:null
        };
    }

    componentDidMount(){
        this.searchCategory();
    };

    searchCategory =( keyword = null )=>{
        const { categoryActions } = this.props;
        this.setState({
            isSearching:true
        });
        categoryActions.getCategoryList(1, keyword, 100).finally(()=> {
            this.setState({
                isSearching:false
            });
        });
    };


    handleSubmit = e => {
        e.preventDefault();
        const { validateFields } = this.props.form;
        validateFields((err, fieldsValue)=>{
            if(!err) this.addGoods(fieldsValue);
        });
    };


    addGoods(fieldsValue){
        const {
            categoryId,
            coverUrl,
            itemImg,
            editorState
        } = this.state;
        const params = {
            categoryId:categoryId,
            goodsName:fieldsValue.goodName,
            price:fieldsValue.prices,
            stock:fieldsValue.stock,
            liveStart:fieldsValue.startTime,
            liveEnd:fieldsValue.endTime,
            cover:coverUrl,
            banners:itemImg,
            desc:editorState,
        };

        const { categoryActions } = this.props;
        categoryActions.addGoods(params);
    }

    disabledStartDate = (startValue) => {
        const endValue = this.state.endValue;
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    };

    disabledEndDate = (endValue) => {
        const startValue = this.state.startValue;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    };

    onChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    };

    onStartChange = (value) => {
        this.onChange('startValue', value);
    };

    onEndChange = (value) => {
        this.onChange('endValue', value);
    };

    handleStartOpenChange = (open) => {
        if (!open) {
            this.setState({ endOpen: true });
        }
    };

    handleEndOpenChange = (open) => {
        this.setState({ endOpen: open });
    };


    uploadCoverSuccess = url => {
        this.setState({
            coverUrl: url,
            uploadCover: false
        });
    };

    uploadItemImgSuccess = url=> {
        const { itemImg } = this.state;
        itemImg.push(url);
        this.setState({
            itemImg:[].concat(itemImg),
            uploadItemImg:false
        })
    };

    onEditorStateChange=editorState=>{
        const htmlStr = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        this.setState({
            editorState:htmlStr
        });
    };

    fetchCategory = text => {
        this.searchCategory(text);
    };

    getCategoryList(){
        const { mallCategory } = this.props;
        return mallCategory.list[`page${1}`] || [];
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const {
            startValue,
            endValue,
            endOpen,
            uploadCover,
            coverUrl,
            uploadItemImg,
            itemImg,
            isSearching
        } = this.state;
        const categoryList = this.getCategoryList();
        return (
            <div className={styles.add_good}>
                <Breadcrumb routes={routes}/>
                <div className={styles.form_box}>
                    <div className={styles.form_inner}>
                        <Form onSubmit={this.handleSubmit}>
                            <FormItem label="分类名称">
                                {getFieldDecorator('categoryName', {
                                    rules: [{
                                        required: true,
                                        message: '分类名称不能为空!'
                                    }],
                                })(
                                    <Select
                                        showSearch
                                        onSearch={this.fetchCategory}
                                        style={{ width: 320 }}
                                        placeholder="请选择或输入分类名称"
                                        notFoundContent={isSearching && <Spin size="small"/>}
                                        optionFilterProp="children"
                                        onChange={(e)=>{
                                            this.setState({
                                                categoryId:e
                                            })
                                        }}
                                    >
                                        {categoryList.map( option => {
                                            const {
                                                categoryId ,
                                                categoryName
                                            } = option;
                                            return (
                                                <Option key={categoryId} value={categoryId}>
                                                    {categoryName}
                                                </Option>
                                            )
                                        })}
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem label="商品名称" hasFeedback>
                                {getFieldDecorator('goodName', {
                                    rules: [{
                                        required: true,
                                        message: '商品名称不能为空！'
                                    }],
                                })(<Input
                                    style={{width:320}}
                                    placeholder="请输入商品名称"
                                />)}
                            </FormItem>
                            <FormItem label="商品价格">
                                {getFieldDecorator('prices', {
                                    rules: [{
                                        required: true,
                                        message: '商品价格不能为空！'
                                    }],
                                })(<InputNumber
                                    min={1}
                                    max={10000000000}
                                    style={{width:320}}
                                    placeholder="请输入价格（单位：分）"
                                />)}
                            </FormItem>
                            <FormItem label="库存数量">
                                {getFieldDecorator('stock', {
                                    rules: [{
                                        required: true,
                                        message: '商品库存不能为空！'
                                    }],
                                })(<InputNumber
                                    min={1}
                                    max={10000000000}
                                    style={{width:320}}
                                    placeholder="请输入库存"
                                />)}
                            </FormItem>
                            <FormItem label="上架时间">
                                {getFieldDecorator('startTime', {
                                    rules: [{
                                        required: true,
                                        message: '开始时间不能为空！'
                                    }],
                                })(<DatePicker
                                    disabledDate={this.disabledStartDate}
                                    showTime
                                    style={{width:320}}
                                    format="YYYY-MM-DD HH:mm:ss"
                                    setFieldsValue={startValue}
                                    placeholder="开始日期"
                                    onChange={this.onStartChange}
                                    onOpenChange={this.handleStartOpenChange}
                                    locale={enZh}
                                />)}
                            </FormItem>
                            <FormItem label="下架时间">
                                {getFieldDecorator('endTime', {
                                    rules: [{
                                        required: true,
                                        message: '截止时间不能为空！'
                                    }],
                                })(<DatePicker
                                    disabledDate={this.disabledEndDate}
                                    showTime
                                    style={{width:320}}
                                    format="YYYY-MM-DD HH:mm:ss"
                                    setFieldsValue={endValue}
                                    placeholder="截止日期"
                                    onChange={this.onEndChange}
                                    open={endOpen}
                                    locale={enZh}
                                    onOpenChange={this.handleEndOpenChange}
                                />)}
                            </FormItem>
                            <FormItem label="封面图片（最多上传1张）" extra="">
                                <BaseUpload
                                    uploadBefore={() => {
                                        this.setState({
                                            uploadCover: true
                                        });
                                    }}
                                    uploadSuccess={this.uploadCoverSuccess}
                                >
                                    {coverUrl ?
                                        (<div
                                            style={{ backgroundImage: `url(${coverUrl})` }}
                                            className={styles.coverImage}
                                        />) :
                                        <Fragment>
                                            <Icon type={uploadCover ? 'loading' : 'plus'}/>
                                            <div className="ant-upload-text">点击上传</div>
                                        </Fragment>
                                    }
                                </BaseUpload>
                            </FormItem>
                            <FormItem label="商品图片（最多上传10张）" extra="">
                                <div className={styles.upload_list}>
                                    {itemImg.map(url=>(
                                        <div
                                            key={url}
                                            style={{ backgroundImage: `url(${url})` }}
                                            className={styles.item_image}
                                        />
                                    ))}
                                    <BaseUpload
                                        uploadBefore={() => {
                                            if(itemImg.length >=10 ) {
                                                return false
                                            }
                                            this.setState({
                                                uploadItemImg: true
                                            });
                                        }}
                                        uploadSuccess={this.uploadItemImgSuccess}
                                    >
                                        <Fragment>
                                            <Icon type={uploadItemImg ? 'loading' : 'plus'}/>
                                            <div className="ant-upload-text">点击上传</div>
                                        </Fragment>
                                    </BaseUpload>
                                </div>
                            </FormItem>
                            <FormItem label="商品详情">
                                <Editor
                                    localization={{ locale: 'zh'}}
                                    toolbarClassName="toolbar-class"
                                    onEditorStateChange={this.onEditorStateChange}
                                    editorClassName={styles.editor_content_class}
                                    wrapperClassName={styles.editor_wrapper_className}
                                />
                            </FormItem>
                            <FormItem>
                                <Button type="primary" htmlType="submit">
                                    保存
                                </Button>
                            </FormItem>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

const CurrentForm = Form.create()(AddGood);

export default connect(['mallCategory'],{
    categoryActions
})(CurrentForm);