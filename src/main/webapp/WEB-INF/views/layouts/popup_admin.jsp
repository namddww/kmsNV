<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%> 

<%-- 확인, 취소버튼 메시지 박스 --%>
<div class="dim_pop" style="display :none; z-index: 200;" id="pop-msg-type01">
	<div class="popup_wrap data_down shape02">
	    <div class="head"><h2>안내 메시지</h2></div>
	    <div class="tbl_pop_wrap" id="tbl_pop_wrap01">
	        <%-- <p class="msg">표준용어를 삭제하시겠습니까?</p> --%>
	    </div>
	    <div class="btn_wrap">
	        <a href="javascript:void(0);" class="btn_r selected" onclick="confirmPopup()">확인</a>
	        <a href="javascript:void(0);" class="btn_r" onclick="popClose('#pop-msg-type01')">취소</a>
	    </div>
	</div>
</div>

<%-- 확인버튼 메시지 박스 --%>
<div class="dim_pop" style="display :none; z-index: 200;" id="pop-msg-type02">
	<div class="popup_wrap data_down shape02">
	    <div class="head"><h2>안내 메시지</h2></div>
	    <div class="tbl_pop_wrap" id="tbl_pop_wrap02">
	        <%-- <p class="msg">표준 용어 [영문명]이 입력되지 않았습니다.<br>입력해 주시기 바랍니다.</p> --%>
	    </div>
	    <div class="btn_wrap">
	        <a href="javascript:void(0);" class="btn_r selected" onclick="popClose('#pop-msg-type02')">확인</a>
	    </div>
	</div>
</div>

<%-- 확인버튼 메시지 박스 --%>
<div class="dim_pop" style="display :none; z-index: 200;" id="pop-msg-type03">
	<div class="popup_wrap data_down shape02">
	    <div class="head"><h2>안내 메시지</h2></div>
	    <div class="tbl_pop_wrap" id="tbl_pop_wrap03">
	        <p class="msg">접근 권한이 없습니다.</p>
	    </div>
	    <div class="btn_wrap">
	        <a href="javascript:void(0);" class="btn_r selected" onclick="goMain()">확인</a>
	    </div>
	</div>
</div>
<%-- 로딩 --%>
<div class="dim_pop" style="display:none;z-index: 200;" id="loading_pop">
	<div class="popup_wrap data_down shape02">
		<div Class="head"><h2 id="loading_title">데이터 로딩 중</h2></div>
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
