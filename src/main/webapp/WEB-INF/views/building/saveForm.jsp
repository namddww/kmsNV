<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../../views/common/include/common.jsp" %>
<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<h1>건물 등록</h1>
<hr>
<div id="buildingArea">
    <form method="POST" id="buildingForm" enctype="multipart/form-data">
        <div>
            <span>기본정보</span>
            <div>
                <span>건물좌표:</span>
                <input type="text" id="stdPoint" disabled style="width: 25%;">
                <input type="text" id="areaPoint" disabled style="width: 25%;">
                <button type="button" id="btnPoint" class="btn gray">좌표등록</button>
                <button type="button" id="btnDirect" class="btn gray">직접입력</button><br>
                <div id="inputDirect" style="display: none;">
                    좌상단:
                    <input type="hidden" id="stdPoint1">
                    <input type="hidden" id="stdPoint2">
                    우하단:
                    <input type="hidden" id="areaPoint1">
                    <input type="hidden" id="areaPoint2">
                </div>
            </div>
            <div>
                <span>건물명:</span>
                <input type="text" id="buildName">
            </div>
            <div>
                <span>상세주소1:</span>
                <input type="text" id="addr1" disabled style="width: 25%;"  >
            </div>
            <div>
                <span>상세주소2:</span>
                <input type="text" id="addr2" style="width: 25%;">
                <button type="button" id="btnAddr" class="btn gray">주소조회</button>
            </div>
            <div>
                <span>층정보</span>
                <span>지상:</span>
                <input type="number" id="groundFloor" min="1" style="width: 5%;"><span>층</span>
                <span>지하:</span>
                <input type="number" id="baseFloor" min="0" style="width: 5%;"><span>층</span>
                <button type="button" id="btnFloor" class="btn gray">등록</button>
                <button type="button" id="btnFloorClear" class="btn gray">초기화</button>
            </div>
        </div>
        <hr>
        <div>
            <span>층별정보</span>
            <button type="button" id="btnFloorPopupChk" class="btn gray">일괄등록 (체크된 층)</button>
            <div>
                <table id="floorListTable">
                    <thead>
                    <tr>
                        <th>체크</th>
                        <th>층</th>
                        <th>파일</th>
                        <th>투명도</th>
                        <th>도면등록</th>
                    </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
        <hr>
        <div>
            <span>검색정보</span><br>
            <span>* 복수의 검색 정보 등록 시 '/'로 구분하여 등록</span>
            <div>
                <textarea id="searchInfo"></textarea>
            </div>
        </div>
        <hr>
        <div>
            <span>메모</span>
            <div>
                <textarea id="memo"></textarea>
            </div>
        </div>
        <hr>
        <div>
            <button type="button" id="btnSave" class="btn gray">등록</button>
            <button type="button" id="btnList" class="btn gray">목록</button>
        </div>
    </form>
</div>
<script type="text/javascript" src="/assets/js/building/saveForm.js"></script>