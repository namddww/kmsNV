$(document).ready(function() {
    console.log("111");
    console.log("222");

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
            if (res.result.list.length > 0) {
                console.log("사이즈 있다 : " + res.result.list.length);
                $("#tbody").empty();
                $.each(res.result.list, function (i, val) {
                    $("#tbody").append(
                        $('<tr/>')
                            .append($('<td/>')
                            .append('<input/>')
                                .attr('type', 'checkbox')
                                .attr('id', 'chk_' + i)
                                .attr('name', 'chk')
                            .append('<label/>')
                                .attr('for', 'chk_' + i)
                            ) // 체크박스
                            .append($('<td/>')
                                .attr('onClick', '#')
                                .text(val.buildName)
                            ) // 건물명
                            .append($('<td/>').text('서울')) // 지역
                            .append($('<td/>').text(val.address)) // 상세주소1
                            // .append($('<td/>').text(val.)) // 상세주소2
                            .append($('<td/>').text(val.groundFloor)) // 층수
                            .append($('<td/>').text(val.point)) // 좌표
                            .append($('<td/>').text(val.regDate)) // 등록일자
                    ) // end append_tbody
                });
            } else {
                console.log("사이즈 없음");
            }
        },
        error: function(request,status,error) {
            alert("통신상태가 원활하지 않아 접속이 끊어졌습니다.");
        }
    });
}