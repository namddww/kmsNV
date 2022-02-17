$(document).ready(function() {

    // 지역 셀렉트박스 그리기.
    areaHtml(areaList);

    // 진입 후 건물 검색
    buildingSearch(1);

    // 자산등록 버튼 선택
    $("#a-reg").click(function () {
        deviceInsert();
    });

    // 삭제 선택
    $("#a-delete").click(function () {
        deviceDelete();
    });
    // 조회 버튼 선택
    $("#a-search").click(function () {
        buildingSearch(1);
    });
});

function areaHtml(areaList) {
    $("#select-area").empty();

    $("#select-area").append(
        $('<option/>')
            .attr('value', '')
            .text('전체')
    )
    $.each(areaList, function (i, val) {
        $("#select-area").append(
            $('<option/>')
                .attr('value', val.codeVal)
                .text(val.codeName)
        )
    });


}

function buildingSearch(page) {
    console.log("buildingSearch 진입");
    var pageNum = page || 1;

    var param = {
        pageNum: pageNum,
        buildName : $("#buildName").val(),
        scRegDtSt : $("#scRegDtSt").val().replaceAll('-',''),
        scRegDtEd : $("#scRegDtEd").val().replaceAll('-',''),
        locationCd : $("#select-area option:selected").val(),
        isUse : $("#select-useYn option:selected").val()
    };

    $.ajax({
        type: 'GET',
        url: '/device/search',
        async: false,
        // data: {pageNum : pageNum},
        data: param,
        success: function(res) {
            $("#tbody").empty();
            if (res.result.list.length > 0) {
                console.log("사이즈 있다 : " + res.result.list.length);

                $.each(res.result.list, function (i, val) {
                    $("#tbody").append(
                        $('<tr/>')
                            .append($('<td/>')
                                .append($('<input/>')
                                    .attr('type', 'checkbox')
                                    .attr('id', 'chk_' + i)
                                    .attr('name', 'chk')
                                    .attr('value', val.buildSeq)
                                ) // input
                                .append($('<label/>')
                                    .attr('for', 'chk_' + i)
                                ) // label
                                .append($('<input/>')
                                    .attr('type', 'hidden')
                                    .attr('id', 'deleteBuildSeq')
                                ) // hidden
                            ) // 체크박스
                            .append($('<td/>')
                                .append($('<a/>').html('ttt'))
                                .attr("onClick", "javascript:deviceDetail('" + val.buildSeq + "');")
                                .text(val.buildName)
                            ) // 건물명
                            .append($('<td/>').text(val.locationCd)) // 지역
                            .append($('<td/>').text(val.address)) // 상세주소
                            .append($('<td/>').text(val.groundFloor)) // 층수
                            .append($('<td/>').text(val.point)) // 좌표
                            .append($('<td/>').text(val.regDate)) // 등록일자
                    ) // end append_tbody
                });
                pagination(res.result, '', 'buildingSearch');
            } else {
                console.log("사이즈 없음");
                $("#tbody").append($('<tr/>')
                    .append($('<td/>').attr({colspan : 8}).text('검색결과가 없습니다.'))
                )
            }
        },
        error: function(request,status,error) {
            alert("통신상태가 원활하지 않아 접속이 끊어졌습니다.");
        }
    });
}

// 디바이스 등록 페이지
// location.href
function deviceInsert() {
    console.log("deviceInsert");
    location.href = "/device/saveForm";
}

// 디바이스 상세 페이지
function deviceDetail(buildSeq) {
    console.log("buildSeq : ", buildSeq);
    alert("디바이스 상세페이지 현재 미구현.");
}

// 디바이스 삭제
function deviceDelete() {
    var checkRow = "";
    $("input[name='chk']:checked" ).each (function (){
        checkRow = checkRow + $(this).val()+"," ;
    });
    checkRow = checkRow.substring(0,checkRow.lastIndexOf( ",")); //맨끝 콤마 지우기
    $("#deleteBuildSeq").val(checkRow);

    console.log("checkRow : ", checkRow);
    console.log("deleteBuildSeq.val : ", $("#deleteBuildSeq").val());

    if(checkRow == ''){
        alert("삭제 하실 대상을 선택하세요.");
        return false;
    }
    alert("디바이스 상세페이지 현재 미구현.");
}