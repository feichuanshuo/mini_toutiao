import React, {Component,createElement} from 'react';
import qs from 'querystring'
import {Comment,List,Tooltip,Avatar, Form, Button,Input,message} from "antd";
import {DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled} from '@ant-design/icons'
import axios from "axios";
import './index.css'
const { TextArea } = Input;
var likeFlag = -1
var dislikeFlag = -1
const CommentList = ({ comments }) => (
    <List
        dataSource={comments}
        header={`${comments.length} 条评论`}
        itemLayout="horizontal"
        renderItem={props => <Comment {...props} />}
    />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                发表评论
            </Button>
        </Form.Item>
    </>
);
class ArticleContent extends Component {
    state={
        article_id:"",
        article_title: "",
        publish_user: "",
        createdAt:"",
        article_content:"",
        action:null,
        comment_count:null,
        dislike_count:null,
        upvote_count: null,
        comments:[],
        submitting: false,
        value: '',
    }
    getCount=(article_id)=>{
        axios.post("https://qcotvg.fn.thelarkcloud.com/statistics",{_id:article_id}).then(
            response=>{
                console.log(response)
                this.setState({
                    comment_count:response.data.result.comment_count,
                    dislike_count:response.data.result.dislike_count,
                    upvote_count:response.data.result.upvote_count
                })
            },
            error=>{console.log(error)}
        )
    }
    getComment=(article_id)=>{
        axios.post("https://qcotvg.fn.thelarkcloud.com/showComments",{article_id:article_id}).then(
            response=>{
                console.log(response)
                if(response.data.tip==='success'){
                    const commentsList=response.data.result.map((item)=>{
                        return {
                            author:item.user_name,
                            content:item.comment_content,
                            datetime:item.createdAt,
                            avatar:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                        }
                    })
                    this.setState({
                        comments:commentsList
                    })
                }
            },
            error=>{console.log(error)}
        )
    }
    componentDidMount() {
        const {search} = this.props.location
        const contentData = qs.parse(search.slice(1))
        console.log(contentData)
        const {_id,article_title,publish_user,createdAt} = contentData
        axios.post("https://qcotvg.fn.thelarkcloud.com/getContentsOfArticle",{_id:_id}).then(
            response=>{
                console.log(response)
                this.setState({
                    article_id:_id,
                    article_title: article_title,
                    publish_user: publish_user,
                    createdAt:createdAt,
                    article_content:response.data.result
                })
            },
            error=>{console.log(error)}
        )
        this.getCount(_id)
        this.getComment(_id)
    }
    like = ()=>{
        if(this.state.action!=='liked'){
            axios.post("https://qcotvg.fn.thelarkcloud.com/upvote",{article_id:this.state.article_id}).then(
                response=>{
                    console.log(response)
                    likeFlag = 1
                    if (dislikeFlag===1){
                        axios.post("https://qcotvg.fn.thelarkcloud.com/cancel_dislike",{article_id:this.state.article_id}).then(
                            response=>{
                                console.log(response)
                                dislikeFlag = 0
                                this.getCount(this.state.article_id)
                                this.setState({
                                    action:'liked'
                                })
                            },
                            error=>{console.log(error)}
                        )
                    }
                    else{
                        dislikeFlag = 0
                        this.getCount(this.state.article_id)
                        this.setState({
                            action:'liked'
                        })
                    }
                },
                error=>{console.log(error)}
            )
        }
    }
    dislike = ()=>{
        if(this.state.action!=='disliked'){
            axios.post("https://qcotvg.fn.thelarkcloud.com/dislike",{article_id:this.state.article_id}).then(
                response=>{
                    console.log(response)
                    dislikeFlag = 1
                    if (likeFlag===1){
                        axios.post("https://qcotvg.fn.thelarkcloud.com/cancel_upvote",{article_id:this.state.article_id}).then(
                            response=>{
                                console.log(response)
                                likeFlag = 0
                                this.getCount(this.state.article_id)
                                this.setState({
                                    action:'disliked'
                                })
                            },
                            error=>{console.log(error)}
                        )
                    }
                    else {
                        likeFlag = 0
                        this.getCount(this.state.article_id)
                        this.setState({
                            action:'disliked'
                        })
                    }

                },
                error=>{console.log(error)}
            )
        }
    }
    handleSubmit = () => {
        const head = window.location.pathname.split('/')[1]
        if(head==='home'){
            message.warning("请先登录！")
            return
        }
        if (!this.state.value) {
            return;
        }
        this.setState({
            submitting: true,
        });
        const user_name=document.cookie
        axios.post("https://qcotvg.fn.thelarkcloud.com/comment",{user_name:user_name,article_id:this.state.article_id,comment_content:this.state.value}).then(
            response=>{
                console.log(response)
                this.setState({
                    submitting:false
                })
                this.getComment(this.state.article_id)
                this.setState({
                    value:''
                })
            },
            error=>{console.log(error)}
        )

    };
    handleChange = e => {
        this.setState({
            value: e.target.value,
        });
    };
    render() {
        const {article_title, publish_user, createdAt, article_content,action,dislike_count,upvote_count, comments, submitting, value }=this.state
        return (
            <div>
                <h2 align="center">{article_title}</h2>
                <h5 align="center">{publish_user+"  "+createdAt}</h5>
                <div style={{overflowY:"auto"}}>{article_content}</div>
                <Tooltip key="comment-basic-like" title="赞">
                      <span onClick={this.like}>
                        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
                          <span className="comment-action">{upvote_count}</span>
                      </span>
                </Tooltip>
                &nbsp;&nbsp;&nbsp;
                <Tooltip key="comment-basic-dislike" title="踩">
                      <span onClick={this.dislike}>
                        {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
                          <span className="comment-action">{dislike_count}</span>
                      </span>
                </Tooltip>
                <br/>
                {comments.length > 0 && <CommentList comments={comments} />}
                <Comment
                    avatar={
                        <Avatar
                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                            alt="Han Solo"
                        />
                    }
                    content={
                        <Editor
                            onChange={this.handleChange}
                            onSubmit={this.handleSubmit}
                            submitting={submitting}
                            value={value}
                        />
                    }
                />
            </div>
        );
    }
}

export default ArticleContent;