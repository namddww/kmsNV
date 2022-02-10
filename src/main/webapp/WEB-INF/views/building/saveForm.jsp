<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<h1>건물 등록</h1>
<hr>
<div id="buildingArea">
    <form method="POST" id="buildingForm" enctype="multipart/form-data">
        <div>
            <span>기본정보</span>
            <div>
                <span>건물좌표:</span>
                <input type="text" id="stdPoint" disabled>
                <input type="text" id="areaPoint" disabled>
                <input type="hidden" id="stdPoint1">
                <input type="hidden" id="stdPoint2">
                <input type="hidden" id="areaPoint1">
                <input type="hidden" id="areaPoint2">
                <button type="button" id="btnPoint">좌표등록</button>
            </div>
            <div>
                <span>건물명:</span>
                <input type="text" id="buildName">
            </div>
            <div>
                <span>상세주소1:</span>
                <input type="text" id="addr1">
            </div>
            <div>
                <span>상세주소2:</span>
                <input type="text" id="addr2">
                <button type="button">주소조회</button>
            </div>
            <div>
                <span>층정보</span>
                <span>지상:</span>
                <input type="number" id="groundFloor"><span>층</span>
                <span>지하:</span>
                <input type="number" id="baseFloor"><span>층</span>
                <button type="button" id="btnFloor">등록</button>
                <button type="button">초기화</button>
            </div>
        </div>
        <hr>
        <div>
            <span>층별정보</span>
            <div>
                <table id="floorListTable" border="1">
                    <thead>
                    <tr>
                        <th>층</th>
                        <th>파일</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
        <hr>
        <div>
            <button id="btnSave">등록</button>
            <button id="btnList">목록</button>
        </div>
    </form>
</div>
<script src="https://code.jquery.com/jquery-latest.min.js"></script>
<script type="text/javascript" src="/assets/js/building/saveForm.js"></script>