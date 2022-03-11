<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ include file="../views/common/include/common.jsp"%>

<!-- 좌측 메뉴 -->
<div class="side_gnb">
	<div class="head"><h1 class="logo"><img src="<c:out value='${pageContext.request.contextPath}'/>/assets/resource/images/common/logo.svg" onclick="location.href='<c:out value='${pageContext.request.contextPath}'/>/'" alt="데이터 플레이그라운드"></h1></div>
	<div class="gnb_list">
		<div class="inner">
			<p class="s_tit">데이터 셋 요청 관리</p>
			<ul class="left_menu">
				<li><a href="<c:out value='${pageContext.request.contextPath}'/>/myPage/prmsRqsStt" <c:if test="${menu eq 'prmsRqsStt'}">class="on"</c:if>>접근 권한 요청 현황</a></li>
				<li><a href="<c:out value='${pageContext.request.contextPath}'/>/myPage/dtstDevStt" <c:if test="${menu eq 'dtstDevStt'}">class="on"</c:if>>데이터 셋 개발 요청 현황</a></li>
			</ul>
			<p class="s_tit">데이터 이용 관리</p>
			<ul class="left_menu">
				<li><a href="<c:out value='${pageContext.request.contextPath}'/>/myPage/dtstUseStt" <c:if test="${menu eq 'dtstUseStt'}">class="on"</c:if>>데이터 셋 이용 현황</a></li>
				<li><a href="<c:out value='${pageContext.request.contextPath}'/>/myPage/dtstShareStt" <c:if test="${menu eq 'dtstShareStt'}">class="on"</c:if>>데이터 공유 현황</a></li>
				<li><a href="<c:out value='${pageContext.request.contextPath}'/>/myPage/fvrtMngm" <c:if test="${menu eq 'fvrtMngm'}">class="on"</c:if>>즐겨찾기 관리</a></li>
				<li><a href="<c:out value='${pageContext.request.contextPath}'/>/myPage/dtstAlow" <c:if test="${menu eq 'dtstAlow'}">class="on"</c:if>>접근 허용 데이터 목록</a></li>
			</ul>
		</div>
	</div>
</div>
<script>
	//Animation Start
	$(document).ready(function(){
		$('#visual_area').addClass('on');

		$(".gnb_unit").click(function() {
		  $(this).next(".gnb_unit_open").stop().slideToggle(300);
		  $(this).toggleClass('on').siblings().removeClass('on');
		  $(this).next(".gnb_unit_open").siblings(".gnb_unit_open").slideUp(300); // 1개씩 펼치기
		});
	});
</script>