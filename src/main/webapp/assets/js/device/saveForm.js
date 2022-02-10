$(document).ready(function() {
    console.log("111");
    console.log("222");

    $("#building-btn").click(function () {
       buildingSearch(1);
    });
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
            } else {
                console.log("사이즈 없음");
            }
        },
        error: function(request,status,error) {
            alert("통신상태가 원활하지 않아 접속이 끊어졌습니다.");
        }
    });
}