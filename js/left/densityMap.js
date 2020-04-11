let densityMap = echarts.init(document.getElementById("densityMapDiv"));
setTimeDensityShow();

function setTimeDensityShow() {
    densityMap.clear();
    let options = {
        title: {
            text: "区域人口密度时间变化趋势",
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
            name: "时间",
            nameLocation: "middle",
            nameTextStyle: {
                color: "#fff",
                fontSize: "12",
            },
            axisLabel: {
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
        series: {
            type: "line",
            encode: {
                x: "time",
                y: "value",
            },
        },
    };
    densityMap.setOption(options);
}

// setTimeout(function () {
//     window.onresize = function () {
//         densityMap.resize();
//     };
// }, 200);
