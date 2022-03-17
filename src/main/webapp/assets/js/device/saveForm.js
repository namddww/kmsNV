$(document).ready(function() {

    // 타입 셀렉트박스 그리기.
    typeHtml(typeList);
    hiddenFalg();

    // 건물검색 버튼 선택
    $("#building-btn").click(function () {
        buildingPopup();
    });
    // 좌표등록 버튼 선택
    $("#btnPoint").click(function () {
        devicePointPopup();
    });

    // 저장 버튼 선택
    $("#a-reg").click(function () {
        if (validation()) {
            deviceSave();
        }
    })

    // 수정 버튼 선택
    $("#a-modify").click(function () {
        if (validation()) {
            deviceUpdate();
        }
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
            .text('선택')
    )

    $.each(typeList, function (i, val) {
        $("#typeCd").append(
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
        // 건물 선택 버튼 비활성화
        $("#building-btn").prop('disabled', true);
        dataBind(buildSeq, deviceSeq);
    }
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
    formData.append('buildSeq', $("#buildSeq").val());
    formData.append('deviceName', $("#deviceName").val());
    formData.append('floor', $("#floor option:selected").val());
    formData.append('typeCd', $("#typeCd option:selected").val());
    formData.append('locationCd', $("#locationCd").val());
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

function dataBind(buildSeq, deviceSeq) {
    console.log("아이콘 업데이트시 데이터 바인딩");

    console.log("buildSeq : " + buildSeq + " / deviceSeq : " + deviceSeq);

    var formData = new FormData();
    formData.append('buildSeq', buildSeq);
    formData.append('deviceSeq', deviceSeq);

    $.ajax({
        type: 'POST',
        processData : false,
        contentType : false,
        url: '/device/selectDeviceDetail',
        data: formData,
        success: function(res) {
            var resultValue = res.result;

            // 1. 지하층 정보가 비어있으면 지상만 표시
            // 2. 지상층 정보가 비어있으면 지하만 표시
            // 3. 지상,지하 층정보가 비어있으면 하이픈으로 표시
            var floorInfo = "-";

            // 1. 지상,지하 층정보가 존재 시
            if ( !!resultValue.groundFloor && !!resultValue.baseFloor ) {
                floorInfo = "지상 " + resultValue.groundFloor + " / 지하 " + Math.abs(resultValue.baseFloor) + " 층";
            }
            // 2. 지하층 정보가 비어있으면 지상층 정보만 표시
            else if (!!resultValue.baseFloor) {
                floorInfo = "지상 " + resultValue.groundFloor + " 층";
            }
            // 3. 지상층 정보가 비어있으면 지하층 정보만 표시
            else if (!!resultValue.groundFloor) {
                floorInfo = "지하 " + Math.abs(resultValue.baseFloor) + " 층";
            }

            $("#buildSeq").val(resultValue.buildSeq);
            $("#deviceSeq").val(resultValue.deviceSeq);
            $("#regDate").val(resultValue.regDate);
            $("#regUser").val(resultValue.regUser);
            $("#buildName").val(resultValue.buildName);
            $("#locationCd").val(resultValue.locationCd);
            $("#floorInfo").val(floorInfo);
            $("#address").val(resultValue.address);
            $("#deviceName").val(resultValue.deviceName);
            // 층 셀렉트박스 그리기
            $("#floor").empty();
            $("#floor").append(
                $('<option/>')
                    .attr('value', resultValue.floor)
                    .text(resultValue.floor + "층")
            );
            $("#typeCd").val(resultValue.typeCd).prop("selected", true); //값이 1인 option 선택
            $("#location").val(resultValue.location)
            $("#point1").val(resultValue.point1)
            $("#point2").val(resultValue.point2)
            $("#memo").val(resultValue.memo);
        },
        error: function(request,status,error) {
            alert("통신상태가 원활하지 않아 접속이 끊어졌습니다.");
        }
    });
}

function deviceUpdate() {
    var formData = new FormData();

    formData.append('buildSeq', $("#buildSeq").val());
    formData.append('deviceSeq', $("#deviceSeq").val());
    formData.append('deviceName', $("#deviceName").val());
    formData.append('floor', $("#floor option:selected").val());
    formData.append('typeCd', $("#typeCd option:selected").val());
    formData.append('location', $("#location").val());
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
        url : "/device/update",
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

function validation() {

    if (!$("#buildName").val()) {
        alert("건물를 선택해 주세요.");
        $("#buildName").focus();
        return false;
    }

    if (!$("#deviceName").val()) {
        alert("자산명를 입력해 주세요.");
        $("#deviceName").focus();
        return false;
    }

    if (!$("#floor option:selected").val()) {
        alert("층을 선택해 주세요.");
        return false;
    }

    if (!$("#point1, #point2").val()) {
        alert("좌표를 선택해 주세요.");
        $("#point1").focus();
        return false;
    }

    return true;
}


