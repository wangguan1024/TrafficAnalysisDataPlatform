//设置数字时钟
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

//设置关闭按钮
function setClosePageBtn() {
    let closePage = document.getElementById("closePage");
    closePage.addEventListener("click", function () {
        window.location.href = "./login.html";
    });
}
setClosePageBtn();

//设置主页按钮
function setHomePageBtn() {
    let homePage = document.getElementById("homePage");
    homePage.addEventListener("click", function () {
        window.location.href = "./index.html";
    });
}
setHomePageBtn();

//设置监控按钮
function setMonitorPage() {
    let monitor = document.getElementById("monitor");
    monitor.addEventListener("click", function () {
        window.location.href = "./monitor.html";
    });
}
setMonitorPage();

//设置报表按钮
function setReportPage() {
    let report = document.getElementById("report");
    report.addEventListener("click", function () {
        window.location.href = "./report.html";
    });
}
setReportPage();
