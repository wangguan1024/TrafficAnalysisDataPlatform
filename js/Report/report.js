function setReportExcelButton(DOM, url) {
    DOM.addEventListener("click", function () {
        try {
            let elemIF = document.createElement("iframe");
            elemIF.src = url;
            elemIF.style.display = "none";
            elemIF.download;
            document.body.appendChild(elemIF);
        } catch (err) {
            console.log(err);
        }
    });
}

function setReportPdfButton(DOM, url) {
    DOM.addEventListener("click", function () {
        try {
            window.open(url);
        } catch (err) {
            console.log(err);
        }
    });
}

const stayInfoPDF = document.getElementById("stayInfoPDF");
setReportPdfButton(
    stayInfoPDF,
    "http://122.51.19.160:8080/downloadPdf?name=stayinfo"
);

const stayInfoExcel = document.getElementById("stayInfoExcel");
setReportExcelButton(
    stayInfoExcel,
    "http://122.51.19.160:8080/downloadExcel?name=stayinfo"
);

const travelmodelv1PDF = document.getElementById("travelmodelv1PDF");
setReportPdfButton(
    travelmodelv1PDF,
    "http://122.51.19.160:8080/downloadPdf?name=travelmodelv1"
);

const travelmodelv1EXCEL = document.getElementById("travelmodelv1EXCEL");
setReportExcelButton(
    travelmodelv1EXCEL,
    "http://122.51.19.160:8080/downloadExcel?name=travelmodelv1"
);
