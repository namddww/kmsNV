$(document).ready(function() {
    // 진입 후 건물 검색
    buildingSearch(1);
});

function buildingSearch(page) {
    console.log("buildingSearch 진입");
    var pageNum = page || 1;

    $.ajax({
        type: 'GET',
        url: '/device/search',
        async: false,
        data: pageNum,
        success: function(res) {
            $("#tbody").empty();
            if (res.result.list.length > 0) {
                console.log("사이즈 있다 : " + res.result.list.length);

                $.each(res.result.list, function (i, val) {
                    // 1. 지하층 정보가 비어있으면 지상만 표시
                    // 2. 지상층 정보가 비어있으면 지하만 표시
                    // 3. 지상,지하 층정보가 비어있으면 하이픈으로 표시
                    var floorInfo = "-";

                    // 1. 지상,지하 층정보가 존재 시
                    if ( !!val.groundFloor && !!val.baseFloor ) {
                        floorInfo = "지상 " + val.groundFloor + " / 지하 " + val.baseFloor + " 층";
                    }
                    // 2. 지하층 정보가 비어있으면 지상층 정보만 표시
                    else if (!!val.baseFloor) {
                        floorInfo = "지상 " + val.groundFloor + " 층";
                    }
                    // 3. 지상층 정보가 비어있으면 지하층 정보만 표시
                    else if (!!val.groundFloor) {
                        floorInfo = "지하 " + val.baseFloor + " 층";
                    }

                    $("#tbody").append(
                        $('<tr/>')
                            .append($('<td/>')
                                .attr("onClick", "javascript:deviceInsertBuildingInfo('" + val.buildSeq
                                                                                        + "' , '" + val.groundFloor
                                                                                        + "' , '" + val.baseFloor
                                                                                        + "' , '" + val.stdPoint1
                                                                                        + "' , '" + val.stdPoint2
                                                                                        + "' , '" + val.areaPoint1
                                                                                        + "' , '" + val.areaPoint2
                                                                                        + "');")
                                .attr('id', 'buildName')
                                .text(val.buildName)
                            ) // 건물명
                            .append($('<td/>').attr('id', 'area').text('서울')) // 지역
                            .append($('<td/>').attr('id', 'address').text(val.address)) // 상세주소
                            .append($('<td/>').attr('id', 'floorInfo').text(floorInfo)) // 층수
                            .append($('<td/>').text(val.point)) // 좌표
                            .append($('<td/>').text(val.regDate)) // 등록일자
                    ) // end append_tbody

                    // selectFloorHtml(val.groundFloor, val.baseFloor);
                });
            } else {
                console.log("사이즈 없음");
                $("#tbody").append($('<tr/>')
                    .append($('<td/>').attr({colspan : 7}).text('검색결과가 없습니다.'))
                )
            }
        },
        error: function(request,status,error) {
            alert("통신상태가 원활하지 않아 접속이 끊어졌습니다.");
        }
    });
}

// 디바이스 등록 페이지 > 건물정보 입력
function deviceInsertBuildingInfo(buildSeq, groundFloor, baseFloor, stdPoint1, stdPoint2, areaPoint1, areaPoint2) {
    console.log("buildSeq : ", buildSeq);

    $("#buildSeq", opener.document).text(buildSeq);
    $("#area", opener.document).text($("#area").text());
    $("#buildName", opener.document).text($("#buildName").text());
    $("#address", opener.document).text($("#address").text());
    $("#floorInfo", opener.document).text($("#floorInfo").text());

    $("#stdPoint1", opener.document).val(stdPoint1);
    $("#stdPoint2", opener.document).val(stdPoint2);
    $("#areaPoint1", opener.document).val(areaPoint1);
    $("#areaPoint2", opener.document).val(areaPoint2);

    selectFloorHtml(groundFloor, baseFloor);
    window.close();
}

// 디바이스 등록 페이지 > 층 셀렉트박스 그리기
function selectFloorHtml(groundFloor, baseFloor) {
    console.log("selectFloorHtml : ", groundFloor, baseFloor);

    $("#floor", opener.document).empty();

    for(i=groundFloor; i>=baseFloor; i--) {
        $("#floor", opener.document).append(
            $('<option/>')
                .attr('value', i)
                .text(i + " 층")
        );
    }
}
