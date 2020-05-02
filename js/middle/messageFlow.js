let messageFlow = echarts.init(document.getElementById("messageFlow"));

let date = [];
let data = [Math.random() * 150];

//模拟数据
// let base = new Date(2020, 5, 1);
// let oneDay = 24 * 3600 * 1000;
// let now = new Date(base);

function addData(shift) {
    let now = new Date();
    now = [
        checkTime(now.getHours()),
        checkTime(now.getMinutes()),
        checkTime(now.getSeconds()),
    ].join(":");
    date.push(now);
    data.push(Math.random() * 20);
    if (shift) {
        date.shift();
        data.shift();
    }
    // now = new Date(+new Date(now) + oneDay);
}

for (var i = 1; i < 7; i++) {
    addData();
}

//模拟数据

//生产环境
// function addData(shift){
//     date.push();
//     data.push();
//     if(shift){
//         date.shift();
//         data.shift();
//     }
// }
//生产环境
messageFlow.setOption({
    grid: {
        top: "10%",
        left: "10%",
        right: "10%",
        bottom: "12%",
    },
    xAxis: {
        type: "category",
        boundaryGap: false,
        data: date,
        axisLabel: {
            show: true,
            textStyle: {
                color: "#fff",
                fontSize: "12",
            },
        },
    },
    yAxis: {
        // boundaryGap: [0, "50%"],
        type: "value",
        axisLabel: {
            show: true,
            textStyle: {
                color: "#fff",
                fontSize: "12",
            },
        },
    },
    tooltip: {
        trigger: "axis",
    },
    series: [
        {
            name: "数量",
            type: "line",
            symbolSize: 8, //拐点圆的大小
            smooth: false,
            //symbol: 'none',
            stack: "zzz",
            data: data,
            markLine: {
                data: [
                    {
                        name: "fsdf",
                        yAxis: 30,
                    },
                ],
            },

            itemStyle: {
                normal: {
                    color: "red",
                    lineStyle: {
                        color: "#2B908F",
                    },
                    label: {
                        //show:true
                    },
                },
            },
        },
    ],
});

setInterval(function () {
    addData(true);
    messageFlow.setOption({
        xAxis: {
            data: date,
        },
        series: [
            {
                name: "数量",
                data: data,
            },
        ],
    });
}, 1000);
