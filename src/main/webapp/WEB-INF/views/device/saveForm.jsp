<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../../views/common/include/common.jsp" %>

<h1>자산 > 자산등록</h1>
<div id="build-info" style="height: auto; width: 100%; border:1px solid;">
    <div style="margin-left: 1%;">
        <h3>자산기본정보</h3>
        자산ID : <span id="buildSeq">등록은 빈값?</span>
        <br>
        등록일 : <span id="regDate">2022-02-09(현재날짜?)</span>&emsp;&emsp;&emsp;등록자 : <span id="regUser">1</span>
        <br><br>
        <input type="button" id="building-btn" value="건물 선택">
        <br>
    </div>

    <div style="height: auto; width: 70%; border:1px solid; margin-left: 1%;">
        <div style="margin-left: 1%;">
            건물명 : <span id="buildName">휴빌론</span>
            <br>
            지역 : <span id="area">지역 컬럼없음</span>
            <br>
            상세주소 : <span id="address"></span>
            <br>
            층정보 : <span id="groundFloor"></span>&emsp; / <span id="baseFloor"></span>
            <br>
        </div>
    </div>
        <br>
    </div>
</div>
<script type="text/javascript" src="/assets/js/device/saveForm.js"></script>
