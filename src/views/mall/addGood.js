import React, {
    PureComponent,
    Fragment
} from 'react';
import { Link } from 'react-router-dom';
import styles from './addGood.scss';
import Breadcrumb from './../../components/Breadcrumb';
import {
    Editor
} from 'react-draft-wysiwyg';

import draftToHtml from 'draftjs-to-html';

import moment from 'moment';

import {
    EditorState,
    convertToRaw,
    convertFromHTML,
    ContentState,
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
import BaseUpload from './../../components/Upload';
import enZh from 'antd/lib/date-picker/locale/zh_CN';

import categoryActions from './../../state/action/mall/category';

const routes = [{
    path: '/home/mall/manage',
    breadcrumbName: '商品分类'
}, {
    path: '',
    breadcrumbName: '添加商品'
}];

class AddGood extends PureComponent {
    constructor(props) {
        super();
        const {
            params
        } = props.match;
        this.state = {
            //是否在搜索中
            searching: false,
            //banner 图片
            banners: [],
            //封面图片
            cover: null,
            //是否在上传封面
            uploadingCover: false,
            //是否在上传banner
            uploadingBanner: false,
            //上架时间
            liveStart:null,
            //下架时间
            liveEnd:null,
            //富文本
            desc:null,
            loadingState:false
        };
        this.goodsId =params.id;
        this.isEditor = !!this.goodsId;

    }

    componentDidMount() {
        this.searchCategory();
        if(this.isEditor) {
            this.fetchData();
        }
    };

    fetchData(){
        const {
            categoryActions ,
            form
        } = this.props;
        categoryActions.getGoods(this.goodsId).then( data => {

            this.setState({
                categoryId:data.categoryId,
                cover:data.cover,
                desc:data.desc,
                goodsName:data.goodsName,
                limit:data.limit,
                liveStart:data.liveStart,
                liveEnd:data.liveEnd,
                price:data.price,
                stock:data.stock,
                banners:data.banners
            });
        });
    }

    searchCategory = (keyword = null) => {
        const {
            categoryActions
        } = this.props;
        this.setState({
            searching: true
        });
        categoryActions.getCategoryList(1, keyword, 40).finally(() => {
            this.setState({
                searching: false
            });
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const {
            validateFields
        } = this.props.form;
        validateFields((err, fields) => {
            if (!err) this.save(fields);
        });
    };

    save( fields ){
        const {
            categoryId,
            goodsName,
            liveStart,
            liveEnd,
            price,
            stock,
            limit
        } = fields;

        const {
            banners,
            cover,
            desc
        } = this.state;

        const params = {
            categoryId,
            goodsName,
            liveStart,
            liveEnd,
            price,
            stock,
            banners,
            cover,
            desc,
            limit
        };

        let errMsg = null;

        if(!cover) {
            errMsg = `请上传封面图片！`;
        }

        if(!banners.length) {
            errMsg = `请上传banner图片！`;
        }

        if(!desc) {
            errMsg = `请上传商品详情！`;
        }

        if(errMsg) return message.error(errMsg);

        this.setState({
            loadingState:true
        });

        const {
            categoryActions,
            history
        } = this.props;

        categoryActions.addGoods(params).then(() => {
            history.push('/home/mall/manage')
        }).finally(()=>{
            this.setState({
                loadingState:false
            });
        })
    }

    disabledStartDate = (startValue) => {
        const endValue = this.state.liveEnd;
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    };

    disabledEndDate = (endValue) => {
        const startValue = this.state.liveStart;
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
        this.setState({
            liveStart:value
        })
    };

    onEndChange = (value) => {
        this.setState({
            liveEnd:value
        })
    };

    uploadCoverSuccess = url => {
        this.setState({
            cover: url,
            uploadingCover: false
        });
    };

    uploadBannerSuccess = url => {
        const {
            banners
        } = this.state;
        banners.push(url);
        this.setState({
            banners: [].concat(banners),
            uploadingBanner: false
        });
    };

    onEditorStateChange = editorState => {
        this.setState({
            desc: draftToHtml(
                convertToRaw(editorState.getCurrentContent())
            )
        });
    };

    fetchCategory = text => {
        this.searchCategory(text);
    };

    getCategoryList() {
        const { mallCategory } = this.props;
        return mallCategory.list[`page${1}`] || [];
    }

    coverUploadBefore = () => {
        this.setState({
            uploadingCover: true
        });
    };

    uploadBannerBefore = () => {
        const { banners } = this.state;
        if(banners > 10) return false;
        this.setState({
            uploadingBanner: true
        });
    };

    getDefaultEditorState = str => {
        if(!str)  return EditorState.createEmpty();
        const contentBlocks = convertFromHTML(str);
        return EditorState.createWithContent(ContentState.createFromBlockArray(contentBlocks));
    };

    render() {
        const {
            state
        } = this;
        const {
            form
        } = this.props;

        const {
            getFieldDecorator
        } = form;

        const {
            banners,
            searching,
            cover,
            liveStart,
            liveEnd,
            uploadingCover,
            uploadingBanner,
            loadingState
        } = this.state;
        const categoryList = this.getCategoryList();
        const inputStyle = {
            width:350
        };

        const desc = this.getDefaultEditorState(state.desc);

        return (
            <Fragment>
                <Breadcrumb routes={routes}/>
                <Form className={styles.goods_form} onSubmit={this.handleSubmit}>
                    <Form.Item label="分类名称">
                        {getFieldDecorator(`categoryId`, {
                            rules: [{
                                required: true,
                                message: '分类名称不能为空!'
                            }]
                        })(
                            <Select
                                showSearch={true}
                                optionFilterProp="children"
                                notFoundContent = {
                                    searching ? (
                                        <Icon type="loading"/>
                                    ):`没有该分类`
                                }
                                onSearch={this.fetchCategory}
                                style={inputStyle}
                                placeholder="请选择或输入分类名称"
                            >
                                {categoryList.map(option => {
                                    const {
                                        categoryId,
                                        categoryName
                                    } = option;
                                    return (
                                        <Option
                                            key={categoryId}
                                            value={categoryId}
                                        >
                                            {categoryName}
                                        </Option>
                                    );
                                })}
                            </Select>
                        )}
                    </Form.Item>
                    <FormItem label="商品名称" hasFeedback>
                        {getFieldDecorator('goodsName', {
                            initialValue:state.goodsName,
                            rules: [{
                                required: true,
                                message: '商品名称不能为空！'
                            }]
                        })(
                            <Input
                                style={inputStyle}
                                placeholder="请输入商品名称"
                            />
                        )}
                    </FormItem>
                    <FormItem label="商品价格">
                        {getFieldDecorator('price', {
                            initialValue:state.price,
                            rules: [{
                                required: true,
                                message: '商品价格不能为空！'
                            }],
                        })(
                            <InputNumber
                                min={1}
                                max={10000000000}
                                style={inputStyle}
                                placeholder="请输入价格（单位：分）"
                            />
                        )}
                    </FormItem>
                    <FormItem label="库存数量">
                        {getFieldDecorator('stock', {
                            initialValue:state.stock,
                            rules: [{
                                required: true,
                                message: '商品库存不能为空！'
                            }],
                        })(
                            <InputNumber
                                min={1}
                                max={10000000000}
                                style={inputStyle}
                                placeholder="请输入库存"
                            />
                        )}
                    </FormItem>
                    <FormItem label="上架时间">
                        {getFieldDecorator('liveStart', {
                            initialValue:moment(state.liveStart),
                            rules: [{
                                required: true,
                                message: '开始时间不能为空！'
                            }],
                        })(
                            <DatePicker
                                locale={enZh}
                                showTime={true}
                                style={inputStyle}
                                format="YYYY-MM-DD HH:mm:ss"
                                setFieldsValue={liveStart}
                                placeholder="开始日期"
                                onChange={this.onStartChange}
                                disabledDate={this.disabledStartDate}
                            />
                        )}
                    </FormItem>
                    <FormItem label="下架时间">
                        {getFieldDecorator('liveEnd', {
                            initialValue:moment(state.liveEnd),
                            rules: [{
                                required: true,
                                message: '截止时间不能为空！'
                            }],
                        })(
                            <DatePicker
                                showTime={true}
                                locale={enZh}
                                style={inputStyle}
                                format="YYYY-MM-DD HH:mm:ss"
                                setFieldsValue={liveEnd}
                                placeholder="截止日期"
                                onChange={this.onEndChange}
                                disabledDate={this.disabledEndDate}
                            />
                        )}
                    </FormItem>
                    <FormItem label="商品排序">
                        {getFieldDecorator('limit', {
                            initialValue:state.limit,
                            rules: [{
                                required: true,
                                message: '排序不能为空！'
                            }],
                        })(
                            <InputNumber
                                min={1}
                                max={10000000000}
                                style={inputStyle}
                                placeholder="请输入排序"
                            />
                        )}
                    </FormItem>
                    <FormItem label="封面图片" extra="(最多上传1张)">
                        <BaseUpload
                            uploadBefore={this.coverUploadBefore}
                            uploadSuccess={this.uploadCoverSuccess}
                        >
                            {!!cover ? (
                                <div
                                    className={styles.coverImage}
                                    style={{ backgroundImage: `url(${cover})` }}
                                />
                            ):(
                                <Fragment>
                                    <Icon type={uploadingCover ? 'loading' : 'plus'}/>
                                    <div className="ant-upload-text">
                                        点击上传
                                    </div>
                                </Fragment>
                            )}
                        </BaseUpload>
                    </FormItem>
                    <FormItem label="商品图片" extra="(最多上传10张)">
                        <div className={styles.upload_list}>
                            {banners.map(url => (
                                <div
                                    key={url}
                                    className={styles.item_image}
                                    style={{ backgroundImage: `url(${url})` }}
                                />
                            ))}
                            <BaseUpload
                                uploadBefore={this.uploadBannerBefore}
                                uploadSuccess={this.uploadBannerSuccess}
                            >
                                <Fragment>
                                    <Icon type={uploadingBanner ? 'loading' : 'plus'}/>
                                    <div className="ant-upload-text">
                                        点击上传
                                    </div>
                                </Fragment>
                            </BaseUpload>
                        </div>
                    </FormItem>
                    <FormItem label="商品详情">
                        <Editor
                            localization={{ locale: 'zh' }}
                            toolbarClassName="toolbar-class"
                            onEditorStateChange={this.onEditorStateChange}
                            editorClassName={styles.editor_content_class}
                            wrapperClassName={styles.editor_wrapper_className}
                            editorState={desc}
                        />
                    </FormItem>
                    <FormItem>
                        <Button
                            loading={loadingState}
                            type="primary"
                            htmlType="submit"
                        >
                            {`保存${loadingState?`中..`:``}`}
                        </Button>
                    </FormItem>
                </Form>
            </Fragment>
        );
    }
}

const CurrentForm = Form.create()(AddGood);
export default connect(['mallCategory'], {
    categoryActions
})(CurrentForm);