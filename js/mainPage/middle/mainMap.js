let showDataToMessageFlow = "";
let keyPointObjList = [];
//用户点击checkbox选择的区域列表
let keyPointSelectList = [];

setMainMap();
function setMainMap() {
    let map = new AMap.Map("mainMapDiv", {
        zoom: 7.5,
        zooms: [7.5, 16],
        center: [123.38333, 42.0],
        pitch: 0,
        //设置地图背景图
        mapStyle: "amap://styles/40035571fa9fdd05a26fe1b05f48fdc9",
    });
    // map.setDefaultCursor("pointer");

    //将沈阳各个区给划分出来
    let area = [
        "和平区",
        "辽中区",
        "铁西区",
        "新民市",
        "苏家屯区",
        "沈河区",
        "康平县",
        "法库县",
        "沈北新区",
        "于洪区",
        "浑南区",
        "皇姑区",
        "大东区",
    ];

    mainMapInit();
    function mainMapInit() {
        area.forEach(function (value) {
            // alert(value);
            new AMap.DistrictSearch({
                extensions: "all",
                subdistrict: 0,
            }).search(value, function (status, result) {
                // 外多边形坐标数组和内多边形坐标数组
                var holes = result.districtList[0].boundaries;
                var polygon = new AMap.Polygon({
                    pathL: holes,
                    //线条颜色，使用16进制颜色代码赋值。默认值为#006600
                    // strokeColor: "rgb(20,164,173)",
                    strokeColor: "rgb(147, 235, 248)",
                    strokeWeight: 1,
                    //轮廓线透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9
                    strokeOpacity: 0.6,
                    //轮廓线样式，实线:solid，虚线:dashed
                    strokeStyle: "solid",
                    strokeDasharray: [10, 2, 10],
                    //多边形填充颜色，使用16进制颜色代码赋值，如：#FFAA00
                    fillColor: "#0C1F34",
                    //多边形填充透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9
                    fillOpacity: 0,
                });
                polygon.setPath(holes);
                map.add(polygon);
            });
        });

        //将沈阳边界以外隐藏
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
                // strokeColor: "rgb(20,164,173)",
                strokeColor: "rgb(147, 235, 248)",
                strokeWeight: 2,
                //轮廓线透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9
                strokeOpacity: 0.9,
                //多边形填充颜色，使用16进制颜色代码赋值，如：#FFAA00
                fillColor: "#0C1F34",
                //多边形填充透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9
                fillOpacity: 1,
                //轮廓线样式，实线:solid，虚线:dashed
                strokeStyle: "solid",
                strokeDasharray: [10, 2, 10],
            });
            polygon.setPath(pathArray);
            map.add(polygon);
        });

        //区域点标记初始化
        for (let i = 0; i < geoCoordMap.length; i++) {
            let element = geoCoordMap[i];
            let center = new AMap.LngLat(element.lng, element.lat);
            let circle = new AMap.Circle({
                map: map,
                center: center,
                radius: 400,
                strokeColor: "#666",
                strokeWeight: 0.1,
                strokeOpacity: 0.5,
                fillColor: "white",
                fillOpacity: 0.2,
                zIndex: 11,
                cursor: "pointer",
            });
            circle.on("click", function (e) {
                new AMap.InfoWindow({
                    content: element.name,
                }).open(map, e.lnglat);
            });
        }
    }
    //websocket获取热力图数据，并渲染进入热力图
    function getRegionStayNumData() {
        let host = "http://122.51.19.160:8080";
        let Socket = new SockJS(host + "/hhuc");
        let StompClient = Stomp.over(Socket);
        StompClient.connect({}, function () {
            StompClient.subscribe("/user/map/heatmap", function (response) {
                let data = JSON.parse(response.body);
                map.plugin(["AMap.Heatmap"], function () {
                    let heatmap = new AMap.Heatmap(map, {
                        radius: 15, //给定半径
                        opacity: [0, 0.8], //热力图透明度
                    });
                    heatmap.setDataSet({
                        data: data,
                        max: 100,
                    });
                });
            });
        });
    }
    getRegionStayNumData();

    let keyPointDict = [
        {
            name: "维华商业广场",
            lng: 123.404052,
            lat: 41.829494,
        },
        {
            name: "八一公园",
            lng: 123.431399,
            lat: 41.807924,
        },
        {
            name: "沈阳故宫",
            lng: 123.46221,
            lat: 41.803282,
        },
        {
            name: "沈阳中街",
            lng: 123.460605,
            lat: 41.807322,
        },
        {
            name: "沈阳西湖风景区",
            lng: 122.889617,
            lat: 41.765946,
        },
        {
            name: "沈阳国家森林公园",
            lng: 123.728897,
            lat: 42.028802,
        },
        {
            name: "沈阳怪坡风景区",
            lng: 123.647283,
            lat: 42.067571,
        },
        {
            name: "新民清真寺",
            lng: 122.83792,
            lat: 42.000161,
        },
        {
            name: "豪林购物中心",
            lng: 122.737988,
            lat: 41.518242,
        },
    ];
    //构建所有热点区域的name列表
    let keyPointNameList = [];
    keyPointDict.forEach(function (value) {
        keyPointNameList.push(value.name);
    });
    let oriData = {
        places: keyPointNameList,
    };

    //热点区域发送到服务端
    fetch("http://122.51.19.160:8080/putPlaces", {
        method: "POST", // or 'PUT'
        body: JSON.stringify(oriData), // data can be `string` or {object}!
        headers: new Headers({
            "Content-Type": "application/json",
        }),
    }).catch((err) => {
        console.log(err);
    });

    //重点区域初始化
    for (let i = 0; i < keyPointDict.length; i++) {
        let element = keyPointDict[i];
        let name = element.name;
        let center = new AMap.LngLat(element.lng, element.lat);
        AMapUI.loadUI(["overlay/SvgMarker"], function (SvgMarker) {
            if (!SvgMarker.supportSvg) {
                //当前环境并不支持SVG，此时SvgMarker会回退到父类，即SimpleMarker
            }

            //创建一个shape实例，比如水滴状
            let shape = new SvgMarker.Shape.TriangleFlagPin({
                height: 20, //高度
                //width: **, //不指定时会维持默认的宽高比
                fillColor: "springgreen", //填充色
                strokeWidth: 1, //描边宽度
                strokeColor: "#666", //描边颜色
            });

            //利用该shape构建SvgMarker
            let marker = new SvgMarker(
                //第一个参数传入shape实例
                shape,
                //第二个参数为SimpleMarker的构造参数（iconStyle除外）
                {
                    showPositionPoint: true, //显示定位点
                    map: map,
                    position: center,
                }
            );
            let obj = {
                name: name,
                marker: marker,
                overflow: false,
            };

            keyPointObjList.push(obj);
            marker.on("click", function (e) {
                //设置消息弹窗
                new AMap.InfoWindow({
                    content: name,
                }).open(map, e.lnglat);
                showDataToMessageFlow = name;
            });
            marker.hide();
        });
    }

    //下面的设置和清空方法只对overflow为false时有效

    //点击确定按钮，获取checkbox选择的重点区域,并添加到主图，点击重点区域可动态更新折线图
    let mainMapConfirmBtn = document.getElementById("mainMapConfirmBtn");
    mainMapConfirmBtn.addEventListener("click", function () {
        //清空上一次的区域
        for (let index = 0; index < keyPointObjList.length; index++) {
            let element = keyPointObjList[index];
            if (element.overflow === false) {
                element.marker.hide();
            }
        }
        //获取checkbox选择的重点区域
        keyPointSelectList = [];
        let myCheckBoxTable = document.getElementById("myCheckBoxTable");
        for (let i = 0; i < myCheckBoxTable.rows.length; i++) {
            for (let j = 0; j < myCheckBoxTable.rows[i].cells.length; j++) {
                let element = myCheckBoxTable.rows[i].cells[j].children[0];
                if (element.checked) {
                    keyPointSelectList.push(element.name);
                }
            }
        }
        //将选择的重点区域显示在主图上
        for (let index = 0; index < keyPointSelectList.length; index++) {
            let selectKeyPoint = keyPointSelectList[index];
            for (let j = 0; j < keyPointObjList.length; j++) {
                if (selectKeyPoint === keyPointObjList[j].name) {
                    if (keyPointObjList[j].overflow === false) {
                        keyPointObjList[j].marker.show();
                    }
                }
            }
        }
    });
    //点击取消按钮，恢复原表格数据
    let mainMapRegretBtn = document.getElementById("mainMapRegretBtn");
    mainMapRegretBtn.addEventListener("click", function () {
        let myCheckBoxTable = document.getElementById("myCheckBoxTable");
        for (let i = 0; i < myCheckBoxTable.rows.length; i++) {
            for (let j = 0; j < myCheckBoxTable.rows[i].cells.length; j++) {
                let element = myCheckBoxTable.rows[i].cells[j].children[0];
                if (element.checked) {
                    if (keyPointSelectList.indexOf(element.name) === -1) {
                        element.checked = false;
                    }
                }
            }
        }
    });
}
