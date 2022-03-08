$(document).ready(function() {

    hiddenFalg();

    // 주소검색 버튼 선택
    $("#btnAddr").click(function () {
        addrSearch();
    });

    // 등록 버튼 선택
    $("#a-reg").click(function () {
        userSave();
    });

    // 취소 버튼 선택
    $("#a-cancel").click(function () {
        location.href = "/user/loginForm";
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

    formData.append('userId', $("#userId").val());
    formData.append('password', $("#password").val());
    formData.append('userName', $("#userName").val());
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

