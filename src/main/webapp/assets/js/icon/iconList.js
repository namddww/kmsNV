$(document).ready(function() {

    // 지역 셀렉트박스 그리기.
    typeHtml(typeList);

    // 최초 진입 시 검색
    iconSearch(1);

    // 자산등록 버튼 선택
    $("#btnSaveForm").click(function () {
        iconSaveForm();
    });

    // 삭제 선택
    $("#a-delete").click(function () {
        deviceDelete();
    });
    // 조회 버튼 선택
    $("#a-search").click(function () {
        iconSearch(1);
    });

    // 무조건 진입시 한번 호출해줘야 이미지가 노출됨..
    $("#scRegDtSt").datepicker();
    $("#scRegDtEd").datepicker();
});

function typeHtml(typeList) {
    $("#select-type").empty();

    $("#select-type").append(
        $('<option/>')
            .attr('value', '')
            .text('전체')
    )

    $.each(typeList, function (i, val) {
        $("#select-type").append(
            $('<option/>')
                .attr('value', val.codeVal)
                .text(val.codeName)
        )
    });
}

function iconSearch(page) {
    console.log("iconSearch 진입");
    var pageNum = page || 1;

    var param = {
        pageNum: pageNum,
        iconName : $("#iconName").val(),
        scRegDtSt : $("#scRegDtSt").val().replaceAll('-',''),
        scRegDtEd : $("#scRegDtEd").val().replaceAll('-',''),
        codeVal : $("#select-type option:selected").val()
    };

    $.ajax({
        type: 'POST',
        url: '/icon/iconSearch',
        async: false,
        data: param,
        success: function(res) {
            $("#tbody").empty();
            if (res.result.list.length > 0) {
                console.log("사이즈 있다 : " + res.result.list.length);

                $.each(res.result.list, function (i, val) {
                    $("#tbody").append(
                        $('<tr/>').append(
                            $('<td/>').text(val.codeName)
                        ).attr('onClick', 'javascript:iconDetail('+val.iconSeq+')') // 타입
                        .append($('<td/>').text(val.iconName)) // 아이콘명
                        .append($('<td/>').text(val.iconPath)) // 이미지
                        .append($('<td/>').text(val.regDate)) // 등록일자
                        .append($('<td/>').text(val.modiDate)) // 수정일자
                    ) // end append_tbody
                });
                pagination(res.result, '', 'iconSearch');
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
function iconSaveForm() {
    console.log("iconSaveForm");
    location.href = "/icon/saveForm";
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

// 아이콘 상세화면
function iconDetail(iconSeq) {
    console.log(iconSeq);
    location.href = "/icon/saveForm?iconSeq=" + iconSeq;
}