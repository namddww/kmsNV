<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../../views/common/include/common.jsp" %>

<h1>건물 조회</h1>
<div id="buildingList">
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
<script src="https://code.jquery.com/jquery-latest.min.js"></script>
<script type="text/javascript" src="/assets/js/building/buildingList.js"></script>
