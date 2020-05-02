function checkTime(time) {
    if (time < 10) {
        time = "0" + time;
    }
    return time;
}

function startTime() {
    let date = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    hour = checkTime(hour);
    minute = checkTime(minute);
    second = checkTime(second);
    document.getElementById("timeDiv").innerHTML =
        hour + ":" + minute + ":" + second;
    setTimeout("startTime()", 500);
}

startTime();
