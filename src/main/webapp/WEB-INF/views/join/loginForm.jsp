<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../../views/common/include/common.jsp" %>

<div class="wrapper">
    <div class="adm_container">
        <div class="content">
            <div class="tbl_row_wrap login"> <!--20220401 class : login 추가-->
                <h1 class="logo"><img src="/assets/resource/images/common/logo-default.png" alt="자산관리시스템"></h1>
                <table class="tbl_row">
                    <caption>자산 관리 시스템</caption>
                    <colgroup><!--20220401 width 수정-->
                        <col style="width: 35%">
                        <col style="width: *">
                    </colgroup>
                    <tbody>
                    <tr>
                        <th scope="col">아이디</th>
                        <td><input type="text" id="userId" placeholder="아이디"></td>
                    </tr>
                    <tr><!--20220401 아래 th / td에 bor_none 클래스 추가-->
                        <th scope="col" >비밀번호</th>
                        <td class="bor_none">
                            <div class="inner_inputbox">
                                <input type="password" id="password" placeholder="비밀번호">
                                <button id="authBtn" type="button" class="btn_reset" style="display: block;">인증번호 요청</button>
                            </div>
                        </td>
                    </tr>
                    <tr class="tr-hidden" style="display: none">
                        <th scope="col">인증번호</th>
                        <td>
                            <div class="in_search">
                                <input type="number" id="authKey" placeholder="인증번호">
                                <button id="authCheckBtn" type="button" class="btn">확인</button>
                            </div>
                            <span class="time"></span>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div class="btn_wrap">
                    <a href="javascript:void(0);" id="btn-login" class="btn_r selected">로그인</a> <!--20220401 class=selected추가-->
                    <a href="javascript:void(0)" onclick="javascript:saveForm();" class="btn_r"><span>+</span>서비스 계정 등록</a>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="/assets/js/join/loginForm.js"></script>
