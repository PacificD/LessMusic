window.onload = () => {
  const audio = document.querySelector(".audio"),
    navUnderline = document.querySelectorAll(".nav-underline"),
    musicSound = document.querySelector(".music-sound>div"),
    musicSoundProgress = document.querySelector(".music-sound>div>div"),
    musicSoundBtn = document.querySelector(".music-sound-btn"),
    musicSoundIcon = document.querySelector(".music-sound-icon"),
    lyricContent = document.querySelector(".lyric-content");
  audio.volume = 0.2; //默认音量为20%
  audio.loop = "loop"; //单曲循环
  //音乐列表播放模式: 1.列表循环 2.单曲循环 3.随机播放
  const musicMode = document.querySelector(".music-nav>p");
  //存储音乐播放模式,默认为1
  musicMode.setAttribute("data-music-mode", 1);
  //为音乐播放模式按钮绑定点击事件
  const musicModeBtn = musicMode.querySelector(".iconfont");
  const musicModeContent = musicMode.querySelector(".music-mode-content");
  musicModeBtn.addEventListener("click", () => {
    let mode = Number(musicMode.getAttribute("data-music-mode"));
    switch (mode) {
      case 1:
        //改变为单曲循环
        musicMode.setAttribute("data-music-mode", 2);
        musicModeContent.innerHTML = "单曲循环&ensp;";
        musicModeBtn.innerHTML = "&#xe620;";
        mode = 2;
        break;
      case 2:
        //改变为随机播放
        musicMode.setAttribute("data-music-mode", 3);
        musicModeContent.innerHTML = "随机播放&ensp;";
        musicModeBtn.innerHTML = "&#xe622;";
        mode = 3;
        break;
      case 3:
        //改变为列表循环
        musicMode.setAttribute("data-music-mode", 1);
        musicModeContent.innerHTML = "列表循环&ensp;";
        musicModeBtn.innerHTML = "&#xe6a1;";
        mode = 1;
        break;
      default:
        break;
    }
  });
  //为调节音量按钮绑定事件
  musicSoundBtn.addEventListener("mousedown", function (e) {
    //当鼠标事件发生时，计算出音量条距离文档的左侧距离
    //鼠标按下时候的坐标 - 按钮的距离父元素的距离，其值误差为5(按钮大小)
    let musicSoundX = e.clientX - musicSoundBtn.offsetLeft;
    let btnLeft = 0;
    document.onmousemove = function (e) {
      //当拖动按钮时，计算出当前按钮距离父元素的位置
      musicSoundIcon.innerHTML = "&#xe610;";
      btnLeft = e.clientX - musicSoundX;
      if (btnLeft <= 0) {
        btnLeft = 0;
        musicSoundIcon.innerHTML = "&#xeb5e;";
      } else if (btnLeft > musicSound.offsetWidth - musicSoundBtn.offsetWidth) {
        //如果按钮位置超出音乐模块
        btnLeft = musicSound.offsetWidth - musicSoundBtn.offsetWidth;
        musicSoundIcon.innerHTML = "&#xe610;";
      }
      //设置音量进度条及按钮位置
      musicSoundProgress.style.width = (btnLeft / 150) * 100 + "%";
      musicSoundBtn.style.left = (btnLeft / 150) * 100 + "%";
      //设置音量
      audio.volume = btnLeft / 150;
      //防止选择内容--当拖动鼠标过快时候，弹起鼠标，musicSoundBtn也会移动，修复bug
      window.getSelection
        ? window.getSelection().removeAllRanges()
        : document.selection.empty();
    };
  });
  // document.onmouseup = function () {
  //   document.onmousemove = null;
  // };
  //为音量icon绑定事件，静音或者20%默认
  musicSoundIcon.addEventListener("click", () => {
    if (audio.volume != 0) {
      audio.volume = 0;
      musicSoundProgress.style.width = 0;
      musicSoundBtn.style.left = 0;
      musicSoundIcon.innerHTML = "&#xeb5e;";
    } else {
      audio.volume = 0.2;
      musicSoundProgress.style.width = "20%";
      musicSoundBtn.style.left = "20%";
      musicSoundIcon.innerHTML = "&#xe610;";
    }
  });
  //默认播放歌曲You & I(id:29751764)
  const YouAndI = {
    alName: "You & I",
    alPicUrl:
      "https://p2.music.126.net/z4bUsV6FCxT5XPqWF-Plbg==/3238061745042721.jpg",
    ar: ["Tobu", "Brenton Mattheus"],
    dt: 187559,
    id: 29751764,
    mv: 5327484,
    name: "You & I",
  };
  musicPlayFunction(29751764, YouAndI);
  musicAddFunction(29751764, YouAndI);
  audio.pause();
  //为播放/暂停按钮绑定事件
  let flagPlay = 1; //存储播放状态，0为暂停
  const musicLogo = document.querySelector(".music-CD-logo");
  const playBtn = document.getElementById("music-play");
  playBtn.innerHTML = "&#xe638;";
  playBtn.addEventListener("click", function () {
    if (flagPlay == 1) {
      this.innerHTML = "&#xe66e;";
      audio.pause();
      musicLogo.className = "music-CD-logo";
      flagPlay = 0;
    } else {
      this.innerHTML = "&#xe638;";
      audio.play();
      musicLogo.className = "music-CD-logo rotate";
      flagPlay = 1;
    }
  });
  //为音乐播放进度按钮绑定事件
  const musicProgressLength = document.querySelector(".music-progress"),
    musicProgress = document.querySelector(".music-progress p"),
    musicProgressBtn = document.querySelector(".music-progress-btn");
  //定义变量存储按钮拖动后的坐标
  let btnLeft = 0;
  let btnDown = 0;
  // let btnLeft = 0;
  musicProgressBtn.addEventListener("mousedown", function (e) {
    let musicProgressX = e.clientX - musicProgressBtn.offsetLeft;
    btnDown = 1;
    // let btnLeft = 0;
    document.onmousemove = function (e) {
      //当拖动按钮时，计算出当前按钮距离父元素的位置
      btnLeft = e.clientX - musicProgressX;
      if (btnLeft <= 0) {
        btnLeft = 0;
      } else if (
        btnLeft >=
        musicProgressLength.offsetWidth - musicProgressBtn.offsetWidth
      ) {
        //如果按钮位置超出音乐模块
        btnLeft =
          musicProgressLength.offsetWidth - musicProgressBtn.offsetWidth;
      }
      //设置音量进度条及按钮位置
      musicProgress.style.width =
        (btnLeft / document.documentElement.clientWidth) * 100 + "%";
      musicProgressBtn.style.left =
        (btnLeft / document.documentElement.clientWidth) * 100 + "%";
      // //设置进度
      // const songLength = document
      //   .querySelector(".music-time div")
      //   .getAttribute("data-music-length");
      // audio.currentTime =
      //   (btnLeft / document.documentElement.clientWidth) * songLength;
      // //改变歌词
      // lyricContent.style.top =
      //   -(btnLeft / document.documentElement.clientWidth) *
      //     document.querySelectorAll(".lyric-content p").length *
      //     32 +
      //   "px";
      //防止选择内容--当拖动鼠标过快时候，弹起鼠标，musicProgressBtn也会移动，修复bug
      window.getSelection
        ? window.getSelection().removeAllRanges()
        : document.selection.empty();
    };
  });
  document.onmouseup = function () {
    document.onmousemove = null;
    if (btnDown == 1) {
      //设置进度
      const songLength = document
        .querySelector(".music-time div")
        .getAttribute("data-music-length");
      audio.currentTime =
        (btnLeft / document.documentElement.clientWidth) * songLength;
      //改变歌词
      lyricContent.style.top =
        -(btnLeft / document.documentElement.clientWidth) *
          document.querySelectorAll(".lyric-content p").length *
          32 +
        "px";
      btnDown = 0;
    }
  };
  //为上一首/下一首播放按钮绑定事件
  const musicPrev = document.getElementById("music-prev");
  const musicNext = document.getElementById("music-next");
  //上一首
  function musicPrevFunction() {
    const listMusic = document.querySelectorAll(".music-list ul li");
    const musicPlaying = document.querySelector(".music-list-play");
    for (let i = 0; i < listMusic.length; i++) {
      if (
        listMusic[i].getAttribute("data-music-id") ==
        musicPlaying.getAttribute("data-music-id")
      ) {
        //如果当前播放为第一首
        if (i == 0) {
          musicPlaying.className = "";
          listMusic[listMusic.length - 1].className = "music-list-play";
          musicPlayFunction(
            JSON.parse(
              listMusic[listMusic.length - 1]
                .querySelector(".music-delete")
                .getAttribute("data-music-id")
            ),
            JSON.parse(
              listMusic[listMusic.length - 1]
                .querySelector(".music-delete")
                .getAttribute("data-music-songinfo")
            )
          );
        } else {
          //清除当前播放歌曲的样式
          musicPlaying.className = "";
          listMusic[i - 1].className = "music-list-play";
          musicPlayFunction(
            JSON.parse(
              listMusic[i - 1]
                .querySelector(".music-delete")
                .getAttribute("data-music-id")
            ),
            JSON.parse(
              listMusic[i - 1]
                .querySelector(".music-delete")
                .getAttribute("data-music-songinfo")
            )
          );
        }
      }
    }
  }
  musicPrev.addEventListener(
    "click",
    debounce(musicPrevFunction, 1000, () => {
      alert("操作频率过快，请1s后重试!");
    })
  );
  //下一首
  function musicNextFunction() {
    const listMusic = document.querySelectorAll(".music-list ul li");
    const musicPlaying = document.querySelector(".music-list-play");
    const musicMode = Number(
      document.querySelector(".music-nav>p").getAttribute("data-music-mode")
    );
    //先判断是列表循环还是随机播放
    switch (musicMode) {
      case 1:
      case 2: //列表循环
        if (musicMode == 1) {
          const musicList = document.querySelector(".music-list ul");
          //将当前播放结束的歌曲放在列表末尾，避免列表中1，2首歌曲重复播放
          musicList.insertBefore(listMusic[0], listMusic[listMusic.length]);
          listMusic[0].getElementsByTagName("a")[0].innerHTML =
            listMusic.length + ".";
          for (let i = 1; i < listMusic.length; i++) {
            listMusic[i].getElementsByTagName("a")[0].innerHTML = i + ".";
          }
        }
        //
        for (let i = 0; i < listMusic.length; i++) {
          if (
            listMusic[i].getAttribute("data-music-id") ==
            musicPlaying.getAttribute("data-music-id")
          ) {
            //如果当前播放为最后首
            if (i == listMusic.length - 1) {
              musicPlaying.className = "";
              listMusic[0].className = "music-list-play";
              musicPlayFunction(
                JSON.parse(
                  listMusic[0]
                    .querySelector(".music-delete")
                    .getAttribute("data-music-id")
                ),
                JSON.parse(
                  listMusic[0]
                    .querySelector(".music-delete")
                    .getAttribute("data-music-songinfo")
                )
              );
            } else {
              //清除当前播放歌曲的样式
              musicPlaying.className = "";
              listMusic[i + 1].className = "music-list-play";
              musicPlayFunction(
                JSON.parse(
                  listMusic[i + 1]
                    .querySelector(".music-delete")
                    .getAttribute("data-music-id")
                ),
                JSON.parse(
                  listMusic[i + 1]
                    .querySelector(".music-delete")
                    .getAttribute("data-music-songinfo")
                )
              );
            }
          }
        }
        break;
      case 3: //随机播放
        const random = Math.floor(Math.random() * listMusic.length);
        musicPlayFunction(
          JSON.parse(
            listMusic[random]
              .querySelector(".music-delete")
              .getAttribute("data-music-id")
          ),
          JSON.parse(
            listMusic[random]
              .querySelector(".music-delete")
              .getAttribute("data-music-songinfo")
          )
        );
        break;
    }
  }
  musicNext.addEventListener(
    "click",
    debounce(musicNextFunction, 1000, () => {
      alert("操作频率过快，请1s后重试!");
    })
  );
  //根据音乐播放模式播放下一首
  function musicModeFunction() {
    const musicModeP = document.querySelector(".music-nav>p");
    //实时监听音乐播放进度
    //判断歌曲是否播放结束;
    if (parseInt(audio.currentTime) == parseInt(audio.duration)) {
      //将获取的自定义data属性(为字符串格式)，转化为数字格式
      let musicMode = Number(musicModeP.getAttribute("data-music-mode"));
      const lists = document.querySelectorAll(".music-list>ul>li"),
        musicPlaying = document.querySelector(".music-list-play"),
        musicList = document.querySelector(".music-list>ul");
      switch (musicMode) {
        case 1: //列表循环
          musicNext.click();
          break;
        case 2: //单曲循环
          for (let i = 0; i < lists.length; i++) {
            //找到当前播放的歌曲
            if (
              lists[i].getAttribute("data-music-id") ==
              musicPlaying.getAttribute("data-music-id")
            ) {
              //播放下一首
              musicPlayFunction(
                JSON.parse(
                  lists[i]
                    .querySelector(".music-delete")
                    .getAttribute("data-music-id")
                ),
                JSON.parse(
                  lists[i]
                    .querySelector(".music-delete")
                    .getAttribute("data-music-songinfo")
                )
              );
            }
          }
          break;
        case 3: //随机播放
          musicNext.click();
          break;
        default:
          break;
      }
    }
  }
  audio.addEventListener("timeupdate", throttle(musicModeFunction, 599));
  //为音乐播放列表的删除全部按钮绑定事件
  const listDelete = document.querySelector(".music-list>div>i");
  listDelete.addEventListener("click", function () {
    document.querySelector(".music-list ul").innerHTML = "";
  });

  //
  //切换搜索筛选功能
  const searchTitle = document.querySelector(".search-title"),
    searchSongsPage = document.querySelector(".search-songs-page"),
    searchSingersPage = document.querySelector(".search-singers-page"),
    searchMVpage = document.querySelector(".search-MV-page"),
    searchListsPage = document.querySelector(".search-lists-page"),
    underSpans = document.querySelectorAll("#under-span");
  //为列表绑定切换功能: 单曲--歌手--MV--歌单
  searchTitle.addEventListener("click", function (e) {
    // 兼容性处理
    let event = e || window.event;
    let target = event.target || event.srcElement;
    switch (target.id) {
      case "search-songs":
        searchSongsPage.style.display = "block";
        searchSingersPage.style.display = "none";
        searchMVpage.style.display = "none";
        searchListsPage.style.display = "none";
        for (let i = 0; i < 4; i++) {
          underSpans[i].style.display = "none";
        }
        underSpans[0].style.display = "block";
        break;
      case "search-singer":
        const singersUl = document.querySelector(".search-singers-page>ul");
        //先清空之前渲染的歌手
        singersUl.innerHTML = "";
        document.querySelector(".search-singers-page .spinner").style.display =
          "block";
        //发送ajax请求渲染搜索歌手
        ajax({
          url: "http://127.0.0.1:3000/cloudsearch",
          data: {
            type: 100, //100为歌手
            keywords: document.querySelector(".search-bar-txt").value,
          },
          success: function (response) {
            if (!response.result.artists) {
              document.querySelector(
                ".search-singers-page .spinner"
              ).style.display = "none";
              return;
            }
            const singersFrag = document.createDocumentFragment();
            for (let i = 0; i < 30 && response.result.artists[i]; i++) {
              const li = document.createElement("li"),
                img = document.createElement("img"),
                p = document.createElement("p");
              img.src = response.result.artists[i].img1v1Url;
              p.innerHTML = response.result.artists[i].name;
              img.className = "search-singers-img";
              p.className = "search-singers-name";
              li.appendChild(img);
              li.appendChild(p);
              li.setAttribute("data-singer-id", response.result.artists[i].id);
              singersFrag.appendChild(li);
              //全部渲染完成
              if (i == response.result.artists.length - 1) {
                document.querySelector(
                  ".search-singers-page .spinner"
                ).style.display = "none";
                const end = document.createElement("li");
                end.className = "end";
                singersFrag.appendChild(end);
                singersUl.appendChild(singersFrag);
              }
            }
            //为搜索歌手列表父元素绑定事件委托
            singersUl.addEventListener("click", function singerIn(e) {
              // 兼容性处理
              let event = e || window.event;
              let target = event.target || event.srcElement;
              if (
                target.className == "search-singers-img" ||
                target.className == "search-singers-name"
              ) {
                const singerId = target.parentNode.getAttribute(
                  "data-singer-id"
                );
                singersUl.removeEventListener("click", singerIn);
                target.addEventListener("click", singerFunction(singerId));
              }
            });
          },
        });
        //切换页面
        searchSongsPage.style.display = "none";
        searchSingersPage.style.display = "block";
        searchMVpage.style.display = "none";
        searchListsPage.style.display = "none";
        for (let i = 0; i < 4; i++) {
          underSpans[i].style.display = "none";
        }
        underSpans[1].style.display = "block";
        break;
      case "search-MV":
        const MVUl = document.querySelector(".search-MV-page>ul");
        //先清空之前渲染的MV
        MVUl.innerHTML = "";
        document.querySelector(".search-MV-page .spinner").style.display =
          "block";
        //发送ajax请求渲染搜索MV
        ajax({
          url: "http://127.0.0.1:3000/cloudsearch",
          data: {
            type: 1004,
            limit: 20,
            keywords: document.querySelector(".search-bar-txt").value,
          },
          success: function (response) {
            const MVFrag = document.createDocumentFragment();
            if (!response.result.mvs) {
              document.querySelector(".search-MV-page .spinner").style.display =
                "none";
              return;
            }
            for (let i = 0; i < 20 && response.result.mvs[i]; i++) {
              const li = document.createElement("li"),
                div = document.createElement("div"),
                img = document.createElement("img"),
                span = document.createElement("span"),
                icon = document.createElement("i"),
                p_ = document.createElement("p"),
                a = document.createElement("a"),
                p = document.createElement("p");
              icon.className = "iconfont";
              icon.innerHTML = "&#xe664;";
              img.src = response.result.mvs[i].cover;
              p_.innerHTML = "播放: " + response.result.mvs[i].playCount + "次";
              let MVLength = parseInt(response.result.mvs[i].duration / 1000);
              let MVMin = parseInt(MVLength / 60);
              let MVSecond = MVLength % 60;
              if (MVSecond < 10) {
                MVSecond = "0" + MVSecond;
              }
              a.innerHTML = MVMin + " :  " + MVSecond;
              div.appendChild(img);
              div.appendChild(span);
              div.appendChild(icon);
              div.appendChild(p_);
              div.appendChild(a);
              p.innerHTML = response.result.mvs[i].name;
              li.appendChild(div);
              li.appendChild(p);
              li.setAttribute("data-MV-id", response.result.mvs[i].id);
              MVFrag.appendChild(li);
              //全部渲染完成
              if (i == response.result.mvs.length - 1) {
                document.querySelector(
                  ".search-MV-page .spinner"
                ).style.display = "none";
                const end = document.createElement("li");
                end.className = "end";
                MVFrag.appendChild(end);
                MVUl.appendChild(MVFrag);
              }
            }
          },
        });
        //切换页面
        searchSongsPage.style.display = "none";
        searchSingersPage.style.display = "none";
        searchMVpage.style.display = "block";
        searchListsPage.style.display = "none";
        for (let i = 0; i < 4; i++) {
          underSpans[i].style.display = "none";
        }
        underSpans[2].style.display = "block";
        break;
      case "search-lists":
        const ListsUl = document.querySelector(".search-lists-page>ul");
        //先清空之前渲染的MV
        ListsUl.innerHTML = "";
        document.querySelector(".search-lists-page .spinner").style.display =
          "block";
        //发送ajax请求渲染搜索MV
        ajax({
          url: "http://127.0.0.1:3000/search",
          data: {
            type: 1000, //1000为歌单
            limit: 24,
            keywords: document.querySelector(".search-bar-txt").value,
          },
          success: function (response) {
            if (!response.result.playlists) {
              document.querySelector(
                ".search-lists-page .spinner"
              ).style.display = "none";
              return;
            }
            const ListsFrag = document.createDocumentFragment();
            for (let i = 0; i < 30 && response.result.playlists[i]; i++) {
              const li = document.createElement("li"),
                img = document.createElement("img"),
                p = document.createElement("p"),
                span = document.createElement("span");
              img.className = "lists-img";
              p.className = "lists-name";
              img.src = response.result.playlists[i].coverImgUrl;
              p.innerHTML = response.result.playlists[i].name;
              span.innerHTML =
                '<i class="iconfont">&#xe664; </i>&ensp;' +
                response.result.playlists[i].playCount;
              li.setAttribute(
                "data-playlist-id",
                response.result.playlists[i].id
              );
              li.appendChild(img);
              li.appendChild(p);
              li.appendChild(span);
              ListsFrag.appendChild(li);
              //全部渲染完成
              if (i == response.result.playlists.length - 1) {
                document.querySelector(
                  ".search-lists-page .spinner"
                ).style.display = "none";
                const end = document.createElement("li");
                end.className = "end";
                ListsFrag.appendChild(end);
                ListsUl.appendChild(ListsFrag);
              }
            }
            //为搜索歌单父元素绑定事件委托
            ListsUl.addEventListener("click", function listsIn(e) {
              // 兼容性处理
              let event = e || window.event;
              let target = event.target || event.srcElement;
              if (
                target.className == "lists-img" ||
                target.className == "lists-name"
              ) {
                const playListID = target.parentNode.getAttribute(
                  "data-playlist-id"
                );
                ListsUl.removeEventListener("click", listsIn);
                target.addEventListener("click", musicPlayList(playListID));
              }
            });
          },
        });
        //切换页面
        searchSongsPage.style.display = "none";
        searchSingersPage.style.display = "none";
        searchMVpage.style.display = "none";
        searchListsPage.style.display = "block";
        for (let i = 0; i < 4; i++) {
          underSpans[i].style.display = "none";
        }
        underSpans[3].style.display = "block";
        break;
      default:
        break;
    }
  });

  //为搜索页面搜索框绑定事件
  const searchBarTxt = document.querySelector(".search-bar-txt"),
    searchBarBtn = document.querySelector(".search-bar-btn");
  searchBarTxt.addEventListener("focus", () => {
    searchBarTxt.placeholder = "";
  });
  searchBarTxt.addEventListener("blur", () => {
    searchBarTxt.placeholder = "请输入关键词(歌名/歌手/MV/歌单)";
  });
  searchBarBtn.addEventListener("click", () => {
    if (searchBarTxt.value) {
      searchFunction(searchBarTxt.value);
    } else {
      alert("搜索关键词为空!");
    }
  });

  //获取热门搜索关键词，绑定点击事件
  const hotSearch = document.querySelector(".hot-search");
  ajax({
    url: "http://127.0.0.1:3000/search/hot",
    success: function (response) {
      const hotSearchFrag = document.createDocumentFragment();
      for (let i = 0; i < 8 && response.result.hots[i]; i++) {
        const p = document.createElement("p");
        p.innerHTML = response.result.hots[i].first;
        p.setAttribute("data-hotSearch", response.result.hots[i].first);
        p.addEventListener("click", function () {
          searchBarTxt.value = p.getAttribute("data-hotSearch");
        });
        hotSearchFrag.appendChild(p);
      }
      hotSearch.appendChild(hotSearchFrag);
    },
  });

  //返回上一级
  const back = document.querySelector(".back");
  back.addEventListener("click", () => {
    const personalHead = document.querySelector(".personal-head"),
      personal = document.querySelector(".personal"),
      mylikes = document.querySelector(".mylikes"),
      myPlayLists = document.querySelector(".myPlayLists"),
      main = document.querySelector(".main"),
      myCollect = document.querySelector(".myCollect"),
      search = document.querySelector(".search"),
      searchBg = document.querySelector(".search-bg"),
      singerPageContainer = document.querySelector(".singer-page-container"),
      musicListContainer = document.querySelector(".musicList-container");
    let personalMode = Number(personalHead.getAttribute("data-personalMode")),
      mode = main.getAttribute("data-mode");
    switch (mode) {
      case "personal":
        personal.style.display = "none";
        main.style.display = "block";
        main.setAttribute("data-mode", "main");
        for (let i = 0; i < navUnderline.length; i++) {
          navUnderline[i].style.display = "none";
        }
        navUnderline[0].style.display = "block";
        break;
      case "musicList":
        //若上一级是个人主页
        switch (personalMode) {
          case 1:
            musicListContainer.style.display = "none";
            personal.style.display = "block";
            mylikes.style.display = "block";
            main.setAttribute("data-mode", "personal");
            for (let i = 0; i < navUnderline.length; i++) {
              if (i == 1) {
                navUnderline[i].style.display = "block";
              } else {
                navUnderline[i].style.display = "none";
              }
            }
            break;
          case 2:
            musicListContainer.style.display = "none";
            personal.style.display = "block";
            myPlayLists.style.display = "block";
            main.setAttribute("data-mode", "personal");
            for (let i = 0; i < navUnderline.length; i++) {
              if (i == 1) {
                navUnderline[i].style.display = "block";
              } else {
                navUnderline[i].style.display = "none";
              }
            }
            break;
          case 3:
            musicListContainer.style.display = "none";
            personal.style.display = "block";
            myCollect.style.display = "block";
            main.setAttribute("data-mode", "personal");
            for (let i = 0; i < navUnderline.length; i++) {
              if (i == 1) {
                navUnderline[i].style.display = "block";
              } else {
                navUnderline[i].style.display = "none";
              }
            }
            break;
          case 0: //上一级不是个人主页
            //可能未登录，返回主页
            musicListContainer.style.display = "none";
            main.style.display = "block";
            for (let i = 0; i < navUnderline.length; i++) {
              navUnderline[i].style.display = "nonee";
            }
            navUnderline[0].style.display = "block";
            break;
          default:
            break;
        }
        break;
      case "singer":
        //若上一级是个人主页
        switch (personalMode) {
          case 1:
            singerPageContainer.style.display = "none";
            personal.style.display = "block";
            mylikes.style.display = "block";
            main.setAttribute("data-mode", "personal");
            for (let i = 0; i < navUnderline.length; i++) {
              if (i == 1) {
                navUnderline[i].style.display = "block";
              } else {
                navUnderline[i].style.display = "none";
              }
            }
            break;
          case 2:
            singerPageContainer.style.display = "none";
            personal.style.display = "block";
            myPlayLists.style.display = "block";
            main.setAttribute("data-mode", "personal");
            for (let i = 0; i < navUnderline.length; i++) {
              if (i == 1) {
                navUnderline[i].style.display = "block";
              } else {
                navUnderline[i].style.display = "none";
              }
            }
            break;
          case 3:
            singerPageContainer.style.display = "none";
            personal.style.display = "block";
            myCollect.style.display = "block";
            main.setAttribute("data-mode", "personal");
            for (let i = 0; i < navUnderline.length; i++) {
              if (i == 1) {
                navUnderline[i].style.display = "block";
              } else {
                navUnderline[i].style.display = "none";
              }
            }
            break;
          case 0: //上一级不是个人主页
            //可能未登录，返回主页
            singerPageContainer.style.display = "none";
            main.style.display = "block";
            for (let i = 0; i < navUnderline.length; i++) {
              navUnderline[i].style.display = "none";
            }
            navUnderline[0].style.display = "block";
            break;
          default:
            break;
        }
        break;
      case "search":
        //若上一级是个人主页
        switch (personalMode) {
          case 1:
            search.style.display = "none";
            searchBg.style.display = "none";
            personal.style.display = "block";
            mylikes.style.display = "block";
            main.setAttribute("data-mode", "personal");
            for (let i = 0; i < navUnderline.length; i++) {
              if (i == 1) {
                navUnderline[i].style.display = "block";
              } else {
                navUnderline[i].style.display = "none";
              }
            }
            break;
          case 2:
            search.style.display = "none";
            searchBg.style.display = "none";
            personal.style.display = "block";
            myPlayLists.style.display = "block";
            main.setAttribute("data-mode", "personal");
            for (let i = 0; i < navUnderline.length; i++) {
              if (i == 1) {
                navUnderline[i].style.display = "block";
              } else {
                navUnderline[i].style.display = "none";
              }
            }
            break;
          case 3:
            search.style.display = "none";
            searchBg.style.display = "none";
            personal.style.display = "block";
            myCollect.style.display = "block";
            main.setAttribute("data-mode", "personal");
            for (let i = 0; i < navUnderline.length; i++) {
              if (i == 1) {
                navUnderline[i].style.display = "block";
              } else {
                navUnderline[i].style.display = "none";
              }
            }
            break;
          case 0: //上一级不是个人主页
            //可能未登录，返回主页
            search.style.display = "none";
            searchBg.style.display = "none";
            main.style.display = "block";
            for (let i = 0; i < navUnderline.length; i++) {
              if (i == 0) {
                navUnderline[i].style.display = "block";
              } else {
                navUnderline[i].style.display = "none";
              }
            }
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
    //end
  });

  //判断用户是否已经登录(sessionStorage不为空)，若已登录，将sessionStorage中存储的账户密码自动导入
  if (sessionStorage.length > 0) {
    ajax({
      url: "http://127.0.0.1:3000/login/cellphone",
      data: {
        phone: sessionStorage.getItem("username"),
        password: sessionStorage.getItem("password"),
      },
      success: function (response) {
        const user = document.querySelector(".user"),
          personContent = document.querySelector(".personal"),
          username = user.querySelector("p"),
          userPics = user.querySelector(".user-head img"),
          login = document.querySelector(".login"),
          main = document.querySelector(".main");
        //存储登录状态在.login中，1为已经登录
        login.setAttribute("loginState", 1);
        let userID = 0;
        //获取用户ID
        userID = response.account.id;
        //出现用户状态栏(头像，nickname等)
        login.style.display = "none";
        main.style.display = "none";
        user.style.display = "block";
        userPics.src = response.profile.avatarUrl;
        username.innerHTML =
          '<i class="iconfont">&#xe679;</i>&nbsp;&nbsp;&nbsp;' +
          response.profile.nickname;
        for (let i = 0; i < navUnderline.length; i++) {
          if (i == 1) {
            navUnderline[i].style.display = "block";
          } else {
            navUnderline[i].style.display = "none";
          }
        }
        //调用封装好的personal.js函数，渲染用户信息
        person(userID);
        personContent.style.display = "block";
      },
    });
  }

  //end
};
