<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../../views/common/include/common.jsp" %>

<div class="side_cont" id="geofenceArea">
    <div class="s_nav">
        <ul>
            <li><a href="#">HOME</a></li>
            <li><a href="#">건물관리</a></li>
            <li class="at">지오팬스 상세</li>
        </ul>
    </div>
    <div class="head">
        <h2>지오팬스 등록</h2>
    </div>
    <form method="POST" id="geofenceForm" enctype="multipart/form-data">
    <div class="content">
        <div class="tbl_row_wrap">
            <table class="tbl_row">
                <colgroup>
                    <col style="width: 20%">
                    <col style="width: 80%">
                </colgroup>
                <tbody>
                <tr>
                    <th scope="col">건물명</th>
                    <td class="dupl_chk" style="padding: 10px 30px;">
                        <input type="text" id="buildName" value="${geofence.buildName}" disabled style="width: 32%;">
                        <input type="hidden" id="buildSeq" value="${geofence.buildSeq}">
                        <input type="hidden" id="stdPoint1" value="${geofence.stdPoint1}">
                        <input type="hidden" id="stdPoint2" value="${geofence.stdPoint2}">
                        <input type="hidden" id="areaPoint1" value="${geofence.areaPoint1}">
                        <input type="hidden" id="areaPoint2" value="${geofence.areaPoint2}">
                        <input type="hidden" id="geofenceSeq" value="${geofence.geofenceSeq}">
                        <input type="hidden" id="geofenceInfoSeq" value="${geofenceInfo.geofenceInfoSeq}">
                    </td>
                </tr>
                <tr>
                    <th scope="col">지역</th>
                    <td>
                        <input type="text" id="locationCd" value="${geofence.locationName}" disabled>
                    </td>
                </tr>
                <tr>
                    <th scope="col">상세주소</th>
                    <td>
                        <input type="text" id="address" value="${geofence.address}" disabled>
                    </td>
                </tr>
                <tr>
                    <th scope="col">층정보</th>
                    <td>
                        <input type="hidden" id="floor" value="${geofence.floor}">
                        <c:if test="${geofence.floor > 0}">${geofence.floor}층</c:if>
                        <c:if test="${geofence.floor < 0}">지하 ${geofence.floor*-1}층</c:if>
                    </td>
                </tr>
                <tr>
                    <th scope="col">지오팬스 이름</th>
                    <td>
                        <input type="text" id="geoName" value="${geofence.geoName}">
                    </td>
                </tr>
                <tr>
                    <th scope="col">지오팬스 설치위치</th>
                    <td class="dupl_chk" style="padding: 10px 30px;">
                        <input type="text" id="setPointX" value="${geofenceInfo.setPointX}" disabled style="width: 32%;">
                        <input type="text" id="setPointY" value="${geofenceInfo.setPointY}" disabled style="width: 32%;">
                        <button type="button" id="btnSetPoint" class="mid btn">설치위치 등록</button>
                    </td>
                </tr>
                <tr>
                    <th scope="col">영역타입</th>
                    <td>
                        <input type="text" id="typeName" value="${geofence.typeCdName}" disabled>
                        <input type="hidden" id="typeCd" value="${geofence.typeCd}">
                    </td>
                </tr>
                <tr>
                    <th scope="col">상태</th>
                    <td>
                        <select id="stateCd" class="st_w280">
                            <c:forEach var="data" items="${staList}" varStatus="status">
                                <option value="${data.codeVal}" <c:if test ="${geofence.stateCd eq data.codeVal}">selected</c:if> >
                                    ${data.codeName}
                                </option>
                            </c:forEach>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th scope="col">위치</th>
                    <td>
                        <select id="location" class="st_w280">
                            <c:forEach var="data" items="${dloList}" varStatus="status">
                                <option value="${data.codeVal}" <c:if test ="${geofence.locationCd eq data.codeVal}">selected</c:if> >
                                    ${data.codeName}
                                </option>
                            </c:forEach>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th scope="col">좌표등록</th>
                    <td class="dupl_chk" style="padding: 10px 30px;">
                        <button type="button" id="btnPoint" class="">좌표등록</button>
                        <div id="pointArr" style="display: none;">
                            <c:forEach var="data" items="${geofenceInfo.pointList}" varStatus="status">
                                <input type="hidden" id="x${status.index}" value="${data.pointX}" name="xy">
                                <input type="hidden" id="y${status.index}" value="${data.pointY}" name="xy">
                            </c:forEach>
                        </div>
                        <input type="hidden" id="radius" value="${geofenceInfo.radius}">
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="btn_wrap">
            <button type="button" id="btnSave" class="btn_r selected">수정</button>
            <button type="button" id="btnList" class="btn_r" style="margin-left: 10px;">목록</button>
        </div>
    </div>
    </form>
</div>
<script type="text/javascript" src="/assets/js/geofence/geofenceInfo.js"></script>