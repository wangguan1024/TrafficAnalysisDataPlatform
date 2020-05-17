setTrimNum();

function setTrimNum() {
    let stateSelectButton = document.getElementById("stateSelectButton");
    let tripNumTitle = document.getElementById("tripNumTitle");
    let tripNumDivByTime = document.getElementById("tripNumDivByTime");
    let tripNumDivBySpace = document.getElementById("tripNumDivBySpace");

    stateSelectButton.addEventListener("click", function () {
        if (stateSelectButton.innerText === "切换为区域分布") {
            tripNumTitle.innerText = "各区域人口出行量分析";
            stateSelectButton.innerText = "切换为时间分布";
            tripNumDivByTime.style.display = "none";
            tripNumDivBySpace.style.display = "block";
            setChartBySpace();
        } else {
            tripNumTitle.innerText = "各时间人口出行量分析";
            stateSelectButton.innerText = "切换为区域分布";
            tripNumDivBySpace.style.display = "none";
            tripNumDivByTime.style.display = "block";
            setChartByTime();
        }
    });

    setChartByTime();
    // setChartBySpace();

    function setChartByTime() {
        fetch("http://122.51.19.160:8080/getTravelTimeVolumes")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                let tripNum = echarts.init(
                    document.getElementById("tripNumDivByTime")
                );
                tripNum.setOption({
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
                    dataZoom: [
                        {
                            type: "inside",
                        },
                    ],
                    series: {
                        type: "line",
                        encode: {
                            x: "time",
                            y: "data",
                        },
                    },
                });
                window.addEventListener("resize", function () {
                    tripNum.resize();
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function setChartBySpace() {
        function makeMapData(rawData) {
            let reData = [];
            for (let i = 0; i < rawData.length; i++) {
                const oneRawData = rawData[i];
                for (let j = 0; j < geoCoordMap.length; j++) {
                    const dictObj = geoCoordMap[j];
                    if (dictObj.name === oneRawData.area) {
                        reData.push(oneRawData);
                        break;
                    }
                }
            }
            //数据从高到低排序
            reData.sort(function (a, b) {
                return b.data - a.data;
            });
            console.log(reData);
            return reData;
        }

        fetch("http://122.51.19.160:8080/getTravelAreaVolumes")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                let tripNum = echarts.init(
                    document.getElementById("tripNumDivBySpace")
                );
                reData = makeMapData(data);
                tripNum.setOption({
                    tooltip: {
                        trigger: "axis",
                    },
                    xAxis: {
                        type: "category",
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: "#fff",
                                fontSize: "12",
                            },
                        },
                    },
                    yAxis: {
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: "#fff",
                                fontSize: "12",
                            },
                        },
                    },
                    dataZoom: [
                        {
                            type: "inside",
                        },
                    ],

                    dataset: {
                        source: reData,
                    },
                    series: [
                        {
                            type: "pictorialBar",
                            barCategoryGap: "0%",
                            encode: {
                                x: "area",
                                y: "data",
                            },
                            symbol:
                                "path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z",
                            label: {
                                show: true,
                                position: "top",
                                distance: 15,
                                color: "aquamarine",
                                fontSize: 12,
                            },
                            itemStyle: {
                                normal: {
                                    color: {
                                        type: "linear",
                                        x: 0,
                                        y: 0,
                                        x2: 0,
                                        y2: 1,
                                        colorStops: [
                                            {
                                                offset: 0,
                                                color: "orangered", //  顶部颜色
                                            },
                                            {
                                                offset: 1,
                                                color: "salmon", //  底部颜色
                                            },
                                        ],
                                        global: false, //  缺省为  false
                                    },
                                },
                                emphasis: {
                                    opacity: 1,
                                },
                            },
                            z: 10,
                        },
                    ],
                });
                window.addEventListener("resize", function () {
                    tripNum.resize();
                });
            });
    }
}
