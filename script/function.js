//功能函数封装JS

//节流
const throttle = function (fn, delay) {
  // 设置一个布尔值变量
  let judge = true;
  // 执行该函数将会返回一个匿名函数
  return function () {
    // 如果此时judge为true，函数将继续向下执行，否则则返回。
    if (!judge) {
      return;
    }
    // 将judge设置为false
    judge = false;
    // 设置定时器，一段时间后将执行fn函数，并将judge改为true
    setTimeout(function () {
      fn();
      judge = true;
    }, delay);
  };
};

//防抖，先执行后延迟
function debounce(fn, waitTime, waitLog) {
  // 创建一个变量用来存放定时器的返回值
  var timeout;
  return function () {
    // timeout为undefined或null时，callNow=true;timeout有值时，callNow为false
    let callNow = !timeout;
    //如果timeout有值时则清除计时器
    if (timeout) {
      if (waitLog) {
        waitLog();
      }
      clearTimeout(timeout);
    }
    // 设置计时器，waitTime时间后将timeout置为null
    timeout = setTimeout(function () {
      timeout = null;
    }, waitTime);
    // callNow为true时才能执行fn
    if (callNow) fn();
  };
}
