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

            location.href = "/home"
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