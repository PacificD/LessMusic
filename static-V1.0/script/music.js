const musicLogo = document.querySelector(".music-logo div"),
  music = document.querySelector(".music"),
  musicListIcon = document.querySelector(".music-nav>i"),
  musicList = document.querySelector(".music-list"),
  musicListDiv = document.querySelector(".music-list>div"),
  main = document.querySelector(".main"),
  search = document.querySelector(".search"),
  searchBg = document.querySelector(".search-bg"),
  singerPageContainer = document.querySelector(".singer-page-container"),
  musicListContainer = document.querySelector(".musicList-container"),
  personal = document.querySelector(".personal"),
  personalHead = document.querySelector(".personal-head");
let flag = 0; //标记，音乐播放器的出现状态
let musicListFlag = 0;
//返回顶部JS
const backTop = document.querySelector(".back-top div");
backTop.onclick = function () {
  document.documentElement.scrollTop = 0;
};
musicLogo.addEventListener("click", () => {
  if (flag == 0) {
    //打开音乐播放器
    music.style.right = 0;
    main.style.display = "none";
    personal.style.display = "none";
    search.style.display = "none";
    searchBg.style.display = "none";
    musicListContainer.style.display = "none";
    singerPageContainer.style.display = "none";
    flag = 1;
  } else {
    //关闭音乐播放器
    let mode = main.getAttribute("data-mode");
    music.style.right = "100%";
    switch (mode) {
      case "personal":
        personal.style.display = "block";
        break;
      case "musicList":
        musicListContainer.style.display = "block";
        break;
      case "search":
        search.style.display = "block";
        searchBg.style.display = "block";
        break;
      case "main":
        main.style.display = "block";
        break;
      case "singer":
        singerPageContainer.style.display = "block";
        break;
      default:
        break;
    }
    flag = 0;
  }
});
//为音乐播放列表按钮绑定事件
musicListIcon.addEventListener("click", () => {
  if (musicListFlag == 0) {
    musicList.className = "music-list music-list-show";
    musicListFlag = 1;
  } else {
    musicList.className = "music-list";
    musicListFlag = 0;
  }
});
//为音乐播放列表头部绑定事件: 点击后隐藏音乐播放列表
musicListDiv.addEventListener("click", () => {
  musicList.className = "music-list";
  musicListFlag = 0;
});

//end
