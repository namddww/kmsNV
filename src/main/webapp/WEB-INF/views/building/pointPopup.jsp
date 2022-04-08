<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../../views/common/include/common.jsp" %>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==" crossorigin="" />
<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js" integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA==" crossorigin=""></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/leaflet.draw.js"></script>
<link href="https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/leaflet.draw.css" rel="stylesheet" />
<%--<script src='https://unpkg.com/leaflet-draw-drag@0.1.7/dist/Leaflet.draw.drag.js'></script>--%>
<%--<script src="https://unpkg.com/leaflet-path-transform@1.1.3/dist/L.Path.Transform.js"></script>--%>
<%--<script src="../../../assets/js/common/edit.rectangle.rotate.js"></script>--%>
<link rel="stylesheet" href="../../../assets/js/common/Leaflet.BigImage.min.css">
<script src="../../../assets/js/common/Leaflet.BigImage.js" ></script>
<style>
    html, body, #map{
        height: 100vh;
        width: 100vw;
        margin: 0;
    }
    #btnSave {
        position: absolute;
        top: 180px;
        right: 11px;
        box-shadow: 7px 7px 5px 0 rgb(0 0 0 / 30%) ;
        z-index: 400;
        width: 65px;
    }
</style>
<body>
    <div id="map">
    </div>
    <button id="btnSave" class="btn_r on">저장</button>
</body>
<script type="text/javascript" src="/assets/js/building/pointPopup.js"></script>
