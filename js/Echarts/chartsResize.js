setTimeout(function () {
    window.onresize = function () {
        tripNum.resize();
        // migrationMap.resize();
        regionStayNum.resize();
        vehicleType.resize();
    };
}, 200);
