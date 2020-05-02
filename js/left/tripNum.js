let tripNum = echarts.init(document.getElementById("tripNumDiv"));
let stateSelectButton = document.getElementById("stateSelectButton");

stateSelectButton.addEventListener("click", function () {
    if (stateSelectButton.innerText === "切换为区域分布") {
        setChartBySpace();
        stateSelectButton.innerText = "切换为时间分布";
    } else {
        setChartByTime();
        stateSelectButton.innerText = "切换为区域分布";
    }
});

setChartByTime();

function setChartBySpace() {
    fetch("http://122.51.19.160:8080/getTravelAreaVolumes")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            // tripNum.setOption({
            //     title: {
            //         text: "各区域人口出行量分析",
            //         textStyle: {
            //             color: "white",
            //         },
            //         left: "center",
            //     },
            //     tooltip: {
            //         trigger: "axis",
            //     },
            //     xAxis: {
            //         type: "category",
            //         boundaryGap: false,
            //         // name: "时间",
            //         // nameLocation: "middle",
            //         // nameTextStyle: {
            //         //     color: "#fff",
            //         //     fontSize: "12",
            //         // },
            //         axisLabel: {
            //             textStyle: {
            //                 color: "#fff",
            //                 fontSize: "10",
            //             },
            //         },
            //     },
            //     yAxis: {
            //         axisLabel: {
            //             textStyle: {
            //                 color: "#fff",
            //                 fontSize: "10",
            //             },
            //         },
            //     },
            //     dataset: {
            //         source: data,
            //     },
            //     series: {
            //         type: "bar",
            //         encode: {
            //             x: "area",
            //             y: "data",
            //         },
            //     },
            // });
            tripNum.setOption({
                title: {
                    text: "各区域人口出行量分析",
                    textStyle: {
                        color: "white",
                    },
                    left: "center",
                },
                tooltip: {
                    trigger: "item",
                },

                dataset: {
                    source: data,
                },
                series: {
                    type: "geo",
                    map: "ShenYang",
                    encode: {
                        name: "area",
                        value: "data",
                    },
                },
            });
        });
}

function setChartByTime() {
    let options = {};
    fetch("http://122.51.19.160:8080/getTravelTimeVolumes")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            tripNum.setOption({
                title: {
                    text: "各时间段人口出行量分析",
                    textStyle: {
                        color: "white",
                    },
                    left: "center",
                },
                tooltip: {
                    trigger: "axis",
                },
                xAxis: {
                    type: "time",
                    boundaryGap: false,
                    axisLabel: {
                        textStyle: {
                            color: "#fff",
                            fontSize: "12",
                        },
                    },
                },
                yAxis: {
                    axisLabel: {
                        textStyle: {
                            color: "#fff",
                            fontSize: "12",
                        },
                    },
                },
                series: {
                    type: "line",
                    encode: {
                        x: "time",
                        y: "value",
                    },
                },
                dataset: {
                    source: data,
                },
                series: {
                    type: "line",
                    encode: {
                        x: "time",
                        y: "data",
                    },
                },
            });
        })
        .catch((err) => {
            console.log(err);
        });
}
