$(document).ready(function() {

    // 타입 셀렉트박스 그리기.
    typeHtml(typeList);

    // 건물검색 버튼 선택
    $("#building-btn").click(function () {
        buildingPopup();
    });
    // 좌표등록 버튼 선택
    $("#btnPoint").click(function () {
        devicePointPopup();
    });

    // 저장 버튼 선택
    $("#btnSave").click(function () {
        deviceSave();
    })

    // 목록 버튼 선택
    $("#btnList").click(function () {
        deviceList();
    })
});

function typeHtml(typeList) {
    $("#typeCd").empty();

    $("#typeCd").append(
        $('<option/>')
            .attr('value', '')
            .text('전체')
    )

    $.each(typeList, function (i, val) {
        $("#typeCd").append(
            $('<option/>')
                .attr('value', val.codeVal)
                .text(val.codeName)
        )
    });
}

function buildingPopup() {
    var url = "/device/buildingPopup";
    window.open(url, '', '_blank');
}

function devicePointPopup() {

    if($("#buildSeq").val() == '' || $("#buildSeq").val() == '0') {
        alert('건물을 선택해 주세요.');
        return false;
    }
    var url = "/device/devicePointPopup" + "?buildSeq=" + $("#buildSeq").val() + "&floor=" + $("#floor option:selected").val();
    window.open(url, '', '_blank');
}

function deviceSave() {
    var formData = new FormData();

    formData.append('buildSeq', $("#buildSeq").val());
    formData.append('floor', $("#floor option:selected").val());
    formData.append('typeCd', $("#typeCd option:selected").val());
    formData.append('locationCd', $("#locationCd").text());
    formData.append('point1', $("#point1").val());
    formData.append('point2', $("#point2").val());
    formData.append('memo', $("#memo").val());

    // formData 확인용
    for (var pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]);
    }

    $.ajax({
        type : "POST",
        processData : false,
        contentType : false,
        url : "/device/save",
        data : formData,
        success : function (res) {
            location.href = "/device/list"
        },
        error : function(XMLHttpRequest, textStatus, errorThrown){
            console.log(XMLHttpRequest, textStatus, errorThrown);
        }
    })

}

function deviceList() {
    location.href = "/device/list"
}


