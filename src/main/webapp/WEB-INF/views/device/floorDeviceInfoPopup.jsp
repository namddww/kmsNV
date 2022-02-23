<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../../views/common/include/common.jsp" %>

<style>
    #div-main{
        postiion : relative;
        /*width: 100%;*/
        /*height: 100%;*/
    }

    #img {
        width: 100%;
        height: 100%;
    }

    /*.div-append {*/
    /*    position:absolute;*/
    /*    top:50%;*/
    /*    left:50%;*/
    /*    !*background-image: url("/webapp/assets/img/chk.png");*!*/
    /*    background-image: url("../../../assets/img/chk.png");*/
    /*    z-index: -1;*/
    /*}*/

    .device-point {
        display: flex;
        background-color: red;
        width:10px;
        height:10px;
        border-radius: 50px;
    }

</style>
<body onload="onLoad()">

    <div id="div-main">
        <img id="img" src="/assets/testImg/sample.jpg">
        <div class="div-append">
        </div>
    </div>
    <input type="hidden" id="imagePath" value="<c:out value="${imagePath}"/>">
</body>
<script src="https://code.jquery.com/jquery-latest.min.js"></script>
<script type="text/javascript" src="/assets/js/device/floorDeviceInfoPopup.js"></script>
<script>
    var deviceInfoList = ${deviceInfoList};
</script>
