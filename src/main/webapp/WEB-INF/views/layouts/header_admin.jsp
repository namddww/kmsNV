<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ include file="../common/include/common.jsp"%>

<!-- 헤더 부분 -->
<div class="adm_header on">
		<h1 class="logo"><img src="<c:out value='${pageContext.request.contextPath}'/>/assets/resource/images/common/logo-w.png" alt="자산관리시스템"></h1>
	<ul class="gnb_list">
		<li class="depth1" data-targetmenu="dashboard">
			<a href="/dashboard/dashboard">메인</a>
		</li>
		<li class="depth1" data-targetmenu="building">
			<a href="/building/list">건물 관리</a>
		</li>
		<li class="depth1" data-targetmenu="device">
			<a href="/device/list">자산 관리</a>
		</li>
		<li class="depth1" data-targetmenu="monitoring">
			<a href="javascript:void(0);">모니터링</a>
		</li>
		<li class="depth1" data-targetmenu="common">
			<a href="javascript:void(0);">공통 관리</a>
		</li>
		<li class="depth1" data-targetmenu="user">
			<a href="javascript:void(0);">사용자 관리</a>
		</li>
	</ul>
	<div class="spot_menu">
		<span class="user_welcome">'<em>홍길동</em>' 님 환영합니다</span>
		<a href="/join/logout" class="btn login"><span>로그아웃</span></a>
		<%-- <a href="#" class="btn join"><span>로그아웃</span></a> --%>
		<%--<a href="<c:out value='${pageContext.request.contextPath}'/>/main" class="btn login"><span>main</span></a>--%>
	</div>
	<div class="snb_wrap" style="display:none;z-index: 500">
		<ul class="snb_list" id="dashboard">
			<li><a href="/dashboard/dashboard">대시보드</a></li>
		</ul>
		<ul class="snb_list" id="building">
			<li><a href="/building/list">건물 관리</a></li>
			<li><a href="/building/saveForm">건물 등록</a></li>
			<li><a href="/geofence/list">지오팬스 관리</a></li>
			<li><a href="/geofence/saveForm">지오팬스 등록</a></li>
		</ul>
		<ul class="snb_list" id="device">
			<li><a href="/device/list">장비 관리</a></li>
			<li><a href="/device/saveForm">장비 등록</a></li>
		</ul>
		<ul class="snb_list" id="monitoring">
			<li><a href="/monitoringDevice">장비 통합조회</a></li>
			<li><a href="/monitoringGeofence">지오팬스 통합조회</a></li>
		</ul>
		<ul class="snb_list" id="common">
			<li><a href="/icon/list">아이콘 관리</a></li>
			<li><a href="/icon/saveForm">아이콘 등록</a></li>
		</ul>
		<ul class="snb_list" id="user">
			<li><a href="/user/list">사용자 관리</a></li>
			<li><a href="/user/saveForm">사용자 등록</a></li>
		</ul>
	</div>
</div>
