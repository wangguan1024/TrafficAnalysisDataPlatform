export function setVehicleType() {
    let vehicleType = echarts.init(document.getElementById("vehicleTypeDiv"));
    let areaSelect = document.getElementById("areaSelect");
    function setVehicleType(areaOption) {
        fetch(
            "http://122.51.19.160:8080/getTravelWayVolumeByArea?area=" +
                areaOption
        )
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                let options = {
                    tooltip: {
                        trigger: "axis",
                    },
                    toolbox: {
                        left: "left",
                        feature: {
                            saveAsImage: {
                                name: "出行交通方式统计:" + areaOption,
                                iconStyle: {
                                    borderColor: "snow",
                                },
                            },
                        },
                    },
                    dataset: {
                        source: data,
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
                    series: [
                        {
                            type: "bar",
                            barWidth: 40,
                            encode: {
                                x: "way",
                                y: "data",
                            },
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(
                                        0,
                                        0,
                                        0,
                                        1,
                                        [
                                            {
                                                offset: 0,
                                                color: "#FF9A22", // 0% 处的颜色
                                            },
                                            {
                                                offset: 1,
                                                color: "#FFD56E", // 100% 处的颜色
                                            },
                                        ],
                                        false
                                    ),
                                    barBorderRadius: [30, 30, 0, 0],
                                },
                            },
                            label: {
                                show: true,
                                fontSize: 12,
                                fontWeight: "bold",
                                position: "top",
                                color: "turquoise",
                            },
                        },
                    ],
                };
                vehicleType.setOption(options);
                window.addEventListener("resize", function () {
                    vehicleType.resize();
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }
    //尝试从sessionStorage读取
    if (sessionStorage.getItem("areaOption") !== null) {
        let areaOption = sessionStorage.getItem("areaOption");
        setVehicleType(areaOption);
        for (let index = 0; index < areaSelect.options.length; index++) {
            const element = areaSelect.options[index];
            if (element.value === areaOption) {
                element.selected = true;
            }
        }
    } else {
        let areaOption = areaSelect.value;
        setVehicleType(areaOption);
    }
    //change事件处理
    areaSelect.addEventListener("change", function () {
        let areaOption = areaSelect.value;
        sessionStorage.setItem("areaOption", areaOption);
        setVehicleType(areaOption);
    });
}
