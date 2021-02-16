##启动步骤
    配置所需环境
        npm install
        yarn install
        yarn create react-app mini_toutiao
    下载所需包
        yarn add antd
        yarn add react-router-dom
        yarn add axios
    运行项目
        yarn start
##目录结构
    |— node_modules
    |- public
    |- src
    | |-pages //存放页面的所有组件
    | |-Home  //存放未登录的layout布局
    | |-AuthorHome //存放登录后页面的layout布局
    | |-reportWebVitals.js
    | └-index.js//入口文件
    后端目录见轻服务云函数 https://qingfuwu.cn/dashboard
    账号:zoclpa.tech
    密码:YMJZoJFABI
##团队成员的分工
    张宇昊:前端设计
    刘勇:后端接口开发及数据库设计
    肖靖阳:前端优化
##是否实现了加分项
    在文章详情页实现了评论功能
##页面路由
    路由方式             触发时机
    初始化               项目打开第一个页面
    文章浏览             调用API:getListOfArticle  Route path="/home/article" || "/author_home/articleList"                                                
    文章管理             Route path="/author_home/articleManage"
    撰写文章             Route path="/author_home/write"  
    编辑文章             Route path="/author_home/edit"
    文章详情             Route path="/home/articleContent" || "/author_home/articleContent"
##操作说明
    未登录     可浏览文章，注册和登录账户
    登陆后     可浏览文章，管理个人文章，撰写文章，修改文章