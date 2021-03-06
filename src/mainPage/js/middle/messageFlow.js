import {
    showDataToMessageFlow,
    keyPointObjList,
    keyPointSelectList,
} from "./mainMap.js";

import { checkTime } from "../../../header/header.js";

export let messageFlow = echarts.init(
    document.getElementById("messageFlowDiv")
);

export function setMessageFlow() {
    let date = [];
    let data = [];

    //模拟数据
    // setInterval(function () {
    //     addData(true);
    //     messageFlow.setOption({
    //         xAxis: {
    //             data: date,
    //         },
    //         series: [
    //             {
    //                 name: "数量",
    //                 data: data,
    //             },
    //         ],
    //     });
    // }, 1000);

    //shift为false，数组长度+1；为true，数组长度不变
    function addData(shift, newData) {
        let now = new Date();
        now = [
            checkTime(now.getHours()),
            checkTime(now.getMinutes()),
            checkTime(now.getSeconds()),
        ].join(":");
        date.push(now);
        data.push(newData);
        if (shift) {
            date.shift();
            data.shift();
        }
    }
    //生产环境
    getMessageFlowData();
    function getMessageFlowData() {
        let click = 0;
        let lastDataObj = { name: "" };
        let overFlowNameList = [];
        let host = "http://122.51.19.160:8080";
        let Socket = new SockJS(host + "/hhuc");
        let StompClient = Stomp.over(Socket);
        StompClient.connect({}, function () {
            StompClient.subscribe("/user/place/hotplace", function (res) {
                let newDataObj = JSON.parse(res.body);

                //overflow发生，设置主图预警
                if (newDataObj.overflow === true) {
                    keyPointObjList.forEach(function (keyPointObj) {
                        if (keyPointObj.name === newDataObj.name) {
                            overFlowNameList.push(keyPointObj.name);
                            keyPointObj.overflow = true;
                            AMapUI.loadUI(["overlay/SvgMarker"], function (
                                SvgMarker
                            ) {
                                keyPointObj.marker.setSvgShape(
                                    new SvgMarker.Shape.IconFont({
                                        // 参见 symbol引用, http://www.iconfont.cn/plus/help/detail?helptype=code
                                        symbolJs:
                                            "http://at.alicdn.com/t/font_1839418_b7satvs6cx.js",
                                        icon: "iconweizhi",
                                        size: 20,
                                        offset: [-10, -22],
                                        fillColor: "red",
                                    })
                                );
                            });
                            keyPointObj.marker.show();
                        }
                    });
                }
                //overflow解除
                else {
                    overFlowNameList.forEach(function (overFlowName, index) {
                        if (overFlowName === newDataObj.name) {
                            overFlowNameList.splice(index, 1);
                            keyPointObjList.forEach(function (keyPointObj) {
                                if (keyPointObj.name === overFlowName) {
                                    //将红色小旗隐藏
                                    keyPointObj.overflow = false;
                                    AMapUI.loadUI(
                                        ["overlay/SvgMarker"],
                                        function (SvgMarker) {
                                            keyPointObj.marker.setSvgShape(
                                                new SvgMarker.Shape.IconFont({
                                                    // 参见 symbol引用, http://www.iconfont.cn/plus/help/detail?helptype=code
                                                    symbolJs:
                                                        "http://at.alicdn.com/t/font_1839418_b7satvs6cx.js",
                                                    icon: "iconweizhi",
                                                    size: 20,
                                                    offset: [-10, -22],
                                                    fillColor: "lawngreen",
                                                })
                                            );
                                        }
                                    );
                                    keyPointObj.marker.hide();
                                    //若某热点区域被用户选择显示，则仍然将黄色小旗显示在主图上
                                    if (
                                        keyPointSelectList.indexOf(
                                            keyPointObj.name
                                        ) !== -1
                                    ) {
                                        keyPointObj.marker.show();
                                    }
                                }
                            });
                        }
                    });
                }

                //设置主图下方窗口
                if (newDataObj.name === showDataToMessageFlow) {
                    messageFlow.hideLoading();
                    //检测地名是否变化
                    if (newDataObj.name === lastDataObj.name) {
                        click++;
                        //先充入七个数据
                        if (click < 7) {
                            addData(false, newDataObj.nowNum);
                        } else {
                            addData(true, newDataObj.nowNum);
                        }
                        messageFlow.setOption({
                            xAxis: {
                                data: date,
                            },
                            series: [
                                {
                                    name: "数量",
                                    data: data,
                                },
                            ],
                        });
                    } else {
                        click = 0;
                        date = [];
                        data = [];
                        addData(false, newDataObj.nowNum);
                        //初始化or重新设置预警线
                        messageFlow.setOption({
                            title: {
                                show: false,
                                text: "热点地区实时监测",
                            },
                            grid: {
                                top: "20%",
                                left: "10%",
                                right: "10%",
                                bottom: "12%",
                            },
                            xAxis: {
                                type: "category",
                                boundaryGap: false,
                                data: date,
                                axisLabel: {
                                    show: true,
                                    textStyle: {
                                        color: "#fff",
                                        fontSize: "12",
                                    },
                                },
                            },
                            yAxis: {
                                // boundaryGap: [0, "50%"],
                                type: "value",
                                axisLabel: {
                                    show: true,
                                    textStyle: {
                                        color: "#fff",
                                        fontSize: "12",
                                    },
                                },
                            },
                            tooltip: {
                                trigger: "axis",
                            },
                            toolbox: {
                                left: "left",
                                feature: {
                                    saveAsImage: {
                                        name:
                                            "热点区域实时监测:" +
                                            showDataToMessageFlow,
                                        iconStyle: {
                                            borderColor: "snow",
                                        },
                                    },
                                },
                            },
                            series: [
                                {
                                    name: "数量",
                                    type: "line",
                                    symbolSize: 8, //拐点圆的大小
                                    smooth: false,
                                    //symbol: 'none',
                                    stack: "zzz",
                                    data: data,
                                    markLine: {
                                        data: [
                                            {
                                                name: "fsdf",
                                                yAxis: newDataObj.maxnum,
                                            },
                                        ],
                                    },
                                    itemStyle: {
                                        normal: {
                                            color: "red",
                                            lineStyle: {
                                                color: "#2B908F",
                                            },
                                            label: {
                                                //show:true
                                            },
                                        },
                                    },
                                },
                            ],
                        });
                    }
                    lastDataObj = newDataObj;
                }
            });
        });
    }
    window.addEventListener("resize", function () {
        messageFlow.resize();
    });
}
