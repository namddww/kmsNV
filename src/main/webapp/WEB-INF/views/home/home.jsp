<%@ page import="java.util.Enumeration" %>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%--<%@ include file="../../views/common/include/common.jsp" %>--%>

<div class="wrapper">
    <div class="container full">
        <div class="header user_header">
            <div class="spot_menu">
                <span class="user_welcome">
                    <%
                        String id = (String)session.getAttribute("userId");
                    %>
                    <em><%=id %></em>
                    님 환영합니다.
                </span>
            </div>
        </div>
        <div class="main_content">
            <div class="main_top">
                <h2 class="title">
                    <p class="copy">자산 관리 시스템 홈화면</p>
                    <strong class="logo">
                        <img src="https://shop-phinf.pstatic.net/20210915_17/1631709921614RtBYz_PNG/%C3%CA%C4%DA%B3%D7_%B0%A1%B0%D4_%B8%DE%C0%CEPC.png?type=w345" alt="초코네가게">
                    </strong>
                </h2>
            </div>
            <div class="main_direct">
                <ul class="direct_list">
                    <li class="unit">
                        <a href="/dashboard/dashboard" class="box shape03">
                            <strong class="title">자산관리 시스템</strong>
                            <p class="txt">
                                자산관리 시스템
                                <br>
                                관련 데이터 입니다.
                            </p>
                            <div class="data">
                                <span class="icon unit06"></span>
                                <p class="num">999</p>
                            </div>
                        </a>
                    </li>
                    <li class="unit">
                        <a href="javascript:void(0);" class="box shape07">
                            <strong class="title">모니터링</strong>
                            <p class="txt">
                                모니터링
                                <br>
                                관련 데이터 입니다.
                            </p>
                            <div class="data">
                                <span class="icon unit08"></span>
                                <p class="num">888</p>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>