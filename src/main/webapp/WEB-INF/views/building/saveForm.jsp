<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../../views/common/include/common.jsp" %>
<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>

<div class="side_cont" id="buildingArea">
    <div class="head">
        <h2>건물 등록</h2>
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
                    <th scope="col">건물좌표</th>
                    <td class="dupl_chk" style="padding: 10px 30px;">
                        <input type="text" id="stdPoint" disabled style="width: 32%;">
                        <input type="text" id="areaPoint" disabled style="width: 32%;">
                        <button type="button" id="btnPoint" class="">좌표등록</button>
                        <button type="button" id="btnDirect" class="">직접입력</button>
                    </td>
                </tr>
                <tr id="inputDirect1" style="display: none;">
                    <th scope="col">좌상단 위도</th>
                    <td>
                        <input type="hidden" id="stdPoint1">
                    </td>
                </tr>
                <tr id="inputDirect2" style="display: none;">
                    <th scope="col">좌상단 경도</th>
                    <td>
                        <input type="hidden" id="stdPoint2">
                    </td>
                </tr>
                <tr id="inputDirect3" style="display: none;">
                    <th scope="col">우하단 위도</th>
                    <td>
                        <input type="hidden" id="areaPoint1">
                    </td>
                </tr>
                <tr id="inputDirect4" style="display: none;">
                    <th scope="col">우하단 경도</th>
                    <td>
                        <input type="hidden" id="areaPoint2">
                    </td>
                </tr>
                <tr>
                    <th scope="col">건물명</th>
                    <td>
                        <input type="text" id="buildName">
                    </td>
                </tr>
                <tr>
                    <th scope="col">상세주소1</th>
                    <td>
                        <input type="text" id="addr1" disabled>
                    </td>
                </tr>
                <tr>
                    <th scope="col">상세주소2</th>
                    <td class="dupl_chk" style="padding: 10px 30px;">
                        <input type="text" id="addr2" style="width: 89%;">
                        <button type="button" id="btnAddr" class="">주소조회</button>
                    </td>
                </tr>
                <tr>
                    <th scope="col">층정보</th>
                    <td class="dupl_chk" style="padding: 10px 30px;">
                        <span>지상:</span>
                        <input type="number" id="groundFloor" min="1" style="width: 7%;"><span>&nbsp;층&nbsp;&nbsp;</span>
                        <span>지하:</span>
                        <input type="number" id="baseFloor" min="0" style="width: 7%;"><span>&nbsp;층&nbsp;&nbsp;</span>
                        <button type="button" id="btnFloor" class="">등록</button>
                        <button type="button" id="btnFloorClear" class="">초기화</button>
                    </td>
                </tr>
                </tbody>
                <tr>
                    <th scope="col">층별정보</th>
                    <td class="dupl_chk" style="padding: 10px 30px;">
                        <button type="button" id="btnFloorPopupChk" class="btn gray">일괄등록 (체크된 층)</button>
                    </td>
                </tr>
            </table>
        </div>
        <br>
        <div class="side_tbl_wrap">
            <table id="floorListTable" class="tbl_height">
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
                        <textarea id="searchInfo"></textarea>
                    </td>
                </tr>
                <tr>
                    <th scope="col">메모</th>
                    <td>
                        <textarea id="memo"></textarea>
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
<script type="text/javascript" src="/assets/js/building/saveForm.js"></script>