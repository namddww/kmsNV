<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../../views/common/include/common.jsp" %>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==" crossorigin="" />
<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js" integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA==" crossorigin=""></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/leaflet.draw.js"></script>
<link href="https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/leaflet.draw.css" rel="stylesheet" />

<body>
<div class="">
    <div id="searchTab">
        <input type="hidden" id="lock" value="${lock}">
        <input type="hidden" id="key" value="${key}">
        <div class="search_box">
            <h2>지오팬스 통합조회</h2>
            <button id="btnSearchArea" type="button" class="btn_r selected">지도내검색</button>
            <div class="in_search_box">
                <input type="text" id="searchText">
                <button id="btnSearch" type="button" class="btn">검색</button>
            </div>

        </div>
        <hr>
        <div>
            <table id="searchListTable" class="tbl_col">
                <thead>
                    <tr>
                        <th>검색 결과</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
        <div class="pagingBox">
            <div class="paging">
                <nav>
                    <ul class="pagination justify-content-center">
                        <li class="page-item">
                            <a class="page-link" href="javascript: void(0);" aria-label="Previous">
                                <span aria-hidden="true">«</span>
                            </a>
                        </li>
                        <li class="page-item"><a class="page-link" href="javascript: void(0);">1</a></li>
                        <li class="page-item">
                            <a class="page-link" href="javascript: void(0);" aria-label="Next">
                                <span aria-hidden="true">»</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
    <div id="geofenceTab" style="display: block;" class="map_slide">
        <table class="tbl_col">
            <colgroup>
                <col style="width: 30%">
                <col style="width: 70%">
            </colgroup>
            <thead>
                <th>층수</th>
                <th>지오팬스명</th>
                <th></th>
            </thead>
            <tbody id="geofenceListTable">
            </tbody>
        </table>
        <button id="geofenceTabClose" class="btn_close">닫기</button>
    </div>
    <div id="map">
    </div>
    <div id="floorInfo">
        <ul id="floorInfoList">
        </ul>
    </div>
</div>
</body>
<script type="text/javascript" src="/assets/js/monitoring/monitoringGeofence.js"></script>