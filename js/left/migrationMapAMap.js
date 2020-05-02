/**
 *  区域迁徙
 */
var migrationMap = new AMap.Map("migrationMap", {
    resizeEnable: true,
    zooms: [6.5, 20],
    // layers:[new AMap.TileLayer()],
    layers: null,
    //zIndex:100,
    mapStyle: "amap://styles/40035571fa9fdd05a26fe1b05f48fdc9",
    pitch: 0,
});
migrationMap.setDefaultCursor("pointer");

//将沈阳边界以外给隐藏
new AMap.DistrictSearch({
    extensions: "all",
    subdistrict: 0,
}).search("沈阳", function (status, result) {
    // 外多边形坐标数组和内多边形坐标数组
    var outer = [
        new AMap.LngLat(-360, 90, true),
        new AMap.LngLat(-360, -90, true),
        new AMap.LngLat(360, -90, true),
        new AMap.LngLat(360, 90, true),
    ];
    var holes = result.districtList[0].boundaries;
    var pathArray = [outer];
    pathArray.push.apply(pathArray, holes);
    var polygon = new AMap.Polygon({
        pathL: pathArray,
        //线条颜色，使用16进制颜色代码赋值。默认值为#006600
        strokeColor: "rgb(20,164,173)",
        strokeWeight: 1,
        //轮廓线透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9
        strokeOpacity: 0.9,
        //多边形填充颜色，使用16进制颜色代码赋值，如：#FFAA00
        fillColor: "#0B122E",
        //多边形填充透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9
        fillOpacity: 1,
        //轮廓线样式，实线:solid，虚线:dashed
        strokeStyle: "solid",
        strokeDasharray: [10, 2, 10],
    });
    polygon.setPath(pathArray);
    migrationMap.add(polygon);
});

/*绘制小地图的各个省份的分界线*/
AMapUI.loadUI(["geo/DistrictExplorer"], function (DistrictExplorer) {
    //创建一个实例
    var districtExplorer = new DistrictExplorer({
        map: migrationMap,
    });
    var adcode = 210100;
    districtExplorer.loadAreaNode(adcode, function (error, areaNode) {
        //清除已有的绘制内容
        districtExplorer.clearFeaturePolygons();
        //绘制子区域
        districtExplorer.renderSubFeatures(areaNode, function (feature, i) {
            return {
                bubble: true,
                strokeColor: "rgb(20,164,173)", //线颜色
                strokeOpacity: 1, //线透明度
                strokeWeight: 0.6, //线宽
                fillColor: "#0B122E", //填充色
                fillOpacity: 0.35, //填充透明度
            };
        });
    });
});

//迁徙路线
AMapUI.load(["ui/misc/PathSimplifier", "lib/$"], function (PathSimplifier, $) {
    if (!PathSimplifier.supportCanvas) {
        alert("当前环境不支持 Canvas！");
        return;
    }

    var pathSimplifierIns = new PathSimplifier({
        zIndex: 100,
        //autoSetFitView:false,
        map: migrationMap, //所属的地图实例
        getPath: function (pathData, pathIndex) {
            return pathData.path;
        },
        getHoverTitle: function (pathData, pathIndex, pointIndex) {
            if (pointIndex >= 0) {
                //point
                return (
                    pathData.name +
                    "，点：" +
                    pointIndex +
                    "/" +
                    pathData.path.length
                );
            }

            return pathData.name + "，点数量" + pathData.path.length;
        },
        renderOptions: {
            renderAllPointsIfNumberBelow: -1, //绘制路线节点，如不需要可设置为-1
            pathLineStyle: {
                lineWidth: 1,
                strokeStyle: "#f71911",
                borderWidth: 0,
                borderStyle: "#eeeeee",
                dirArrowStyle: false,
            },
            lineJoin: "round",
        },
    });

    window.pathSimplifierIns = pathSimplifierIns;
    //设置数据
    pathSimplifierIns.setData([
        {
            name: "路线",
            path: [
                [123.4080276, 41.92951965],
                [122.3643799, 41.76124954],
            ],
        },
    ]);

    //对第一条线路（即索引 0）创建一个巡航器
    var navg1 = pathSimplifierIns.createPathNavigator(0, {
        loop: true, //循环播放
        speed: 100000, //巡航速度，单位千米/小时
    });

    navg1.start();
});
