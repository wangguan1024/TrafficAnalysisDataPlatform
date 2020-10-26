export function setVideoPage() {
    function setVideoTitle(areaName) {
        let title = document.getElementById("videoTitle");
        title.innerHTML = areaName;
    }

    function setVideoFromServer(areaName) {
        let videoElem = document.getElementById("videoContainer");
        let videoSrc =
            "http://122.51.19.160:8080/getvideo?placeName=" + areaName;
        videoElem.setAttribute("src", videoSrc);
    }
    if (sessionStorage.getItem("monitorArea") !== null) {
        let areaName = sessionStorage.getItem("monitorArea");
        setVideoTitle(areaName);
        setVideoFromServer(areaName);
    }
    let buttonList = document.getElementsByClassName("button");
    for (let index = 0; index < buttonList.length; index++) {
        const buttonDOM = buttonList[index];
        buttonDOM.addEventListener("click", function (e) {
            let areaName = e.target.innerHTML;
            sessionStorage.setItem("monitorArea", areaName);
            setVideoTitle(areaName);
            setVideoFromServer(areaName);
        });
    }
}
