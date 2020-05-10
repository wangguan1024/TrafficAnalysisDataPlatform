setTrimNum();

function setTrimNum() {
    let stateSelectButton = document.getElementById("stateSelectButton");
    let tripNumDivByTime = document.getElementById("tripNumDivByTime");
    let tripNumDivBySpace = document.getElementById("tripNumDivBySpace");
    stateSelectButton.addEventListener("click", function () {
        if (stateSelectButton.innerText === "切换为区域分布") {
            stateSelectButton.innerText = "切换为时间分布";
            tripNumDivByTime.style.display = "none";
            tripNumDivBySpace.style.display = "block";
            setChartBySpace();
        } else {
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
                window.addEventListener("resize", function () {
                    tripNum.resize();
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function setChartBySpace() {
        function getCoord(areaName) {
            let lnglatList = [];
            geoCoordMap.forEach(function (item) {
                if (item.name === areaName) {
                    lnglatList.push(item.lng);
                    lnglatList.push(item.lat);
                }
            });
            return lnglatList;
        }
        function makeMapData(rawData) {
            let mapData = [];
            for (let i = 0; i < rawData.length; i++) {
                mapData.push({
                    name: rawData[i].area,
                    value: getCoord(rawData[i].area).concat([rawData[i].data]),
                });
            }
            return mapData;
        }

        fetch("http://122.51.19.160:8080/getTravelAreaVolumes")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                // console.log(data);
                let tripNum = echarts.init(
                    document.getElementById("tripNumDivBySpace")
                );
                reData = makeMapData(data);
                tripNum.setOption({
                    title: {
                        text: "各区域人口出行量分析",
                        textStyle: {
                            color: "white",
                        },
                        left: "center",
                        z: 200,
                    },
                    tooltip: {
                        trigger: "item",
                    },

                    geo: {
                        map: "ShenYang",
                        itemStyle: {
                            borderWidth: 0.2,
                            borderColor: "#404a59",
                            areaColor: "rgba(24,99,150,0.05)",
                        },
                        label: {
                            normal: {
                                show: false,
                                textStyle: {
                                    color: "#b7b6c9",
                                },
                            },
                            emphasis: {
                                // 对应的鼠标悬浮效果
                                show: true,
                                textStyle: {
                                    color: "#b7b6c9",
                                },
                            },
                        },
                        roam: true,
                        zoom: 1.25,
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    color: "#fff",
                                    fontSize: 10,
                                },
                                areaColor: "rgba(24,99,150,0.05)",
                                borderColor: "#407f96",
                                shadowColor: "#186396",
                                shadowBlur: 10,
                            },
                            emphasis: {
                                label: {
                                    show: false,
                                    color: "#fff",
                                    shadowColor: "#25zde6",
                                    shadowBlur: 10,
                                },
                                areaColor: "rgba(24,99,150,0.5)",
                            },
                        },
                    },
                    series: {
                        type: "scatter",
                        coordinateSystem: "geo",
                        data: reData,
                        label: {
                            formatter: "{b}",
                            position: "right",
                            show: false,
                        },
                        tooltip: {
                            formatter: function (params, ticket, callback) {
                                let name = params.name;
                                let value = params.value;
                                return name + "<br/>数量：" + value[2];
                            },
                        },
                        symbolSize: 10,
                    },
                });
                window.addEventListener("resize", function () {
                    tripNum.resize();
                });
            });
    }
}
