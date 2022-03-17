<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../../views/common/include/common.jsp" %>

<form id="deviceForm">
    <input type="hidden" id="buildSeq">
    <input type="hidden" id="stdPoint1">
    <input type="hidden" id="stdPoint2">
    <input type="hidden" id="areaPoint1">
    <input type="hidden" id="areaPoint2">

    <div class="side_cont" style="right: 0px;">
        <div class="head">
            <h2>자산 등록</h2>
        </div>
        <div class="content">
            <div class="tbl_row_wrap">
                <table class="tbl_row">
                    <caption style="display :none;">자산 등록</caption>
                    <colgroup>
                        <col style="width:20%">
                        <col style="width:30%">
                        <col style="width:20%">
                        <col style="width:30%">
                    </colgroup>
                    <tbody>
                        <!-- 등록 정보-->
                        <tr class="tr-hidden">
                            <th scope="col">자산ID</th>
                            <td><input type="text" id="deviceSeq" value="0" disabled></td>
                            <th scope="col">등록일</th>
                            <td><input type="text" id="regDate" value="9999-01-01" disabled></td>
                        </tr>
                        <tr class="tr-hidden">
                            <th scope="col">등록자</th>
                            <td><input type="text" id="regUser" value="아무개" disabled></td>
                        </tr>
                        <!-- 건물 정보-->
                        <tr>
                            <th scope="col">건물명<em class="emp_mark">*</em></th>
                            <td><input type="text" id="buildName" value="" disabled></td>
                            <td class="dupl_chk"><button id="building-btn" disabled>건물 선택</button></td>
                        </tr>
                        <tr>
                            <th scope="col">지역<em class="emp_mark">*</em></th>
                            <td><input type="text" id="locationCd" value="" disabled></td>
                            <th scope="col">층정보<em class="emp_mark">*</em></th>
                            <td><input type="text" id="floorInfo" value="" disabled></td>
                        </tr>
                        <tr>
                            <th scope="col">상세주소<em class="emp_mark">*</em></th>
                            <td colspan="3"><input type="text" id="address" value="" disabled></td>
                        </tr>
                        <tr>
                            <th scope="col">자산명<em class="emp_mark">*</em></th>
                            <td colspan="3"><input type="text" id="deviceName"></td>
                        </tr>
                        <tr>
                            <th scope="col">층정보<em class="emp_mark">*</em></th>
                            <td>
                                <select id="floor">
                                    <option>층선택</option>
                                </select>
                            </td>
                            <th scope="col">타입<em class="emp_mark">*</em></th>
                            <td>
                                <select id="typeCd">
                                    <option>타입선택</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th scope="col">위치설명</th>
                            <td colspan="3"><input type="text" id="location"></td>
                        </tr>
                        <tr>
                            <th scope="col">좌표등록<em class="emp_mark">*</em></th>
                            <td>
                                <input type="text" id="point1" disabled>
                                <input type="text" id="point2" disabled>
                            </td>
                            <td class="dupl_chk"><button id="btnPoint">좌표등록</button></td>
                        </tr>
                        <tr>
                            <th scope="col">메모</th>
                            <td colspan="3"><textarea class="textarea_input" id="memo" style="resize: none;"></textarea></td>
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
<script type="text/javascript" src="/assets/js/device/saveForm.js"></script>
<script>
    var typeList = ${typeList};
    var actionFlag = '${actionFlag}';
    if (actionFlag == "UPDATE") {
        var deviceSeq = '${deviceSeq}';
        var buildSeq = '${buildSeq}';
    }
</script>
