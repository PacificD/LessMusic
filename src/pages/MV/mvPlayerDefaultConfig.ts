/*
 * @Author: Pacific_D
 * @Date: 2022-07-29 16:12:33
 * @LastEditTime: 2022-07-29 16:16:41
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \lessMusic\src\pages\MV\mvPlayerDefaultConfig.ts
 */
type MVPlayerConfig = {
    fitVideoSize: "fixHeight" | "fixWidth" | "auto"
    lang: "zh-cn" | "en" | "jp"
    [key: string]: any
}

const config: MVPlayerConfig = {
    // 流式布局，可使播放器宽度跟随父元素的宽度大小变化，且高度按照配置项中的高度和宽度的比例来变化
    //   fluid: true,
    // 高度固定，宽度自适应
    fitVideoSize: "fixHeight",
    errorTips: "请<span>刷新</span>试试",
    definitionActive: "click",
    playbackRate: [0.5, 0.75, 1, 1.5, 2],
    defaultPlaybackRate: 1,
    download: false,
    lang: "zh-cn",
    // 画中画
    pip: true,
    screenShot: {
        saveImg: true
    },
    keyShortcut: "on",
    keyShortcutStep: {
        //设置调整步长
        currentTime: 15, //播放进度调整步长，默认10秒
        volume: 0.2 //音量调整步长，默认0.1
    },
    //   width: 600,
    //   height: 337.5,
    rotate: {
        //视频旋转按钮配置项
        innerRotate: true, //只旋转内部video
        clockwise: false // 旋转方向是否为顺时针
    }
}

export default config
