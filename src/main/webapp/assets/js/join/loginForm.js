var timer = null;
var isRunning = false;

$(document).ready(function() {

    // 아이디 저장 확인
    loadStorage();

    // 아이디 입력 시 영문,숫자만 입력받게.
    $('#userId').keyup(function() {
        var inputVal = $(this).val();
        $(this).val((inputVal.replace(/[ㄱ-힣~!@#$%^&*()_+|<>?:{}= ]/g,'')));
    });

    // 아이디저장 체크박스 선택
    $("#saveId").click(function () {
        console.log("아이디저장 체크박스 선택");
        saveStorage();
    });

    // 로그인 버튼 선택
    $("#btn-login").click(function () {
        login();
    });

    // 인증번호 확인 버튼 선택
    $("#authCheckBtn").click(function () {
        authCheckBtn();
    });

    // 인증번호 요청 버튼 선택
    $("#authBtn").click(function () {
        login();
    });

});

function loadStorage() {
    var ck = window.localStorage.getItem("chkflag");
    var userId = window.localStorage.getItem("userId");

    if (ck == "Y") {
        document.getElementById("saveId").checked = true;
        $('#userId').val(userId);
    }
}

function saveStorage() {
    var chkflag = $('#saveId').is(':checked');
    var userId = $('#userId').val();
    console.log("체크여부 : ", chkflag);

    // 체크 시
    if (chkflag) {
        window.localStorage.setItem("chkflag", "Y");
        window.localStorage.setItem("userId", userId);
    } else {
        window.localStorage.removeItem("chkflag");
        window.localStorage.removeItem("userId");
    }
}

function login() {

    var formData = new FormData();

    formData.append('userId', $("#userId").val());
    formData.append('password', $("#password").val());

    // formData 확인용
    for (var pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]);
    }

    $.ajax({
        type : "POST",
        processData : false,
        contentType : false,
        url : "/join/login",
        data : formData,
        success : function (res) {
            if (res.result != "SUCCESS") {
                alert(res.result);
                return false;
            }

            // 로그인 성공 시 인증번호 전송.
            $(".tr-authCall").hide();
            authKey();
            // location.href = "/home"
        },
        error : function(XMLHttpRequest, textStatus, errorThrown){
            console.log(XMLHttpRequest, textStatus, errorThrown);
        }
    })
}

function authKey() {

    var formData = new FormData();

    formData.append('userId', $("#userId").val());

    $.ajax({
        type : "POST",
        processData : false,
        contentType : false,
        url : "/join/authKey",
        data : formData,
        success : function (res) {
            alert("인증번호 : " + res.result);

            var display = $(".time");
            // 유효시간 설정
            var leftSec = 180;

            // 버튼 클릭 시 시간 연장
            if (isRunning){
                clearInterval(timer);
                display.html("");
                startTimer(leftSec, display);
            }else{
                startTimer(leftSec, display);
            }

            $(".tr-hidden").show();

            // 로그인 성공 시 인증번호 전송.
            // authKey();
            // location.href = "/home"
        },
        error : function(XMLHttpRequest, textStatus, errorThrown){
            console.log(XMLHttpRequest, textStatus, errorThrown);
        }
    })
}

// 회원가입
function saveForm() {
    console.log("회원가입");
    location.href = "/user/saveForm";
}



function authCheckBtn() {

    if (!$("#authKey").val()) {
        alert("인증번호를 입력하여 주세요.");
        return false;
    }
    var formData = new FormData();

    formData.append('userId', $("#userId").val());
    formData.append('password', $("#password").val());
    formData.append('authKey', $("#authKey").val());

    // formData 확인용
    for (var pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]);
    }

    $.ajax({
        type : "POST",
        processData : false,
        contentType : false,
        url : "/join/login",
        data : formData,
        success : function (res) {
            if (res.result != "SUCCESS") {
                alert(res.result);
                // var display = $(".time");
                // 유효시간 설정
                // var leftSec = 180;

                // 버튼 클릭 시 시간 연장
                // if (isRunning){
                //     clearInterval(timer);
                //     display.html("");
                //     startTimer(leftSec, display);
                // }else{
                //     startTimer(leftSec, display);
                // }
                return false;
            }

            // 인증번호 까지 성공시
            location.href = "/home"
        },
        error : function(XMLHttpRequest, textStatus, errorThrown){
            console.log(XMLHttpRequest, textStatus, errorThrown);
        }
    })
}

function startTimer(count, display) {
    var minutes, seconds;
    timer = setInterval(function () {
        minutes = parseInt(count / 60, 10);
        seconds = parseInt(count % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.html(minutes + ":" + seconds);

        // 타이머 끝
        if (--count < 0) {
            clearInterval(timer);
            alert("인증번호 입력시간이 초과 하였습니다.");

            $(".tr-authCall").show();
            $(".tr-hidden").hide();
            isRunning = false;
        }
    }, 1000);
    isRunning = true;
}