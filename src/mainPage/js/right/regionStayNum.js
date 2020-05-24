export function setRegionStayNum() {
    let regionStayNum = echarts.init(
        document.getElementById("regionStayNumDiv")
    );
    let selectTopN = document.getElementById("selectTopN");

    function setRegionStayNum(N) {
        fetch("http://122.51.19.160:8080/getAreaStayVolumes")
            .then((response) => {
                return response.json();
            })
            .then((oridata) => {
                let data = getTopNArea(oridata, N);
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
                    // roseType: "angle", //设置成南丁格尔图
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
                    // itemStyle: {
                    //     color: "dodgerblue",
                    //     shadowBlur: 200,
                    //     shadowColor: "rgba(0, 0, 0, 0.5)",
                    // },
                    // visualMap: {
                    //     // 不显示 visualMap 组件，只用于明暗度的映射
                    //     show: false,
                    //     // 映射的最小值为 80
                    //     min: 10,
                    //     // 映射的最大值为 600
                    //     max: 300,
                    //     inRange: {
                    //         // 明暗度的范围是 0 到 1
                    //         colorLightness: [0.9, 0.3],
                    //     },
                    // },
                    series: {
                        name: "区人口密度",
                        type: "pie",
                        radius: "50%",
                        data: data,
                    },
                    toolbox: {
                        left: "left",
                        feature: {
                            saveAsImage: {
                                name: "区域驻留人口密度排行:Top" + N,
                                iconStyle: {
                                    borderColor: "snow",
                                },
                            },
                        },
                    },
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    //尝试从sessionStorage读取
    if (sessionStorage.getItem("selectTopN") !== null) {
        setRegionStayNum(sessionStorage.getItem("selectTopN"));
        selectTopN.value = sessionStorage.getItem("selectTopN");
    } else {
        setRegionStayNum(selectTopN.value);
    }

    //发生change事件
    selectTopN.addEventListener("change", function () {
        let regPart = /^[1-9]$|^10$/;
        if (regPart.test(selectTopN.value)) {
            setRegionStayNum(selectTopN.value);
            sessionStorage.setItem("selectTopN", selectTopN.value);
        } else {
            alert("请输入1-10区间内的数字");
        }
    });

    window.addEventListener("resize", function () {
        regionStayNum.resize();
    });

    //取topN算法
    function getTopNArea(dataList, N) {
        let showList = [];
        dataList = dataList.sort(function (a, b) {
            return b.value - a.value;
        });
        //将排名前N的地区加入展示list
        for (let index = 0; index < N; index++) {
            let data = dataList[index];
            showList.push(data);
        }
        //将剩余的地区加入“其他”地区
        let valueSum = 0;
        if (N < 10) {
            for (let index = N; index < dataList.length; index++) {
                valueSum += dataList[index].value;
            }
            let otherArea = {
                name: "其他地区",
                value: valueSum,
            };
            showList.push(otherArea);
        }
        console.log(showList);
        return showList;
    }
}
