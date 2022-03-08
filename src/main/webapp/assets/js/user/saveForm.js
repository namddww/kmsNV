$(document).ready(function() {

    hiddenFalg();

    // 주소검색 버튼 선택
    $("#btnAddr").click(function () {
        addrSearch();
    });

    // 등록 버튼 선택
    $("#a-reg").click(function () {
        if (validation()) {
            userSave();
        }
    });

    // 취소 버튼 선택
    $("#a-cancel").click(function () {
        location.href = "/user/loginForm";
    });

    // 아이디, 패스워드, 입력 시 영문,숫자만 입력받게.
    $('#userId, #password').keyup(function() {
        var inputVal = $(this).val();
        $(this).val((inputVal.replace(/[ㄱ-힣~!@#$%^&*()_+|<>?:{}= ]/g,'')));
    });

    // 아이디, 패스워드, 이름 입력 시 한글, 영문만 입력받게.
    $('#userName').keyup(function() {
        console.log("fff")
        var inputVal = $(this).val();
        $(this).val((inputVal.replace(/[^(ㄱ-힣a-zA-Z)]/gi,'')));
    });
});

function hiddenFalg() {
    // 임시로 무조건 신규등록 화면
    if ("INSERT" == "INSERT") {
        $(".tr-hidden").hide();
        $("#a-reg").show();
    } else {
        $("#a-modify").show();
        dataBind();
    }
}

function addrSearch() {
    new daum.Postcode({
        oncomplete: function (data) {
            // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            let roadAddr = data.roadAddress; // 도로명 주소 변수
            //let jibunAddr = data.jibunAddress; // 지번 주소 변수

            //$('#zipCode').val(data.zonecode);
            if (roadAddr !== '') {
                $('#addr1').val(roadAddr);
            }
            /*else if(jibunAddr !== ''){
                $('#addr1').val(jibunAddr);
            }*/
        }
    }).open();
}

function userSave() {
    var formData = new FormData();

    formData.append('userId', $("#userId").val().trim());
    formData.append('password', $("#password").val().trim());
    formData.append('userName', $("#userName").val().trim());
    formData.append('sexCd', $("#sexCd option:selected").val());
    formData.append('birthday', $("#birthday").val().replaceAll('-',''));
    formData.append('addr1', $("#addr1").val());
    formData.append('addr2', $("#addr2").val());
    formData.append('stateCd',$("#stateCd option:selected").val());
    formData.append('isUse', $("input[name='isUse']:checked").val());
    formData.append('memo', $("#memo").val());

    // formData 확인용
    for (var pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]);
    }

    $.ajax({
        type : "POST",
        processData : false,
        contentType : false,
        url : "/user/save",
        data : formData,
        success : function () {
            location.href = "/user/loginForm"
        },
        error : function(XMLHttpRequest, textStatus, errorThrown){
            console.log(XMLHttpRequest, textStatus, errorThrown);
        }
    })
}

function dataBind() {
    console.log("로그인 사용자 시 데이터 바인딩");
}

function validation() {

    if (!$("#userId").val()) {
        alert("아이디를 입력해 주세요.");
        $("#userId").focus();
        return false;
    }

    if (!$("#password").val()) {
        alert("비밀번호를 입력해 주세요.");
        $("#password").focus();
        return false;
    }

    if (!$("#userName").val()) {
        alert("이름을 입력해 주세요.");
        $("#userName").focus();
        return false;
    }

    if (!$("#password").val()) {
        alert("비밀번호를 입력해 주세요.");
        $("#password").focus();
        return false;
    }

    if (!$("#birthday").val()) {
        alert("생년월일을 선택해 주세요.");
        $("#birthday").focus();
        return false;
    }

    if (!$("#addr1").val()) {
        alert("주소를 검색해 주세요.");
        $("#addr1").focus();
        return false;
    }

    if (!$("input[name='isUse']").is(':checked')) {
        alert("사용여부를 선택해 주세요.");
        $("input[name='isUse']").focus();
        return false;
    }

    return true;
}

