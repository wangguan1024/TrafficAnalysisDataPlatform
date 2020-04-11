setTimeout(function () {
    window.onresize = function () {
        densityMap.resize();
        regionNum.resize();
    };
}, 200);
