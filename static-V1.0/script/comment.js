//渲染评论函数封装

//渲染音乐评论
const musicCommentFunction = function (data) {
  const musicComment = document.querySelector(".music-comment ul"),
    li = document.createElement("li"),
    commentLogo = document.createElement("div"),
    img = document.createElement("img"),
    commentContent = document.createElement("div"),
    commentName = document.createElement("span"),
    commentTxt = document.createElement("span");
  //创建头像
  commentLogo.className = "comment-logo";
  img.src = data.avatarUrl;
  //对用户头像不存在做处理
  img.onerror = function () {
    img.src = "../img/preview.jpg";
  };
  commentLogo.appendChild(img);
  li.appendChild(commentLogo);
  //创建评论详情
  commentContent.className = "comment-content";
  commentName.className = "comment-name";
  commentName.innerHTML = data.nickname + ":&emsp;";
  commentContent.appendChild(commentName);
  commentTxt.innerHTML = data.content;
  commentContent.appendChild(commentTxt);
  li.appendChild(commentContent);
  //创建评论时间
  const commentData = document.createElement("span");
  commentData.className = "comment-date";
  let date = new Date(data.time);
  let Y = date.getFullYear() + "-"; // 获取完整的年份(4位,1970)
  let M = // 获取月份(0-11,0代表1月,用的时候记得加上1)
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  let D = date.getDate() + " "; // 获取日(1-31)
  let h = date.getHours() + ":"; // 获取小时数(0-23)
  let m = date.getMinutes() + ":"; // 获取分钟数(0-59)
  let s = date.getSeconds(); // 获取秒数(0-59)
  let time = Y + M + D + h + m + s;
  commentData.innerHTML = time;
  li.appendChild(commentData);
  //创建点赞数
  const likedCount = document.createElement("i");
  likedCount.className = "iconfont";
  likedCount.innerHTML = "&#xe9fc; " + data.likedCount;
  li.appendChild(likedCount);
  //最后将小li追加进评论区
  musicComment.appendChild(li);
};
