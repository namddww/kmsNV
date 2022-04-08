<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<div class="sub_content">
    <div class="view_list_head">
        <h2 class="page_title_big">지오팬스 조회</h2>
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
            <div class="global_search">
                <input type="number" id="floor" class="text" placeholder="층수를 입력해주세요.">
            </div>
            <div class="global_search">
                <input type="text" id="buildName" class="text" placeholder="건물이름을 입력해주세요.">
                <input type="button" value="조회" class="btn" id="a-search">
            </div>
        </div>
    </div>
</div>
<div class="view_detail list">
    <div class="tbl_col_wrap">
        <div id="geofenceList">
            <table class="tbl_col" id="geofenceListTable">
                <colgroup>
                    <!--col : 7-->
                    <col style="width: 13%">
                    <col style="width: 13%">
                    <col style="width: 13%">
                    <col style="width: 22%">
                    <col style="width: 13%">
                    <col style="width: 13%">
                    <col style="width: 13%">
                </colgroup>
                <thead>
                <tr>
                    <th>지역</th>
                    <th>건물명</th>
                    <th>층수</th>
                    <th>이름</th>
                    <th>종류</th>
                    <th>상태</th>
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
                            지오팬스등록
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="/assets/js/geofence/geofenceList.js"></script>
