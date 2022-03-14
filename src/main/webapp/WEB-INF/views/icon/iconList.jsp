<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<div class="sub_content">
    <div class="view_list_head">
        <h2 class="page_title_big">아이콘 관리</h2>
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
            <select id="select-type">
                <option value="" selected>전체</option>
                <option value="">전체</option>
            </select>
            <div class="global_search">
                <input type="text" id="iconName" class="text">
                <input type="button" value="조회" class="btn" id="a-search">
            </div>
        </div>
    </div>
</div>
<div class="view_detail list">
    <div class="tbl_col_wrap">
        <div id="buildingList">
            <table class="tbl_col">
                <thead>
                <tr>
                    <th>타입</th>
                    <th>아이콘명</th>
                    <th>이미지</th>
                    <th>등록 일자</th>
                    <th>수정 일자</th>
                </tr>
                </thead>
                <tbody id="tbody">
                <tr>
                    <td onClick="javascript:void(0);" colspan="8">검색결과가 없습니다.</td>
                </tr>
                </tbody>
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
                            아이콘등록
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="/assets/js/icon/iconList.js"></script>
<script>
    var typeList = ${typeList};
</script>
