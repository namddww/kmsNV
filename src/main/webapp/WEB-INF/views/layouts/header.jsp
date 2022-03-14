<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ include file="../common/include/common.jsp"%>

<div class="header user_header"> <!--20220209 user_header 추가-->
	<h1 class="logo"><img src="<c:out value='${pageContext.request.contextPath}'/>/assets/resource/images/common/logo_korail.svg" alt="데이터 플레이그라운드" style="cursor:pointer;" onclick="location.href='<c:out value='${pageContext.request.contextPath}'/>/'"></h1><!--20220209 로고 위치 변경-->
	<!--20220209 gnb_list 클래스 명 / data-targetmenu 반영-->
	<ul class="gnb_list">
		<li data-targetmenu="data_category"><a href="<c:out value='${pageContext.request.contextPath}'/>/" class="depth1">데이터</a></li>
		<li data-targetmenu="analysis"><a href="<c:out value='${pageContext.request.contextPath}'/>/anals/main" class="depth1">분석</a></li>
		<li><a href="#" class="depth1" onclick="locTableau();">시각화</a></li>
		<li><a href="<c:out value='${pageContext.request.contextPath}'/>/anals/analsList" class="depth1">참여 공간</a></li>
		<li><a href="<c:out value='${pageContext.request.contextPath}'/>/guide/main" class="depth1">이용안내</a></li>
		<li><a href="<c:out value='${pageContext.request.contextPath}'/>/notice/noticeList" class="depth1">공지사항</a></li>
		<li data-targetmenu="mypage"><a href="<c:out value='${pageContext.request.contextPath}'/>/myPage/prmsRqsStt" class="depth1">마이페이지</a></li>
	</ul>

	<!-- 20220209 spot_menu welcome 추가 / 마이페이지 삭제-->
	<div class="spot_menu">
		<c:if test="${not empty loginInfo}">
		<span class="user_welcome">'<em><c:out value='${loginInfo.USER_NM}'/></em>'님 환영합니다</span>
		</c:if>
		<c:if test="${loginInfo.USER_TY ne '0'}">
		<a href="<c:out value='${pageContext.request.contextPath}'/>/user/userList" class="btn login"><span>관리자 모드</span></a>
		</c:if>
	</div>
	<!--s: 20220209 snb_wrap 영역 추가-->
	<div class="snb_wrap" style="display:none">
		<div class="snb_list_wrap">
			<ul class="snb_list"  id="data_category">

				<c:choose>
					<c:when test="${fn:length(menuList) > 0}">
						<c:forEach items="${menuList}" var="row" varStatus="status">
							<c:if test="${row.JOB_CL_NO2 eq null}">
								<li>
									<strong><a href="<c:out value='${pageContext.request.contextPath}'/>/data/dtstList?category=<c:out value='${row.JOB_CL_NO}'/>" onclick="fnObj.setSelectedCategory('<c:out value='${row.JOB_CL_NO}'/>'); fnObj.changePageTitle('<c:out value='${row.JOB_CL_NM}'/>');"><c:out value='${row.JOB_CL_NM}'/></a></strong>
							</c:if>
							<c:if test="${row.JOB_CL_NO2 ne null}">
								<c:if test="${menuList[status.index - 1].JOB_CL_NO2 eq null}">
								</c:if>
								<a href="<c:out value='${pageContext.request.contextPath}'/>/data/dtstList?category=<c:out value='${row.JOB_CL_NO}'/>" onclick="fnObj.setSelectedCategory('<c:out value='${row.JOB_CL_NO}'/>'); fnObj.changePageTitle('<c:out value='${row.JOB_CL_NM}'/>')"><c:out value='${row.JOB_CL_NM}'/></a>
								<c:choose>
									<c:when test="${fn:length(menuList) eq status.index}">
											</li>
									</c:when>
									<c:otherwise>
										<c:if test="${menuList[status.index + 1].JOB_CL_NO2 eq null}">
												</li>
										</c:if>
									</c:otherwise>
								</c:choose>
							</c:if>
						</c:forEach>
					</c:when>
				</c:choose>
			</ul>
			<ul class="snb_list st_l" id="analysis">
				<li>
					<strong>안전</strong>
					<a href="javascript:void(0);" onclick="openAnalSubPage('kobig/safe/log','위험관리대장')">위험관리대장</a>
					<a href="javascript:void(0);" onclick="openAnalSubPage('kobig/safe/log_range','위험관리대장(기간별)')">위험관리대장(기간별)</a>
					<a href="javascript:void(0);" onclick="openAnalSubPage('kobig/safe/history','이력 위험도')">이력 위험도</a>
					<a href="javascript:void(0);" onclick="openAnalSubPage('kobig/safe/potential','잠재 위험도')">잠재 위험도</a>
					<a href="javascript:void(0);" onclick="openAnalSubPage('kobig/safe/field','분야별 위험도')">분야별 위험도</a>
					<a href="javascript:void(0);" onclick="openAnalSubPage('kobig/safe/analysis','위험도 분석')">위험도 분석</a>
					<a href="javascript:void(0);" onclick="openAnalSubPage('kobig/safe/time','사고 유형별 조치시간')">사고 유형별 조치시간</a>

				</li>
				<li>
					<strong>경영관리</strong>
					<a href="javascript:void(0);">위험관리대장</a>
					<a href="javascript:void(0);">위험관리대장(기간별)</a>
					<a href="javascript:void(0);">이력 위험도</a>
					<a href="javascript:void(0);">잠재 위험도</a>
					<a href="javascript:void(0);">분야별 위험도</a>
					<a href="javascript:void(0);">위험도 분석</a>
					<a href="javascript:void(0);">사고 유형별 조치시간</a>

				</li>
				<li>
					<strong>여객</strong>
					<a href="javascript:void(0);" onclick="openAnalSubPage('kobig/KrMberIlltAbrd','철도서비스 이상탐지')">철도서비스 이상탐지</a>
					<a href="javascript:void(0);" onclick="openAnalSubPage('kobig/KrMberGrpSrtAnal','머신러닝 기반 회원분류')">머신러닝 기반 회원분류</a>
					<a href="javascript:void(0);" onclick="openAnalSubPage('kobig/KrMberTicketRsv','예매 행태분석')">예매 행태분석</a>
					<a href="javascript:void(0);" onclick="openAnalSubPage('kobig/KrMberAdrsAnal','공간정보 기반 이용분석')">공간정보 기반 이용분석</a>
					<a href="javascript:void(0);" onclick="openAnalSubPage('kobig/KrMberTkSales','회원특성별 수익 현황')">회원특성별 수익 현황</a>
					<a href="javascript:void(0);" onclick="openAnalSubPage('kobig/KrMberExcDmd','잠재수요')">잠재수요</a>
					<a href="javascript:void(0);" onclick="openAnalSubPage('SNS','VOC 키워드 분석')">VOC 키워드 분석</a>
				</li>
				<li>
					<strong>물류</strong>
					<a href="javascript:void(0);" onclick="openAnalSubPage('kobig/distribution/chapter5','화물수송실적 분석')">화물수송실적 분석</a>
					<a href="javascript:void(0);" onclick="openAnalSubPage('kobig/distribution/chapter2','화물운송 정시율 분석')">화물운송 정시율 분석</a>
					<a href="javascript:void(0);" onclick="openAnalSubPage('kobig/distribution/chapter3','화차현황 분석')">화차현황 분석</a>
					<a href="javascript:void(0);" onclick="openAnalSubPage('kobig/distribution/chapter4','경제지표 영향 분석')">경제지표 영향 분석</a>
				</li>
				<li>
					<strong>광역</strong>
					<a href="javascript:void(0);" onclick="openAnalSubPage('kobig/SubwayDelay','연차지연/정시율')">연차지연/정시율</a>
					<a href="javascript:void(0);" onclick="openAnalSubPage('kobig/MetroSMS','문자불편신고 분석')">문자불편신고 분석</a>
					<a href="javascript:void(0);" onclick="openAnalSubPage('kobig/RailPlusUsed','R+ 사용실적 분석')">R+ 사용실적 분석</a>
					<a href="javascript:void(0);" onclick="openAnalSubPage('kobig/RailPlusSales','R+ 판매/반환/충전 실적')">R+ 판매/반환/충전 실적</a>
					<a href="javascript:void(0);" onclick="openAnalSubPage('kobig/RailPlusFeeSimul','R+ 수수료 시뮬레이션')">R+ 수수료 시뮬레이션</a>
				</li>
				<li>
					<ul class="dep_1">
						<li>
							<strong>기술</strong>
							<a href="javascript:void(0);">+ 차량</a>
							<ul class="dep_2">
								<li><a href="javascript:void(0);" onclick="openAnalSubPage('kobig/TrnKTX','KTX 편성 통합분석')">KTX 편성 통합분석</a></li>
								<li><a href="javascript:void(0);" onclick="openAnalSubPage('kobig/MapOBCS','운행 중 고장코드 분석')">운행 중 고장코드 분석</a></li>
								<li><a href="javascript:void(0);" onclick="openAnalSubPage('kobig/TrnOBCS','고장코드 발생 분석')">고장코드 발생 분석</a></li>
								<li><a href="javascript:void(0);" onclick="openAnalSubPage('kobig/TrnDelay','차량고장 지연 분석')">차량고장 지연 분석</a></li>
								<li><a href="javascript:void(0);" onclick="openAnalSubPage('kobig/TrnMTIT','MTIT 조치이력')">MTIT 조치이력</a></li>
								<li><a href="javascript:void(0);" onclick="openAnalSubPage('kobig/TrnMan','정비 실적(소속별)')">정비 실적(소속별)</a></li>
								<li><a href="javascript:void(0);" onclick="openAnalSubPage('kobig/TrnGrade','정비경력증 통계')">정비경력증 통계</a></li>
								<li><a href="javascript:void(0);" onclick="openAnalSubPage('kobig/weather','차량주박지별 기상예보')">차량주박지별 기상예보</a></li>
							</ul>
						</li>
						<li>
							<a href="javascript:void(0);">+ 시설</a>
							<ul class="dep_2">
								<li><a href="javascript:void(0);" onclick="openAnalSubPage('weather','철도기상정보')">철도기상정보</a></li>
							</ul>
						</li>
						<li>
							<a href="javascript:void(0);">+ 전기</a>
							<ul class="dep_2">
								<li><a href="javascript:void(0);" onclick="openAnalSubPage('amr','전기원격검침')">전기원격검침</a></li>
							</ul>
						</li>
					</ul>
				</li>
				<li style="padding-top: 40px">
					<strong>외부 융합 분석</strong>
					<a href="javascript:void(0);">전기 원격 검침</a>
				</li>
				<%-- <li>
					<strong>소셜</strong>
					<a href="javascript:void(0);" onclick="openAnalSubPage('analysis/journey')">SNS로 보는 한국철도</a>
				</li> --%>
			</ul>
			<ul class="snb_list" id="mypage">
				<li>
					<strong>데이터 셋 요청관리</strong>
					<a href="<c:out value='${pageContext.request.contextPath}'/>/myPage/prmsRqsStt">데이터 셋 접근 권한 요청 현황</a>
					<a href="<c:out value='${pageContext.request.contextPath}'/>/myPage/dtstDevStt">데이터 셋 개발 요청 현황</a>
				</li>
				<li>
					<strong>데이터 셋 이용 관리</strong>
					<a href="<c:out value='${pageContext.request.contextPath}'/>/myPage/dtstUseStt">데이터 셋 이용현황</a>
					<a href="<c:out value='${pageContext.request.contextPath}'/>/myPage/dtstShareStt">데이터 셋 공유 현황</a>
					<a href="<c:out value='${pageContext.request.contextPath}'/>/myPage/fvrtMngm">데이터 셋 즐겨찾기 관리</a>
					<a href="<c:out value='${pageContext.request.contextPath}'/>/myPage/dtstAlow">접근 허용 데이터 셋 목록</a>
				</li>
			</ul>
		</div>
	</div>
	<!--e: 20220209 snb_wrap 영역 추가-->
</div>