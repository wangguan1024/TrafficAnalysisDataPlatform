let migrationMap = echarts.init(document.getElementById("migrationMap"));
let option = {
    title: {
        text: "人口迁移图",
        left: "center",
        textStyle: {
            color: "#fff",
        },
    },
    geo: {
        show: true,
        map: "ShenYangJson",
        center: [123.13, 42.12],
        label: {
            normal: {
                show: true,
                color: "#ccc",
                fontSize: 8,
            },
            emphasis: {
                show: true,
                color: "#fff",
            },
        },
        roam: true,
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
        zoom: 1.25,
    },
    series: [],
};

$.getJSON("./data/shenyang.json", "", function (data) {
    echarts.registerMap("ShenYangJson", data);
    migrationMap.setOption(option);
});
