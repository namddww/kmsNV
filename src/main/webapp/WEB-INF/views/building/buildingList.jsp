<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../../views/common/include/common.jsp" %>

<h1>건물 조회</h1>
<div id="buildingList">
    <table id="buildingListTable" border="1">
        <thead>
        <tr>
            <th>건물명</th>
            <th>지역</th>
            <th>상세주소1</th>
            <th>상세주소2</th>
            <th>층수</th>
            <th>좌표</th>
            <th>등록일</th>
        </tr>
        </thead>
        <tbody></tbody>
    </table>
</div>
<script src="https://code.jquery.com/jquery-latest.min.js"></script>
<script type="text/javascript" src="/assets/js/building/buildingList.js"></script>
