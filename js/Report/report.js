// var $eleBtn2 = $("#btnPDF");
// $eleBtn2.click(function(){
//     var $eleForm = $("<form method='get'></form>");
//
//     $eleForm.attr("action","http://122.51.19.160:8080/downloadExcel?name=stayinfo");
//
//     $(document.body).append($eleForm);
//
//     //提交表单，实现下载
//     $eleForm.submit();
// });

function download(url){
    try {
        var elemIF = document.createElement("iframe");
        elemIF.src = url;
        elemIF.style.display = "none";
        document.body.appendChild(elemIF);
        } catch (e) {
        alert("下载异常！");
    }}