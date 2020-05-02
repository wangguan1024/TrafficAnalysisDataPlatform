fetch("../data/shenyang.json")
    .then((geoJson) => {
        echarts.registerMap("ShenYang", geoJson);
    })
    .catch((err) => {
        console.log(err);
    });
