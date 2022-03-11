$(document).ready(function() {

    hiddenFalg();
    typeHtml(typeList);

    // 주소검색 버튼 선택
    $("#btnAddr").click(function () {
        addrSearch();
    });

    // 등록 버튼 선택
    $("#a-reg").click(function () {
        if (validation()) {
            iconSave();
        }
    });

    // 취소 버튼 선택
    $("#a-cancel").click(function () {
        location.href = "/icon/list";
    });

    // 아이디, 패스워드, 이름 입력 시 한글, 영문만 입력받게.
    $('#iconName').keyup(function() {
        console.log("fff")
        var inputVal = $(this).val();
        $(this).val((inputVal.replace(/[^a-z|A-Z|0-9|ㄱ-ㅎ|가-힣]/g,'')));
    });

    // 타입 셀렉트박스 선택 시 해당 등록여부 확인
    // $("#iconCd").change(function(){
    //     var groupCd =  $("#iconCd option:selected").data("sub");
    //     var codeVal =  $("#iconCd option:selected").val();
    //     console.log("iconCd this : ", codeVal, groupCd);
    //     // var countResult = selectIconCount(groupCd, codeVal);
    //
    //     if (!selectIconCount(groupCd, codeVal)) {
    //         console.log("펄스");
    //         return false;
    //     }
    //     console.log("트루");
    // })

});

function hiddenFalg() {
    // 신규저장 이면 SEQ, 등록일, 수정버튼 미노출
    if (actionFlag == "INSERT") {
        $(".tr-hidden").hide();
        $("#a-reg").show();
    } else {
        $("#a-modify").show();
        dataBind();
    }
}

function typeHtml(typeList) {
    $("#iconCd").empty();

    $.each(typeList, function (i, val) {
        $("#iconCd").append(
            $('<option/>')
                .attr('value', val.codeVal)
                .attr('data-sub', val.groupCd)
                .text(val.codeName)
        )
    });
}

function selectIconCount(groupCd, codeVal) {

    var resultBoolean;

    var formData = new FormData();

    formData.append('groupCd', $("#iconCd option:selected").data("sub"));
    formData.append('codeVal', $("#iconCd option:selected").val());
    $.ajax({
        type : "POST",
        processData : false,
        contentType : false,
        async: false,
        url : "/icon/selectIconCount",
        data : formData,
        success : function (res) {
            console.log("IconCount : ", res.result);
            if (res.result >= 1) {
                alert("선택된 타입은 이미 등록되어 있습니다.");
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

function iconSave() {

    // 타입 셀렉트박스 선택 시 해당 등록여부 확인
    var groupCd =  $("#iconCd option:selected").data("sub");
    var codeVal =  $("#iconCd option:selected").val();
    console.log("iconCd this : ", codeVal, groupCd);

    if (!selectIconCount(groupCd, codeVal)) {
        return false;
    }

    var formData = new FormData();
    formData.append('iconName', $("#iconName").val().trim());
    formData.append('groupCd', groupCd);
    formData.append('codeVal', codeVal);
    formData.append('memo', $("#memo").val());
    formData.append("file", $("#iconPath")[0].files[0]);

    // formData 확인용
    // for (var pair of formData.entries()) {
    //     console.log(pair[0]+ ', ' + pair[1]);
    // }

    $.ajax({
        type : "POST",
        processData : false,
        contentType : false,
        url : "/icon/save",
        data : formData,
        success : function () {
            console.log("성공");

            location.href = "/icon/list"
        },
        error : function(XMLHttpRequest, textStatus, errorThrown){
            console.log(XMLHttpRequest, textStatus, errorThrown);
        }
    })
}

function dataBind() {
    console.log("아이콘 업데이트시 데이터 바인딩");
}

function validation() {

    if (!$("#iconName").val()) {
        alert("아이콘명를 입력해 주세요.");
        $("#iconName").focus();
        return false;
    }

    if (!$("#iconCd option:selected").val()) {
        alert("타입을 선택해 주세요.");
        return false;
    }

    if (!$("#iconPath").val()) {
        alert("이미지를 선택해 주세요.");
        $("#iconPath").focus();
        return false;
    }

    return true;
}

