<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../../views/common/include/common.jsp" %>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==" crossorigin="" />
<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js" integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA==" crossorigin=""></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/leaflet.draw.js"></script>
<link href="https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/leaflet.draw.css" rel="stylesheet" />
<style>
    html, body{
        height: 94.3%;
        margin: 0;
    }
    #searchTab{
        float: left;
        width: 20%;
        z-index: 500;
    }
    #geofenceTab{
        float: left;
        width: 20%;
        height: 100%;
        z-index: 500;
        left: 20%;
        border: 1px solid;
        display: none;
    }
    #map{
        position: relative;
        height: 100%;
        margin: 0;
    }
    #btnSearchArea{

    }
    #btnSearch{
        width: 30%;
    }
    #floorInfo{
        top: 70%;
        left: 41%;
        position: absolute;
        z-index: 500;
    }
    #floorInfo{
        background-color: #f5f8ff;
        text-align: center;
    }
    #searchText{

    }
    #geofenceTabClose{
        float: left;
        z-index: 450;
        left: 40%;
        position: absolute;
        border: 1px solid;
        background-color: white;
        top: 11%;
        width: 70px;
    }
</style>
<body>
<div id="searchTab">
    <input type="hidden" id="lock" value="${lock}">
    <input type="hidden" id="key" value="${key}">
    <div>
        <button id="btnSearchArea" type="button" class="btn_r selected">지도내검색</button>
        <br>
        <span>건물명: </span>
        <div class="in_search">
            <input type="text" id="searchText">
            <button id="btnSearch" type="button" class="btn">검색</button>
        </div>

    </div>
    <hr>
    <div>
        <table id="searchListTable" class="tbl_col">
            <thead>
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
<div id="geofenceTab">
    <table class="tbl_col">
        <thead>
            <th>층수</th>
            <th>타입</th>
            <th>지오팬스명</th>
        </thead>
        <tbody id="geofenceListTable">
        </tbody>
    </table>
    <button id="geofenceTabClose" class="btn_r selected">닫기</button>
</div>
<div id="map">
</div>
<div id="floorInfo">
    <ul id="floorInfoList">
    </ul>
</div>
</body>
<script type="text/javascript" src="/assets/js/monitoring/monitoringGeofence.js"></script>