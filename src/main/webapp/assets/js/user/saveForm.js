$(document).ready(function() {

    // 타입 셀렉트박스 그리기.
    typeHtml(sexCdList);
    hiddenFalg()

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

    // 수정 버튼 선택
    $("#a-modify").click(function () {
        if (validation()) {
            userUpdate();
        }
    })

    // 취소 버튼 선택
    $("#a-cancel").click(function () {
        location.href = "/user/list";
    });

    // 아이디 입력 시 영문,숫자만 입력받게.
    $('#userId').keyup(function() {
        var inputVal = $(this).val();
        $(this).val((inputVal.replace(/[ㄱ-힣~!@#$%^&*()_+|<>?:{}= ]/g,'')));
    });

    // 이름 입력 시 한글, 영문만 입력받게.
    $('#userName').keyup(function() {
        console.log("fff")
        var inputVal = $(this).val();
        $(this).val((inputVal.replace(/[^(ㄱ-힣a-zA-Z)]/gi,'')));
    });

    // 무조건 진입시 한번 호출해줘야 이미지가 노출됨..
    $("#scRegDtSt").datepicker();
});

function typeHtml(sexCdList) {
    $("#sexCd").empty();

    $("#sexCd").append(
        $('<option/>')
            .attr('value', '')
            .text('선택')
    )

    $.each(sexCdList, function (i, val) {
        $("#sexCd").append(
            $('<option/>')
                .attr('value', val.codeVal)
                .text(val.codeName)
        )
    });
}

function hiddenFalg() {
    // 신규저장 이면 SEQ, 등록일, 수정버튼 미노출
    if (actionFlag == "INSERT") {
        $(".tr-hidden").hide();
        $("#a-reg").show();
    } else {
        // 수정버튼 보이기
        $("#a-modify").show();
        $("#userId").prop('disabled', true);
        dataBind(userSeq);
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

    // 아이디 중복 체크
    if (!selectIdCount()) {
        return false;
    }

    var formData = new FormData();

    formData.append('userId', $("#userId").val().trim());
    formData.append('password', $("#password").val().trim());
    formData.append('userName', $("#userName").val().trim());
    formData.append('sexCd', $("#sexCd option:selected").val());
    formData.append('birthday', $("#scRegDtSt").val().replaceAll('-',''));
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
        success : function (res) {
            location.href = "/user/list"
        },
        error : function(XMLHttpRequest, textStatus, errorThrown){
            console.log(XMLHttpRequest, textStatus, errorThrown);
        }
    })
}

function dataBind(userSeq) {
    console.log("사용자 업데이트시 데이터 바인딩");

    console.log("userSeq : " + userSeq);

    var formData = new FormData();
    formData.append('userSeq', userSeq);

    $.ajax({
        type: 'POST',
        processData : false,
        contentType : false,
        url: '/user/selectUserDetail',
        data: formData,
        success: function(res) {
            var resultValue = res.result;

            $("#userSeq").val(resultValue.userSeq);
            $("#regDate").text(resultValue.regDate);
            $("#userId").val(resultValue.userId);
            $("#regUser").val(resultValue.regUser);
            $("#userName").val(resultValue.userName);
            $("#sexCd").val(resultValue.sexCd).prop("selected", true);
            $("#scRegDtSt").val(resultValue.birthday); //값이 1인 option 선택
            $("#location").val(resultValue.location);
            $("#addr1").val(resultValue.addr1);
            $("#addr2").val(resultValue.addr2);
            $("#stateCd").val(resultValue.stateCd).prop("selected", true);
            $("#radio_use" + resultValue.isUse).prop("checked", true)
            $("#memo").val(resultValue.memo);
        },
        error: function(request,status,error) {
            alert("통신상태가 원활하지 않아 접속이 끊어졌습니다.");
        }
    });
}

function userUpdate() {
    var formData = new FormData();

    formData.append('userSeq', $("#userSeq").val());
    formData.append('password', $("#password").val().trim());
    formData.append('userName', $("#userName").val().trim());
    formData.append('sexCd', $("#sexCd option:selected").val());
    formData.append('birthday', $("#scRegDtSt").val().replaceAll('-',''));
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
        url : "/user/update",
        data : formData,
        success : function (res) {
            location.href = "/user/list"
        },
        error : function(XMLHttpRequest, textStatus, errorThrown){
            console.log(XMLHttpRequest, textStatus, errorThrown);
        }
    })

}

function validation() {

    // 아이디가 비어 있을시
    if (!$("#userId").val()) {
        alert("아이디를 입력해 주세요.");
        $("#userId").focus();
        return false;
    }

    // 비밀번호가 비어 있을시
    if (!$("#password").val()) {
        alert("비밀번호를 입력해 주세요.");
        $("#password").focus();
        return false;
    }

    // TODO : BANG 개발완료 추후 적용
    // 비밀번호는 비어 있지 않지만, 형식이 맞지 않을 때
    // if ($("#password").val()) {
    //     console.log($("#password").val());
    //     var regPass = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    //
    //     if (!regPass.test($("#password").val())) {
    //         alert("영문, 숫자, 특수기호 조합으로 8-20자리 이상 입력해주세요.");
    //         return false;
    //     }
    // }

    // 이름이 비어 있을시
    if (!$("#userName").val()) {
        alert("이름을 입력해 주세요.");
        $("#userName").focus();
        return false;
    }

    if (!$("#sexCd option:selected").val()) {
        alert("성별을 선택해 주세요.");
        return false;
    }

    if (!$("#scRegDtSt").val()) {
        alert("생년월일을 선택해 주세요.");
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

function selectIdCount() {

    var resultBoolean;

    var formData = new FormData();

    formData.append('userId', $("#userId").val());

    $.ajax({
        type : "POST",
        processData : false,
        contentType : false,
        async: false,
        url : "/user/selectIdCount",
        data : formData,
        success : function (res) {
            console.log("IconCount : ", res.result);
            if (res.result >= 1) {
                alert("아이디 [" + $("#userId").val() + "] 는 이미 사용중인 아이디 입니다.");
                resultBoolean = false;
                return resultBoolean;
            }
            resultBoolean = true;
        },
        error : function(XMLHttpRequest, textStatus, errorThrown){
            console.log(XMLHttpRequest, textStatus, errorThrown);
        }
    });

    console.log("selectIconCount resultBoolean : ", resultBoolean);
    return resultBoolean;

}

