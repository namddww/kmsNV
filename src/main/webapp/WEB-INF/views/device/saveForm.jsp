<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../../views/common/include/common.jsp" %>

<h1>자산 > 자산등록</h1>
<br>
<div id="build-info" style="height: auto; width: 100%; border:1px solid;">
    <form id="deviceForm">
        <div style="margin-left: 1%;">
            <h3>자산기본정보</h3>
            <br>
            <div id="div-hidden">
                자산ID : <span id="deviceSeq">등록은 빈값?</span>
                <br>
                등록일 : <span id="regDate">2022-02-09(현재날짜?)</span>&emsp;&emsp;&emsp;등록자 : <span id="regUser">1</span>
            </div> <br>

            <input type="button" id="building-btn" class="btn gray" value="건물 선택">
        </div> <br> <%-- END_자산기본정보--%>

        <div style="height: auto; width: 70%; border:1px solid; margin-left: 1%;">
            <div style="margin-left: 1%;">
                <input type="hidden" id="buildSeq">
                <input type="hidden" id="stdPoint1">
                <input type="hidden" id="stdPoint2">
                <input type="hidden" id="areaPoint1">
                <input type="hidden" id="areaPoint2">
                <br>
                건물명 : <span id="buildName">휴빌론</span>
                <br>
                지역 : <span id="locationCd">지역 컬럼없음</span>
                <br>
                상세주소 : <span id="address"></span>
                <br>
                층정보 : <span id="floorInfo"></span>
                <br>
            </div> <br>
        </div> <br> <%-- END_건물정보--%>

        <div style="height: auto; width: 70%; border:1px solid; margin-left: 1%;">
            <div style="margin-left: 1%;">
                <h3>자산 상세정보</h3>
                <br>
                자산명 : <input type="text" id="deviceName">
                <br>
                층정보 : <select id="floor">
                            <option>-</option>
                        </select>
                <br>
                타입 : <select id="typeCd">
                            <option>타입1</option>
                        </select>
                <br>
                위치설명 : <input type="text" id="location">
                <br>
                좌표등록 : <input type="text" id="point1" disabled style="width: 25%;">
                          <input type="text" id="point2" disabled style="width: 25%;">
                          <button type="button" id="btnPoint" class="btn gray">좌표등록</button>
            </div> <br>
        </div> <br> <%-- END_건물정보--%>

        <div style="height: auto; width: 70%; border:1px solid; margin-left: 1%;">
            <div style="margin-left: 1%;">
                <br>
                <h3>메모</h3>
                <textarea id="memo"></textarea>
            </div>
        </div> <br> <%-- END_메모--%>

        <div style="margin-left: 1%;">
            <button type="button" id="btnSave" class="btn gray">등록</button>
            <button type="button" id="btnList" class="btn gray">목록</button>
        </div><br>

    </form>
</div>
<script type="text/javascript" src="/assets/js/device/saveForm.js"></script>
<script>
    var typeList = ${typeList};
</script>
