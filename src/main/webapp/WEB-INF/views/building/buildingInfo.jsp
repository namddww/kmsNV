<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../../views/common/include/common.jsp" %>
<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>

<div class="side_cont" id="buildingArea">
    <div class="s_nav">
        <ul>
            <li><a href="#">HOME</a></li>
            <li><a href="#">건물관리</a></li>
            <li class="at">건물관리 상세</li>
        </ul>
    </div>
    <div class="head">
        <h2>건물 상세페이지</h2>
    </div>
    <form method="POST" id="buildingForm" enctype="multipart/form-data">
    <div class="content">
        <div class="tbl_row_wrap">
            <table class="tbl_row">
                <colgroup>
                    <col style="width: 15%">
                    <col style="width: 85%">
                </colgroup>
                <tbody>
                <tr>
                    <th scope="col">등록일</th>
                    <td>${building.regDate}</td>
                </tr>
                <tr>
                    <th scope="col">등록자</th>
                    <td>${building.regUser}</td>
                </tr>
                <tr>
                    <th scope="col">건물ID</th>
                    <td>${building.buildSeq}</td>
                    <input type="hidden" id="buildSeq" value="${building.buildSeq}">
                </tr>
                <tr>
                    <th scope="col">건물좌표</th>
                    <td class="dupl_chk" style="padding: 10px 30px;">
                        <input type="text" id="stdPoint" disabled style="width: 32%;" value="${building.stdPoint1} / ${building.stdPoint2}">
                        <input type="text" id="areaPoint" disabled style="width: 32%;" value="${building.areaPoint1} / ${building.areaPoint2}">
                        <button type="button" id="btnPoint" class="">좌표등록</button>
                        <button type="button" id="btnDirect" class="">직접입력</button>
                    </td>
                </tr>
                <tr id="inputDirect1" style="display: none;">
                    <th scope="col">좌상단 위도</th>
                    <td>
                        <input type="hidden" id="stdPoint1" value="${building.stdPoint1}">
                    </td>
                </tr>
                <tr id="inputDirect2" style="display: none;">
                    <th scope="col">좌상단 경도</th>
                    <td>
                        <input type="hidden" id="stdPoint2" value="${building.stdPoint2}">
                    </td>
                </tr>
                <tr id="inputDirect3" style="display: none;">
                    <th scope="col">우하단 위도</th>
                    <td>
                        <input type="hidden" id="areaPoint1" value="${building.areaPoint1}">
                    </td>
                </tr>
                <tr id="inputDirect4" style="display: none;">
                    <th scope="col">우하단 경도</th>
                    <td>
                        <input type="hidden" id="areaPoint2" value="${building.areaPoint2}">
                    </td>
                </tr>
                <tr>
                    <th scope="col">건물명</th>
                    <td>
                        <input type="text" id="buildName" value="${building.buildName}">
                    </td>
                </tr>
                <tr>
                    <th scope="col">상세주소1</th>
                    <td>
                        <input type="text" id="addr1" disabled value="${building.addr1}">
                    </td>
                </tr>
                <tr>
                    <th scope="col">상세주소2</th>
                    <td class="dupl_chk" style="padding: 10px 30px;">
                        <input type="text" id="addr2" style="width: 89%;" value="${building.addr2}">
                        <button type="button" id="btnAddr" class="">주소조회</button>
                    </td>
                </tr>
                <tr>
                    <th scope="col">층정보</th>
                    <td class="dupl_chk" style="padding: 10px 30px;">
                        <span>지상: ${building.groundFloor}층</span>
                        <span>지하: ${building.baseFloor * -1}층</span>
                        <input type="hidden" id="groundFloor" value="${building.groundFloor}">
                        <input type="hidden" id="baseFloor" value="${building.baseFloor}">
                    </td>
                </tr>
                <tr>
                    <th scope="col">층별정보</th>
                    <td class="dupl_chk" style="padding: 10px 30px;">
                        <button type="button" id="btnFloorPopupChk" class="btn gray mid">일괄등록 (체크된 층)</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <br>
        <div class="side_tbl_wrap">
            <table id="floorListTable" class="tbl_height">
                <colgroup>
                    <!--col : 6-->
                    <col style="width: 10%">
                    <col style="width: 13%">
                    <col style="width: 36%">
                    <col style="width: 13%">
                    <col style="width: 13%">
                    <col style="width: 15%">
                </colgroup>
                <thead>
                <tr>
                    <th>체크</th>
                    <th>층</th>
                    <th>파일</th>
                    <th>투명도</th>
                    <th>도면등록</th>
                    <th>사용여부</th>
                </tr>
                </thead>
                <tbody>
                <c:forEach var="data" items="${floor}" varStatus="status">
                    <tr>
                        <td>
                            <input type="checkbox" name="chk" id="chk${data.floor}" class="floorChk" value="${data.floor}">
                            <label for="chk${data.floor}"></label>
                            <input type="hidden" id="floorSeq${data.floor}" value="${data.floorSeq}">
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
                            <input type="number" id="dfopacity${data.floor}" value="${data.opacity*0.01}">
                        </td>
                        <td>
                            <button type="button" id="btnFloorPopup" data-num="${data.floor}">등록</button>
                        </td>
                        <td>
                            <select id="sel${data.floor}">
                                <option value="Y" <c:if test ="${data.isUse eq 'Y'}">selected="selected"</c:if>>사용</option>
                                <option value="N" <c:if test ="${data.isUse eq 'N'}">selected="selected"</c:if>>사용안함</option>
                            </select>
                        </td>
                    </tr>
                </c:forEach>
                </tbody>
            </table>
        </div>
        <br>
        <div class="tbl_row_wrap">
            <table class="tbl_row">
                <colgroup>
                    <col style="width: 15%">
                    <col style="width: 85%">
                </colgroup>
                <tbody>
                <tr>
                    <th scope="col">검색정보</th>
                    <td>
                        <span>* 복수의 검색 정보 등록 시 '/'로 구분하여 등록</span><br>
                        <textarea id="searchInfo">${building.searchInfo}</textarea>
                    </td>
                </tr>
                <tr>
                    <th scope="col">메모</th>
                    <td>
                        <textarea id="memo">${building.memo}</textarea>
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
<script type="text/javascript" src="/assets/js/building/buildingInfo.js"></script>