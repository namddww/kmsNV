<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../../views/common/include/common.jsp" %>

<h1>건물 조회</h1>
<div id="buildingList">
    <div>
        <table>
            <colgroup>
                <col style="width:10%">
                <col style="width:30%">
                <col style="width:10%">
                <col style="width:50%">
            </colgroup>
            <tbody>
            <tr>
                <th>건물명</th>
                <td><input type="text" id="buildName"></td>
                <th>등록 일자</th>
                <td colspan="3">
                    <div class="date_wp">
                        <input type="text" id="scRegDtSt" name="scRegDtSt" title="시작일시" class="dateRegStart" readonly="readonly">
                        <span class="dash">~</span>
                        <input type="text" id="scRegDtEd" name="scRegDtEd" title="종료일시" class="dateRegEnd" readonly="readonly">
                    </div>
                </td>
                <td rowspan="2">
                    <div class="btn_area search"><a href="javascript:void(0)" id="a-search" class="btn gray">조회</a></div>
                </td>
            </tr>
            <tr>
                <th>지역</th>
                <td>
                    <select id="select-area">
                        <option value="" selected>전체</option>
                        <option value="SO">서울</option>
                        <option value="DJ">대전</option>
                        <option value="DG">대구</option>
                        <option value="BS">부산</option>
                    </select>
                </td>
                <th>사용 여부</th>
                <td>
                    <select id="select-useYn">
                        <option value="" selected>전체</option>
                        <option value="Y">사용</option>
                        <option value="N">미사용</option>
                    </select>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
    <table id="buildingListTable">
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
    <div class="paging">
        <nav>
            <ul class="pagination justify-content-center">
                <li class="page-item">
                    <a class="page-link" href="javascript: void(0);" aria-label="Previous">
                        <span aria-hidden="true">«</span>
                    </a>
                </li>
                <li class="page-item"><a class="page-link" href="javascript: void(0);">1</a></li>
                <li class="page-item">
                    <a class="page-link" href="javascript: void(0);" aria-label="Next">
                        <span aria-hidden="true">»</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</div>
<div>
    <button type="button" id="btnSaveForm" class="btn gray">
        건물등록
    </button>
</div>
<script type="text/javascript" src="/assets/js/building/buildingList.js"></script>
