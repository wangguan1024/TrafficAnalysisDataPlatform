// let migrationMap = echarts.init(document.getElementById("migrationMap"));
// let option = {
//     title: {
//         text: "人口迁移图",
//         left: "center",
//         textStyle: {
//             color: "#fff",
//         },
//     },
//     geo: {
//         show: true,
//         map: "ShenYangJson",
//         center: [123.13, 42.12],
//         label: {
//             normal: {
//                 show: true,
//                 color: "#ccc",
//                 fontSize: 8,
//             },
//             emphasis: {
//                 show: true,
//                 color: "#fff",
//             },
//         },
//         roam: true,
//         itemStyle: {
//             normal: {
//                 label: {
//                     show: true,
//                     color: "#fff",
//                     fontSize: 10,
//                 },
//                 areaColor: "rgba(24,99,150,0.05)",
//                 borderColor: "#407f96",
//                 shadowColor: "#186396",
//                 shadowBlur: 10,
//             },
//             emphasis: {
//                 label: {
//                     show: false,
//                     color: "#fff",
//                     shadowColor: "#25zde6",
//                     shadowBlur: 10,
//                 },
//                 areaColor: "rgba(24,99,150,0.5)",
//             },
//         },
//         zoom: 1.25,
//     },
//     series: [],
// };
//
// $.getJSON("./data/shenyang.json", "", function (data) {
//     echarts.registerMap("ShenYangJson", data);
//     migrat
// ionMap.setOption(option);
// });

/**
 *  区域迁徙
 */
var migrationMap = new AMap.Map('migrationMap',{
    zoom:8.2,
    layers:[new AMap.TileLayer()],
    zIndex:100
})


AMapUI.load(['ui/misc/PathSimplifier', 'lib/$'], function(PathSimplifier, $){
    if (!PathSimplifier.supportCanvas) {
        alert('当前环境不支持 Canvas！');
        return;
    }

    var pathSimplifierIns = new PathSimplifier({
        zIndex: 100,
        //autoSetFitView:false,
        map: migrationMap, //所属的地图实例
        getPath: function(pathData, pathIndex) {

            return pathData.path;
        },
        getHoverTitle: function(pathData, pathIndex, pointIndex) {

            if (pointIndex >= 0) {
                //point
                return pathData.name + '，点：' + pointIndex + '/' + pathData.path.length;
            }

            return pathData.name + '，点数量' + pathData.path.length;
        },
        renderOptions: {

            renderAllPointsIfNumberBelow: -1 //绘制路线节点，如不需要可设置为-1
        }
    });

    window.pathSimplifierIns = pathSimplifierIns;
    //设置数据
    pathSimplifierIns.setData([{
        name:'路线',
        path: [
            [123.4080276, 41.92951965],
            [122.3643799, 41.76124954]
        ]
    }]);

    //对第一条线路（即索引 0）创建一个巡航器
    var navg1 = pathSimplifierIns.createPathNavigator(0, {
        loop: true, //循环播放
        speed: 1000000 //巡航速度，单位千米/小时
    });

    navg1.start();
});

// var pointList=[
//     {
//
//         lng:116.397428,
//         lat:39.90923
//
//     },
//
//     {
//
//         lng:116.397428,
//         lat:39.90923
//
//
//
//     },
//
//     {
//
//         lng:116.397428,
//         lat:39.90923
//
//     },
//     {
//
//         lng:116.397428,
//         lat:39.90923
//
//     }
//
//
// ];
//
//
// var a_mark;    //图标点
// var marker;
// var lineArr;
// migrationMap = new AMap.Map("migrationMap", {
//     resizeEnable: true,
//     center: [116.397428, 39.90923],
//     zoom: 14
// });
// migrationMap.plugin(["AMap.ToolBar"],function(){
//     //加载工具条
//     var tool = new AMap.ToolBar();
//     migrationMap.addControl(tool);
// });
//
// //地图图块加载完毕后执行函数
// function completeEventHandler(x,y){
//
//     marker3 = new AMap.Marker({
//         map:migrationMap,
//         //draggable:true, //是否可拖动
//         position:new AMap.LngLat(x,y),//基点位置
//         icon:"http://code.mapabc.com/images/car_03.png", //marker图标，直接传递地址url
//         offset:new AMap.Pixel(-26,-13), //相对于基点的位置
//         autoRotation:true
//     });
//     var lngX ;
//     var latY ;
//     lineArr = new Array();
//
//     for(var i = 1;i<pointList.length;i++){
//         lngX = pointList[i].lng;
//         latY = pointList[i].lat;
//         lineArr.push(new AMap.LngLat(lngX,latY));
//     }
//
//     //绘制轨迹
//     var polyline = new AMap.Polyline({
//         map:migrationMap,
//         path:lineArr,
//         strokeColor:"#00A",//线颜色
//         strokeOpacity:1,//线透明度
//         strokeWeight:3,//线宽
//         strokeStyle:"solid",//线样式
//     });
// }
// function startRun(){  //开始绘制轨迹
//     x=pointList[0].lng;
//     y=pointList[0].lat
//     completeEventHandler(x,y);
//     marker.moveAlong(lineArr,80);     //开始轨迹回放
// }
// function init(){
//
//     /*    $.ajax({
//              type: "post",
//               url: _gPath+"你的数据.json",
//
//              success: function(resp){
//
//                  $.each(resp, function(i,n){
//
//                      pointList = resp.data;
//
//                });
//              }
//      }); */
//
//     startRun();
// }
// $(document).ready(function(){
//     init();
//
// });
