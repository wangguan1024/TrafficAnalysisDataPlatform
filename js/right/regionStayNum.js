let regionStayNum = echarts.init(document.getElementById("regionStayNumDiv"));
setRegionStayNum();

function setRegionStayNum() {
    //chart初始化
    regionStayNum.setOption({
        title: {
            text: "区域驻留人口密度排行",
            textStyle: {
                color: "white",
            },
            left: "center",
        },
        series: [
            {
                name: "区人口密度",
                type: "pie",
                radius: "50%",
                // data: [{
                //         name: 'A区',
                //         value: 235
                //     },
                // ]
            },
        ],
        tooltip: {
            //饼图、仪表盘、漏斗图: {a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
            trigger: "item",
            formatter: "{b}<br/>{c}",
        },

        roseType: "angle", //设置成南丁格尔图
        textStyle: {
            //各扇形块的名字文本颜色统一
            color: "rgba(255, 255, 255, 0.6)",
        },
        labelLine: {
            //连线颜色统一
            lineStyle: {
                color: "rgba(255, 255, 255, 0.6)",
            },
        },
        itemStyle: {
            // 设置扇形的颜色：红色系
            color: "#c23531",
            shadowBlur: 200,
            shadowColor: "rgba(0, 0, 0, 0.5)",
        },
        visualMap: {
            // 不显示 visualMap 组件，只用于明暗度的映射
            show: false,
            // 映射的最小值为 80
            min: 100,
            // 映射的最大值为 600
            max: 3000,
            inRange: {
                // 明暗度的范围是 0 到 1
                colorLightness: [0.75, 0.25],
            },
        },
    });
    //获取数据并处理
    dataList = [
        {
            name: "1区",
            value: 3000,
        },
        {
            name: "2区",
            value: 400,
        },
        {
            name: "3区",
            value: 200,
        },
        {
            name: "4区",
            value: 600,
        },
        {
            name: "5区",
            value: 700,
        },
        {
            name: "6区",
            value: 800,
        },
        {
            name: "7区",
            value: 900,
        },
        {
            name: "8区",
            value: 1000,
        },
        {
            name: "9区",
            value: 1100,
        },
        {
            name: "10区",
            value: 1200,
        },
    ];

    //通过websocket获取数据
    // let dataList = getRegionStayNumData();
    //获得前topN
    showList = getTopNArea(dataList, 6);

    regionStayNum.setOption({
        series: {
            data: showList,
            encode: {
                itemName: "name",
                value: "value",
            },
        },
    });
}

function getTopNArea(dataList, N) {
    showList = [];
    showLength = N;
    dataList = dataList.sort(function (a, b) {
        return b.value - a.value;
    });

    //将排名前showLength的地区加入展示list
    for (let index = 0; index < showLength - 1; index++) {
        const data = dataList[index];
        showList.push(data);
    }

    //将剩余的地区加入“其他”地区
    let valueSum = 0;
    for (let index = showLength - 1; index < dataList.length; index++) {
        valueSum += dataList[index].value;
    }
    let otherArea = new Object();
    otherArea.name = "其他地区";
    otherArea.value = valueSum;
    showList.push(otherArea);
    return showList;
}

function getRegionStayNumData() {
    let host = "http://122.51.19.160:8080";
    let Socket = new SockJS(host);
    let StompClient = Stomp.over(Socket);
    StompClient.connect({}, function () {
        StompClient.subscribe("/getAreaStayVolumes", function (response) {
            let json = JSON.parse(response.body);
            return json;
        });
    });
}
