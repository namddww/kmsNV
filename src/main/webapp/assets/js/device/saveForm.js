$(document).ready(function() {
    // 건물검색 버튼 선택
    $("#building-btn").click(function () {
        buildingPopup();
    });
    // 좌표등록 버튼 선택
    $("#btnPoint").click(function () {
        devicePointPopup();
    });
});

function buildingPopup() {
    var url = "/device/buildingPopup";
    window.open(url, '_blank');
}

function devicePointPopup() {
    var url = "/device/devicePointPopup";
    window.open(url, '_blank');
}


