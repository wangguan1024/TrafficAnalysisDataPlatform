export function loginPageInit() {
    const loginByUsernameBtn = document.getElementById("loginByUsername");
    const loginByPhoneBtn = document.getElementById("loginByPhone");

    const loginFormByUsername = document.getElementById("loginFormByUP");
    const loginFormByPhone = document.getElementById("loginFormByPC");

    function clickUsernameBtn() {
        loginFormByUsername.style.display = "block";
        loginFormByPhone.style.display = "none";
        loginByUsernameBtn.className = "signFlowTab--active";
        loginByPhoneBtn.className = "signFlowTab";
    }
    function clickPhoneBtn() {
        loginFormByPhone.style.display = "block";
        loginFormByUsername.style.display = "none";
        loginByPhoneBtn.className = "signFlowTab--active";
        loginByUsernameBtn.className = "signFlowTab";
    }

    loginByUsernameBtn.addEventListener("click", clickUsernameBtn);
    loginByPhoneBtn.addEventListener("click", clickPhoneBtn);

    clickUsernameBtn();

    let usernameCookie = getCookie("This is username");

    if (usernameCookie !== "") {
        let passwordCookie = getCookie(usernameCookie);
        document.getElementById("username").value = usernameCookie;
        document.getElementById("password").value = passwordCookie;
        document.getElementById("rememberMe").checked = true;
        console.log("getCookie");
    } else {
        document.getElementById("rememberMe").checked = false;
    }
}

export function setLoginPage() {
    //发送验证码
    function sendCodeFunc() {
        const sendCodeBtn = document.getElementById("sendCode");
        let allowClick = true;
        sendCodeBtn.addEventListener("click", sendCode);
        sendCodeBtn.addEventListener("keydown", function (e) {
            if (e.keyCode === 13) {
                sendCode();
            }
        });
        function sendCode() {
            const phone = document.getElementById("phone");
            let phoneNum = phone.value.trim();
            let regPhoneNum = /[0-9]{11}/;
            if (regPhoneNum.test(phoneNum)) {
                if (allowClick) {
                    allowClick = false;
                    //发送手机号码到服务端
                    fetch(
                        "http://122.51.19.160:8080/sendVerifyCode?phone=" +
                            phoneNum
                    ).catch((err) => {
                        console.log(err);
                    });
                    //样式调整
                    sendCodeBtn.setAttribute("disabled", "disabled");
                    sendCodeBtn.style.cursor = "default";
                    sendCodeBtn.style.color = "grey";
                    //设置发送验证码时间间隔
                    let timeClock = 60;
                    let timeStop = setInterval(function () {
                        if (timeClock === 0) {
                            allowClick = true;
                            timeClock = 60;
                            sendCodeBtn.innerHTML = "发送验证码";
                            sendCodeBtn.removeAttribute("disabled");
                            sendCodeBtn.style.cursor = "pointer";
                            sendCodeBtn.style.color = "black";
                            clearInterval(timeStop);
                        }
                        sendCodeBtn.innerHTML = timeClock + "s后重试";
                        timeClock--;
                    }, 1000);
                }
            } else {
                let statusDiv = document.getElementById("statusDiv");
                statusDiv.innerHTML = "手机号码格式错误";
                statusDiv.setAttribute("class", "alert alert-danger");
            }
        }
    }
    sendCodeFunc();

    //手机加验证码登录
    function loginByPC() {
        const PCsubmitBtn = document.getElementById("PCsubmitBtn");
        const phone = document.getElementById("phone");
        const code = document.getElementById("code");
        function PCsubmit() {
            let phoneValue = phone.value.trim();
            let codeValue = code.value.trim();
            let dataObj = {
                phone: phoneValue,
                code: codeValue,
            };
            fetch("http://122.51.19.160:8080/loginBypc", {
                method: "POST", // or 'PUT'
                body: JSON.stringify(dataObj), // data can be `string` or {object}!
                headers: new Headers({
                    "Content-Type": "application/json",
                }),
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    let statusDiv = document.getElementById("statusDiv");
                    if (data.status === "success") {
                        statusDiv.innerHTML = data.data;
                        statusDiv.setAttribute("class", "alert alert-success");
                        window.location.href = "./mainPage.html";
                    } else {
                        statusDiv.innerHTML = data.data;
                        statusDiv.setAttribute("class", "alert alert-danger");
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        PCsubmitBtn.addEventListener("click", PCsubmit);
        PCsubmitBtn.addEventListener("keydown", keyDownHandler);
        phone.addEventListener("keydown", keyDownHandler);
        code.addEventListener("keydown", keyDownHandler);
        function keyDownHandler(e) {
            if (e.keyCode === 13) {
                PCsubmit();
            }
        }
    }
    loginByPC();

    //账号密码登录
    function loginByUP() {
        const UPsubmitBtn = document.getElementById("UPsubmitBtn");
        const username = document.getElementById("username");
        const password = document.getElementById("password");
        const rememberMe = document.getElementById("rememberMe");
        function UPsubmit() {
            let usernameValue = username.value.trim();
            let passwordValue = password.value.trim();
            if (usernameValue.length != 0 && passwordValue.length != 0) {
                let dataObj = {
                    username: usernameValue,
                    password: passwordValue,
                };
                fetch("http://122.51.19.160:8080/loginByup", {
                    method: "POST", // or 'PUT'
                    body: JSON.stringify(dataObj), // data can be `string` or {object}!
                    headers: new Headers({
                        "Content-Type": "application/json",
                    }),
                })
                    .then((res) => {
                        return res.json();
                    })
                    .then((data) => {
                        let statusDiv = document.getElementById("statusDiv");
                        if (data.status === "success") {
                            statusDiv.innerHTML = data.data;
                            statusDiv.setAttribute(
                                "class",
                                "alert alert-success"
                            );
                            if (rememberMe.checked === true) {
                                setCookie("This is username", username, 7);
                                setCookie(username, password, 7);
                                console.log("setCookie");
                            } else {
                                delCookie("This is username");
                                delCookie(username);
                            }
                            window.location.href = "./mainPage.html";
                        } else {
                            statusDiv.innerHTML = data.data;
                            statusDiv.setAttribute(
                                "class",
                                "alert alert-danger"
                            );
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else {
                statusDiv.innerHTML = "账号或密码为空";
                statusDiv.setAttribute("class", "alert alert-danger");
            }
        }
        UPsubmitBtn.addEventListener("click", UPsubmit);
        UPsubmitBtn.addEventListener("keydown", keyDownHandler);
        username.addEventListener("keydown", keyDownHandler);
        password.addEventListener("keydown", keyDownHandler);

        function keyDownHandler(e) {
            if (e.keyCode === 13) {
                UPsubmit();
            }
        }
    }
    loginByUP();
}

function setCookie(name, value, expdays) {
    var expdate = new Date();
    //设置Cookie过期日期
    expdate.setDate(expdate.getDate() + expdays);
    //添加Cookie
    document.cookie =
        name + "=" + escape(value) + ";expires=" + expdate.toUTCString();
}
function getCookie(name) {
    //获取name在Cookie中起止位置
    var start = document.cookie.indexOf(name + "=");

    if (start != -1) {
        start = start + name.length + 1;
        //获取value的终止位置
        var end = document.cookie.indexOf(";", start);
        if (end == -1) end = document.cookie.length;
        //截获cookie的value值,并返回
        return unescape(document.cookie.substring(start, end));
    }
    return "";
}
function delCookie(name) {
    setCookie(name, "", -1);
}
