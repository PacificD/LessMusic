//main主页JS:
window.addEventListener("load", function () {
    //carousel轮播图JS:
    let that; //定义that全局变量，代替本对象。
    class Carousel {
        constructor() {
            //构造函数
            that = this;
            this.main = document.querySelector(".carousel");
            this.next = this.main.querySelector(".arrow-next");
            this.prev = this.main.querySelector(".arrow-prev");
            this.ol = this.main.querySelector(".circle");
            this.divs = this.main.querySelectorAll("div");
            //为轮播图绑定鼠标悬浮事件
            this.main.addEventListener("mouseover", this.mouseover);
            //为轮播图绑定鼠标离开事件
            this.main.addEventListener("mouseout", this.mouseout);
            //根据轮播图的张数动态创建小li
            this.creatLi();
            this.next.addEventListener("click", this.nextImg);
            this.prev.addEventListener("click", this.prevImg);
            //为所有小li添加点击事件
            for (var i = 0; i < this.ol.children.length; i++) {
                this.ol.children[i].addEventListener("click", this.liClick);
            }
            //设置定时器，自动点击下一张，实现轮播效果
            this.timer = setInterval(function () {
                that.nextImg();
            }, 3000);
        }

        mouseover() {
            //this = main
            //鼠标移动到轮播图上显示左右箭头。
            that.next.style.display = "block";
            that.prev.style.display = "block";
            //鼠标移入时清除图片轮播定时器。
            clearInterval(that.timer);
            that.timer = null;
        }

        mouseout() {
            //this = main
            that.next.style.display = "none";
            that.prev.style.display = "none";
            //鼠标离开时重启图片轮播定时器。
            that.timer = setInterval(function () {
                that.nextImg();
            }, 3000);
        }

        creatLi() {
            //根据轮播图的张数动态创建小li
            for (var i = 0; i < this.main.children.length - 3; i++) {
                //根据轮播图的张数动态创建li点的数量
                var li = document.createElement("li");
                //设置自定义属性(索引index): attribute
                li.setAttribute("data-index", i);
                //将li添加入ol内
                that.ol.appendChild(li);
            }
            //给予第一个li: "current"类，使其悬浮
            that.ol.children[0].className = "current";
            //算法：使li点居中
            that.ol.style.left = 475 - that.ol.clientWidth / 2 + "px";
        }

        nextImg() {
            //this = next
            for (var i = 0; i < that.divs.length; i++) {
                if (that.divs[i].className == "carousel-show") {
                    //判断当前图片是否为最后一张，若是则跳转为第1张
                    if (i == that.divs.length - 1) {
                        that.divs[i].className = "";
                        that.divs[0].className = "carousel-show";
                        that.ol.children[i].className = "";
                        that.ol.children[0].className = "current";
                        break;
                    } else {
                        that.divs[i].className = "";
                        that.divs[i + 1].className = "carousel-show";
                        that.ol.children[i].className = "";
                        that.ol.children[i + 1].className = "current";
                        break;
                    }
                }
            }
        }

        prevImg() {
            //this = prev
            for (var i = 0; i < that.divs.length; i++) {
                if (that.divs[i].className == "carousel-show") {
                    //判断当前图片是否为第一张，若是则跳转为最后一张
                    if (i == 0) {
                        that.divs[i].className = "";
                        that.divs[that.divs.length - 1].className = "carousel-show";
                        that.ol.children[i].className = "";
                        that.ol.children[that.divs.length - 1].className = "current";
                        break;
                    } else {
                        that.divs[i].className = "";
                        that.divs[i - 1].className = "carousel-show";
                        that.ol.children[i].className = "";
                        that.ol.children[i - 1].className = "current";
                        break;
                    }
                }
            }
        }

        liClick() {
            //this = li
            var index = this.getAttribute("data-index");
            //清除所有小li类名和轮播图类名，清除悬浮样式和隐藏当前轮播图。
            for (var i = 0; i < that.ol.children.length; i++) {
                that.ol.children[i].className = "";
                that.divs[i].className = "";
            }
            this.className = "current";
            that.divs[index].className = "carousel-show";
        }
    }

    var carousel = new Carousel();

    //发送ajax请求获取banner，放入轮播图
    ajax({
        url: "http://127.0.0.1:4000/banner",
        success: function (response) {
            const imgs = document.querySelectorAll(".carousel>div>img");
            for (let i = 0; i < response.banners.length; i++) {
                imgs[i].src = response.banners[i].imageUrl;
            }
        },
    });

    //发送ajax请求获取推荐新音乐
    ajax({
        url: "http://127.0.0.1:4000/personalized/newsong",
        success: function (response) {
            const imgs = document.querySelectorAll(".newest-img>img"),
                names = document.querySelectorAll(".newest-info>div"),
                singers = document.querySelectorAll(".newest-info>p"),
                recommendNewest = document.querySelectorAll(
                    ".recommend-newest>div>div"
                ),
                newestBtn = document.querySelectorAll(".newest-btn");
            for (let i = 0; i < 5; i++) {
                imgs[i].src = response.result[i].picUrl;
                names[i].innerHTML = response.result[i].name;
                let arList0 = []; //数组，存放歌手名
                for (let j = 0; response.result[i].song.artists.length < 4; j++) {
                    if (response.result[i].song.artists[j] === undefined) {
                        break;
                    }
                    arList0[j] = response.result[i].song.artists[j].name;
                }
                switch (arList0.length) {
                    case 1:
                        singers[i].innerHTML = arList0[0];
                        break;
                    case 2:
                        singers[i].innerHTML = arList0[0] + " / " + arList0[1];
                        break;
                    case 3:
                        singers[i].innerHTML =
                            arList0[0] + " / " + arList0[1] + " / " + arList0[2];
                        break;
                    default:
                        break;
                }
                //将歌曲信息存入对象songInfo中
                const songInfo = {
                    id: response.result[i].id,
                    name: response.result[i].song.name,
                    alName: response.result[i].song.alias[0],
                    alPicUrl: response.result[i].picUrl,
                    ar: arList0,
                    mv: response.result[i].song.mvid,
                    dt: response.result[i].song.duration,
                };
                recommendNewest[i].setAttribute(
                    "data-music-id",
                    response.result[i].song.id
                );
                recommendNewest[i].setAttribute(
                    "data-songInfo",
                    JSON.stringify(songInfo)
                );
                //为所有推荐新音乐绑定播放事件
                function play() {
                    musicPlayFunction(response.result[i].id, songInfo);
                }
                newestBtn[i].addEventListener(
                    "click",
                    //防抖处理
                    debounce(play, 2000, () => {
                        alert("操作频率过快，请2s后重试!");
                    })
                );
                names[i].addEventListener(
                    "click",
                    //防抖处理
                    debounce(play, 2000, () => {
                        alert("操作频率过快，请2s后重试!");
                    })
                );
            }
            //for-end
        },
    });

    //为推荐歌单上一页/下一页绑定点击事件
    const prev = document.querySelector(".recommend-list-prev"),
        next = document.querySelector(".recommend-list-next"),
        ul = document.querySelector(".recommend-list>ul"),
        lis = document.querySelectorAll(".recommend-list>ol>li");
    let page = 1; //记录当前页数
    next.addEventListener("click", () => {
        switch (page) {
            case 1:
                page = 2;
                ul.style.left = "-1340px";
                for (let i = 0; i < lis.length; i++) {
                    lis[i].className = "";
                }
                lis[1].className = "recommend-list-current";
                break;
            case 2:
                page = 3;
                ul.style.left = "-2700px";
                for (let i = 0; i < lis.length; i++) {
                    lis[i].className = "";
                }
                lis[2].className = "recommend-list-current";
                break;
            case 3:
                page = 4;
                ul.style.left = "-4040px";
                for (let i = 0; i < lis.length; i++) {
                    lis[i].className = "";
                }
                lis[3].className = "recommend-list-current";
                break;
            case 4:
                page = 1;
                ul.style.left = "0px";
                for (let i = 0; i < lis.length; i++) {
                    lis[i].className = "";
                }
                lis[0].className = "recommend-list-current";
                break;
            default:
                break;
        }
    });
    prev.addEventListener("click", () => {
        switch (page) {
            case 1:
                page = 4;
                ul.style.left = "-4040px";
                for (let i = 0; i < lis.length; i++) {
                    lis[i].className = "";
                }
                lis[3].className = "recommend-list-current";
                break;
            case 2:
                page = 1;
                ul.style.left = "0px";
                for (let i = 0; i < lis.length; i++) {
                    lis[i].className = "";
                }
                lis[0].className = "recommend-list-current";
                break;
            case 3:
                page = 2;
                ul.style.left = "-1340px";
                for (let i = 0; i < lis.length; i++) {
                    lis[i].className = "";
                }
                lis[1].className = "recommend-list-current";
                break;
            case 4:
                page = 3;
                ul.style.left = "-2700px";
                for (let i = 0; i < lis.length; i++) {
                    lis[i].className = "";
                }
                lis[2].className = "recommend-list-current";
                break;
            default:
                break;
        }
    });
    //为下方小li绑定事件
    for (let i = 0; i < lis.length; i++) {
        lis[i].addEventListener("click", () => {
            switch (i) {
                case 0:
                    page = 1;
                    for (let i = 0; i < lis.length; i++) {
                        lis[i].className = "";
                    }
                    lis[0].className = "recommend-list-current";
                    ul.style.left = "0px";
                    break;
                case 1:
                    page = 2;
                    for (let i = 0; i < lis.length; i++) {
                        lis[i].className = "";
                    }
                    lis[1].className = "recommend-list-current";
                    ul.style.left = "-1340px";
                    break;
                case 2:
                    page = 3;
                    for (let i = 0; i < lis.length; i++) {
                        lis[i].className = "";
                    }
                    lis[2].className = "recommend-list-current";
                    ul.style.left = "-2700px";
                    break;
                case 3:
                    page = 4;
                    for (let i = 0; i < lis.length; i++) {
                        lis[i].className = "";
                    }
                    lis[3].className = "recommend-list-current";
                    ul.style.left = "-4040px";
                    break;
                default:
                    break;
            }
        });
    }

    //发送ajax请求渲染歌单推荐
    ajax({
        url: "http://127.0.0.1:4000/top/playlist/highquality",
        data: {
            limit: 20,
            cat: "欧美",
        },
        success: function (response) {
            const spinner = document.querySelector(".spinner1"),
                recommendList = document.querySelector(".recommend-list"),
                recommendListUl = document.querySelector(".recommend-list>ul"),
                main = document.querySelector(".main"),
                musicList = document.querySelector(".musicList"),
                recommendFrag = document.createDocumentFragment();
            for (let i = 0; i < 20; i++) {
                const li = document.createElement("li"),
                    recommendImg = document.createElement("div"),
                    img = document.createElement("img"),
                    span = document.createElement("span"),
                    icon = document.createElement("i"),
                    recommendName = document.createElement("div"),
                    p = document.createElement("p"),
                    span_ = document.createElement("span");
                recommendImg.className = "recommend-list-img";
                icon.className = "iconfont";
                recommendName.className = "recommend-list-name";
                img.src = response.playlists[i].coverImgUrl;
                icon.innerHTML = "&#xe664;";
                recommendImg.appendChild(img);
                recommendImg.appendChild(span);
                recommendImg.appendChild(icon);
                recommendName.innerHTML = response.playlists[i].name;
                p.innerHTML = "播放数: " + response.playlists[i].playCount;
                //为该歌单名绑定点击事件
                recommendName.addEventListener("click", () => {
                    musicPlayList(response.playlists[i].id);
                    main.style.display = "none";
                    musicList.style.display = "block";
                });
                icon.addEventListener("click", () => {
                    musicPlayList(response.playlists[i].id);
                    main.style.display = "none";
                    musicList.style.display = "block";
                });
                li.appendChild(recommendImg);
                li.appendChild(recommendName);
                li.appendChild(p);
                li.appendChild(span_);
                recommendFrag.appendChild(li);
                if (i == 19) {
                    recommendListUl.appendChild(recommendFrag);
                    spinner.style.display = "none";
                    recommendList.style.display = "block";
                }
            }
            //for-end
        },
    });

    //end
});
