//固定导航栏nav JS:
window.addEventListener("load", function () {
    //导航栏li悬浮特效
    const main = document.querySelector(".main"),
        personal = document.querySelector(".personal"),
        nav = document.querySelector(".nav"),
        navUnderline = document.querySelectorAll(".nav-underline"),
        search = document.querySelector(".search"),
        searchBg = document.querySelector(".search-bg"),
        singerPageContainer = document.querySelector(".singer-page-container"),
        musicListContainer = document.querySelector(".musicList-container");

    //搜索框聚焦时文字提示消失
    const searchBox = document.querySelector(".search-box"),
        searchContent = document.querySelector(".search-content"),
        searchBtn = document.querySelector(".search-btn"),
        searchTxt = document.querySelector(".search-txt");
    searchTxt.addEventListener("focus", function () {
        this.placeholder = "";
        if (searchTxt.value) {
            searchContent.style.display = "block";
        } else {
            searchContent.style.display = "block";
            //若搜索关键词为空，显示热搜
            ajax({
                url: "http://127.0.0.1:4000/search/hot",
                success: function (response) {
                    //先清空之前的搜索结果
                    searchContent.innerHTML = "";
                    const searchHotFrag = document.createDocumentFragment();
                    const searchHot = document.createElement("div");
                    searchHot.className = "search-hot";
                    searchHot.appendChild(document.createElement("span"));
                    for (let i = 0; i < 6 && response.result.hots[i]; i++) {
                        const p = document.createElement("p");
                        p.innerHTML = i + 1 + ". " + response.result.hots[i].first;
                        searchHot.appendChild(p);
                    }
                    searchHot.appendChild(document.createElement("span"));
                    searchHotFrag.appendChild(searchHot);
                    searchContent.appendChild(searchHotFrag);
                },
            });
        }
    });
    searchTxt.addEventListener("blur", function () {
        this.placeholder = "请输入关键词(歌名/歌手/MV)";
    });
    document.documentElement.addEventListener("click", function () {
        var e = e || window.event;
        var elem = e.target;
        var targetArea = searchContent;
        var targetArea_ = searchBox;
        if (!targetArea.contains(elem) && !targetArea_.contains(elem)) {
            searchContent.style.display = "none";
        }
    });
    //为点击按钮绑定事件
    searchBtn.addEventListener("click", function () {
        if (searchTxt.value) {
            searchContent.style.display = "none";
            searchFunction(searchTxt.value);
        } else {
            alert("搜索关键词为空!");
        }
    });
    //搜索框动态搜索功能
    let searchTimer = null;
    searchTxt.addEventListener("input", () => {
        clearTimeout(searchTimer);
        searchTimer = setTimeout(function () {
            //若填入搜索框中的词不为空，则显示搜索结果
            if (searchTxt.value) {
                ajax({
                    url: "http://127.0.0.1:4000/search",
                    data: {
                        keywords: searchTxt.value,
                        type: 1018,
                    },
                    success: function (response) {
                        //先清空之前的搜索结果
                        searchContent.innerHTML = "";
                        const searchResultFrag = document.createDocumentFragment(),
                            searchResultSongs = document.createElement("div"),
                            searchResultSingers = document.createElement("div"),
                            searchResultLists = document.createElement("div"),
                            div1 = document.createElement("div"),
                            div2 = document.createElement("div"),
                            div3 = document.createElement("div");
                        div1.innerHTML = '歌曲 <i class="iconfont">&#xe667;</i>';
                        div2.innerHTML = '歌手 <i class="iconfont">&#xe679;</i>';
                        div3.innerHTML = '歌单 <i class="iconfont">&#xe879;</i>';
                        searchResultSongs.className = "search-result-songs";
                        searchResultSingers.className = "search-result-singers";
                        searchResultLists.className = "search-result-lists";
                        searchResultSongs.appendChild(document.createElement("span"));
                        searchResultSongs.appendChild(div1);
                        searchResultSingers.appendChild(div2);
                        searchResultLists.appendChild(div3);
                        for (let i = 0; i < 4 && response.result.song.songs[i]; i++) {
                            const p = document.createElement("p");
                            if (response.result.song.songs[i].ar[2]) {
                                //三位歌手
                                p.innerHTML =
                                    response.result.song.songs[i].name +
                                    "---" +
                                    response.result.song.songs[i].ar[0].name +
                                    " / " +
                                    response.result.song.songs[i].ar[1].name +
                                    " / " +
                                    response.result.song.songs[i].ar[2].name;
                            } else {
                                if (response.result.song.songs[i].ar[1]) {
                                    //两位歌手
                                    p.innerHTML =
                                        response.result.song.songs[i].name +
                                        "---" +
                                        response.result.song.songs[i].ar[0].name +
                                        " / " +
                                        response.result.song.songs[i].ar[1].name;
                                } else {
                                    //一位歌手
                                    p.innerHTML =
                                        response.result.song.songs[i].name +
                                        "---" +
                                        response.result.song.songs[i].ar[0].name;
                                }
                            }
                            //判断歌手个数，最多存3
                            let arList0 = []; //数组，存放歌手名
                            for (
                                let j = 0;
                                response.result.song.songs[i].ar.length < 4;
                                j++
                            ) {
                                if (response.result.song.songs[i].ar[j] === undefined) {
                                    break;
                                }
                                arList0[j] = response.result.song.songs[i].ar[j].name;
                            }
                            //将歌曲信息存入对象songInfo中
                            const songInfo = {
                                id: response.result.song.songs[i].id,
                                name: response.result.song.songs[i].name,
                                alName: response.result.song.songs[i].al.name,
                                alPicUrl: response.result.song.songs[i].al.picUrl,
                                ar: arList0,
                                mv: response.result.song.songs[i].mv,
                                dt: response.result.song.songs[i].dt,
                            };
                            p.setAttribute("data-music-id", response.result.song.songs[i].id);
                            p.addEventListener("click", () => {
                                searchContent.style.display = "none";
                                musicPlayFunction(songInfo.id, songInfo);
                            });
                            searchResultSongs.appendChild(p);
                        }
                        for (let i = 0; i < 2 && response.result.artist.artists[i]; i++) {
                            const p = document.createElement("p");
                            p.innerHTML = response.result.artist.artists[i].name;
                            p.setAttribute(
                                "data-singer-id",
                                response.result.artist.artists[i].id
                            );
                            p.addEventListener("click", () => {
                                searchContent.style.display = "none";
                                singerFunction(response.result.artist.artists[i].id);
                            });
                            searchResultSingers.appendChild(p);
                        }
                        for (
                            let i = 0;
                            i < 2 && response.result.playList.playLists[i];
                            i++
                        ) {
                            const p = document.createElement("p");
                            p.innerHTML = response.result.playList.playLists[i].name;
                            p.setAttribute(
                                "data-playlist-id",
                                response.result.playList.playLists[i].id
                            );
                            p.addEventListener("click", () => {
                                searchContent.style.display = "none";
                                musicPlayList(response.result.playList.playLists[i].id);
                            });
                            searchResultLists.appendChild(p);
                        }
                        searchResultLists.appendChild(document.createElement("span"));
                        searchResultFrag.appendChild(searchResultSongs);
                        searchResultFrag.appendChild(searchResultSingers);
                        searchResultFrag.appendChild(searchResultLists);
                        searchContent.appendChild(searchResultFrag);
                    },
                });
                searchContent.style.display = "block";
            } else {
                searchContent.style.display = "block";
            }
        }, 500);
    });

    //登录模块
    const login = document.querySelector(".login p");
    const loginContent = document.querySelector(".login-content");
    const musicNav = document.querySelector(".music-nav");
    login.addEventListener("click", function () {
        loginContent.style.display = "block";
        nav.style.filter = "blur(2px)";
        main.style.filter = "blur(2px)";
        musicNav.style.filter = "blur(2px)";
        search.style.filter = "blur(2px)";
        searchBg.style.filter = "blur(2px)";
        musicListContainer.style.filter = "blur(2px)";
        singerPageContainer.style.filter = "blur(2px)";
    });

    //导航栏绑定点击功能
    nav.addEventListener("click", function (e) {
        // 兼容性处理
        let event = e || window.event;
        let target = event.target || event.srcElement;
        switch (target.className) {
            case "LessMusic-logo":
            case "LessMusic":
            case "to-main":
                personal.style.display = "none";
                search.style.display = "none";
                searchBg.style.display = "none";
                musicListContainer.style.display = "none";
                singerPageContainer.style.display = "none";
                main.style.display = "block";
                main.setAttribute("data-mode", "main");
                for (let i = 0; i < navUnderline.length; i++) {
                    if (i == 0) {
                        navUnderline[i].style.display = "block";
                    } else {
                        navUnderline[i].style.display = "none";
                    }
                }
                break;
            case "user-head-img":
            case "user-name":
                personal.style.display = "block";
                search.style.display = "none";
                searchBg.style.display = "none";
                musicListContainer.style.display = "none";
                singerPageContainer.style.display = "none";
                main.style.display = "none";
                main.setAttribute("data-mode", "personal");
                for (let i = 0; i < navUnderline.length; i++) {
                    navUnderline[i].style.display = "none";
                }
                navUnderline[1].style.display = "block";
                break;
            case "to-personal":
                if (sessionStorage.length > 0) {
                    personal.style.display = "block";
                    search.style.display = "none";
                    searchBg.style.display = "none";
                    musicListContainer.style.display = "none";
                    singerPageContainer.style.display = "none";
                    main.style.display = "none";
                    main.setAttribute("data-mode", "personal");
                    for (let i = 0; i < navUnderline.length; i++) {
                        navUnderline[i].style.display = "none";
                    }
                    navUnderline[1].style.display = "block";
                } else {
                    alert("未登录！");
                }
                break;
            case "to-rank":
            case "to-singer-rank":
            case "to-playlist-rank":
            case "to-MV-rank":
                alert("该功能暂未开放！");
                break;
        }
    });
});
