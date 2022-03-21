<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../../views/common/include/common.jsp" %>
<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>


<form id="userForm">
    <div class="side_cont" style="right: 0px;">
        <div class="head">
            <h2>사용자</h2>
        </div>
        <div class="content">
            <div class="tbl_row_wrap">
                <table class="tbl_row">
                    <caption style="display :none;">사용자 등록</caption>
                    <colgroup>
                        <col style="width: 30%;">
                        <col style="width: 60%;">
                    </colgroup>
                    <tbody>
                        <tr class="tr-hidden">
                            <th>SEQ</th>
                            <td><input type="number" id="userSeq" /></td>
                        </tr>
                        <tr class="tr-hidden">
                            <th>등록일</th>
                            <td><span id="regDate">9999-01-01</span></td>
                        </tr>
                        <tr>
                            <th>ID <span class="red">*</span></th>
                            <td><input type="text" id="userId" /></td>
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
                                    <option value="">선택</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>생년월일 <span class="red">*</span></th>
                            <td>
                                <div class="calendar_sort">
                                    <span class="date_box">
                                        <input type="text" class="date" placeholder="yyyy-mm-dd" id="scRegDtSt" autocomplete="off">
                                    </span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>주소 <span class="red">*</span></th>
                            <td>
                                <input type="text" id="addr1">
                                <td class="dupl_chk"><button id="btnAddr" type="button">검색</button></td>
                            </td>
                        </tr>
                        <tr>
                            <th>상세주소</th>
                            <td>
                                <input type="text" id="addr2">
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
                            <td><textarea class="textarea_input" id="memo" style="resize: none;"></textarea></td>
                        </tr>
                    </tbody>
                </table>
                <div class="btn_wrap">
                    <a href="javascript:void(0);" id="a-reg" class="btn_r selected tr-hidden" style="display:none;">등록</a>
                    <a href="javascript:void(0);"  id="a-modify" class="btn_r selected" style="display:none;">수정</a>
                    <a href="javascript:void(0);" id="a-cancel" class="btn_r">취소</a>
                </div>
            </div>
        </div>
</form>
<script type="text/javascript" src="/assets/js/user/saveForm.js"></script>
<script>
    var sexCdList = ${sexCdList};
    var actionFlag = '${actionFlag}';
    if (actionFlag == "UPDATE") {
        var userSeq = '${userSeq}';
    }
</script>