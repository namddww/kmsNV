<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ include file="../common/include/common.jsp"%>

<!DOCTYPE html>
<html lang="ko">

<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
 	<link rel="stylesheet" type="text/css" href="<c:out value='${pageContext.request.contextPath}'/>/assets/resource/css/default.css" />
	<link rel="stylesheet" type="text/css" href="<c:out value='${pageContext.request.contextPath}'/>/assets/resource/css/common.css" />
	<link rel="stylesheet" type="text/css" href="<c:out value='${pageContext.request.contextPath}'/>/assets/resource/css/jquery-ui.min.css" />
	<script src="<c:out value='${pageContext.request.contextPath}'/>/assets/resource/js/ui.js"></script>
	<script src="<c:out value='${pageContext.request.contextPath}'/>/assets/resource/js/common.js"></script>
	<script src="<c:out value='${pageContext.request.contextPath}'/>/assets/js/jquery.js"></script>
	<script src="<c:out value='${pageContext.request.contextPath}'/>/assets/js/common.js"></script>
	<script src="<c:out value='${pageContext.request.contextPath}'/>/assets/js/jquery-ui.min.js"></script>

	<title>데이터플레이그라운드</title>
	<!--[if lt IE 9]>
	 <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
</head>
<body>
	<div class="wrapper">
		<div class="container full">
			<tiles:insertAttribute name="header" />

			<tiles:insertAttribute name="content"/>
		</div>

		<tiles:insertAttribute name="footer" />

		<tiles:insertAttribute name="popup" />
	</div>
	<tiles:insertAttribute name="iframe" />
	<!-- 데이터 권한 팝업 -->
	<div class="dim_pop" id="auth_pop" style="display:none;">
		<div class="popup_wrap data_request shape02">
			<div class="head"><h2>데이터 권한 필요</h2></div>
			<div class="noti_pop_wrap">
				<p class="msg">데이터 사용을 위해 데이터 사용 목적 작성 및 민감정보(개인) 외부 유출에 대한 개인 책임 동의가 필요합니다. 권한을 요청 하시겠습니까?</p>
				<textarea id="auth_purpose" name="" cols="" rows="5" placeholder="데이터 사용 목적을 작성해 주세요." style="resize: none;"></textarea>
				<div class="calendar_sort">
					<label>권한 요청기간</label>
					<span class="date_box">
						<input type="text" class="date" id="pop_start_day" placeholder="yyyy-mm-dd" autocomplete="off">
					</span>
					<span class="bar">~</span>
					<span class="date_box">
						<input type="text" class="date" id="pop_end_day" placeholder="yyyy-mm-dd" autocomplete="off">
					</span>
				</div>
				<p class="check_row"><input type="checkbox" id="confirm_check"><label for="confirm_check">데이터 사용 목적 외의 용도로 사용으로 개인정보 유출 시 데이터 사용자가 개인정보 보호법에 적시된 양벌 규정에 따라 처벌 받을 수 있습니다 </label></p>
			</div>
			<div class="btn_wrap">
				<a href="#" class="btn_r on" onclick="authRequest();">요청</a>
				<a href="#" class="btn_r selected" onclick="clearPop();">취소</a>
			</div>
			<input type="hidden" id="dim_dtst_no" />
		</div>
	</div>

	<div class="dim_pop" id="loading_pop" style="display:none;">
		<div class="popup_wrap data_down shape02" style="z-index: 300">
			<div sclass="head"><h2 id="loading_title">데이터 로딩 중</h2></div>
			<div class="tbl_pop_wrap">
				<p class="msg" id="loading_content">선택한 데이터에 따라 검색 결과를 불러오는데<br>수초 이상 소요될 수 있습니다.</p>
			</div>
			<div class="loadingio-spinner-ripple-fnni5ekjt9i">
				<div class="ldio-ypnm6cfy62">
					<div></div>
					<div></div>
				</div>
			</div>
		</div>
	</div>

	<%-- 확인버튼 메시지 박스 --%>
	<div class="dim_pop" style="display :none; z-index: 200;" id="alert_pop">
		<div class="popup_wrap data_down shape02">
		    <div class="head"><h2>안내 메시지</h2></div>
		    <div class="tbl_pop_wrap" id="alert_pop_comment">
		        <%-- <p class="msg">표준 용어 [영문명]이 입력되지 않았습니다.<br>입력해 주시기 바랍니다.</p> --%>
		    </div>
		    <div class="btn_wrap">
		        <a href="javascript:void(0);" class="btn_r selected" onclick="closeAlertPop()">확인</a>
		    </div>
		</div>
	</div>
<script>
	var _JOB_CL_NO = "<c:out value='${jobClVldMap.JOB_CL_NO}'/>";

	var dateType = RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);
	var dateType2 = RegExp(/^\d{4}-(0[1-9]|1[012])$/);
	var dateType3 = RegExp(/^\d{4}$/);

	function checkDateType(str1, str2){
		if(dateType.test(str1) && dateType.test(str2)){
			return true;
		}else{
			return false;
		}
	}

	function checkDateType2(str1, str2){
		if(dateType2.test(str1) && dateType2.test(str2)){
			return true;
		}else{
			return false;
		}
	}

	function checkDateType3(str1, str2){
		if(dateType3.test(str1) && dateType3.test(str2)){
			return true;
		}else{
			return false;
		}
	}

	function checkStartEndDt(start, end){
		return Number(start.replace(/\-/g,'')) - Number(end.replace(/\-/g,'')) <= 0;
	}

	$.noConflict();

	var contextPath = "<c:out value='${pageContext.request.contextPath}'/>";

	if(typeof "<c:out value='${msg}'/>" != "undefined" && "<c:out value='${msg}'/>" != null && "<c:out value='${msg}'/>" != ""){
		alert("<c:out value='${msg}'/>");
	}

	//========================================================================================================================================

	$.datepicker.setDefaults({
        dateFormat: 'yy-mm-dd',
        prevText: '이전 달',
        nextText: '다음 달',
        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        dayNames: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
        showMonthAfterYear: true,
        yearSuffix: '년'
    });

	$("#pop_start_day").datepicker({
		showOn: "button",
		dateFormat: 'yy-mm-dd',
		buttonImage: contextPath + "/assets/resource/images/ico/ico_calendar.svg",
        buttonImageOnly: true,
		nextText: ">",
		prevText: "<",
		onSelect: function (date) {
			var endDate = $('#pop_end_day');
			var startDate = $(this).datepicker('getDate');
			var minDate = $(this).datepicker('getDate');
			endDate.datepicker('setDate', minDate);
			endDate.datepicker('option', 'minDate', minDate);
		}
	});

	$("#pop_end_day").datepicker({
		showOn: "button",
		dateFormat: 'yy-mm-dd',
		buttonImage: contextPath + "/assets/resource/images/ico/ico_calendar.svg",
        buttonImageOnly: true
	});

	function clearPop() {
		$("#pop_start_day").val('');
		$("#pop_end_day").val('');
		$("#confirm_check").attr("checked", false);
		$("#auth_purpose").val('');
		$("#dim_dtst_no").val('');
		$("#auth_pop").css("display", "none");
	}

	function authRequest(){
		var _data = {};
		if(!validateAuthRequest(_data)) return;

		var _url = contextPath + '/api/v1/data/authRequest';

		var _postData = {
			"DTST_NO" : _data.DTST_NO
			, "START_DAY" : _data.START_DAY
			, "END_DAY" : _data.END_DAY
			, "USER_ID" : "<c:out value='${loginInfo.USER_ID}'/>"
			, "AUTHOR_TXT" : _data.AUTH_PURPOSE
		};

		var _option = {
			"async" : false
			, "loading" : true
		}

		commonObj.ajaxCall(_url, _postData, function(response, status, xhr) {
			try {
				var responseCode = response.response_code;
				var responseMessage = response.response_message;

				if(responseCode == "000") {
					alert('권한 요청이 되었습니다. 관리자가 승인 이후 데이터셋 편집을 사용할 수 있습니다.');
				}else {
					alert(responseMessage + ' 관리자에게 문의해 주세요.');
				}

				$("#auth_pop").css("display", "none");
			}catch(e) {
				console.log(e);
				console.log(response);
			}
		}, _option);
	}


	function validateAuthRequest(v) {
		v.DTST_NO = $("#dim_dtst_no").val();
		v.START_DAY = $("#pop_start_day").val();
		v.END_DAY = $("#pop_end_day").val();
		v.AUTH_PURPOSE = $("#auth_purpose").val();

		if(v.DTST_NO == null || v.DTST_NO == ""){
		    alert("잘못된 접근입니다. 새로고침 이후 다시 이용해 주세요.");
		    return false;
		}

		if(v.START_DAY == null || v.START_DAY == ""){
			alert("사용 기간을 선택하셔야 합니다.");
		    return false;
		}

		if(v.END_DAY == null || v.END_DAY == ""){
			alert("사용 기간을 선택하셔야 합니다.");
		    return false;
		}

		if(v.AUTH_PURPOSE == null || v.AUTH_PURPOSE == ""){
			alert("데이터 사용 목적을 작성하셔야 합니다.");
			$("#auth_purpose").focus();
		    return false;
		}

		if(!$("#confirm_check").is(":checked")){
			alert("외부 유출에 대한 책임에 동의하셔야 합니다.");
	        return false;
		}

		return true;
	}

	function insertSvcHist(user_id, acces_cl, obj_no){
		var _url = contextPath + '/api/v1/common/insertSvcHist';

		var _postData = {
			"USER_ID" : user_id
			, "ACCES_CL" : acces_cl
			, "OBJ_NO" : obj_no
		};

		var _option = {
			"async" : false
			, "loading" : false
		}

		commonObj.ajaxCall(_url, _postData, function(response, status, xhr) {
			try {
				var responseCode = response.response_code;
				var responseMessage = response.response_message;

				if(responseCode == "000") {

				}
			}catch(e) {
				console.log(e);
				console.log(response);
			}
		}, _option);
	}

	function locTableau(){
		var user_id = "<c:out value='${loginInfo.USER_ID}'/>";

		var _url = contextPath + '/api/v1/main/locTableau';

		var _postData = {
			"USER_ID" : user_id
		};

		var _option = {
			"async" : true
			, "loading" : true
		}

		$("#loading_title").text('시각화 화면으로 이동중..');
		$("#loading_content").empty();
		$("#loading_content").append('계정정보를 읽고 새로운 창을 생성중 입니다.<br>수초 이상 소요될 수 있습니다.');

		commonObj.ajaxCall(_url, _postData, function(response, status, xhr){
			try {
				var responseCode = response.response_code;
				var responseMessage = response.response_message;

				if(responseCode == "000") {
					var data = response.data;
					var openNewWindow = window.open("about:blank");
					openNewWindow.location.href = data.URL;
				}else {
					alert(responseMessage);
				}
			}catch(e) {
				console.log(e);
				console.log(response);
			}
		}, _option);
	}

	function openAnalSubPage(url, menu){
		var _url = contextPath + '/api/v1/monitor/uid/encrypted';

		var _postData = {
			url : url,
			menu : menu
		};

		var _option = {
			"async" : false
			, "loading" : false
		}
		// $('#loading_pop').css('display','block');
		// $("#loading_title").text('분석 페이지 이동중..');
		// $("#loading_content").empty();

		commonObj.ajaxCall(_url, _postData, getOpenSubPageCallback, _option, 'POST');
	}

	function getOpenSubPageCallback(response, status, xhr){
		try {
			var responseCode = response.response_code;
			var responseMessage = response.response_message;
			console.log(response);
			if(responseCode == "000") {
				var data = response.data;
				$('.frame_wrap').css('z-index',9);
				$('body').addClass('notScroll');
				$('.main_content').css('display','none');
				$('.sub_content').css('display','none');
				console.log('http://10.141.3.77:3838/hub/?url=' + data.url+'?uid='+data.UID);
				document.getElementById('ifrm').src = 'http://10.141.3.77:3838/hub/?url=' + data.url+'?uid='+data.UID;
			}else if(responseCode == "302"){
				alert('접근 권한이 없습니다.');
			} else {
				alert('접속에 실패했습니다. 시스템 관리자에게 문의해 주세요.');
			}
		}catch(e) {
			console.log(e);
			console.log(response);
		}
	}

	function openAlertPop(msg) {
		$("#alert_pop_comment").html(msg);
		$("#alert_pop").css("display", "block");
	}

	function closeAlertPop() {
		$("#alert_pop").css("display", "none");
	}
	// $('#ifrm').on( 'load', function() {
    // $('#loading_pop').css('display','none');
	// } );
</script>
</body>
</html>
