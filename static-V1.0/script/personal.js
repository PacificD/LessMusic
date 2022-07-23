//个人主页personal-JS
const person = function (userID) {
  //变量声明区
  const serverUrl = "http://127.0.0.1:3000",
    main = document.querySelector(".main"),
    personal = document.querySelector(".personal-head"),
    personalName = personal.querySelector(".personal-name"),
    personalSign = personal.querySelector(".signature"),
    personalHead = personal.querySelector("img"),
    personalFollow = personal.querySelector(".personal-follow span"),
    personalFollowed = personal.querySelector(".personal-follow p"),
    mylikes = document.querySelector(".mylikes ul"),
    personalSwitch = document.querySelectorAll(".personal>ul>li"),
    myPlayLists = document.querySelector(".myPlayLists"),
    myCollect = document.querySelector(".myCollect");
  let personalLevel = 0; //存储用户等级信息
  personal.setAttribute("data-personalMode", 1); //存储当前模块状态，1为我喜欢，0为全部隐藏
  main.setAttribute("data-mode", "personal");
  //切换模块:我喜欢-我创建的歌单-我收藏的歌单
  //切换至我喜欢
  personalSwitch[0].addEventListener("click", () => {
    personalSwitch[0].className = "personal-current";
    personalSwitch[1].className = "";
    personalSwitch[2].className = "";
    document.querySelector(".mylikes").style.display = "block";
    myPlayLists.style.display = "none";
    myCollect.style.display = "none";
    personal.setAttribute("data-personalMode", 1);
  });
  //切换至我的歌单
  personalSwitch[1].addEventListener("click", () => {
    personalSwitch[0].className = "";
    personalSwitch[1].className = "personal-current";
    personalSwitch[2].className = "";
    document.querySelector(".mylikes").style.display = "none";
    myCollect.style.display = "none";
    personal.setAttribute("data-personalMode", 2);
    //渲染我的歌单页面
    myPlayLists.style.display = "block";
    myPlayListsFunction(userID);
  });
  //切换至我收藏的歌单
  personalSwitch[2].addEventListener("click", () => {
    personalSwitch[0].className = "";
    personalSwitch[1].className = "";
    personalSwitch[2].className = "personal-current";
    document.querySelector(".mylikes").style.display = "none";
    myPlayLists.style.display = "none";
    personal.setAttribute("data-personalMode", 3);
    //渲染我收藏的歌单页面
    myCollect.style.display = "block";
    myCollectFunction(userID);
  });

  //获取用户等级
  ajax({
    url: serverUrl + "/user/level",
    success: function (response) {
      personalLevel = response.data.level;
    },
  });

  //获取用户关注列表
  ajax({
    url: serverUrl + "/user/follows",
    data: {
      uid: userID,
      limit: 1024,
    },
    success: function (response) {
      personalFollow.innerHTML = "关注: " + response.follow.length + " | ";
    },
  });

  //获取用户粉丝列表
  ajax({
    url: serverUrl + "/user/followeds",
    data: {
      uid: userID,
      limit: 1024,
    },
    success: function (response) {
      personalFollowed.innerHTML = "粉丝: " + response.followeds.length;
    },
  });

  //获取用户信息
  ajax({
    url: serverUrl + "/user/account",
    success: function (response) {
      //response.profile.nickname 名称
      //response.profile.signature 个性签名
      //response.profile.avatarUrl 头像
      personalName.innerHTML =
        '<i class="iconfont">&#xe7ab;</i>' +
        response.profile.nickname +
        "<a>Lv." +
        personalLevel +
        "</a>";
      personalHead.src = response.profile.avatarUrl;
      personalSign.innerHTML = response.profile.signature;
      userInfoRender = 1;
    },
  });

  //获取喜欢的音乐列表
  ajax({
    url: serverUrl + "/likelist",
    data: {
      uid: userID,
    },
    success: function (response) {
      let index = 1;
      const likesLength = response.ids.length; //存储喜欢的歌单内歌曲总数
      let likesReady = 0; //存储已经渲染的歌曲数目
      //response.ids 为喜欢的音乐UID数组
      for (let i = 0; i < 10; i++) {
        //发送ajax请求获取歌曲详情信息
        ajax({
          url: serverUrl + "/song/detail",
          data: {
            ids: response.ids[i],
          },
          success: function (response) {
            //response.songs[0].id歌曲ID
            //response.songs[0].name歌曲名
            //response.songs[0].al.name专辑名
            //response.songs[0].al.picUrl专辑封面图URL
            //response.songs[0].ar[0].name第一位歌手的名字
            //response.songs[0].mv 得到MV的ID,没有则为0
            //response.songs[0].dt 歌曲的时间长度毫秒数
            const like = document.createElement("li");
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
            //添加歌曲名元素
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
            like.appendChild(div1);
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
            like.appendChild(div2);
            //添加专辑名元素
            const div3 = document.createElement("div");
            div3.innerHTML = "<a>" + response.songs[0].al.name + "</a>";
            like.appendChild(div3);
            //添加歌曲时长元素
            const div4 = document.createElement("div");
            let songLength = parseInt(response.songs[0].dt / 1000);
            let songMin = parseInt(songLength / 60);
            let songSecond = songLength % 60;
            if (songSecond < 10) {
              songSecond = "0" + songSecond;
            }
            div4.innerHTML =
              "<a>" +
              songMin +
              " : " +
              songSecond +
              "</a>" +
              '<i class="iconfont">&#xe615;</i>';
            like.appendChild(div4);
            //将处理完的li(like)渲染进页面
            mylikes.appendChild(like);
          },
        });
      }
      likesReady += 10;

      //判断滚动条是否滚动到底部,开始发送ajax请求渲染歌曲
      window.onscroll = function () {
        const personalMode = Number(personal.getAttribute("data-personalMode"));
        //scrollTop是滚动条滚动时，滚动条上端距离顶部的距离
        let scrollTop = document.documentElement.scrollTop;
        //变量windowHeight是可视区的高度
        let windowHeight = document.documentElement.clientHeight;
        //变量scrollHeight是滚动条的总高度（当前可滚动的页面的总高度）
        let scrollHeight = document.documentElement.scrollHeight;
        //滚动条到底部
        if (scrollTop + windowHeight >= scrollHeight && personalMode == 1) {
          //渲染新歌曲,一次10首
          //response.ids 为喜欢的音乐UID数组
          for (
            let i = likesReady;
            i < likesReady + 10 && response.ids[i];
            i++
          ) {
            //发送ajax请求获取歌曲详情信息
            ajax({
              url: serverUrl + "/song/detail",
              data: {
                ids: response.ids[i],
              },
              success: function (response) {
                const like = document.createElement("li");
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
                //添加歌曲名元素
                const div1 = document.createElement("div");
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
                div1.setAttribute(
                  "data-music-songInfo",
                  JSON.stringify(songInfo)
                );
                like.appendChild(div1);
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
                like.appendChild(div2);
                //添加专辑名元素
                const div3 = document.createElement("div");
                div3.innerHTML = "<a>" + response.songs[0].al.name + "</a>";
                like.appendChild(div3);
                //添加歌曲时长元素
                const div4 = document.createElement("div");
                let songLength = parseInt(response.songs[0].dt / 1000);
                let songMin = parseInt(songLength / 60);
                let songSecond = songLength % 60;
                if (songSecond < 10) {
                  songSecond = "0" + songSecond;
                }
                div4.innerHTML =
                  "<a>" +
                  songMin +
                  " : " +
                  songSecond +
                  "</a>" +
                  '<i class="iconfont">&#xe615;</i>';
                like.appendChild(div4);
                //将处理完的li(like)渲染进页面
                mylikes.appendChild(like);
              },
            });
          }
          //渲染完毕，将likesReady的值+10
          likesReady += 10;
        }
      };
    },
  });
  //
  //音乐列表渲染完毕后，为音乐播放全部按钮绑定事件
  const mylikesBtn = document.querySelector(".mylikes-btn");
  function mylikesPlayAll() {
    const likes = document.querySelectorAll(".mylikes>ul>li");
    for (let i = 0; i < likes.length; i++) {
      musicAddFunction(
        likes[i].getElementsByTagName("div")[0].getAttribute("data-music-id"),
        JSON.parse(
          likes[i]
            .getElementsByTagName("div")[0]
            .getAttribute("data-music-songInfo")
        )
      );
    }
    musicPlayFunction(
      likes[0].getElementsByTagName("div")[0].getAttribute("data-music-id"),
      JSON.parse(
        likes[0]
          .getElementsByTagName("div")[0]
          .getAttribute("data-music-songInfo")
      )
    );
  }
  mylikesBtn.addEventListener(
    "click",
    debounce(mylikesPlayAll, 3000, () => {
      alert("操作频率过快，稍后3秒后重试!");
    })
  );

  //为父元素绑定事件委托——子元素音乐播放/添加进播放列表
  document.querySelector(".mylikes>ul").addEventListener("click", function (e) {
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
        target.addEventListener("click", singerFunction(singerId));
        break;
      default:
        break;
    }
  });

  //end
};
