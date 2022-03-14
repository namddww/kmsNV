<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ include file="../common/include/common.jsp"%>

<!-- 헤더 부분 -->
<div class="adm_header">
	<h1 class="logo"><img src="<c:out value='${pageContext.request.contextPath}'/>/assets/resource/images/common/logo.svg" alt="데이터 플레이그라운드" onclick="location.href='/'" style="cursor:pointer;"></h1>
	<ul class="gnb_list">
		<li class="depth1" data-targetmenu="building">
			<a href="/building/list">건물 관리</a>
		</li>
		<li class="depth1" data-targetmenu="device">
			<a href="/device/list">자산 관리</a>
		</li>
		<li class="depth1" data-targetmenu="common">
			<a href="/building/list">공통 관리</a>
		</li>
		<li class="depth1" data-targetmenu="user">
			<a href="/building/list">사용자 관리</a>
		</li>
	</ul>
	<div class="spot_menu">
		<%-- <a href="#" class="btn join"><span>로그아웃</span></a> --%>
		<a href="<c:out value='${pageContext.request.contextPath}'/>/main" class="btn login"><span>main</span></a>
	</div>
	<div class="snb_wrap" style="display:none;z-index: 500">
		<ul class="snb_list" id="building">
			<li><a href="/building/list">건물 관리</a></li>
			<li><a href="/building/saveForm">건물 등록</a></li>
		</ul>
		<ul class="snb_list" id="device">
			<li><a href="/device/list">장비 관리</a></li>
			<li><a href="/device/saveForm">장비 등록</a></li>
		</ul>
		<ul class="snb_list" id="common">
			<li><a href="/device/list">장비 관리</a></li>
			<li><a href="/device/saveForm">장비 등록</a></li>
		</ul>
		<ul class="snb_list" id="user">
			<li><a href="/device/list">장비 관리</a></li>
			<li><a href="/device/saveForm">장비 등록</a></li>
		</ul>
	</div>
</div>
