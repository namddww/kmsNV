<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../../views/common/include/common.jsp" %>

<div class="side_cont" id="geofenceArea">
    <div class="head">
        <h2>지오팬스 등록</h2>
    </div>
    <form method="POST" id="geofenceForm" enctype="multipart/form-data">
    <div class="content">
        <div class="tbl_row_wrap">
            <table class="tbl_row">
                <colgroup>
                    <col style="width: 15%">
                    <col style="width: 85%">
                </colgroup>
                <tbody>
                <tr>
                    <th scope="col">건물명</th>
                    <td class="dupl_chk" style="padding: 10px 30px;">
                        <input type="text" id="buildName" value="" disabled style="width: 32%;">
                        <input type="hidden" id="buildSeq">
                        <input type="hidden" id="stdPoint1">
                        <input type="hidden" id="stdPoint2">
                        <input type="hidden" id="areaPoint1">
                        <input type="hidden" id="areaPoint2">
                        <button type="button" id="btnBuilding" class="">건물선택</button>
                    </td>
                </tr>
                <tr>
                    <th scope="col">지역</th>
                    <td>
                        <input type="text" id="locationCd" value="" disabled>
                    </td>
                </tr>
                <tr>
                    <th scope="col">상세주소</th>
                    <td>
                        <input type="text" id="address" value="" disabled>
                    </td>
                </tr>
                <tr>
                    <th scope="col">층정보</th>
                    <td>
                        <select id="floor">
                            <option>층선택</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th scope="col">지오팬스 이름</th>
                    <td>
                        <input type="text" id="geoName">
                    </td>
                </tr>
                <tr>
                    <th scope="col">지오팬스 설치위치</th>
                    <td class="dupl_chk" style="padding: 10px 30px;">
                        <input type="text" id="setPointX" value="" disabled style="width: 32%;">
                        <input type="text" id="setPointY" value="" disabled style="width: 32%;">
                        <button type="button" id="btnSetPoint" class="">설치위치 등록</button>
                    </td>
                </tr>
                <tr>
                    <th scope="col">영역타입</th>
                    <td>
                        <input type="text" id="typeName" value="" disabled>
                        <input type="hidden" id="typeCd" value="">
                    </td>
                </tr>
                <tr>
                    <th scope="col">상태</th>
                    <td>
                        <select id="stateCd">
                        </select>
                    </td>
                </tr>
                <tr>
                    <th scope="col">위치</th>
                    <td>
                        <select id="location">
                        </select>
                    </td>
                </tr>
                <tr>
                    <th scope="col">좌표등록</th>
                    <td class="dupl_chk" style="padding: 10px 30px;">
                        <button type="button" id="btnPoint" class="">좌표등록</button>
                        <div id="pointArr" style="display: none;">
                        </div>
                        <input type="hidden" id="radius">
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="btn_wrap">
            <button type="button" id="btnSave" class="btn_r selected">등록</button>
            <button type="button" id="btnList" class="btn_r" style="margin-left: 10px;">목록</button>
        </div>
    </div>
    </form>
</div>
<script type="text/javascript" src="/assets/js/geofence/saveForm.js"></script>
<script>
    var dloList = ${dloList};
    var staList = ${staList};
</script>