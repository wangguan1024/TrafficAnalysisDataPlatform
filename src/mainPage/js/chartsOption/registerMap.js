export function getShenYangMapJson() {
    fetch("http://122.51.19.160:8080/datas.json")
        .then((res) => {
            return res.json();
        })
        .then((geoJson) => {
            echarts.registerMap("ShenYang", geoJson);
            console.log("geoJson is ready");
        })
        .catch((err) => {
            console.log(err);
        });
}
