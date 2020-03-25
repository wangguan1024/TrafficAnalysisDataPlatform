// from "沈阳轮廓图"

let migrationMap = echarts.init(document.getElementById('migration'));

let Jsondata = null;

let option = {
    title: {
        text: '基站散点图',
        x: 'center',
        textStyle: {
            color: '#fff'
        }
    },
    tooltip: {
        trigger: 'item',
        formatter: function (params) {
            return params.name + ' : ' + params.value[2];
        }
    },
    legend: {
        orient: 'vertical',
        top: 'bottom',
        left: 'right',
        data: ['pm2.5'],
        textStyle: {
            color: '#fff'
        }
    },
    visualMap: {
        min: 0,
        max: 200,
        calculable: true,
        inRange: {
            color: ['#50a3ba', '#eac736', '#d94e5d']
        },
        textStyle: {
            color: '#fff'
        }
    },
    geo: {
        show: true,
        map: 'ShenYangJson',
        center: [123.13, 42.12],
        label: {
            normal: {
                show: true,
                color: '#ccc',
                fontSize: 8
            },
            emphasis: {
                show: false,
                color: '#fff'
            }
        },
        roam: true,
        scaleLimit: {
            min: 0.8,
            max: 40,
        },
        itemStyle: {
            normal: {
                label: {
                    show: true,
                    color: '#fff',
                    fontSize: 10
                },
                areaColor: 'rgba(24,99,150,0.05)',
                borderColor: '#407f96',
                shadowColor: '#186396',
                shadowBlur: 10
            },
            emphasis: {
                label: {
                    show: false,
                    color: '#fff',
                    shadowColor: '#25zde6',
                    shadowBlur: 10
                },
                areaColor: 'rgba(24,99,150,0.5)'
            }
        },
        zoom: 1.25
    },
    series: [{
        name: '基站散点',
        type: 'heatmap',
        map: 'ShenYangJson',
        coordinateSystem: 'geo',
        //datas未定义
        // data: datas,
        //datas未定义
        symbolSize: 5,
        emphasis: {
            symbolSize: 7,
            itemStyle: {
                show: false,
                borderColor: '#fff',
                borderWidth: 1
            }
        }
    }]
};

// let option = {
//     series: [{
//         type: 'map',
//         map: 'ShenYangJson'
//     }]
// }
$.getJSON("./data/shenyang.json", "", function (Mapdata) {
    echarts.registerMap('ShenYangJson', Mapdata);
    // migrationMap.setOption(option, Mapdata);
    migrationMap.setOption(option);
});