<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<div class="sub_content">
    <div class="view_list_head">
        <h2 class="page_title_big">건물 조회</h2>
        <div class="search_sort sort">
            <div class="calendar_sort">
                <span class="date_box">
                    <input type="text" class="date" placeholder="yyyy-mm-dd" id="scRegDtSt" autocomplete="off">
                </span>
                    <span class="bar">~</span>
                    <span class="date_box">
                    <input type="text" class="date" placeholder="yyyy-mm-dd" id="scRegDtEd" autocomplete="off">
                </span>
            </div>
            <select id="select-area">
                <option value="" selected>전체</option>
                <option value="SO">서울</option>
                <option value="DJ">대전</option>
                <option value="DG">대구</option>
                <option value="BS">부산</option>
            </select>
            <select id="select-useYn">
                <option value="" selected>전체</option>
                <option value="Y">사용</option>
                <option value="N">미사용</option>
            </select>
            <div class="global_search">
                <input type="text" id="buildName" class="text">
                <input type="button" value="조회" class="btn" id="a-search">
            </div>
        </div>
    </div>
</div>
<div class="view_detail list">
    <div class="tbl_col_wrap">
        <div id="buildingList">
            <table class="tbl_col" id="buildingListTable">
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
            <div class="btn_wrap">
                <div class="pagingBox">
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
                    <div class="pix_right">
                        <button type="button" id="btnSaveForm" class="btn_r selected">
                            건물등록
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="/assets/js/building/buildingList.js"></script>
