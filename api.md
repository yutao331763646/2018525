

1. 安装node 

<!-- 2. 安装React的构建工具
    npm install -g create-react-app

3. 用create-react-app构建一个react项目
    create-react-app hello-react

4. 进入当前项目目录
    cd hello-react -->

2. clone git 仓库
    git clone --depth=1 https://github.com/ant-design/ant-design-pro.git my-project

3. 进入当前项目目录
    cd my-project

4. 安装依赖
    npm install

5.安装api工具
    npm install roadhog-api-doc -g

6.静态站点生成
    roadhog-api-doc build

会生成三个文档站点静态文件：api.html、api.js、api.css，你可以将其部署到自己的站点中供线上访问，这里的数据已经被静态化

#  将 roadhog-api-doc 作为本地工具依赖安装
    npm install roadhog-api-doc --save-dev

import { format } from 'roadhog-api-doc';

const proxy = {
  'GET /api/currentUser': {
    $desc: "获取当前用户接口",
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: {
      name: 'momo.zxy',
      avatar: imgMap.user,
      userid: '00000001',
      notifyCount: 12,
    },
  },
};

export default format(proxy);

