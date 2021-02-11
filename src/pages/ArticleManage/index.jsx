import { Table, Space } from 'antd';
import React, {Component,Fragment} from 'react';
import axios from "axios";
import {Link} from "react-router-dom"
import qs from 'querystring'
import { Button,message} from 'antd';
class ArticleManage extends Component {
    state = {
        columns:[
            {
                title: '序号',
                dataIndex: 'index',
                key: 'index',
            },
            {
                title: '标题',
                dataIndex: 'article_title',
                key: 'article_title',
            },
            {
                title: '来源',
                dataIndex: 'publish_user',
                key: 'publish_user',
            },
            {
                title: '日期',
                dataIndex: 'createdAt',
                key: 'createdAt',
            },
            {
                title: '点赞数',
                dataIndex: 'upvote_count',
                key: 'upvote_count',
            },
            {
                title: '评论数',
                dataIndex: 'comment_count',
                key: 'comment_count',
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <Space size="middle">
                        <Button type="primary"><Link to={{pathname:"/author_home/edit",state:{_id:record.key,article_title:record.article_title,publish_user:record.publish_user}}} >编辑</Link></Button>
                        <Button type="primary" onClick={() => {this.shiftStatus(record)}}>{record.status === '线上' ? '下线' : '上线'}</Button>
                    </Space>
                ),
            },
        ],
        show_data: [],
    }
    //获取文章列表
    getListOfArticle = ()=>{
        const {search} = this.props.location
        const {publish_user} = qs.parse(search.slice(1))
        axios.post("https://qcotvg.fn.thelarkcloud.com/getOneselfArticle",{publish_user: publish_user}).then(
            response=>{
                const show_data = response.data.article_list.map((dataObj,index)=>{
                    return {key: dataObj._id,
                        index: (index+1).toString(),
                        article_title: dataObj.article_title,
                        publish_user: dataObj.publish_user,
                        createdAt: dataObj.createdAt,
                        upvote_count:dataObj.upvote_count,
                        comment_count:dataObj.comment_count,
                        status: dataObj.status,}
                })||[]
                this.setState({
                    show_data:show_data
                })
            },
            error=>{console.log(error)}
        )
    }
    //切换状态
    shiftStatus = (dataObj) => {
        const key = 'status'
        message.loading({ content: '切换中...', key ,})
        axios.post("https://qcotvg.fn.thelarkcloud.com/shiftStatus",{
            article_id:dataObj.key
        }).then(
            response=>{
                if (response.data.tip==="success"){
                    this.getListOfArticle()
                    message.success({ content:response.data.result, key,duration:2,})
                }
                else{
                    message.error({content:response.data.result,key,duration:2})
                }
            },
            error=>{
                console.log(error)
            }
        )
    }
    componentDidMount() {
        this.getListOfArticle()
    }

    render() {
        const {columns,show_data} = this.state
        return (
            <Fragment>
                <Table pagination={{position: ['bottomCenter'],defaultPageSize:7}} columns={columns} dataSource={show_data}/>
            </Fragment>
        );
    }
}
export default ArticleManage;