# LessMusic

### github 地址:

#### [LessMusic](https://github.com/PacificD/LessMusic.git)

### 运行环境准备:

##### 一、安装对应操作系统版本的[node.js](https://nodejs.org/en/download/)

##### 二、安装 NeteaseCloudMusicApi 包

```
$ git clone https://github.com/Binaryify/NeteaseCloudMusicApi.git

$ npm install
```

##### 三、在安装后的 NeteaseCloudMusicApi 包文件目录下打开 node.js / git / vscode 集成终端，运行:

```
$ node app.js
```

### 网页说明:

##### 运行 node app.js 指令后，打开 html 文件夹下的 home.html 文件，进入网页主页面。

#### 一、主页

- 主页面导航栏文字，如: "发现音乐/个人主页" 可点击，但排行榜，歌手，歌单，MV 暂未开放。
- 可以通过歌单列表中的歌手名/个人主页内歌单列表中的歌手名点击后进入歌手的个人主页。
- 歌单页面可以通过主页推荐的歌单/个人主页内收藏的歌单点击进入。
- 主页面导航栏的图标 LOGO，文字"LessMusic"点击后返回主页。
- 本网页加载完毕后默认获取一首歌曲并播放。网页左侧返回上一级按钮，右侧返回顶部按钮可使用。

进入主页后，如下图所示，本网页的性能较差导致加载较慢。若加载不出图片/歌曲请请耐心等待或刷新网页。

![网站主页](https://www.hualigs.cn/image/60953dcd7047e.jpg "网站主页")

#### 二、歌单页面

- 在主页中点击"推荐新歌"模块中的歌曲名，或者鼠标悬浮后点击播放按钮可播放推荐新歌曲。
- 主页中点击推荐歌单后可进入该歌单详情页面，包含: 推荐相似歌单模块，热门评论模块(目前暂无发送评论功能)。

![歌单页面](https://www.hualigs.cn/image/60953fac2902a.jpg "歌单页面")

- 在歌单页面中可点击列表中的歌曲名或者播放按钮后播放该歌曲，也可点击"添加进播放列表"按钮后，该歌曲添加进播放列表中。
- 可点击右侧"相似歌单"后进入该相似歌单页面。
- 点击"播放全部"按钮，则可播放当前歌单的全部歌曲。

#### 三、歌手详情页面

##### 在歌单列表中，点击歌手名后可进入歌手详情页面。或是点击个人主页中"我喜欢"的歌单列表内歌手名后，也可进入歌手详情页面，如下图所示

![歌手详情页面](https://www.hualigs.cn/image/609541379bdb3.jpg "歌手详情页面")

- 歌手详情页面内，可点击"[更多]"按钮查看该歌手的更多资料。
- 点击右侧"相似歌手"头像或名字后，可进入该歌手的详情页面。
- 点击"播放全部"按钮则可播放当前歌手的全部热门歌曲。

##### &emsp;

#### 四、搜索功能

- 在搜索框中输入关键词进行搜索，若无关键词填入，则展示热门搜索。
- 输入关键词后，搜索框下方会动态渲染部分搜索结果，如下图所示

![搜索框](https://www.hualigs.cn/image/609542605c094.jpg "搜索框")

##### &emsp;

- 点击搜索框中渲染出来的歌曲，可直接播放该歌曲。
- 点击歌手则进入歌手详情页面，点击歌单则进入歌单页面

点击搜索按钮后，跳转到搜索详情页面，如下图

![搜索详情页面](https://www.hualigs.cn/image/60954332ae1fd.jpg "搜索详情页面")

##### &emsp;

点击"搜索结果"旁边的"单曲/歌手/MV/歌单"便可筛选切换搜索结果。

![切换搜索结果](https://www.hualigs.cn/image/6095432c04f42.jpg "切换搜索结果")

#### 五、登录功能

- 在导航栏中右上角点击"登录"按钮后，输入手机号和密码可进行登录，会有登录验证。
- 登录界面点击密码旁的小按钮可显示密码/隐藏密码，该登录界面可拖动。

![登录](https://www.hualigs.cn/image/6095442c4a3f3.jpg "登录")

##### &emsp;

![个人主页](https://www.hualigs.cn/image/609544cdf18a5.jpg "个人主页")

##### &emsp;

- 登录成功后，进入个人主页。展示个人名称，个性前面，头像，粉丝数/关注数等。
- 点击个人资料卡片下方的 “我喜欢”/"我创建的歌单"/"我收藏的歌单" 可切换相应模块。

若当前页面为个人主页-我喜欢的歌曲，可点击歌单列表第一行中的“歌曲”右侧图标，播放列表中的全部歌曲。

![我收藏的歌单](https://www.hualigs.cn/image/609544d3ca0b7.jpg "我收藏的歌单")

### 六、音乐播放功能

- 网页下方的音乐状态栏中，音乐进度条可拖动，音乐进度会跟随进度条放开一瞬间调整。音量可调整，点击一下音量图标可静音/切换至默认音量。

- 点击音乐状态栏中音量键左侧的图标，可展示音乐列表。

- 在音乐列表中，可点击歌曲进行播放，当前播放的歌曲会被展示在播放列表的第一首。

- 点击删除按钮可以删除播放列表中的歌曲。点击音乐列表头部的删除按钮则可删除播放列表中的全部歌曲。

![音乐列表](https://www.hualigs.cn/image/6095461cbd8bd.jpg "音乐列表")

##### &emsp;

- 可点击音乐状态栏中的"列表循环"，切换播放模式: 列表循环 / 单曲循环 / 随机播放
- 点击中间"播放"按钮，可 暂停/开始 播放
- 点击"上一首"，“下一首”按钮，可切换至音乐播放列表中的上一首，下一首歌曲

![音乐播放](https://www.hualigs.cn/image/6095492121450.jpg "音乐播放")

##### &emsp;

点击音乐状态栏最左侧歌曲的封面图片后，可进入音乐播放界面，该界面包含:

- 渲染热门评论
- 实时展示歌词，歌词滚动
- 再点击一次音乐状态栏左侧歌曲封面后，隐藏音乐播放界面
