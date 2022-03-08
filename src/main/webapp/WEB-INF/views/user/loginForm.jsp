<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../../views/common/include/common.jsp" %>

<div class="login_wrap">
    <div class="login_bx">
        <h1><span class="blind">관리 시스템</span></h1>
        <div class="login_form">
                <input type="text" id="userId" placeholder="아이디">
                <input type="password" id="password" placeholder="비밀번호">
                <div class="login_chk">
                    <input type="checkbox" id="saveId">
                    <label for="saveId">아이디 저장</label>
                    <div>
                        <a href="javascript:void(0)" onclick="javascript:saveForm();"><span>+</span>서비스 계정 등록</a>
                    </div>
                </div>
                <button id="btn-login"><span>로그인</span></button>
        </div>
        <p>※ 해당 브라우저는 Internet Explorer 11 버전과 chrome에 최적화 되어 있습니다.</p>
    </div>
</div>
<script type="text/javascript" src="/assets/js/user/loginForm.js"></script>
