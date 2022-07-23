//ajax函数的封装
function ajax(options) {
  //存储默认值
  let defaults = {
    type: "get",
    url: "",
    async: true,
    //data为send数据
    data: "",
    contentType: "application/x-www-form-urlencoded",
    success: function (response, xhr) {},
    error: function (response, xhr) {},
  };

  //对象覆盖，将传入的options覆盖掉默认defaults
  Object.assign(defaults, options);

  //创建ajax对象
  let xhr = new XMLHttpRequest();
  //string为拼接请求参数变量
  let string = "";
  //循环用户传递进来的对象格式参数
  for (let attr in defaults.data) {
    //将参数转化为字符串格式
    string += attr + "=" + defaults.data[attr] + "&";
  }
  //将参数最后的'&'截取掉,返回新字符串
  string = string.substr(0, string.length - 1);
  //判断请求方式是否为get
  if (defaults.type == "get") {
    if (string == "") {
    } else {
      defaults.url = defaults.url + "?" + string;
    }
  }
  //withCredentials当前请求为跨域类型时是否在请求中协带cookie。
  xhr.withCredentials = true;
  //配置ajax对象
  xhr.open(defaults.type, defaults.url, defaults.async);
  //如果请求方式为post
  if (defaults.type == "post") {
    //设置请求参数格式的类型
    xhr.setRequestHeader("Content-Type", defaults.contentType);
    //判断用户希望的请求参数格式的类型
    //若为json则将传入的参数数据对象转化为JSON格式后发送
    if (defaults.contentType == "application/json") {
      xhr.send(JSON.stringify(defaults.data));
    } else {
      xhr.send(string);
    }
  } else {
    //发送请求
    xhr.send();
  }
  //监听xhr对象的onload事件，当xhr对象接收完响应数据后触发
  xhr.onload = function () {
    const responseContentType = xhr.getResponseHeader("Content-Type");
    let response = xhr.response;
    //如果响应类型中包含application/json
    if (responseContentType.includes("application/json")) {
      //将json转化为JS对象
      response = JSON.parse(xhr.response);
    }
    //当HTTP状态码为200时
    if (xhr.status == 200) {
      //请求成功，调用处理请求成功的函数
      defaults.success(response, xhr);
    } else {
      //请求失败，调用处理请求失败的函数
      defaults.error(response, xhr);
    }
  };
}
