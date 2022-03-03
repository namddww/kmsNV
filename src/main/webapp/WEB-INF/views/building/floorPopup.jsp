<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../../views/common/include/common.jsp" %>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==" crossorigin="" />
<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js" integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA==" crossorigin=""></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/leaflet.draw.js"></script>
<link href="https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/leaflet.draw.css" rel="stylesheet" />
<style>
    html, body, #map{
        height: 80%;
        margin: 0;
    }
</style>
<body>
    <input type="hidden" id="num" value="${num}">
    <h1>파일등록</h1>
    <div id="floorPopupArea">
        <div>
            <c:if test="${num < 0}">
                <span>층 정보: 지하${(num*-1)}층</span>
            </c:if>
            <c:if test="${num > 0}">
                <span>층 정보: ${num}층</span>
            </c:if>
        </div>
        <div>
            <span>도면파일: </span>
            <input type="file" name="floorFile" id="floorFile">
        </div>
    </div>
    <div>
        <span>투명도: </span>
        <input id="opacity" type="range" min="0" max="1" step="0.01" value="1" onchange="_floorPopup.updateOpacity(this.value)">
    </div>
    <div id="map">
    </div>
    <div>
        <button id="btnSave" class="btn gray">등록</button>
    </div>
</body>
<script src="https://code.jquery.com/jquery-latest.min.js"></script>
<script type="text/javascript" src="/assets/js/building/floorPopup.js"></script>
