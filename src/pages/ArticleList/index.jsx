import React, {Component} from 'react';
import { List, Avatar } from 'antd';
import axios from "axios";
import {Link} from "react-router-dom"
var head
class ArticleList extends Component {
    state={
        data:[],
    }
    componentDidMount() {
        head = window.location.pathname.split('/')[1]
        axios.post("https://qcotvg.fn.thelarkcloud.com/getListOfArticle").then(
            response=>{
                this.setState({
                    data:response.data.result,
                })
            }
            ,
            error=>{console.log(error)}
        )
    }

    render() {
        const {data}=this.state
        return (
            <List
                pagination={{
                    pageSize:7
                }}
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                            title={<Link to={`/${head}/articleContent/?_id=${item._id}&article_title=${item.article_title}&publish_user=${item.publish_user}&createdAt=${item.createdAt}`}>{item.article_title}</Link>}
                            description={item.publish_user+'  '+item.createdAt}
                        />
                    </List.Item>
                )}
            />
        );
    }
}

export default ArticleList;