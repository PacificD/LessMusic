window.addEventListener("load", function () {
  //登录模块js
  //变量声明区
  const serverUrl = "http://127.0.0.1:3000",
    main = document.querySelector(".main"),
    navUnderline = document.querySelectorAll(".nav-underline"),
    search = document.querySelector(".search"),
    searchBg = document.querySelector(".search-bg"),
    singerPageContainer = document.querySelector(".singer-page-container"),
    musicListContainer = document.querySelector(".musicList-container"),
    loginTitle = document.querySelector(".login-title"),
    loginUsername = document.querySelector(".login-username"),
    loginPassword = document.querySelector(".login-password"),
    loginClose = document.querySelector(".login-close"),
    loginContent = document.querySelector(".login-content"),
    nav = document.querySelector(".nav"),
    loginCode = document.querySelector(".login-code"),
    loginBtn = document.querySelector(".login-btn"),
    phoneWrong = document.querySelector(".phone-wrong"),
    passwordWrong = document.querySelector(".password-wrong"),
    user = document.querySelector(".user"),
    userPics = user.querySelector(".user-head img"),
    username = user.querySelector("p"),
    personContent = document.querySelector(".personal"),
    musicNav = document.querySelector(".music-nav");
  //登录框移动功能
  loginTitle.addEventListener("mousedown", function (event) {
    //event.pageX可以获取鼠标光标距离浏览器边缘位置的大小
    //loginContent.offsetLeft获取登录框到浏览器左边框的距离
    const x = event.pageX - loginContent.offsetLeft;
    const y = event.pageY - loginContent.offsetTop;
    document.addEventListener("mousemove", move);
    function move(event) {
      //算出移动时的登录框的位置距离 并赋值
      loginContent.style.left = event.pageX - x + "px";
      loginContent.style.top = event.pageY - y + "px";
    }
    //鼠标弹起，移除事件
    document.addEventListener("mouseup", function () {
      document.removeEventListener("mousemove", move);
    });
  });

  //登录框聚焦时文字提示消失
  loginUsername.addEventListener("focus", function () {
    this.placeholder = "";
  });
  loginUsername.addEventListener("blur", function () {
    this.placeholder = "请输入网易云音乐手机号";
  });
  loginPassword.addEventListener("focus", function () {
    this.placeholder = "";
  });
  loginPassword.addEventListener("blur", function () {
    this.placeholder = "请输入密码";
  });
  //点击密码框的图标时，显示密码
  let flag = 0;
  loginCode.addEventListener("click", function () {
    if (flag == 0) {
      flag = 1;
      loginPassword.type = "txt";
      this.innerHTML = "&#xe60c;";
    } else {
      flag = 0;
      loginPassword.type = "password";
      this.innerHTML = "&#xe641;";
    }
  });

  //点击关闭按钮时，关闭登录模块，取消其他模块的模糊效果
  loginClose.addEventListener("click", function () {
    loginContent.style.display = "none";
    nav.style.filter = "blur(0)";
    main.style.filter = "blur(0)";
    musicNav.style.filter = "blur(0)";
    search.style.filter = "blur(0)";
    searchBg.style.filter = "blur(0)";
    musicListContainer.style.filter = "blur(0)";
    singerPageContainer.style.filter = "blur(0)";
  });

  //点击'登录'后发送ajax请求
  loginBtn.addEventListener("click", function () {
    let userID = 0; //储存登录后的用户ID
    // let timestamp = new Date().getTime(); //生成当前时间戳
    //发送登录请求，/login/cellphone
    ajax({
      url: serverUrl + "/login/cellphone",
      data: {
        phone: loginUsername.value,
        password: loginPassword.value,
        //本API包POST请求url必须添加时间戳,使每次请求url不一样,不然请求会被缓存
        // timestamp: timestamp,
      },
      contentType: "application/x-www-form-urlencoded",
      success: function (response) {
        if (response.code == 200) {
          //存储登录状态在.login中，1为已经登录
          const login = document.querySelector(".login");
          login.setAttribute("loginState", 1);
          //将用户名和密码存入sessionStorage中
          sessionStorage.setItem("username", loginUsername.value);
          sessionStorage.setItem("password", loginPassword.value);
          //清空登录框中用户输入的用户名和密码
          loginUsername.value = "";
          loginPassword.value = "";
          //获取用户ID
          userID = response.account.id;
          //隐藏音乐播放器
          const music = document.querySelector(".music");
          music.style.right = "100%";
          //关闭登录框，清除其他元素的模糊效果
          nav.style.filter = "blur(0)";
          main.style.filter = "blur(0)";
          musicNav.style.filter = "blur(0)";
          search.style.filter = "blur(0)";
          searchBg.style.filter = "blur(0)";
          musicListContainer.style.filter = "blur(0)";
          singerPageContainer.style.filter = "blur(0)";
          //切换至用户界面
          login.style.display = "none";
          main.style.display = "none";
          search.style.display = "none";
          searchBg.style.display = "none";
          musicListContainer.style.display = "none";
          singerPageContainer.style.display = "none";
          for (let i = 0; i < navUnderline.length; i++) {
            navUnderline[i].style.display = "none";
          }
          navUnderline[1].style.display = "block";
          //出现用户状态栏(头像，nickname等)
          loginContent.style.display = "none";
          user.style.display = "block";
          userPics.src = response.profile.avatarUrl;
          username.innerHTML =
            '<i class="iconfont">&#xe679;</i>&nbsp;&nbsp;&nbsp;' +
            response.profile.nickname;
          //调用封装好的personal.js函数，渲染用户信息
          person(userID);
          personContent.style.display = "block";
        }
        //密码错误时
        if (response.code == 502) {
          passwordWrong.style.display = "block";
          //对登录框做抖动处理
          let a = true;
          let movy = 48;
          let sum = 0;
          const shake = function () {
            if (sum == 8) {
              clearInterval(timer);
              setTimeout(() => {
                passwordWrong.style.display = "none";
              }, 2000);
            }
            if (a) {
              movy = 51;
            } else {
              movy = 49;
            }
            loginContent.style.left = movy + "%";
            a = !a;
            sum++;
          };
          let timer = setInterval(shake, 60);
        }
      },
      error: function () {
        //账号不存在时
        phoneWrong.style.display = "block";
        //对登录框做抖动处理
        let a = true;
        let movy = 48;
        let sum = 0;
        const shake = function () {
          if (sum == 8) {
            clearInterval(timer);
            setTimeout(() => {
              phoneWrong.style.display = "none";
            }, 2000);
          }
          if (a) {
            movy = 51;
          } else {
            movy = 49;
          }
          loginContent.style.left = movy + "%";
          a = !a;
          sum++;
        };
        let timer = setInterval(shake, 60);
      },
    });
  });
  //账号登出
  const logout = document.querySelector(".user>a");
  logout.addEventListener("click", () => {
    ajax({
      url: serverUrl + "/logout",
      success: function () {
        //将登录状态修改为0
        document.querySelector(".login").setAttribute("loginState", 0);
        //清空sessionStorage
        sessionStorage.clear();
        //处理html的样式
        document.querySelector(".login").style.display = "block";
        user.style.display = "none";
        search.style.display = "none";
        searchBg.style.display = "none";
        musicListContainer.style.display = "none";
        singerPageContainer.style.display = "none";
        main.style.display = "block";
        document.querySelector(".mylikes>ul").innerHTML = "";
        personContent.style.display = "none";
      },
    });
  });
  //end
});
