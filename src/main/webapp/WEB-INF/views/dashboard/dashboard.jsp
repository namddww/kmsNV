<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../../views/common/include/common.jsp" %>

<div class="content">
    <div class="container full">
            <div class="spot_menu">
                <span class="user_welcome">
                    <%
                        String id = (String)session.getAttribute("userId");
                    %>
                    <em><%=id %></em>
                    님 환영합니다.
                </span>
            </div>
        <div class="main_content">
            <div class="main_top">
                <h2 class="title">
                    <p class="copy">대시보드</p>
                    <strong class="logo">
                        <img src="https://shop-phinf.pstatic.net/20210915_17/1631709921614RtBYz_PNG/%C3%CA%C4%DA%B3%D7_%B0%A1%B0%D4_%B8%DE%C0%CEPC.png?type=w345" alt="초코네가게">
                    </strong>
                </h2>
            </div>
            <div class="main_direct">
                <ul class="direct_list">
                    <li class="unit">
                        <a href="javascript:void(0);" class="box shape02">
                            <strong class="title">1번 데이터</strong>
                            <p class="txt">
                                1번 관련
                                <br>
                                데이터 입니다.
                            </p>
                            <div class="data">
                                <span class="icon unit01"></span>
                                <p class="num">01</p>
                            </div>
                        </a>
                    </li>
                    <li class="unit">
                        <a href="javascript:void(0);" class="box shape02">
                            <strong class="title">2번 데이터</strong>
                            <p class="txt">
                                2번 관련
                                <br>
                                데이터 입니다.
                            </p>
                            <div class="data">
                                <span class="icon unit02"></span>
                                <p class="num">02</p>
                            </div>
                        </a>
                    </li>
                    <li class="unit">
                        <a href="javascript:void(0);" class="box shape02">
                            <strong class="title">3번 데이터</strong>
                            <p class="txt">
                                3번 관련
                                <br>
                                데이터 입니다.
                            </p>
                            <div class="data">
                                <span class="icon unit03"></span>
                                <p class="num">03</p>
                            </div>
                        </a>
                    </li>
                    <li class="unit">
                        <a href="javascript:void(0);" class="box shape02">
                            <strong class="title">4번 데이터</strong>
                            <p class="txt">
                                4번 관련
                                <br>
                                데이터 입니다.
                            </p>
                            <div class="data">
                                <span class="icon unit04"></span>
                                <p class="num">04</p>
                            </div>
                        </a>
                    </li>
                    <li class="unit">
                        <a href="javascript:void(0);" class="box shape02">
                            <strong class="title">5번 데이터</strong>
                            <p class="txt">
                                5번 관련
                                <br>
                                데이터 입니다.
                            </p>
                            <div class="data">
                                <span class="icon unit05"></span>
                                <p class="num">05</p>
                            </div>
                        </a>
                    </li>
                    <li class="unit">
                        <a href="javascript:void(0);" class="box shape02">
                            <strong class="title">6번 데이터</strong>
                            <p class="txt">
                                6번 관련
                                <br>
                                데이터 입니다.
                                <br>
                                (6번째꺼 부터 줄바꿈됨)
                            </p>
                            <div class="data">
                                <span class="icon unit06"></span>
                                <p class="num">06</p>
                            </div>
                        </a>
                    </li>
                    <li class="unit">
                        <a href="javascript:void(0);" class="box shape02">
                            <strong class="title">7번 데이터</strong>
                            <p class="txt">
                                7번 관련
                                <br>
                                데이터 입니다.
                            </p>
                            <div class="data">
                                <span class="icon unit07"></span>
                                <p class="num">07</p>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>