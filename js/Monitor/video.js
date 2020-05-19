function setVideoPage() {
    function setVideoTitle(areaName) {
        let title = document.getElementById("videoTitle");
        title.innerHTML = areaName;
    }

    function setVideoFromServer(areaName) {
        let videoElem = document.getElementById("videoContainer");
        let videoSrc =
            "http://122.51.19.160:8080/getvideo?placeName=" + areaName;
        videoElem.setAttribute("src", "videoSrc");
    }
    let areaSelectDiv = document.getElementById("areaSelectDiv");
    let buttonList = document.getElementsByClassName("button");
    for (let index = 0; index < buttonList.length; index++) {
        const buttonDOM = buttonList[index];
        buttonDOM.addEventListener("click", function (e) {
            let areaName = e.target.innerHTML;
            setVideoTitle(areaName);
            setVideoFromServer(areaName);
        });
    }
}

setVideoPage();
