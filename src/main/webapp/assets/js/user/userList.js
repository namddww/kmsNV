$(document).ready(function() {

    // 진입시 검색
    userSearch(1);

    // 자산등록 버튼 선택
    $("#btnSaveForm").click(function () {
        userInsert();
    });

    // 조회 버튼 선택
    $("#a-search").click(function () {
        userSearch(1);
    });

    // 무조건 진입시 한번 호출해줘야 이미지가 노출됨..
    $("#scRegDtSt").datepicker();
    $("#scRegDtEd").datepicker();
});

function userSearch(page) {
    var pageNum = page || 1;

    var param = {
        pageNum: pageNum,
        userName : $("#userName").val(),
        userId : $("#userId").val(),
        scRegDtSt : $("#scRegDtSt").val().replaceAll('-',''),
        scRegDtEd : $("#scRegDtEd").val().replaceAll('-','')
    };

    $.ajax({
        type: 'POST',
        url: '/user/search',
        async: false,
        data: param,
        success: function(res) {
            $("#tbody").empty();
            if (res.result.list.length > 0) {
                console.log("사이즈 있다 : " + res.result.list.length);

                $.each(res.result.list, function (i, val) {
                    $("#tbody").append(
                        $('<tr/>')
                        .attr("onClick", "javascript:userDetail('" + val.userSeq + "');")
                            .append($('<td/>').text(val.userName)) // 이름
                            .append($('<td/>').text(val.userId)) // ID
                            .append($('<td/>').text(val.sexCd)) // 성별
                            .append($('<td/>').text(val.regDate)) // 등록일자
                            .append($('<td/>').text(val.loginDate)) // 로그인 일자
                    ) // end append_tbody
                });
                pagination(res.result, '', 'userSearch');
            } else {
                console.log("사이즈 없음");
                $("#tbody").append($('<tr/>')
                    .append($('<td/>').attr({colspan : 5}).text('검색결과가 없습니다.'))
                )
            }
        },
        error: function(request,status,error) {
            alert("통신상태가 원활하지 않아 접속이 끊어졌습니다.");
        }
    });
}

// 디바이스 등록 페이지
function userInsert() {
    location.href = "/user/saveForm";
}

// 디바이스 상세 페이지
function userDetail(userSeq) {
    console.log("userSeq : " + userSeq);
    location.href = "/user/saveForm?userSeq=" + userSeq;
}

// 디바이스 삭제
function userDelete() {
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