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
    tripNum.showLoading();
    fetch("http://122.51.19.160:8080/datas.json")
        .then((response) => {
            return response.json();
        })
        .then((geoJson) => {
            tripNum.hideLoading();
            echarts.registerMap("天津", geoJson);
            let options = {
                title: {
                    text: "各区域人口出行量分析",
                    textStyle: {
                        color: "white",
                    },
                    left: "center",
                },
                series: {
                    type: "map",
                    mapType: "天津",
                },
            };
        });
}

function setChartByTime() {
    let options = {
        title: {
            text: "各时间段人口出行量分析",
            textStyle: {
                color: "white",
            },
            left: "center",
        },
        // grid: {
        //     top: "15%",
        //     left: "5%",
        //     right: "2%",
        //     bottom: "10%",
        //     containLabel: true,
        // },
        tooltip: {
            trigger: "axis",
        },
        dataset: {
            dimensions: ["time", "value"],
            source: [
                {
                    time: "17:00",
                    value: "5000",
                },
                {
                    time: "17:10",
                    value: "6000",
                },
                {
                    time: "17:20",
                    value: "5500",
                },
                {
                    time: "17:30",
                    value: "6200",
                },
                {
                    time: "17:40",
                    value: "6700",
                },
                {
                    time: "17:50",
                    value: "7000",
                },
                {
                    time: "18:00",
                    value: "6800",
                },
            ],
        },
        xAxis: {
            type: "category",
            // name: "时间",
            // nameLocation: "middle",
            // nameTextStyle: {
            //     color: "#fff",
            //     fontSize: "12",
            // },
            axisLabel: {
                textStyle: {
                    color: "#fff",
                    fontSize: "8",
                },
            },
        },
        yAxis: {
            axisLabel: {
                textStyle: {
                    color: "#fff",
                    fontSize: "8",
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
    };
    tripNum.setOption(options);
}
