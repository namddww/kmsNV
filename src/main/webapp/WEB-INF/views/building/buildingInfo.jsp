<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../../views/common/include/common.jsp" %>
<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<h1>건물 상세페이지</h1>
<hr>
<div id="buildingArea">
    <form method="POST" id="buildingForm" enctype="multipart/form-data">
        <div>
            <span>기본정보</span>
            <div>
                <span>등록일: ${building.regDate}</span>
                <span>등록자: ${building.regUser}</span>
                <span>건물ID: ${building.buildSeq}</span>
                <input type="hidden" id="buildSeq" value="${building.buildSeq}">
            </div>
            <div>
                <span>건물좌표:</span>
                <input type="text" id="stdPoint" disabled style="width: 25%;" value="${building.stdPoint1} / ${building.stdPoint2}">
                <input type="text" id="areaPoint" disabled style="width: 25%;" value="${building.stdPoint1} / ${building.stdPoint2}">
                <button type="button" id="btnPoint" class="btn gray">좌표등록</button>
                <button type="button" id="btnDirect" class="btn gray">직접입력</button><br>
                <div id="inputDirect" style="display: none;">
                    좌상단:
                    <input type="hidden" id="stdPoint1" value="${building.stdPoint1}">
                    <input type="hidden" id="stdPoint2" value="${building.stdPoint2}">
                    우하단:
                    <input type="hidden" id="areaPoint1" value="${building.areaPoint1}">
                    <input type="hidden" id="areaPoint2" value="${building.areaPoint2}">
                </div>
            </div>
            <div>
                <span>건물명:</span>
                <input type="text" id="buildName" value="${building.buildName}">
            </div>
            <div>
                <span>상세주소1:</span>
                <input type="text" id="addr1" disabled style="width: 25%;" value="${building.addr1}">
            </div>
            <div>
                <span>상세주소2:</span>
                <input type="text" id="addr2" style="width: 25%;" value="${building.addr2}">
                <button type="button" id="btnAddr" class="btn gray">주소조회</button>
            </div>
            <div>
                <span>층정보</span>
                <span>지상:</span>
                <input type="number" id="groundFloor" min="1" style="width: 5%;" value="${building.groundFloor}"><span>층</span>
                <span>지하:</span>
                <input type="number" id="baseFloor" min="0" style="width: 5%;" value="${building.baseFloor * -1}"><span>층</span>
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
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        <c:forEach var="data" items="${floor}" varStatus="status">
                            <tr>
                                <td>
                                    <input type="checkbox" name="chk" class="floorChk" value="${data.floor}">
                                </td>
                                <c:if test="${data.floor < 0}">
                                    <td>지하${data.floor * -1}</td>
                                </c:if>
                                <c:if test="${data.floor > 0}">
                                    <td>${data.floor}</td>
                                </c:if>
                                <td>
                                    <div id="df${data.floor}">
                                        <span>${data.filePath}</span>
                                    </div>
                                    <input type="hidden" id="filePath${data.floor}" value="${data.filePath}">
                                </td>
                                <td>
                                    <input type="num" id="dfopacity${data.floor}" value="${data.opacity*0.01}">
                                </td>
                                <td>
                                    <button type="button" id="btnFloorPopup" data-num="${data.floor}">등록</button>
                                </td>
                            </tr>
                        </c:forEach>
                    </tbody>
                </table>
            </div>
        </div>
        <hr>
        <div>
            <span>검색정보</span><br>
            <span>* 복수의 검색 정보 등록 시 '/'로 구분하여 등록</span>
            <div>
                <textarea id="searchInfo">${building.searchInfo}</textarea>
            </div>
        </div>
        <hr>
        <div>
            <span>메모</span>
            <div>
                <textarea id="memo">${building.memo}</textarea>
            </div>
        </div>
        <hr>
        <div>
            <button type="button" id="btnSave" class="btn gray">수정</button>
            <button type="button" id="btnList" class="btn gray">목록</button>
        </div>
    </form>
</div>
<script src="https://code.jquery.com/jquery-latest.min.js"></script>
<script type="text/javascript" src="/assets/js/building/buildingInfo.js"></script>