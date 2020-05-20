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
}

//发送验证码
export function sendCodeFunc() {
    const sendCodeBtn = document.getElementById("sendCode");
    let allowClick = true;
    sendCodeBtn.addEventListener("click", function () {
        if (allowClick) {
            allowClick = false;
            //发送手机号码到服务端
            let phoneNum = document.getElementById("phone").value;
            // console.log(phoneNum);
            fetch(
                "http://122.51.19.160:8080/sendVerifyCode?phone=" + phoneNum
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
    });
}

//手机加验证码登录
