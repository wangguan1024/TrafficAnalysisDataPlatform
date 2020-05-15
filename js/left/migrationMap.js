setMigrationMap();

function setMigrationMap() {
    let migrationMap = echarts.init(document.getElementById("migrationMapDiv"));

    let areaNameList = [];
    geoCoordMap.forEach(function (item, i) {
        areaNameList.push(item.name);
    });
    let dataList = [];

    areaNameList.forEach(function (item, i) {
        let tempObj = {
            name: item,
            value: [],
        };
        dataList.push(tempObj);
    });

    fetch("http://122.51.19.160:8080/getCrossRegionVolumes")
        .then((res) => {
            return res.json();
        })
        .then((oriData) => {
            // console.log(oriData);
            //原数据格式处理
            oriData.forEach(function (dataItem, i) {
                dataList.forEach(function (objItem, j) {
                    if (
                        dataItem.startArea === objItem.name &&
                        dataItem.startArea !== dataItem.endArea
                    ) {
                        objItem.value.push(dataItem);
                    }
                });
            });
            //设置series
            let series = [];
            dataList.forEach(function (item, i) {
                if (item.value.length !== 0) {
                    let startAreaData = [
                        {
                            name: item.name,
                            value: getCoord(item.value[0].startArea).concat([
                                5,
                            ]),
                        },
                    ];
                    series.push(
                        //起点
                        {
                            name: item.name,
                            type: "effectScatter",
                            coordinateSystem: "geo",
                            zlevel: 3,
                            rippleEffect: {
                                brushType: "stroke",
                            },
                            label: {
                                normal: {
                                    show: true,
                                    position: "right",
                                    formatter: "{b}",
                                },
                            },
                            tooltip: {
                                formatter: function (params, ticket, callback) {
                                    let res = "";
                                    let name = params.seriesName;
                                    let value = params.data.value;
                                    res =
                                        name +
                                        "->" +
                                        name +
                                        "<br/>数量：" +
                                        value[2];
                                    return res;
                                },
                            },
                            symbolSize: 5,
                            itemStyle: {
                                normal: {
                                    color: "aqua",
                                },
                            },
                            data: startAreaData,
                        },
                        //路径
                        {
                            name: item.name,
                            type: "lines",
                            zlevel: 2,
                            symbol: ["none"],
                            symbolSize: 5,
                            tooltip: {
                                formatter: function (params, ticket, callback) {
                                    return "";
                                },
                            },
                            effect: {
                                show: true,
                                period: 3,
                                trailLength: 0.7,
                                symbol: "arrow",
                                symbolSize: 5,
                            },
                            lineStyle: {
                                normal: {
                                    color: "white",
                                    width: 1,
                                    opacity: 0.6,
                                    curveness: 0.2,
                                },
                            },
                            data: convertData(item.value),
                        },
                        //终点
                        {
                            name: item.name,
                            type: "effectScatter",
                            coordinateSystem: "geo",
                            zlevel: 3,
                            rippleEffect: {
                                brushType: "stroke",
                            },
                            label: {
                                normal: {
                                    show: true,
                                    position: "right",
                                    formatter: "{b}",
                                },
                            },
                            tooltip: {
                                formatter: function (params, ticket, callback) {
                                    let res = "";
                                    let beginAreaName = params.seriesName;
                                    let endAreaName = params.name;
                                    let value = params.value;
                                    params.value[params.seriesIndex + 1];
                                    res =
                                        beginAreaName +
                                        "->" +
                                        endAreaName +
                                        "<br/>数量：" +
                                        value[2];
                                    // "<span style='color:#fff;'>" +
                                    // name +
                                    // "</span><br/>数据：" +
                                    // value[2];

                                    return res;
                                },
                            },
                            symbolSize: function (val) {
                                return val[2];
                            },
                            itemStyle: {
                                normal: {
                                    color: "#a6c84c",
                                },
                            },
                            data: item.value.map(function (dataItem) {
                                return {
                                    name: dataItem.endArea,
                                    value: getCoord(dataItem.endArea).concat([
                                        dataItem.value,
                                    ]),
                                };
                            }),
                        }
                    );
                }
            });
            //设置tooltip的showlist
            let showList = [];
            dataList.forEach(function (item, i) {
                if (item.value.length !== 0) {
                    showList.push(item.name);
                }
            });

            migrationMap.setOption({
                tooltip: {
                    trigger: "item",
                },
                legend: {
                    orient: "vertical",
                    top: "bottom",
                    left: "right",
                    data: showList,
                    textStyle: {
                        color: "#fff",
                    },
                    selectedMode: "single",
                },
                geo: {
                    map: "ShenYang",
                    center: [123.43, 41.8],
                    zoom: 5,
                    roam: true,
                    label: {
                        normal: {
                            show: false,
                            textStyle: {
                                color: "#b7b6c9",
                            },
                        },
                        emphasis: {
                            // 对应的鼠标悬浮效果
                            show: false,
                            textStyle: {
                                color: "#b7b6c9",
                            },
                        },
                    },

                    itemStyle: {
                        borderColor: "rgba(147, 235, 248, 1)",
                        borderWidth: 0.3,
                        areaColor: {
                            type: "radial",
                            x: 0.5,
                            y: 0.5,
                            r: 0.8,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: "rgba(175,238,238, 0)", // 0% 处的颜色
                                },
                                {
                                    offset: 1,
                                    color: "rgba(47,79,79, .1)", // 100% 处的颜色
                                },
                            ],
                            globalCoord: false, // 缺省为 false
                        },
                        // shadowColor: "rgba(128, 217, 248, 1)",
                        // shadowOffsetX: -2,
                        // shadowOffsetY: 2,
                        // shadowBlur: 10,

                        emphasis: {
                            areaColor: "rgba(47,79,79, .1)",
                            borderWidth: 0.3,
                        },
                    },
                },
                series: series,
            });
        })
        .catch((err) => {
            console.log(err);
        });

    //通过字典由地址名找到坐标
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

    function convertData(data) {
        let res = [];
        data.forEach((dataItem, i) => {
            let fromCoord = getCoord(dataItem.startArea);
            let toCoord = getCoord(dataItem.endArea);
            if (fromCoord && toCoord) {
                res.push({
                    fromName: dataItem.startArea,
                    toName: dataItem.endArea,
                    coords: [fromCoord, toCoord],
                });
            }
        });
        return res;
    }
    window.addEventListener("resize", function () {
        migrationMap.resize();
    });
}
