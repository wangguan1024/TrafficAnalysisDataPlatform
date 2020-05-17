setVehicleType();

function setVehicleType() {
    const areaSelect = document.getElementById("areaSelect");
    areaSelect.addEventListener("change", function () {
        let areaOption = areaSelect.value;
        setVehicleType(areaOption);
    });

    let areaOption = areaSelect.value;
    setVehicleType(areaOption);
    function setVehicleType(areaOption) {
        fetch(
            "http://122.51.19.160:8080/getTravelWayVolumeByArea?area=" +
                areaOption
        )
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                let vehicleType = echarts.init(
                    document.getElementById("vehicleTypeDiv")
                );
                let options = {
                    tooltip: {
                        trigger: "axis",
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
}