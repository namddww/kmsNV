<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../../views/common/include/common.jsp" %>

<div class="wrap">
    <div class="container">
        <div class="content">
            <div class="page_nav_wrap">
                <h3>자산 목록</h3>
                <div>
                    <a href="#">자산</a>
                    <a href="#">자산 목록</a>
                </div>
            </div>
            <div class="section">
                <div class="data_tb_wrap">
                    <div class="search_bx clearfix">
                        <table>
                            <colgroup>
                                <col style="width:10%">
                                <col style="width:30%">
                                <col style="width:10%">
                                <col style="width:50%">
                            </colgroup>
                            <tbody>
                            <tr>
                                <th>아이콘명</th>
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
                                <th>타입</th>
                                <td>
                                    <select id="select-type">
                                        <option value="" selected>전체</option>
                                    </select>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <div class="btn_wrap clearfix">
                            <div class="btn_area small">
                                <a href="javascript:void(0)" id="a-reg" class="btn red">자산등록</a>
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
                                <td onClick="javascript:void(0);" colspan="8">조회버튼을 통해 검색해 주세요.</td>
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
        </div>
    </div>
</div>
<script type="text/javascript" src="/assets/js/icon/iconList.js"></script>
<script>
    var typeList = ${typeList};
</script>
