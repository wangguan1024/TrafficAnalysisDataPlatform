let vehicleType = echarts.init(document.getElementById("vehicleTypeDiv"));

setVehicleType();

function setVehicleType() {
    let options = {
        // grid: {
        //     top: "10%",
        //     left: "10%",
        //     right: "10%",
        //     bottom: "10%",
        // },
        dataset: {
            source: [
                {
                    area: "和平区1",
                    way: "公交",
                    data: 108,
                },
                {
                    area: "和平区2",
                    way: "地铁",
                    data: 30,
                },
                {
                    area: "和平区3",
                    way: "步行1",
                    data: 10,
                },
                {
                    area: "和平区4",
                    way: "步行2",
                    data: 10,
                },
                {
                    area: "和平区5",
                    way: "步行3",
                    data: 10,
                },
                {
                    area: "和平区6",
                    way: "步行4",
                    data: 10,
                },
                {
                    area: "和平区7",
                    way: "步行5",
                    data: 10,
                },
                {
                    area: "和平区8",
                    way: "步行6",
                    data: 100,
                },
            ],
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
                encode: {
                    x: "way",
                    y: "data",
                },
            },
        ],
    };
    vehicleType.setOption(options);
}
