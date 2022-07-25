//搜索页面JS

const searchFunction = function (value) {
    const main = document.querySelector(".main"),
        personal = document.querySelector(".personal"),
        musicListContainer = document.querySelector(".musicList-container"),
        singerPageContainer = document.querySelector(".singer-page-container"),
        search = document.querySelector(".search"),
        searchSongsPage = document.querySelector(".search-songs-page"),
        searchSingersPage = document.querySelector(".search-singers-page"),
        searchMVpage = document.querySelector(".search-MV-page"),
        searchListsPage = document.querySelector(".search-lists-page"),
        searchBg = document.querySelector(".search-bg"),
        navUnderline = document.querySelectorAll(".nav-underline"),
        searchBarTxt = document.querySelector(".search-bar-txt"),
        underSpans = document.querySelectorAll("#under-span");
    //关闭歌单,歌手页面，设置搜索页面打开标识
    main.setAttribute("data-mode", "search");
    //切换页面
    main.style.display = "none";
    personal.style.display = "none";
    musicListContainer.style.display = "none";
    singerPageContainer.style.display = "none";
    search.style.display = "block";
    searchBg.style.display = "block";
    searchSongsPage.style.display = "block";
    searchSingersPage.style.display = "none";
    searchMVpage.style.display = "none";
    searchListsPage.style.display = "none";
    for (let i = 0; i < 4; i++) {
        if (i == 0) {
            underSpans[i].style.display = "block";
        } else {
            underSpans[i].style.display = "none";
        }
    }
    for (let i = 0; i < navUnderline.length; i++) {
        navUnderline[i].style.display = "none";
    }
    searchBarTxt.value = value;
    //发送ajax请求，先渲染搜索歌曲
    ajax({
        url: "http://127.0.0.1:4000/cloudsearch",
        data: {
            type: 1, //单曲
            keywords: value,
        },
        success: function (response) {
            const songsUl = document.querySelector(".search-songs-page>ul"),
                songsFrag = document.createDocumentFragment();
            //先清空之前渲染的歌曲
            songsUl.innerHTML = "";
            document.querySelector(".search-songs-page .spinner").style.display =
                "block";
            underSpans[0].style.display = "block";
            let index = 1;
            for (let i = 0; i < 30 && response.result.songs[i]; i++) {
                const li = document.createElement("li");
                //判断歌手个数，最多存3
                let arList0 = []; //数组，存放歌手名
                for (let j = 0; response.result.songs[i].ar.length < 4; j++) {
                    if (response.result.songs[i].ar[j] === undefined) {
                        break;
                    }
                    arList0[j] = response.result.songs[i].ar[j].name;
                }
                //将歌曲信息存入对象songInfo中
                const songInfo = {
                    id: response.result.songs[i].id,
                    name: response.result.songs[i].name,
                    alName: response.result.songs[i].al.name,
                    alPicUrl: response.result.songs[i].al.picUrl,
                    ar: arList0,
                    mv: response.result.songs[i].mv,
                    dt: response.result.songs[i].dt,
                };
                //添加歌曲名元素;
                const div1 = document.createElement("div");
                //判断该歌曲是否有MV
                if (response.result.songs[i].mv == 0) {
                    div1.innerHTML =
                        "<small>" +
                        index +
                        ".&emsp;" +
                        "</small>" +
                        "<a class='music-name'>" +
                        response.result.songs[i].name +
                        "</a>" +
                        "<em></em>";
                    const play = document.createElement("i");
                    const add = document.createElement("i");
                    const id = response.result.songs[i].id;
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
                        response.result.songs[i].name +
                        "</a>" +
                        '<i class="iconfont">&#xe879;</i>';
                    const add = document.createElement("i");
                    const play = document.createElement("i");
                    const id = response.result.songs[i].id;
                    play.className = "iconfont play";
                    play.innerHTML = "&#xe664;";
                    add.className = "iconfont add";
                    add.innerHTML = "&#xe60e;";
                    div1.appendChild(add);
                    div1.appendChild(play);
                }
                index++;
                //将音乐ID存入自定义属性data-music-id中
                div1.setAttribute("data-music-id", response.result.songs[i].id);
                //将songInfo存入自定义属性data-music-songInfo中，方便后续获取,减少接口调用
                div1.setAttribute("data-music-songInfo", JSON.stringify(songInfo));
                li.appendChild(div1);
                //添加歌手名元素
                const div2 = document.createElement("div");
                let arList = []; //数组，存放歌手名
                for (let j = 0; j < response.result.songs[i].ar.length; j++) {
                    arList[j] = response.result.songs[i].ar[j].name;
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
                        response.result.songs[i].ar[0].id +
                        ">" +
                        arList[0] +
                        "</a> / " +
                        "<a class='singer' data-singer-id=" +
                        response.result.songs[i].ar[1].id +
                        ">" +
                        arList[1] +
                        "</a>";
                } else {
                    if (arList[1] == "") {
                        //一位歌手
                        div2.innerHTML =
                            "<a class='singer' data-singer-id=" +
                            response.result.songs[i].ar[0].id +
                            ">" +
                            arList[0] +
                            "</a>";
                    } else {
                        //三位歌手
                        div2.innerHTML =
                            "<a class='singer' data-singer-id=" +
                            response.result.songs[i].ar[0].id +
                            ">" +
                            arList[0] +
                            "</a> / " +
                            "<a class='singer' data-singer-id=" +
                            response.result.songs[i].ar[1].id +
                            ">" +
                            arList[1] +
                            "</a> / " +
                            "<a class='singer' data-singer-id=" +
                            response.result.songs[i].ar[2].id +
                            ">" +
                            arList[2] +
                            "</a>";
                    }
                }
                li.appendChild(div2);
                //添加专辑名元素
                const div3 = document.createElement("div");
                div3.innerHTML = "<a>" + response.result.songs[i].al.name + "</a>";
                li.appendChild(div3);
                //添加歌曲时长元素
                const div4 = document.createElement("div");
                let songLength = parseInt(response.result.songs[i].dt / 1000);
                let songMin = parseInt(songLength / 60);
                let songSecond = songLength % 60;
                if (songSecond < 10) {
                    songSecond = "0" + songSecond;
                }
                div4.innerHTML = "<a>" + songMin + " : " + songSecond + "</a>";
                li.appendChild(div4);
                li.className = "singerList";
                //将处理完的li(li)渲染进页面
                songsFrag.appendChild(li);
                if (i == response.result.songs.length - 1) {
                    document.querySelector(".search-songs-page .spinner").style.display =
                        "none";
                    songsFrag.appendChild(document.createElement("span"));
                    songsFrag.appendChild(document.createElement("span"));
                    songsUl.appendChild(songsFrag);
                    songsUl.style.display = "block";
                }
            }
            //for-end
        },
    });
    //songs-ajax End
    //为父元素绑定事件委托——子元素音乐播放/添加进播放列表
    document
        .querySelector(".search-songs-page>ul")
        .addEventListener("click", function sf(e) {
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
                        .querySelector(".search-songs-page>ul")
                        .removeEventListener("click", sf);
                    target.addEventListener("click", singerFunction(singerId));
                    break;
                default:
                    break;
            }
        });
    //音乐列表渲染完毕后，为音乐播放全部按钮绑定事件
    const searchSongsBtn = document.querySelector(".search-songs-btn");
    function searchSongsPlayAll() {
        const songs = document.querySelectorAll(".search-songs-page>ul>li");
        for (let i = 0; i < songs.length; i++) {
            musicAddFunction(
                songs[i].getElementsByTagName("div")[0].getAttribute("data-music-id"),
                JSON.parse(
                    songs[i]
                        .getElementsByTagName("div")[0]
                        .getAttribute("data-music-songInfo")
                )
            );
        }
        musicPlayFunction(
            songs[0].getElementsByTagName("div")[0].getAttribute("data-music-id"),
            JSON.parse(
                songs[0]
                    .getElementsByTagName("div")[0]
                    .getAttribute("data-music-songInfo")
            )
        );
    }
    searchSongsBtn.addEventListener(
        "click",
        debounce(searchSongsPlayAll, 3000, () => {
            alert("操作频率过快，稍后3秒后重试!");
        })
    );
    //end
};
