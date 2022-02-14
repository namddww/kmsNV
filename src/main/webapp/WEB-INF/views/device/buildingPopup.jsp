<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../../views/common/include/common.jsp" %>

<div class="wrap">
    <div class="container">
        <div class="content">
            <div class="page_nav_wrap">
                <h3>건물 목록</h3>
                <div>
                    <a href="#">자산</a>
                    <a href="#">건물 목록</a>
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
                                <th>건물명</th>
                                <td><input type="text"></td>
                                <th>등록 일자</th>
                                <td colspan="3">
                                    <div class="date_wp">
                                        <input type="text" id="scRegDtSt" name="scRegDtSt" title="시작일시" class="dateRegStart" readonly="readonly">
                                        <span class="dash">~</span>
                                        <input type="text" id="scRegDtEd" name="scRegDtEd" title="종료일시" class="dateRegEnd" readonly="readonly">
                                    </div>
                                </td>
                                <td rowspan="2">
                                    <div class="btn_area search"><a href="#" class="btn gray">조회</a></div>
                                </td>
                            </tr>
                            <tr>
                                <th>지역</th>
                                <td>
                                    <select id="select-area">
                                        <option value="ALL" selected>전체</option>
                                        <option value="SO">서울</option>
                                        <option value="DJ">대전</option>
                                        <option value="DG">대구</option>
                                        <option value="BS">부산</option>
                                    </select>
                                </td>
                                <th>사용 여부</th>
                                <td>
                                    <select id="select-useYn">
                                        <option value="ALL" selected>전체</option>
                                        <option value="YES">사용</option>
                                        <option value="NO">미사용</option>
                                    </select>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="data_table st4">
                        <table class="link ">
                            <colgroup>
                                <col style="width:10%">
                                <col style="width:7%">
                                <col style="width:25%">
                                <col style="width:5%">
                                <col style="width:30%">
                                <col style="width:15%">
                            </colgroup>
                            <thead>
                            <tr>
                                <th>건물명</th>
                                <th>지역</th>
                                <th>상세주소</th>
                                <th>층수</th>
                                <th>좌표</th>
                                <th>등록 일자</th>
                            </tr>
                            </thead>
                            <tbody id="tbody">
                            <tr>
                                <td onClick="#">휴빌론</td>
                                <td>서울</td>
                                <td>서울 서초구 강남대로 291 남강빌딩</td>
                                <td>5</td>
                                <td>127.03122777241998	/ 37.48893200242128</td>
                                <td>2022-02-10 17:00</td>
                            </tr>
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="/assets/js/device/buildingPopup.js"></script>
