//歌单渲染js

const myPlayLists = document.querySelector(".myPlayLists"),
    myPlayListsUl = myPlayLists.querySelector("ul");
//渲染我的歌单
let myPlayListsFunction = function (userID) {
    //发送ajax请求，获取我的歌单列表
    ajax({
        url: "http://127.0.0.1:4000/user/playlist",
        data: {
            uid: userID,
        },
        success: function (response) {
            const playlistLength = response.playlist.length;
            for (let i = 0; i < playlistLength; i++) {
                //当歌单创建者ID为用户ID时
                if (response.playlist[i].userId == userID) {
                    const li = document.createElement("li"),
                        a = document.createElement("div"),
                        b = document.createElement("div"),
                        c = document.createElement("div"),
                        d = document.createElement("div"),
                        coverImgUrl = response.playlist[i].coverImgUrl, //封面Url
                        name = response.playlist[i].name, //歌单名
                        id = response.playlist[i].id, //歌单id
                        trackCount = response.playlist[i].trackCount, //歌曲数
                        playCount = response.playlist[i].playCount, //播放次数
                        nickname = response.playlist[i].creator.nickname; //创建人名称
                    a.innerHTML =
                        "<img src=" +
                        coverImgUrl +
                        "><a>" +
                        name +
                        '</a><i class="iconfont playBtn">&#xe664;</i>';
                    b.innerHTML = trackCount + "首";
                    c.innerHTML = "<a>" + nickname + "</a>";
                    d.innerHTML = playCount + "次";
                    li.appendChild(a);
                    li.appendChild(b);
                    li.appendChild(c);
                    li.appendChild(d);
                    li.addEventListener("click", function () {
                        musicPlayList(id);
                    });
                    myPlayListsUl.appendChild(li);
                }
            }
            const li = document.createElement("li");
            li.style.background = "#fff";
            myPlayListsUl.appendChild(li);
            myPlayListsFunction = null;
        },
    });
};

//渲染我收藏的歌单
const myCollect = document.querySelector(".myCollect");
const myCollectUl = document.querySelector(".myCollect ul");
let myCollectFunction = function (userID) {
    //发送ajax请求，获取我的歌单列表
    ajax({
        url: "http://127.0.0.1:4000/user/playlist",
        data: {
            uid: userID,
        },
        success: function (response) {
            const playlistLength = response.playlist.length;
            for (let i = 0; i < playlistLength; i++) {
                //当歌单创建者ID不为用户ID时
                if (response.playlist[i].userId != userID) {
                    const li = document.createElement("li"),
                        a = document.createElement("div"),
                        b = document.createElement("div"),
                        c = document.createElement("div"),
                        d = document.createElement("div"),
                        coverImgUrl = response.playlist[i].coverImgUrl, //封面Url
                        name = response.playlist[i].name, //歌单名
                        id = response.playlist[i].id, //歌单id
                        trackCount = response.playlist[i].trackCount, //歌曲数
                        playCount = response.playlist[i].playCount, //播放次数
                        nickname = response.playlist[i].creator.nickname; //创建人名称
                    a.innerHTML =
                        "<img src=" +
                        coverImgUrl +
                        "><a>" +
                        name +
                        '</a><i class="iconfont playBtn">&#xe664;</i>';
                    b.innerHTML = trackCount + "首";
                    c.innerHTML = "<a>" + nickname + "</a>";
                    d.innerHTML = playCount + "次";
                    li.appendChild(a);
                    li.appendChild(b);
                    li.appendChild(c);
                    li.appendChild(d);
                    li.addEventListener("click", function () {
                        musicPlayList(id);
                    });
                    myCollectUl.appendChild(li);
                }
            }
            const li = document.createElement("li");
            li.style.background = "#fff";
            myCollectUl.appendChild(li);
            myCollectFunction = null;
        },
    });
};

//渲染歌单详情
const musicPlayList = function (playListID) {
    //先将之前的歌单清空
    const list = document.querySelector(".musicList>ul");
    list.innerHTML = "";
    ajax({
        url: "http://127.0.0.1:4000/playlist/detail",
        data: {
            id: playListID,
        },
        success: function (response) {
            const personal = document.getElementsByClassName("personal")[0],
                main = document.querySelector(".main"),
                navUnderline = document.querySelectorAll(".nav-underline"),
                search = document.querySelector(".search"),
                searchBg = document.querySelector(".search-bg"),
                singerPageContainer = document.querySelector(".singer-page-container"),
                musicListContainer = document.querySelector(".musicList-container"),
                musicListUl = document.querySelector(".musicList>ul"),
                musicListImg = document.querySelector(".musicList>img"),
                musicListName = document.querySelector(".musicList .info>h1"),
                musicListDescription = document.querySelector(".musicList .info>p"),
                musicListNickName = document.querySelector(".musicList .info>div>a"),
                musicListTags = document.querySelector(".tag"),
                musicListCreatTime = document.querySelector(".musicList .info>div>p"),
                musicListAvatar = document.querySelector(".musicList .info>div>img");
            //获取回应信息，读写分离，加快渲染速度
            const name = response.playlist.name,
                coverImgUrl = response.playlist.coverImgUrl,
                description = response.playlist.description,
                nickname = response.playlist.creator.nickname,
                tags = response.playlist.tags, //存放歌单标签数组
                avatar = response.playlist.creator.avatarUrl,
                trackIds = response.playlist.trackIds; //存放歌曲ID数组
            //渲染信息
            musicListName.innerHTML = name;
            musicListImg.src = coverImgUrl;
            musicListDescription.innerHTML = description;
            musicListNickName.innerHTML = nickname;
            //先清空之前的歌单标签
            musicListTags.innerHTML = "";
            document.querySelector(".spinner").style.display = "block";
            for (let i = 0; i < 6 && tags[i]; i++) {
                const a = document.createElement("a");
                a.innerHTML = tags[i];
                musicListTags.appendChild(a);
            }
            let date = new Date(response.playlist.createTime);
            let Y = date.getFullYear() + "-"; // 获取完整的年份(4位,1970)
            let M = // 获取月份(0-11,0代表1月,用的时候记得加上1)
                (date.getMonth() + 1 < 10
                    ? "0" + (date.getMonth() + 1)
                    : date.getMonth() + 1) + "-";
            let D = date.getDate(); // 获取日(1-31)
            let time = Y + M + D;
            musicListCreatTime.innerHTML = time + "创建";
            musicListAvatar.src = avatar;
            musicListContainer.style.display = "block";
            //自定义属性存放歌单模块是否被打开，1为已经打开
            main.setAttribute("data-mode", "musicList");
            personal.style.display = "none";
            main.style.display = "none";
            search.style.display = "none";
            searchBg.style.display = "none";
            singerPageContainer.style.display = "none";
            for (let i = 0; i < navUnderline.length; i++) {
                navUnderline[i].style.display = "none";
            }
            //渲染歌曲{}
            let index = 1;
            let musicListFrag = document.createDocumentFragment();
            for (let i = 0; i < trackIds.length; i++) {
                //发送ajax请求获取歌曲详情信息，渲染歌曲
                ajax({
                    url: "http://127.0.0.1:4000/song/detail",
                    data: {
                        ids: trackIds[i].id,
                    },
                    success: function (response) {
                        const li = document.createElement("li");
                        //判断歌手个数，最多存五
                        let arList0 = []; //数组，存放歌手名
                        for (let j = 0; response.songs[0].ar.length < 6; j++) {
                            if (response.songs[0].ar[j] === undefined) {
                                break;
                            }
                            arList0[j] = response.songs[0].ar[j].name;
                        }
                        //将歌曲信息存入对象songInfo中
                        const songInfo = {
                            id: response.songs[0].id,
                            name: response.songs[0].name,
                            alName: response.songs[0].al.name,
                            alPicUrl: response.songs[0].al.picUrl,
                            ar: arList0,
                            mv: response.songs[0].mv,
                            dt: response.songs[0].dt,
                        };
                        //添加歌曲名元素;
                        const div1 = document.createElement("div");
                        //判断该歌曲是否有MV
                        if (response.songs[0].mv == 0) {
                            div1.innerHTML =
                                "<small>" +
                                index +
                                ".&emsp;" +
                                "</small>" +
                                "<a class='music-name'>" +
                                response.songs[0].name +
                                "</a>" +
                                "<em></em>";
                            const play = document.createElement("i");
                            const add = document.createElement("i");
                            const id = response.songs[0].id;
                            play.className = "iconfont play";
                            play.innerHTML = "&#xe664;";
                            add.className = "iconfont add";
                            add.innerHTML = "&#xe60e;";
                            div1.appendChild(add);
                            div1.appendChild(play);
                        } else {
                            div1.innerHTML =
                                "<small>" +
                                index +
                                ".&emsp;" +
                                "</small>" +
                                "<a class='music-name'>" +
                                response.songs[0].name +
                                "</a>" +
                                '<i class="iconfont">&#xe879;</i>';
                            const add = document.createElement("i");
                            const play = document.createElement("i");
                            const id = response.songs[0].id;
                            play.className = "iconfont play";
                            play.innerHTML = "&#xe664;";
                            add.className = "iconfont add";
                            add.innerHTML = "&#xe60e;";
                            div1.appendChild(add);
                            div1.appendChild(play);
                        }
                        index++;
                        //将音乐ID存入自定义属性data-music-id中
                        div1.setAttribute("data-music-id", response.songs[0].id);
                        //将songInfo存入自定义属性data-music-songInfo中，方便后续获取,减少接口调用
                        div1.setAttribute("data-music-songInfo", JSON.stringify(songInfo));
                        li.appendChild(div1);
                        //添加歌手名元素
                        const div2 = document.createElement("div");
                        let arList = []; //数组，存放歌手名
                        for (let j = 0; j < response.songs[0].ar.length; j++) {
                            arList[j] = response.songs[0].ar[j].name;
                        }
                        for (let j = 0; j < 3; j++) {
                            if (arList[j] === undefined) {
                                arList[j] = "";
                            }
                        }
                        if (arList[2] == "" && arList[1] != "") {
                            //两位歌手
                            div2.innerHTML =
                                "<a class='singer' data-singer-id=" +
                                response.songs[0].ar[0].id +
                                ">" +
                                arList[0] +
                                "</a> / " +
                                "<a class='singer' data-singer-id=" +
                                response.songs[0].ar[1].id +
                                ">" +
                                arList[1] +
                                "</a>";
                        } else {
                            if (arList[1] == "") {
                                //一位歌手
                                div2.innerHTML =
                                    "<a class='singer' data-singer-id=" +
                                    response.songs[0].ar[0].id +
                                    ">" +
                                    arList[0] +
                                    "</a>";
                            } else {
                                //三位歌手
                                div2.innerHTML =
                                    "<a class='singer' data-singer-id=" +
                                    response.songs[0].ar[0].id +
                                    ">" +
                                    arList[0] +
                                    "</a> / " +
                                    "<a class='singer' data-singer-id=" +
                                    response.songs[0].ar[1].id +
                                    ">" +
                                    arList[1] +
                                    "</a> / " +
                                    "<a class='singer' data-singer-id=" +
                                    response.songs[0].ar[2].id +
                                    ">" +
                                    arList[2] +
                                    "</a>";
                            }
                        }
                        li.appendChild(div2);
                        //添加专辑名元素
                        const div3 = document.createElement("div");
                        div3.innerHTML = "<a>" + response.songs[0].al.name + "</a>";
                        li.appendChild(div3);
                        //添加歌曲时长元素
                        const div4 = document.createElement("div");
                        let songLength = parseInt(response.songs[0].dt / 1000);
                        let songMin = parseInt(songLength / 60);
                        let songSecond = songLength % 60;
                        if (songSecond < 10) {
                            songSecond = "0" + songSecond;
                        }
                        div4.innerHTML = "<a>" + songMin + " : " + songSecond + "</a>";
                        li.appendChild(div4);
                        li.className = "musicLis";
                        //将处理完的li(li)渲染进页面
                        musicListFrag.appendChild(li);
                        if (i == trackIds.length - 1) {
                            musicListUl.appendChild(musicListFrag);
                            //歌曲全部渲染完毕
                            //隐藏加载中HTML
                            document.querySelector(".spinner").style.display = "none";
                            musicListUl.style.display = "block";
                        }
                        //END
                    },
                });
                //ajax End
            }
            //for-end
            //歌单页面中'播放全部'按钮绑定事件
            const musicListPlayAll = document.querySelector(".musicList-playAll");
            const musicLis = document.getElementsByClassName("musicLis");
            musicListPlayAll.addEventListener(
                "click",
                debounce(playAllFn, 2000, () => {
                    alert("操作频率过快，请2s后重试!");
                })
            );
            function playAllFn() {
                for (let i = 0; i < musicLis.length; i++) {
                    id = Number(
                        musicLis[i]
                            .getElementsByTagName("div")[0]
                            .getAttribute("data-music-id")
                    );
                    songInfo = JSON.parse(
                        musicLis[i]
                            .getElementsByTagName("div")[0]
                            .getAttribute("data-music-songInfo")
                    );
                    musicAddFunction(id, songInfo);
                    //播放列表第一首
                    if (i == 0) {
                        musicPlayFunction(id, songInfo);
                    }
                }
            }

            //为父元素绑定事件委托——子元素音乐播放/添加进播放列表
            document
                .querySelector(".musicList>ul")
                .addEventListener("click", function musicListUlCase(e) {
                    // 兼容性处理
                    let event = e || window.event;
                    let target = event.target || event.srcElement;
                    const id = Number(target.parentNode.getAttribute("data-music-id"));
                    const songInfo = JSON.parse(
                        target.parentNode.getAttribute("data-music-songInfo")
                    );
                    // 判断是否匹配目标元素
                    switch (target.className) {
                        case "music-name":
                            target.addEventListener("click", musicPlayFunction(id, songInfo));
                            break;
                        case "iconfont play":
                            target.addEventListener("click", musicPlayFunction(id, songInfo));
                            break;
                        case "iconfont add":
                            target.addEventListener("click", musicAddFunction(id, songInfo));
                            break;
                        case "singer":
                            const singerId = target.getAttribute("data-singer-id");
                            document
                                .querySelector(".musicList>ul")
                                .removeEventListener("click", musicListUlCase);
                            target.addEventListener("click", singerFunction(singerId));
                            break;
                        default:
                            break;
                    }
                });
            //事件委托end
        },
    });

    //渲染推荐歌单
    ajax({
        url: "http://127.0.0.1:4000/related/playlist",
        data: {
            id: playListID,
        },
        success: function (response) {
            const relevantLists = response.playlists; //相似推荐数组
            const relevantImgs = document.querySelectorAll(".relevant-img img"),
                relevantNames = document.querySelectorAll(".relevant-name"),
                relevantCreators = document.querySelectorAll(".relevant-creator"),
                relevantLis = document.querySelectorAll(".relevant>ul>li");
            for (let i = 0; i < relevantLists.length; i++) {
                relevantImgs[i].src = relevantLists[i].coverImgUrl;
                relevantNames[i].innerHTML = relevantLists[i].name;
                relevantCreators[i].innerHTML =
                    "By. " + relevantLists[i].creator.nickname;
                relevantLis[i].setAttribute("data-playlist-id", relevantLists[i].id);
            }
            //for-end
            //给父元素绑定事件委托
            document
                .querySelector(".relevant>ul")
                .addEventListener("click", function listR(e) {
                    // 兼容性处理
                    let event = e || window.event;
                    let target = event.target || event.srcElement;
                    //判断目标是否匹配元素
                    if (target.className == "relevant-name") {
                        const relevantListId = target.parentNode.getAttribute(
                            "data-playlist-id"
                        );
                        target.addEventListener("click", musicPlayList(relevantListId));
                        document
                            .querySelector(".relevant>ul")
                            .removeEventListener("click", listR);
                    }
                });
        },
    });

    //渲染歌单热门评论(默认10条)
    //先清空之前歌单的评论
    const musicListCommentBefore = document.querySelector(
        ".musicList-comment>ul"
    );
    musicListCommentBefore.innerHTML = "";
    ajax({
        url: "http://127.0.0.1:4000/comment/hot",
        data: {
            id: playListID,
            type: 2, //2为歌单
        },
        success: function (response) {
            const musicListHot = response.hotComments,
                musicListComment = document.querySelector(".musicList-comment>ul");
            for (let i = 0; i < 10; i++) {
                if (musicListHot[i]) {
                    const musicListCommentImg = document.createElement("div"),
                        musicListCommentInfo = document.createElement("div"),
                        img = document.createElement("img"),
                        name = document.createElement("p"),
                        time = document.createElement("a"),
                        content = document.createElement("div"),
                        li = document.createElement("li");
                    musicListCommentImg.className = "musicList-comment-img";
                    musicListCommentInfo.className = "musicList-comment-info";
                    img.src = musicListHot[i].user.avatarUrl;
                    name.innerHTML = musicListHot[i].user.nickname;
                    content.innerHTML = musicListHot[i].content;
                    let date = new Date(musicListHot[i].time);
                    let Y = date.getFullYear() + "-"; // 获取完整的年份(4位,1970)
                    let M = // 获取月份(0-11,0代表1月,用的时候记得加上1)
                        (date.getMonth() + 1 < 10
                            ? "0" + (date.getMonth() + 1)
                            : date.getMonth() + 1) + "-";
                    let D = date.getDate() + " "; // 获取日(1-31)
                    let timer = Y + M + D;
                    time.innerHTML = timer;
                    //将处理完的数据插入HTNML中
                    musicListCommentImg.appendChild(img);
                    li.appendChild(musicListCommentImg);
                    musicListCommentInfo.appendChild(name);
                    musicListCommentInfo.appendChild(time);
                    musicListCommentInfo.appendChild(content);
                    li.appendChild(musicListCommentInfo);
                    musicListComment.appendChild(li);
                } else {
                    break;
                }
            }
        },
    });

    //收藏歌单
    const musicListCollect = document.getElementsByClassName(
        "musicList-collect"
    )[0];
    musicListCollect.addEventListener("click", () => {
        ajax({
            url: "http://127.0.0.1:4000/playlist/subscribe",
            data: {
                t: 1, //1为收藏，2为取消收藏
                id: playListID,
            },
            success: function (response) {
                musicListCollect.style.backgroundColor = "rgb(240, 110, 151)";
                musicListCollect.style.color = "#fff";
                musicListCollect.innerHTML = '<i class="iconfont">&#xe624;收藏</i>';
            },
        });
    });

    //END
};

//END
