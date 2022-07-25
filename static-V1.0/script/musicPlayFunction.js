//音乐样式改变函数
const musicStlye = function (songInfo) {
    const musicNavLogo = document.querySelector(".music-logo img");
    const musicNavName = document.querySelector(".music-info .music-name");
    const musicNavAr = document.querySelector(".music-ar");
    const musicLogo = document.querySelector(".music-CD-logo");
    const musicName = document.querySelector(".music .music-name a");
    const singer = document.querySelector(".singer");
    const playBtn = document.getElementById("music-play");
    playBtn.innerHTML = "&#xe638;";
    musicNavLogo.src = songInfo.alPicUrl;
    musicNavName.innerHTML = songInfo.name;
    musicLogo.src = songInfo.alPicUrl;
    musicName.innerHTML = songInfo.name;
    //渲染歌手
    musicNavAr.innerHTML = "";
    singer.innerHTML = "";
    let a = document.createElement("a");
    let b = document.createElement("a");
    let c = document.createElement("a");
    let d = document.createElement("a");
    //这里用a,b分别存储歌手名，因为下方appendChild没法复用同个a
    if (songInfo.ar.length == 1) {
        a.innerHTML = songInfo.ar[0];
        musicNavAr.appendChild(a);
        b.innerHTML = songInfo.ar[0];
        singer.appendChild(b);
    } else {
        //歌手为2
        if (songInfo.ar.length == 2) {
            a.innerHTML = songInfo.ar[0] + " / ";
            musicNavAr.appendChild(a);
            c.innerHTML = songInfo.ar[1];
            musicNavAr.appendChild(c);
            b.innerHTML = songInfo.ar[0] + " / " + songInfo.ar[1];
            singer.appendChild(b);
        } else {
            //歌手为3
            a.innerHTML = songInfo.ar[0] + " / ";
            musicNavAr.appendChild(a);
            c.innerHTML = songInfo.ar[1] + " / ";
            musicNavAr.appendChild(c);
            d.innerHTML = songInfo.ar[2];
            musicNavAr.appendChild(d);
            b.innerHTML =
                songInfo.ar[0] + " / " + songInfo.ar[1] + " / " + songInfo.ar[2];
            singer.appendChild(b);
        }
    }
    //添加rotate类名，让音乐封面旋转
    musicLogo.className = "music-CD-logo rotate";

    //end
};

//音乐播放函数
const musicPlayFunction = function (musicId, songInfo) {
    const audio = document.querySelector(".audio");
    const lyricContent = document.querySelector(".lyric-content");
    //使用ajax发送音乐id，获取url
    ajax({
        url: "http://127.0.0.1:4000" + "/song/url",
        data: {
            id: musicId,
        },
        success: function (response) {
            //音乐总长度
            const musicLength = document.querySelector(".music-time div");
            let musicUrl = 0;
            musicUrl = response.data[0].url;
            audio.src = musicUrl;
            audio.muted = false;
            audio.volume = 0.4;
            musicStlye(songInfo);
            //改变音乐总长度HTML
            let songLength = parseInt(songInfo.dt / 1000);
            let songMin = parseInt(songLength / 60);
            let songSecond = songLength % 60;
            if (songSecond < 10) {
                songSecond = "0" + songSecond;
            }
            //将音乐长度秒数作为自定义属性存入Html元素中，方便js跨作用域使用
            musicLength.setAttribute("data-music-length", songLength);
            musicLength.innerHTML = songMin + ":" + songSecond;
        },
    });
    //发送ajax请求获取歌词
    ajax({
        url: "http://127.0.0.1:4000" + "/lyric",
        data: {
            id: musicId,
        },
        success: function (response) {
            //先清除之前播放的字体样式
            const lists = document.querySelectorAll(".music-list>ul>li");
            for (let i = 0; i < lists.length; i++) {
                lists[i].className = "";
                if (lists[i].getAttribute("data-music-id") == musicId) {
                    //为当前播放改变字体样式
                    lists[i].className = "music-list-play";
                }
            }
            //先将上一首的歌词清空
            lyricContent.innerHTML =
                "<p></p><p></p><p></p><p></p><p></p><p>暂无歌词</p>";
            //如果歌词存在
            if (response.lrc) {
                let lyric = response.lrc.lyric;
                //渲染歌词
                let html = "";
                let lrcArr = lyric.split("["); //切割字符串，从'['左右切割，存入数组
                for (let i = 0; i < lrcArr.length; i++) {
                    let arr = lrcArr[i].split("]"); //切割']'
                    let allTime = arr[0].split("."); //切去毫秒
                    let time = allTime[0].split(":"); //分隔分和秒
                    let second = time[0] * 60 + time[1] * 1; //得到总秒数，乘以一，保证数字拼接非字符串
                    let text = arr[1];
                    if (text) {
                        html += "<p id=" + second + ">" + text + "</p>";
                    }
                    lyricContent.innerHTML = html;
                }
            } else {
                //无歌词，纯音乐
                lyricContent.innerHTML =
                    "<p></p><p></p><p></p><p></p><p></p><p>纯音乐，清您欣赏</p>";
            }

            //先清空歌词模块的偏移
            lyricContent.style.top = 0;
            //监听音乐播放进度，实现歌词,下方栏状态,进度条同步
            const musicTime = document.querySelector(".music-time p");
            let num = 0;
            const p = document.querySelectorAll(".lyric-content p");
            audio.addEventListener("timeupdate", function () {
                //this.currentTime当前音乐的播放时间，以秒计
                let currentTime = parseInt(this.currentTime); //取整
                //下方栏状态同步处理
                let time = "";
                if (currentTime < 10) {
                    time = "0:0" + currentTime;
                    musicTime.innerHTML = time;
                } else {
                    if (currentTime > 60) {
                        let sec =
                            currentTime % 60 < 10
                                ? "0" + (currentTime % 60)
                                : currentTime % 60;
                        musicTime.innerHTML = parseInt(currentTime / 60) + ":" + sec;
                    } else {
                        musicTime.innerHTML = "0:" + currentTime;
                    }
                }
                //下方进度条同步处理
                const musicProgress = document.querySelector(".music-progress p"),
                    musicProgressBtn = document.querySelector(".music-progress-btn"),
                    songLength = document
                        .querySelector(".music-time div")
                        .getAttribute("data-music-length");
                if (currentTime / songLength == 1) {
                    musicProgress.style.width = "99.5%";
                    musicProgressBtn.style.left = "99.5%";
                } else {
                    musicProgress.style.width = (currentTime / songLength) * 100 + "%";
                    musicProgressBtn.style.left = (currentTime / songLength) * 100 + "%";
                }
                //歌词同步处理，把当前时间与p标签的id名进行对比
                //若相同就让这个p标签变色
                if (document.getElementById(currentTime)) {
                    //清除所有P标签样式
                    for (let i = 0; i < p.length; i++) {
                        p[i].style.color = "rgb(238, 135, 168)";
                        p[i].style.fontSize = "14px";
                    }
                    document.getElementById(currentTime).style.color = "rgb(241, 22, 90)";
                    document.getElementById(currentTime).style.fontSize = "20px";
                    if (p[num + 5]) {
                        if (p[num + 5].id == currentTime) {
                            lyricContent.style.top = -32 * num + "px";
                            num++;
                        }
                    }
                }
            });
        },
    });
    //先清空评论区
    document.querySelector(".music-comment ul").innerHTML = "";
    //发送ajax获取热门评论
    ajax({
        url: "http:127.0.0.1:4000" + "/comment/hot",
        data: {
            //默认获取20条热评
            id: musicId,
            type: 0, //type0为歌曲,1为MV,2为歌单，3为专辑
        },
        success: function (response) {
            for (let i = 0; response.hotComments[i]; i++) {
                //创建data对象存放评论详情信息
                const data = {
                    content: response.hotComments[i].content, //评论内容
                    likedCount: response.hotComments[i].likedCount, //获赞数
                    time: response.hotComments[i].time, //评论时间
                    avatarUrl: response.hotComments[i].user.avatarUrl, //用户头像
                    nickname: response.hotComments[i].user.nickname, //用户名称
                };
                //调用封装好的音乐评论渲染函数
                musicCommentFunction(data);
            }
        },
    });
    //如果音乐列表已有该歌曲，播放时将该歌曲置顶，增强用户体验
    const musicList = document.querySelector(".music-list ul");
    const lis = document.querySelectorAll(".music-list>ul>li");
    for (let i = 0; i < lis.length; i++) {
        //找到该音乐在音乐列表中的位置
        if (lis[i].getAttribute("data-music-id") == musicId) {
            lis[i].getElementsByTagName("a")[0].innerHTML = "1.";
            musicList.insertBefore(lis[i], lis[0]);
            break;
        }
    }
    const lisNew = document.querySelectorAll(".music-list>ul>li");
    for (let j = 1; j < lisNew.length; j++) {
        lisNew[j].getElementsByTagName("a")[0].innerHTML = j + 1 + ".";
    }
    //将该音乐添加进音乐播放列表
    musicAddFunction(musicId, songInfo);
    //end
};

//音乐添加到列表函数
const musicAddFunction = function (musicId, songInfo) {
    const musicList = document.querySelector(".music-list ul");
    //判断歌曲是否已经在列表中，若已存在则退出函数
    const lis = document.querySelectorAll(".music-list>ul>li");
    for (let i = 0; i < lis.length; i++) {
        if (lis[i].getAttribute("data-music-id") == musicId) {
            return;
        }
    }
    //添加音乐
    const li = document.createElement("li"),
        a = document.createElement("a"),
        b = document.createElement("a"),
        c = document.createElement("a"),
        d = document.createElement("a"),
        e = document.createElement("a");
    li.setAttribute("data-music-id", musicId);
    a.innerHTML = 1 + ".";
    li.appendChild(a);
    b.innerHTML = songInfo.name;
    li.appendChild(b);
    c.innerHTML = songInfo.ar;
    li.appendChild(c);
    let songLength = parseInt(songInfo.dt / 1000);
    let songMin = parseInt(songLength / 60);
    let songSecond = songLength % 60;
    if (songSecond < 10) {
        songSecond = "0" + songSecond;
    }
    d.innerHTML = songMin + " : " + songSecond;
    li.appendChild(d);
    //将歌曲ID和songInfo存入自定义属性中，方便后续获取，减少接口调用
    e.className = "music-delete";
    e.setAttribute("data-music-id", musicId);
    e.setAttribute("data-music-songInfo", JSON.stringify(songInfo));
    e.innerHTML = '<i class="iconfont">&#xe615;</i>';
    //先取消li的点击绑定事件，避免歌曲播放冲突
    e.addEventListener("mouseover", () => {
        li.removeEventListener("click", liPlay);
    });
    e.addEventListener("mouseout", () => {
        //恢复li的点击事件绑定
        li.addEventListener("click", liPlay);
    });
    //为最后按钮绑定一个删除事件
    e.addEventListener("click", function () {
        const lists = document.querySelectorAll(".music-list>ul>li");
        for (let i = 0; i < lists.length; i++) {
            //如果该删除事件的音乐ID与搜索到的ID匹配
            if (
                e.getAttribute("data-music-id") ==
                lists[i].getAttribute("data-music-id")
            ) {
                //若删除的节点是当前播放的歌曲
                if (
                    lists[i].getAttribute("data-music-id") ==
                    document
                        .querySelector(".music-list-play")
                        .getAttribute("data-music-id")
                ) {
                    //播放下一首，若无，则播放第一首
                    if (lists[i + 1]) {
                        lists[i + 1].className = "music-list-play";
                        musicPlayFunction(
                            JSON.parse(
                                lists[i + 1]
                                    .querySelector(".music-delete")
                                    .getAttribute("data-music-id")
                            ),
                            JSON.parse(
                                lists[i + 1]
                                    .querySelector(".music-delete")
                                    .getAttribute("data-music-songinfo")
                            )
                        );
                    } else if (lists[0]) {
                        lists[0].className = "music-list-play";
                        musicPlayFunction(
                            JSON.parse(
                                lists[0]
                                    .querySelector(".music-delete")
                                    .getAttribute("data-music-id")
                            ),
                            JSON.parse(
                                lists[0]
                                    .querySelector(".music-delete")
                                    .getAttribute("data-music-songinfo")
                            )
                        );
                    }
                }
                //删除此节点
                musicList.removeChild(lists[i]);
                //下方所有音乐列表的索引+1
                for (let j = i + 1; j < lists.length; j++) {
                    lists[j].querySelector("a").innerHTML = j + ".";
                }
            }
        }
    });
    li.appendChild(e);
    //为当前行绑定播放事件
    const liPlay = function () {
        //先清除之前播放的字体样式
        const lists = document.querySelectorAll(".music-list>ul>li");
        for (let i = 0; i < lists.length; i++) {
            lists[i].className = "";
        }
        //为当前播放改变字体样式
        this.className = "music-list-play";
        musicPlayFunction(musicId, songInfo);
    };
    li.addEventListener("click", liPlay);
    //将新增的歌曲放入音乐列表的头位置，增强用户体验
    const lists = document.querySelectorAll(".music-list>ul>li");
    musicList.insertBefore(li, lists[0]);
    //将下方所有歌曲的索引加1
    for (let i = 0; i < lists.length; i++) {
        const a = lists[i].getElementsByTagName("a")[0];
        a.innerHTML = i + 2 + ".";
    }
    //end
};
