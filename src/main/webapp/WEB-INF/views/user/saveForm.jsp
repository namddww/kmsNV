<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../../views/common/include/common.jsp" %>
<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>

<div class="page_nav_wrap">
    <h3>사용자 등록</h3>
    <div>
        <a href="javascript:void(0);">사용자</a>
        <a href="javascript:void(0);">사용자 등록</a>
    </div>
</div>
<br>
<%--<div id="build-info" style="height: auto; width: 100%; border:1px solid;">--%>
    <form id="deviceForm">
        <div class="edit_table">
            <table class="">
                <colgroup>
                    <col style="width:200px">
                    <col>
                </colgroup>
                <tbody>
                    <tr class="tr-hidden">
                        <th>SEQ</th>
                        <td><span id="seq">0</span></td>
                    </tr>
                    <tr class="tr-hidden">
                        <th>등록일</th>
                        <td><span id="regDate">9999-01-01</span></td>
                    </tr>
                    <tr>
                        <th>ID <span class="red">*</span></th>
                        <td><input type="text" id="userId"/></td>
                    </tr>
                    <tr>
                        <th>Password <span class="red">*</span></th>
                        <td><input type="password" id="password"/></td>
                    </tr>
                    <tr>
                        <th>이름 <span class="red">*</span></th>
                        <td>
                            <input type="text" id="userName" style="width: 90%;">
                        </td>
                    </tr>
                    <tr>
                        <th>성별 <span class="red">*</span></th>
                        <td>
                            <select id="sexCd">
                                <option value="M">남자</option>
                                <option value="W">여자</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>생년월일 <span class="red">*</span></th>
                        <td>
                            <div class="date_wp">
                                <input type="text" id="birthday" name="scRegDtSt" title="시작일시" class="dateRegStart" readonly="readonly" style="width: 95%;">
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th>주소 <span class="red">*</span></th>
                        <td>
                            <input type="text" id="addr1" style="width: 70%;">
                            <button type="button" id="btnAddr" class="btn gray" style="float:right">검색</button>
                        </td>
                    </tr>
                    <tr>
                        <th>상세주소 <span class="red">*</span></th>
                        <td>
                            <input type="text" id="addr2" style="width: 90%;">
                        </td>
                    </tr>
                    <tr class="tr-hidden">
                        <th>상태</th>
                        <td>
                            <select id="stateCd">
                                <option value="Y">정상</option>
                                <option value="N">비정상</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>사용여부 <span class="red">*</span></th>
                        <td>
                            <input type="radio" id="radio_useY" name="isUse" value="Y">
                            <label for="radio_useY">사용</label>
                            <input type="radio" id="radio_useN" name="isUse" value="N">
                            <label for="radio_useN">사용안함</label>
                        </td>
                    </tr>
                    <tr>
                        <th>메모</th>
                        <td><textarea id="memo"></textarea></td>
                    </tr>
                </tbody>
            </table>
            <div class="btn_area st2">
                <a href="javascript:void(0);" id="a-reg" class="btn red tr-hidden" style="display:none;">등록</a>
                <a href="javascript:void(0);"  id="a-modify" class="btn red" style="display:none;">수정</a>
                <a href="javascript:void(0);" id="a-cancel" class="btn red_2">취소</a>
            </div>
        </div>
    </form>
<%--</div>--%>
<script type="text/javascript" src="/assets/js/user/saveForm.js"></script>
