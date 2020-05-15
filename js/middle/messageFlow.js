setMessageFlow();

function setMessageFlow() {
    let date = [];
    let data = [];

    //生产环境
    let messageFlow = echarts.init(document.getElementById("messageFlowDiv"));

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
    // getMessageFlowData();
    function getMessageFlowData() {
        let click = 0;
        let lastDataObj = { name: "" };
        let host = "http://122.51.19.160:8080";
        let Socket = new SockJS(host + "/hhuc");
        let StompClient = Stomp.over(Socket);
        StompClient.connect({}, function () {
            StompClient.subscribe("/user/place/hotplace", function (res) {
                //显示主图下方窗口 调整主图大小
                let mainMapAndTitle = document.getElementById(
                    "mainMapAndTitle"
                );
                let messageFlowAndCloseBtn = document.getElementById(
                    "messageFlowAndCloseBtn"
                );
                messageFlowAndCloseBtn.style.display = "block";
                messageFlowAndCloseBtn.style.height = "30%";
                mainMapAndTitle.style.height = "70%";
                //js动态改变了父容器div宽高，手动刷新图表使其适应容器
                messageFlow.resize();
                // console.log(data);
                let newDataObj = JSON.parse(res.body);
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
            });
        });
    }
    window.addEventListener("resize", function () {
        messageFlow.resize();
    });
}

function setMessageFlowCloseBtn() {
    let closeMessageFlowDivBtn = document.getElementById(
        "closeMessageFlowDivBtn"
    );
    let mainMapAndTitle = document.getElementById("mainMapAndTitle");
    let messageFlowAndCloseBtn = document.getElementById(
        "messageFlowAndCloseBtn"
    );

    closeMessageFlowDivBtn.addEventListener("click", function () {
        messageFlowAndCloseBtn.style.display = "none";
        messageFlowAndCloseBtn.style.height = "0%";
        mainMapAndTitle.style.height = "100%";
        //发送空数据使得websocket停止发送
        let oriData = {
            places: [],
        };
        fetch("http://122.51.19.160:8080/putPlaces", {
            method: "POST", // or 'PUT'
            body: JSON.stringify(oriData), // data can be `string` or {object}!
            headers: new Headers({
                "Content-Type": "application/json",
            }),
        }).catch((err) => {
            console.log(err);
        });
    });
}

setMessageFlowCloseBtn();
