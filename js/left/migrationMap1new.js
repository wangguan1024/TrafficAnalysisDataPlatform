let mapBoxEchart = echarts.init(document.getElementById("migrationMapDiv"));
//地图到坐标的映射
var geoCoordMap = {
    沈阳市: [123.429096, 41.796767],
    和平区: [123.406664, 41.788074],
    沈河区: [123.445696, 41.795591],
    大东区: [123.469956, 41.808503],
    皇姑区: [123.425677, 41.822336],
    铁西区: [122.950664, 41.720808],
    于洪区: [123.300829, 41.785833],
    辽中县: [122.721269, 41.522725],
    康平县: [123.352703, 42.751533],
    法库县: [123.406722, 42.497045],
    新民市: [122.828868, 41.996508],
    苏家屯区: [123.331604, 41.665904],
    沈北新区: [123.231471, 41.542312],
};

let YHQData = [
    [{ name: "于洪区" }, { name: "于洪区", value: 60 }],
    [{ name: "于洪区" }, { name: "和平区", value: 100 }],
    [{ name: "于洪区" }, { name: "大东区", value: 190 }],
    [{ name: "于洪区" }, { name: "沈北新区", value: 12 }],
    [{ name: "于洪区" }, { name: "沈河区", value: 112 }],
    [{ name: "于洪区" }, { name: "皇姑区", value: 110 }],
    [{ name: "于洪区" }, { name: "铁西区", value: 51 }],
];

let geoData = [
    {
        startArea: "于洪区",
        endArea: "和平区",
        volumn: 7,
    },
    {
        startArea: "于洪区",
        endArea: "大东区",
        volumn: 9,
    },
];

let convertData = function (data) {
    let res = [];
    for (let i = 0; i < data.length; i++) {
        let dataItem = data[i];
        let fromCoord = geoCoordMap[dataItem.startArea];
        let toCoord = geoCoordMap[dataItem.endArea];
        if (fromCoord && toCoord) {
            res.push([
                {
                    coord: fromCoord,
                },
                {
                    coord: toCoord,
                },
            ]);
        }
    }
    return res;
};
console.log(convertData(geoData));

let color = ["#a6c84c"];
let series = [];
[
    ["于洪区", YHQData],
    // ["和平区", HPQData],
    // ['大东区', DDQData],
    // ['新民市',XMSData],
    // ['沈北新区',SBXQData],
    // ["沈河区", SHQData],
    // ['皇姑区',HGQData],
    // ['苏家屯区',SJTQData],
    // ['辽中县',LZXData],
    // ['铁西区',TXQData]
].forEach(function (item, i) {
    series.push(
        {
            name: item[0],
            type: "lines",
            zlevel: 1,
            effect: {
                show: true,
                period: 6,
                trailLength: 0.7,
                color: "#fff",
                symbolSize: 3,
            },
            lineStyle: {
                normal: {
                    color: color,
                    width: 0,
                    curveness: 0.2,
                },
            },
            data: convertData(item[1]),
        },
        {
            name: item[0],
            type: "lines",
            zlevel: 2,
            effect: {
                show: true,
                period: 6,
                trailLength: 0,
                symbol: planePath,
                symbolSize: 15,
            },
            lineStyle: {
                normal: {
                    color: color,
                    width: 2,
                    opacity: 0.4,
                    curveness: 0.2,
                },
            },
            data: convertData(item[1]),
        },
        {
            name: item[0],
            type: "effectScatter",
            coordinateSystem: "geo",
            zlevel: 2,
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
            symbolSize: function (val) {
                return val[2] / 8;
            },
            itemStyle: {
                normal: {
                    color: color,
                },
            },
            data: item[1].map(function (dataItem) {
                return {
                    name: dataItem[1].name,
                    value: geoCoordMap[dataItem[1].name].concat([
                        dataItem[1].value,
                    ]),
                };
            }),
        }
    );
});

// 指定相关的配置项和数据
var mapBoxOption = {
    backgroundColor: "#0b122e",
    geo: {
        map: "beijing",
        roam: true, // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
        aspectScale: 0.75,
        zoom: 5.2,
        center: [123.300829, 41.785833],
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
            normal: {
                areaColor: "#0b122e",
                borderColor: "#0b122e",
            },
            emphasis: {
                borderWidth: 0,
                borderColor: "#0b122e",
                areaColor: "#0b122e",
                shadowColor: "#0b122e",
            },
        },
    },
    legend: {
        orient: "vertical",
        top: "bottom",
        left: "right",
        data: [
            "于洪区",
            "和平区",
            // '大东区',
            // '新民市',
            // '沈北新区',
            "沈河区",
            // '皇姑区',
            // '苏家屯区',
            // '辽中县',
            // '铁西区'
        ],
        textStyle: {
            color: "#fff",
        },
        selectedMode: "single",
    },
    series: series,
};
// 使用制定的配置项和数据显示图表
mapBoxEchart.setOption(mapBoxOption);
// echart图表自适应
window.addEventListener("resize", function () {
    mapBoxEchart.resize();
});
