<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../../views/common/include/common.jsp" %>
<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>

<div class="page_nav_wrap">
    <h3>아이콘 등록</h3>
    <div>
        <a href="javascript:void(0);">공통</a>
        <a href="javascript:void(0);">아이콘 등록</a>
    </div>
</div>
<br>
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
                        <th>아이콘명 <span class="red">*</span></th>
                        <td><input type="text" id="iconName"/></td>
                    </tr>
                    <tr>
                        <th>타입 <span class="red">*</span></th>
                        <td id="td-type">
                            <input type="hidden" id="groupCd">
                            <select id="iconCd">
                                <option value="" data-sub="">선택</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>이미지 <span class="red">*</span></th>
                        <td><input type="file" id="iconPath"/></td>
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
<script type="text/javascript" src="/assets/js/icon/saveForm.js"></script>
<script>
    var actionFlag = '${actionFlag}';
    var typeList = ${typeList};
</script>
