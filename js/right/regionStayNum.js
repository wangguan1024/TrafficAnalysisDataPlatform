setRegionStayNum();

function setRegionStayNum() {
    let regionStayNum = echarts.init(
        document.getElementById("regionStayNumDiv")
    );
    regionStayNum.setOption({
        tooltip: {
            //饼图、仪表盘、漏斗图: {a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
            // trigger: "item",
            formatter: function (params, ticket, callback) {
                let name = params.name;
                let value = params.value;
                return name + "<br/>数量：" + value;
            },
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
            color: "navy",
            shadowBlur: 200,
            shadowColor: "rgba(0, 0, 0, 0.5)",
        },

        visualMap: {
            // 不显示 visualMap 组件，只用于明暗度的映射
            show: false,
            // 映射的最小值为 80
            min: 10,
            // 映射的最大值为 600
            max: 300,
            inRange: {
                // 明暗度的范围是 0 到 1
                colorLightness: [0.9, 0.3],
            },
        },
    });
    //模拟数据
    // dataList = [
    //     {
    //         name: "1区",
    //         value: 3000,
    //     },
    //     {
    //         name: "2区",
    //         value: 400,
    //     },
    //     {
    //         name: "3区",
    //         value: 200,
    //     },
    //     {
    //         name: "4区",
    //         value: 600,
    //     },
    //     {
    //         name: "5区",
    //         value: 700,
    //     },
    //     {
    //         name: "6区",
    //         value: 800,
    //     },
    //     {
    //         name: "7区",
    //         value: 900,
    //     },
    //     {
    //         name: "8区",
    //         value: 1000,
    //     },
    //     {
    //         name: "9区",
    //         value: 1100,
    //     },
    //     {
    //         name: "10区",
    //         value: 1200,
    //     },
    // ];

    //从服务器获取数据
    fetch("http://122.51.19.160:8080/getAreaStayVolumes")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            // console.log(data);
            data = getTopNArea(data, 6);
            regionStayNum.setOption({
                series: {
                    name: "区人口密度",
                    type: "pie",
                    radius: "50%",
                    data: data,
                },
            });
            window.addEventListener("resize", function () {
                regionStayNum.resize();
            });
        })
        .catch((err) => {
            console.log(err);
        });
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
}
