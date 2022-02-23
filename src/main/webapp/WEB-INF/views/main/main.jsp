<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../../views/common/include/common.jsp" %>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==" crossorigin="" />
<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js" integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA==" crossorigin=""></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/leaflet.draw.js"></script>
<link href="https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/leaflet.draw.css" rel="stylesheet" />
<style>
    html, body{
        height: 100%;
        margin: 0;
    }
    #searchTab{
        float: left;
        width: 20%;
        z-index: 500;
    }
    #map{
        position: relative;
        height: 100%;
        margin: 0;
    }
    #btnShowArea{
        top: 10px;
        right: 10px;
        position: absolute;
        z-index: 500;
    }
    #floorInfo{
        top: 70%;
        left: 21%;
        position: absolute;
        z-index: 500;
    }
    #floorInfo{
        background-color: #f5f8ff;
        text-align: center;
    }
    #btnPopup{
        top: 90%;
        left: 90%;
        position: absolute;
        z-index: 500;
    }
</style>
<body>
<div id="searchTab">
    <div>
        <input type="text" id="searchText">
        <button id="btnSearch" type="button" class="btn gray">검색</button>
    </div>
    <hr>
    <div>
        <table id="searchListTable">
            <thead>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>
</div>
<div id="map">
</div>
<div>
    <button id="btnShowArea" type="button" class="btn gray">보이기</button>
</div>
<div id="floorInfo">
    <ul id="floorInfoList">
    </ul>
</div>
<div>
    <button id="btnPopup" type="button" class="btn gray">팝업</button>
</div>
</body>
<script src="https://code.jquery.com/jquery-latest.min.js"></script>
<script type="text/javascript" src="/assets/js/main/main.js"></script>