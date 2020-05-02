let vehicleType = echarts.init(document.getElementById("vehicleTypeDiv"));

const areaSelect = document.getElementById("areaSelect");

areaSelect.addEventListener("change", function () {
    let areaOption = areaSelect.value;
    setVehicleType(areaOption);
});

let areaOption = areaSelect.value;
setVehicleType(areaOption);
function setVehicleType(areaOption) {
    fetch(
        "http://122.51.19.160:8080/getTravelWayVolumeByArea?area=" + areaOption
    )
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let options = {
                title: {
                    text: "出行交通方式统计",
                    textStyle: {
                        color: "white",
                    },
                    left: "center",
                },
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
                    },
                ],
            };
            vehicleType.setOption(options);
        })
        .catch((err) => {
            console.log(err);
        });
}
