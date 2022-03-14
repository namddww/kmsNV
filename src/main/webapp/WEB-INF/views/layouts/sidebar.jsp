<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ include file="../common/include/common.jsp"%>

<!-- 좌측 메뉴 -->
<div class="side_gnb">
	<div class="head"><h1 class="logo"><img src="<c:out value='${pageContext.request.contextPath}'/>/assets/resource/images/common/logo.svg" alt="데이터 플레이그라운드" style="cursor:pointer;" onclick="location.href='<c:out value='${pageContext.request.contextPath}'/>/'"></h1></div>
	<div class="gnb_list">
		<c:choose>
			<c:when test="${fn:length(menuList) > 0}">
				<c:forEach items="${menuList}" var="row" varStatus="status">
					<c:if test="${row.JOB_CL_NO2 eq null}">
						<div class="gnb_unit ico0<c:out value='${row.JOB_CL_NO}'/>" id="category_<c:out value='${row.JOB_CL_NO}'/>" onclick="location.href='<c:out value='${pageContext.request.contextPath}'/>/data/dtstList?category=<c:out value='${row.JOB_CL_NO}'/>'">
<%-- 						<div class="gnb_unit ico0${row.JOB_CL_NO}" id="category_${row.JOB_CL_NO}"> --%>
							<span><c:out value='${row.JOB_CL_NM}'/></span>
						</div>
					</c:if>
				</c:forEach>
			</c:when>
		</c:choose>
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


	if("<c:out value='${jobClVldMap.JOB_CL_NO}'/>" != ''){
		if("<c:out value='${jobClVldMap.JOB_CL_NO2}'/>" === ''){
			$("#category_" + "<c:out value='${jobClVldMap.JOB_CL_NO}'/>").addClass("on");
			$("#category_" + "<c:out value='${jobClVldMap.JOB_CL_NO}'/>_ul").css("display", "block");
		}else{
			$("#category_" + "<c:out value='${jobClVldMap.JOB_CL_NO2}'/>_ul").css("display", "block");
			$("#category_" + "<c:out value='${jobClVldMap.JOB_CL_NO}'/>").addClass("on");
		}
	}

</script>