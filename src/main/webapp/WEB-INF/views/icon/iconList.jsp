<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../../views/common/include/common.jsp" %>

        <div class="sub_content">
                <div class="view_list_head">
                    <h2 class="page_title_big">아이콘 관리</h2>
                    <div class="search_sort sort">
                        <div class="search_check">
                            <p>
                                <em class="tit">아이콘명 :</em>
                                <input type="text" id="iconName1" class="text">
                            </p>
                        </div>
                        <div class="calendar_sort">
                            <span class="date_box">
                                <input type="text" id="scRegDtSt" name="scRegDtSt" title="시작일시" class="date hasDatepicker" readonly="readonly">
                                <img class="ui-datepicker-trigger" src="/assets/resource/images/ico/ico_calendar.svg">
                            </span>
                            <span class="bar">~</span>
                            <span class="date_box">
                                <input type="text" id="scRegDtEd" name="scRegDtEd" title="종료일시" class="date hasDatepicker" readonly="readonly">
                                <img class="ui-datepicker-trigger" src="/assets/resource/images/ico/ico_calendar.svg">
                            </span>
                        </div>
<%--                        <table>--%>
<%--                            <colgroup>--%>
<%--                                <col style="width:10%">--%>
<%--                                <col style="width:30%">--%>
<%--                                <col style="width:10%">--%>
<%--                                <col style="width:50%">--%>
<%--                            </colgroup>--%>
<%--                            <tbody>--%>
<%--                            <tr>--%>
<%--                                <th>아이콘명</th>--%>
<%--                                <td><input type="text" id="iconName"></td>--%>
<%--                                <th>등록 일자</th>--%>
<%--                                <td colspan="3">--%>
<%--                                    <div class="calendar_sort">--%>
<%--                                        <span class="date_box">--%>
<%--                                            <input type="text" id="scRegDtSt" name="scRegDtSt" title="시작일시" class="date hasDatepicker" readonly="readonly">--%>
<%--                                        </span>--%>
<%--                                        <span class="bar">~</span>--%>
<%--                                        <span class="date_box">--%>
<%--                                            <input type="text" id="scRegDtEd" name="scRegDtEd" title="종료일시" class="date hasDatepicker" readonly="readonly">--%>
<%--                                        </span>--%>
<%--                                    </div>--%>
<%--                                </td>--%>
<%--                                <td rowspan="2">--%>
<%--                                    <div class="btn_area search"><a href="javascript:void(0)" id="a-search" class="btn gray">조회</a></div>--%>
<%--                                </td>--%>
<%--                            </tr>--%>
<%--                            <tr>--%>
<%--                                <th>타입</th>--%>
<%--                                <td>--%>
<%--                                    <select id="select-type">--%>
<%--                                        <option value="" selected>전체</option>--%>
<%--                                    </select>--%>
<%--                                </td>--%>
<%--                            </tr>--%>
<%--                            </tbody>--%>
<%--                        </table>--%>
                        <div class="view_detail list">
                            <div class="btn_area small">
                                <a href="javascript:void(0)" id="a-reg" class="btn red">아이콘등록</a>
                                <a href="javascript:void(0)" id="a-delete" class="btn red_2">삭제</a>
                            </div>
                        </div>
                    </div>
                    <div class="data_table st4">
                        <table class="link ">
                            <colgroup>
                                <col style="width:20%">
                                <col style="width:20%">
                                <col style="width:20%">
                                <col style="width:20%">
                                <col style="width:20%">
                            </colgroup>
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
                </div>
        </div>
<script type="text/javascript" src="/assets/js/icon/iconList.js"></script>
<script>
    var typeList = ${typeList};
</script>
