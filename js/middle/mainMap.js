var map = new AMap.Map('mainMap', {
    zoom: 8.2,
    center: [123.38333, 42.0],
    pitch: 0,
    //设置地图背景图
    mapStyle: 'amap://styles/40035571fa9fdd05a26fe1b05f48fdc9'
});
map.setDefaultCursor("pointer");

//将沈阳各个区给划分出来
let area = ['辽中区', '铁西区', '新民市', '苏家屯区',
    '沈河区', '康平县', '法库县', '沈北新区', '于洪区',
    '浑南区', '皇姑区', '大东区',
];
area.forEach(function (value) {
    // alert(value);
    new AMap.DistrictSearch({
        extensions: 'all',
        subdistrict: 0
    }).search(value, function (status, result) {
        // 外多边形坐标数组和内多边形坐标数组
        var holes = result.districtList[0].boundaries;
        var polygon = new AMap.Polygon({
            pathL: holes,
            //线条颜色，使用16进制颜色代码赋值。默认值为#006600
            strokeColor: 'rgb(20,164,173)',
            strokeWeight: 1,
            //轮廓线透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9
            strokeOpacity: 0.9,
            //多边形填充颜色，使用16进制颜色代码赋值，如：#FFAA00
            fillColor: '#0B122E',
            //多边形填充透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9
            fillOpacity: 0.5,
            //轮廓线样式，实线:solid，虚线:dashed
            strokeStyle: 'solid',
            strokeDasharray: [10, 2, 10]
        });
        polygon.setPath(holes);
        map.add(polygon);
    });
});

//将沈阳边界以外给隐藏
new AMap.DistrictSearch({
    extensions: 'all',
    subdistrict: 0
}).search('沈阳', function (status, result) {
    // 外多边形坐标数组和内多边形坐标数组
    var outer = [
        new AMap.LngLat(-360, 90, true),
        new AMap.LngLat(-360, -90, true),
        new AMap.LngLat(360, -90, true),
        new AMap.LngLat(360, 90, true),
    ];
    var holes = result.districtList[0].boundaries;
    var pathArray = [
        outer
    ];
    pathArray.push.apply(pathArray, holes)
    var polygon = new AMap.Polygon({
        pathL: pathArray,
        //线条颜色，使用16进制颜色代码赋值。默认值为#006600
        strokeColor: 'rgb(20,164,173)',
        strokeWeight: 1,
        //轮廓线透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9
        strokeOpacity: 0.9,
        //多边形填充颜色，使用16进制颜色代码赋值，如：#FFAA00
        fillColor: '#0B122E',
        //多边形填充透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9
        fillOpacity: 1,
        //轮廓线样式，实线:solid，虚线:dashed
        strokeStyle: 'solid',
        strokeDasharray: [10, 2, 10]
    });
    polygon.setPath(pathArray);
    map.add(polygon);
});

/**
 * 热力图
 */
let heatmap;
map.plugin(["AMap.Heatmap"], function () {
    heatmap = new AMap.Heatmap(map, {
        radius: 15,
        opacity: [0, 1]
    });
    heatmap.setDataSet({
        data: [{
                "lng": 122.3507919,
                "lat": 41.40496826,
                "count": 100
            },
            {
                "lng": 122.5507919,
                "lat": 41.40496826,
                "count": 100
            },

            {
                "lng": 122.3518295,
                "lat": 41.4070282,
                "count": 10
            },
            {
                "lng": 122.3643799,
                "lat": 41.76124954,
                "count": 30
            },
            {
                "lng": 122.3787766,
                "lat": 41.41452026,
                "count": 50
            },
            {
                "lng": 122.4053802,
                "lat": 41.43859863,
                "count": 90
            },

            {
                "lng": 124.0002823,
                "lat": 41.82408905,
                "count": 100
            },
            {
                "lng": 123.6555555,
                "lat": 41.82408905,
                "count": 100
            },

            {
                "lng": 123.9822388,
                "lat": 41.91376114,
                "count": 10
            },
            {
                "lng": 123.9740524,
                "lat": 42.02228928,
                "count": 30
            },
            {
                "lng": 123.9071808,
                "lat": 41.90761185,
                "count": 50
            },
            {
                "lng": 123.8424911,
                "lat": 41.90208054,
                "count": 90
            },

            {
                "lng": 123.4470367,
                "lat": 42.50167847,
                "count": 100
            },
            {
                "lng": 123.4470367,
                "lat": 42.80167847,
                "count": 100
            },

            {
                "lng": 123.4470367,
                "lat": 42.50167847,
                "count": 100
            },
            {
                "lng": 123.5008469,
                "lat": 42.49478912,
                "count": 30
            },
            {
                "lng": 123.4642181,
                "lat": 42.49359894,
                "count": 50
            },
            {
                "lng": 123.4642181,
                "lat": 42.49359894,
                "count": 100
            },

            {
                "lng": 122.8225937,
                "lat": 41.08805847,
                "count": 100
            },
            {
                "lng": 122.8225937,
                "lat": 41.38805847,
                "count": 100
            },

            {
                "lng": 122.8280487,
                "lat": 41.08947372,
                "count": 100
            },
            {
                "lng": 122.8464127,
                "lat": 41.11033249,
                "count": 30
            },
            {
                "lng": 122.8650894,
                "lat": 41.12710953,
                "count": 50
            },
            {
                "lng": 122.8812714,
                "lat": 41.14147186,
                "count": 100
            },

            {
                "lng": 123.1031737,
                "lat": 42.0951315,
                "count": 100
            },
            {
                "lng": 123.43,
                "lat": 41.80,
                "count": 100
            },
            {
                "lng": 122.83,
                "lat": 42,
                "count": 100
            },
            {
                "lng": 122.7,
                "lat": 41.52,
                "count": 100
            },
            {
                "lng": 123.4,
                "lat": 41.78,
                "count": 100
            },
            {
                "lng": 123.45,
                "lat": 41.80,
                "count": 100
            },
            {
                "lng": 123.47,
                "lat": 42.8,
                "count": 100
            },
            {
                "lng": 123.42,
                "lat": 41.82,
                "count": 100
            },
            {
                "lng": 122.95,
                "lat": 41.12,
                "count": 100
            },
            {
                "lng": 123.33,
                "lat": 41.67,
                "count": 100
            },
            {
                "lng": 123.30,
                "lat": 41.78,
                "count": 100
            },
            {
                "lng": 123.35,
                "lat": 42.75,
                "count": 100
            },
            {
                "lng": 123.40,
                "lat": 42.50,
                "count": 100
            },
            {
                "lng": 123.235072,
                "lat": 41.545220,
                "count": 100
            },
        ],
        max: 100
    });

});


/**
 * 信息标记
 */
// function addMarker() {
//     marker = new AMap.Marker({
//         position: [123.3321228, 41.65560913],
//         // offset: new AMap.Pixel(-13, -30)
//     });

//     let markerImg = document.createElement("img");
//     markerImg.className = 'markerInglat';
//     markerImg.src = "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png";
//     let markerContent = document.createElement("div");
//     let markerSpan = document.createElement("span");
//     markerSpan.className = 'marker';
//     markerSpan.innerHTML = '人群密度超出范围';
//     markerContent.appendChild(markerImg);
//     markerContent.appendChild(markerSpan);
//     marker.setContent(markerContent);

//     marker.setMap(map);
// }
// addMarker();