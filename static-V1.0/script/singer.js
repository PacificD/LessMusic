//歌手页面渲染JS

//渲染歌手页面函数
const singerFunction = function (singerId) {
    ajax({
        url: "http://127.0.0.1:4000/artist/detail",
        data: {
            id: singerId,
        },
        success: function (response) {
            const main = document.querySelector(".main"),
                personal = document.querySelector(".personal"),
                search = document.querySelector(".search"),
                searchBg = document.querySelector(".search-bg"),
                musicListContainer = document.querySelector(".musicList-container"),
                singerPageContainer = document.querySelector(".singer-page-container"),
                img = document.querySelector(".singer-page>img"),
                desc = document.querySelector(".singer-page .info>p"),
                name = document.querySelector(".singer-page .info>h1"),
                mvSize = document.querySelector(".mvSize"),
                albumSize = document.querySelector(".albumSize"),
                musicSize = document.querySelector(".musicSize"),
                navUnderline = document.querySelectorAll(".nav-underline"),
                singerInfo = document.querySelector(".singerInfo-more>div"),
                singerPageUl = document.querySelector(".singer-page>ul");
            //先清空之前的内容
            document.querySelector(".singer-page .spinner").style.display = "block";
            singerInfo.innerHTML = "";
            singerPageUl.innerHTML = "";
            for (let i = 0; i < navUnderline.length; i++) {
                navUnderline[i].style.display = "none";
            }
            //关闭歌单,设置歌手页面展示标识
            main.setAttribute("data-mode", "singer");
            //展示歌手页面
            main.style.display = "none";
            personal.style.display = "none";
            musicListContainer.style.display = "none";
            search.style.display = "none";
            searchBg.style.display = "none";
            singerPageContainer.style.display = "block";
            //渲染歌手信息z
            img.src = response.data.artist.cover;
            desc.innerHTML = response.data.artist.briefDesc;
            name.innerHTML = response.data.artist.name;
            mvSize.innerHTML = "MV " + response.data.artist.mvSize;
            albumSize.innerHTML = "专辑 " + response.data.artist.albumSize;
            musicSize.innerHTML = "歌曲 " + response.data.artist.musicSize;
            //获取歌手描述
            ajax({
                url: "http://127.0.0.1:4000/artist/desc",
                data: {
                    id: singerId,
                },
                success: function (response) {
                    if (response.introduction.length == 0) {
                        singerInfo.innerHTML = "暂无歌手更多详情";
                    } else {
                        for (let i = 0; i < response.introduction.length; i++) {
                            singerInfo.innerHTML += response.introduction[i].ti + ":<br>";
                            singerInfo.innerHTML += response.introduction[i].txt + "<br><br>";
                        }
                    }
                },
            });
            //获取歌手热门歌曲
            ajax({
                url: "http://127.0.0.1:4000/artists",
                data: {
                    id: singerId,
                },
                success: function (response) {
                    const hotSongsLength = response.hotSongs.length,
                        frag = document.createDocumentFragment();
                    let index = 1;
                    for (let i = 0; i < hotSongsLength; i++) {
                        const li = document.createElement("li");
                        //判断歌手个数，最多存3
                        let arList0 = []; //数组，存放歌手名
                        for (let j = 0; response.hotSongs[i].ar.length < 4; j++) {
                            if (response.hotSongs[i].ar[j] === undefined) {
                                break;
                            }
                            arList0[j] = response.hotSongs[i].ar[j].name;
                        }
                        //将歌曲信息存入对象songInfo中
                        const songInfo = {
                            id: response.hotSongs[i].id,
                            name: response.hotSongs[i].name,
                            alName: response.hotSongs[i].al.name,
                            alPicUrl: response.hotSongs[i].al.picUrl,
                            ar: arList0,
                            mv: response.hotSongs[i].mv,
                            dt: response.hotSongs[i].dt,
                        };
                        //添加歌曲名元素;
                        const div1 = document.createElement("div");
                        //判断该歌曲是否有MV
                        if (response.hotSongs[i].mv == 0) {
                            div1.innerHTML =
                                "<small>" +
                                index +
                                ".&emsp;" +
                                "</small>" +
                                "<a class='music-name'>" +
                                response.hotSongs[i].name +
                                "</a>" +
                                "<em></em>";
                            const play = document.createElement("i");
                            const add = document.createElement("i");
                            const id = response.hotSongs[i].id;
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
                                response.hotSongs[i].name +
                                "</a>" +
                                '<i class="iconfont">&#xe879;</i>';
                            const add = document.createElement("i");
                            const play = document.createElement("i");
                            const id = response.hotSongs[i].id;
                            play.className = "iconfont play";
                            play.innerHTML = "&#xe664;";
                            add.className = "iconfont add";
                            add.innerHTML = "&#xe60e;";
                            div1.appendChild(add);
                            div1.appendChild(play);
                        }
                        index++;
                        //将音乐ID存入自定义属性data-music-id中
                        div1.setAttribute("data-music-id", response.hotSongs[i].id);
                        //将songInfo存入自定义属性data-music-songInfo中，方便后续获取,减少接口调用
                        div1.setAttribute("data-music-songInfo", JSON.stringify(songInfo));
                        li.appendChild(div1);
                        //添加歌手名元素
                        const div2 = document.createElement("div");
                        let arList = []; //数组，存放歌手名
                        for (let j = 0; j < response.hotSongs[i].ar.length; j++) {
                            arList[j] = response.hotSongs[i].ar[j].name;
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
                                response.hotSongs[i].ar[0].id +
                                ">" +
                                arList[0] +
                                "</a> / " +
                                "<a class='singer' data-singer-id=" +
                                response.hotSongs[i].ar[1].id +
                                ">" +
                                arList[1] +
                                "</a>";
                        } else {
                            if (arList[1] == "") {
                                //一位歌手
                                div2.innerHTML =
                                    "<a class='singer' data-singer-id=" +
                                    response.hotSongs[i].ar[0].id +
                                    ">" +
                                    arList[0] +
                                    "</a>";
                            } else {
                                //三位歌手
                                div2.innerHTML =
                                    "<a class='singer' data-singer-id=" +
                                    response.hotSongs[i].ar[0].id +
                                    ">" +
                                    arList[0] +
                                    "</a> / " +
                                    "<a class='singer' data-singer-id=" +
                                    response.hotSongs[i].ar[1].id +
                                    ">" +
                                    arList[1] +
                                    "</a> / " +
                                    "<a class='singer' data-singer-id=" +
                                    response.hotSongs[i].ar[2].id +
                                    ">" +
                                    arList[2] +
                                    "</a>";
                            }
                        }
                        li.appendChild(div2);
                        //添加专辑名元素
                        const div3 = document.createElement("div");
                        div3.innerHTML = "<a>" + response.hotSongs[i].al.name + "</a>";
                        li.appendChild(div3);
                        //添加歌曲时长元素
                        const div4 = document.createElement("div");
                        let songLength = parseInt(response.hotSongs[i].dt / 1000);
                        let songMin = parseInt(songLength / 60);
                        let songSecond = songLength % 60;
                        if (songSecond < 10) {
                            songSecond = "0" + songSecond;
                        }
                        div4.innerHTML = "<a>" + songMin + " : " + songSecond + "</a>";
                        li.appendChild(div4);
                        li.className = "singerList";
                        //将处理完的li(li)渲染进页面
                        frag.appendChild(li);
                        if (i == hotSongsLength - 1) {
                            document.querySelector(".singer-page .spinner").style.display =
                                "none";
                            singerPageUl.appendChild(frag);
                            singerPageUl.style.display = "block";
                        }
                    }
                    //for-end
                    //为父元素绑定事件委托——子元素音乐播放/添加进播放列表
                    singerPageUl.addEventListener("click", function singerR(e) {
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
                                target.addEventListener(
                                    "click",
                                    musicPlayFunction(id, songInfo)
                                );
                                break;
                            case "iconfont play":
                                target.addEventListener(
                                    "click",
                                    musicPlayFunction(id, songInfo)
                                );
                                break;
                            case "iconfont add":
                                target.addEventListener(
                                    "click",
                                    musicAddFunction(id, songInfo)
                                );
                                break;
                            case "singer":
                                const singerId = target.getAttribute("data-singer-id");
                                target.addEventListener("click", singerFunction(singerId));
                                singerPageUl.removeEventListener("click", signerR);
                                break;
                            default:
                                break;
                        }
                    });
                    //事件委托end

                    //歌单页面中'播放全部'按钮绑定事件
                    const singerPlayAll = document.querySelector(".singer-btn>div");
                    const singerList = document.querySelectorAll(".singer-page>ul>li");
                    function playAll() {
                        for (let i = 0; i < singerList.length; i++) {
                            id = Number(
                                singerList[i]
                                    .getElementsByTagName("div")[0]
                                    .getAttribute("data-music-id")
                            );
                            songInfo = JSON.parse(
                                singerList[i]
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
                    singerPlayAll.addEventListener(
                        "click",
                        debounce(playAll, 2000, () => {
                            alert("操作频率过快，请2s后重试!");
                        })
                    );
                    //end
                },
            });
            //渲相似歌手
            ajax({
                tpye: "get",
                url: "http://127.0.0.1:4000/simi/artist",
                data: {
                    id: singerId,
                },
                success: function (response) {
                    const relevantLists = response.artists,
                        relevantImgs = document.querySelectorAll(
                            ".relevant-singer-img>img"
                        ),
                        relevantNames = document.querySelectorAll(".relevant-singer-name"),
                        relevantMusicSize = document.querySelectorAll(
                            ".relevant-musicSize"
                        ),
                        relevantLis = document.querySelectorAll(".relevant-singer>ul>li");
                    for (let i = 0; i < 5; i++) {
                        relevantImgs[i].src = relevantLists[i].picUrl;
                        relevantNames[i].innerHTML = relevantLists[i].name;
                        relevantMusicSize[i].innerHTML =
                            "歌曲数 " + relevantLists[i].musicSize;
                        relevantLis[i].setAttribute("data-singer-id", relevantLists[i].id);
                    }
                    //for-end
                    //给父元素绑定事件委托
                    document
                        .querySelector(".relevant-singer>ul")
                        .addEventListener("click", function singerR(e) {
                            //兼容性处理
                            let event = e || window.event;
                            let target = event.target || event.srcElement;
                            //判断目标是否匹配元素
                            if (target.className == "relevant-singer-name") {
                                const singerReId = target.parentNode.getAttribute(
                                    "data-singer-id"
                                );
                                document
                                    .querySelector(".relevant-singer>ul")
                                    .removeEventListener("click", singerR);
                                singerFunction(singerReId);
                            }
                        });
                },
            });

            //渲染歌手MV(默认6)
            ajax({
                url: "http://127.0.0.1:4000/artist/mv",
                data: {
                    id: singerId,
                },
                success: function (response) {
                    const singerMVMore = document.querySelector(".singer-MV-more");
                    let singerMV = document.querySelector(".singer-MV>ul");
                    //先清空之前渲染的MV
                    singerMV.innerHTML = "";
                    singerMVMore.style.display = "block";
                    let fragment = document.createDocumentFragment();
                    //循环渲染三个MV
                    for (let i = 0; i < 3 && response.mvs[i]; i++) {
                        const li = document.createElement("li"),
                            singerMVImg = document.createElement("div"),
                            img = document.createElement("img"),
                            span = document.createElement("span"),
                            icon = document.createElement("i"),
                            singerMVName = document.createElement("p"),
                            singerMVCount = document.createElement("div");
                        singerMVImg.className = "singer-MV-img";
                        singerMVName.className = "singer-MV-name";
                        singerMVCount.className = "singer-MV-count";
                        icon.className = "iconfont";
                        icon.innerHTML = "&#xe664;";
                        img.src = response.mvs[i].imgurl;
                        singerMVImg.setAttribute("data-MV-id", response.mvs[i].id);
                        singerMVName.innerHTML = response.mvs[i].name;
                        singerMVCount.innerHTML =
                            "播放: " + response.mvs[i].playCount + "次";
                        singerMVImg.appendChild(img);
                        singerMVImg.appendChild(span);
                        singerMVImg.appendChild(icon);
                        li.appendChild(singerMVImg);
                        li.appendChild(singerMVName);
                        li.appendChild(singerMVCount);
                        fragment.appendChild(li);
                    }
                    singerMV.appendChild(fragment);
                    //为点击'加载更多'按钮绑定事件
                    singerMVMore.addEventListener("click", function MVMore() {
                        singerMVMore.style.display = "none";
                        let fragmentR = document.createDocumentFragment();
                        for (let j = 3; j < 10 && response.mvs[j]; j++) {
                            const li = document.createElement("li"),
                                singerMVImg = document.createElement("div"),
                                img = document.createElement("img"),
                                span = document.createElement("span"),
                                icon = document.createElement("i"),
                                singerMVName = document.createElement("p"),
                                singerMVCount = document.createElement("div");
                            singerMVImg.className = "singer-MV-img";
                            singerMVName.className = "singer-MV-name";
                            singerMVCount.className = "singer-MV-count";
                            icon.className = "iconfont";
                            icon.innerHTML = "&#xe664;";
                            img.src = response.mvs[j].imgurl;
                            singerMVImg.setAttribute("data-MV-id", response.mvs[j].id);
                            singerMVName.innerHTML = response.mvs[j].name;
                            singerMVCount.innerHTML =
                                "播放: " + response.mvs[j].playCount + "次";
                            singerMVImg.appendChild(img);
                            singerMVImg.appendChild(span);
                            singerMVImg.appendChild(icon);
                            li.appendChild(singerMVImg);
                            li.appendChild(singerMVName);
                            li.appendChild(singerMVCount);
                            fragmentR.appendChild(li);
                        }
                        singerMV.appendChild(fragmentR);
                        singerMVMore.removeEventListener("click", MVMore);
                    });
                },
            });
        },
        //success End
    });
};

//歌手页面点击[更多]按钮获取更多详情信息
const singerInfoBtn = document.querySelector(".singerInfo-more>a"),
    singerInfoDiv = document.querySelector(".singerInfo-more>div"),
    singerInfoH1 = document.querySelector(".singerInfo-more>h1"),
    singerInfoH2 = document.querySelector(".singerInfo-more>h2"),
    singerInfoP = document.querySelector(".singerInfo-more>p");
let singerInfoShow = false;
singerInfoBtn.addEventListener("click", () => {
    if (singerInfoShow) {
        //更多信息已展示
        singerInfoDiv.style.display = "none";
        singerInfoH1.style.display = "none";
        singerInfoH2.style.display = "none";
        singerInfoP.style.display = "none";
        singerInfoShow = false;
    } else {
        //更多信息已隐藏
        singerInfoDiv.style.display = "block";
        singerInfoH1.style.display = "block";
        singerInfoH2.style.display = "block";
        singerInfoP.style.display = "block";
        singerInfoShow = true;
    }
});
//end
