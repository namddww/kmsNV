<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../../views/common/include/common.jsp" %>

<div class="content">
    <div class="tbl_row_wrap">
        <table class="tbl_row">
            <caption>테스트</caption>
            <colgroup>
                <col style="width: 20%">
                <col style="width: 20%">
            </colgroup>
            <tbody>
                <tr>
                    <th scope="col">아이디</th>
                    <td><input type="text" id="userId" placeholder="아이디"></td>
                </tr>
                <tr>
                    <th scope="col">비밀번호</th>
                    <td><input type="password" id="password" placeholder="비밀번호"></td>
                </tr>
            </tbody>
        </table>
        <div class="btn_wrap">
            <a href="javascript:void(0);" id="btn-login" class="btn_r">로그인</a>
            <a href="javascript:void(0)" onclick="javascript:saveForm();" class="btn_r"><span>+</span>서비스 계정 등록</a>
        </div>
    </div>
</div>

<script type="text/javascript" src="/assets/js/join/loginForm.js"></script>
