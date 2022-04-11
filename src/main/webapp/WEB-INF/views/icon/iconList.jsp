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
<div class="view_detail card">
    <div class="view_card_cont" id="view_content">
        <a class="card">
            <em class="cate">자산타입</em>
            <div class="pic">
                <img src="/assets/resource/images/etc/315345_click_finger_icon.png">
            </div>
<%--            <div class="preview_txt">--%>
<%--                <dt>[자산타입] 자산명</dt>--%>
<%--            </div>--%>
            <div class="info_data">
                <h4>자산명</h4>
                <span class="date">9999.01.01</span>
            </div>
        </a>
    </div>
</div>
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
<script type="text/javascript" src="/assets/js/icon/iconList.js"></script>
<script>
    var typeList = ${typeList};
</script>
