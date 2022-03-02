<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../../views/common/include/common.jsp" %>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==" crossorigin="" />
<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js" integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA==" crossorigin=""></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/leaflet.draw.js"></script>
<link href="https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/leaflet.draw.css" rel="stylesheet" />
<%--<script src='https://unpkg.com/leaflet-draw-drag@0.1.7/dist/Leaflet.draw.drag.js'></script>--%>
<%--<script src="https://unpkg.com/leaflet-path-transform@1.1.3/dist/L.Path.Transform.js"></script>--%>
<%--<script src="../../../assets/js/common/edit.rectangle.rotate.js"></script>--%>
<style>
    html, body, #map{
        height: 100%;
        margin: 0;
    }
    #btnSave{
        position: absolute;
        top: 100px;
        right: 10px;
        padding: 10px;
        z-index: 400;
    }
</style>
<body>
    <div id="map">
    </div>
    <button id="btnSave" class="btn gray">저장</button>
</body>
<script src="https://code.jquery.com/jquery-latest.min.js"></script>
<script type="text/javascript" src="/assets/js/building/pointPopup.js"></script>
