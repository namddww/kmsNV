<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../../views/common/include/common.jsp" %>
<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>

<form id="deviceForm">
    <div class="side_cont" style="right: 0px;">
        <div class="head">
            <h2>아이콘 등록</h2>
        </div>
        <div class="content">
            <div class="tbl_row_wrap">
                <table class="tbl_row">
                    <caption style="display :none;">아이콘 등록</caption>
                    <colgroup>
                        <col style="width:20%">
                        <col style="width: 80%">
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
                            <th>아이콘명 <span class="red">*</span></th>
                            <td><input type="text" id="iconName"/></td>
                        </tr>
                        <tr>
                            <th>타입 <span class="red">*</span></th>
                            <td id="td-type">
                                <input type="hidden" id="oldCodeVal">
                                <select id="iconCd" class="select_input">
                                    <option value="" data-sub="">선택</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>이미지 <span class="red">*</span></th>
                            <td id="td-image"><input type="file" id="iconPath"/></td>
                        </tr>
                        <tr onclick="">
                            <th>메모</th>
                            <td><textarea id="memo" class="textarea_input"></textarea></td>
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
    </div>
</form>
<script type="text/javascript" src="/assets/js/icon/saveForm.js"></script>
<script>
    var actionFlag = '${actionFlag}';
    var typeList = ${typeList};

    if (actionFlag == "UPDATE") {
        var iconSeq = '${iconSeq}';
    }
</script>
