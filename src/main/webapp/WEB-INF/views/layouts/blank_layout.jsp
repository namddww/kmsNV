<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ include file="../common/include/common.jsp"%>

<!DOCTYPE html>
<html lang="ko">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <script src="<c:out value='${pageContext.request.contextPath}'/>/assets/admin/js/babel.min.js"></script>
    <link rel="stylesheet" type="text/css" href="<c:out value='${pageContext.request.contextPath}'/>/assets/resource/css/default.css" />
    <link rel="stylesheet" type="text/css" href="<c:out value='${pageContext.request.contextPath}'/>/assets/resource/css/common.css" />
    <link rel="stylesheet" type="text/css" href="<c:out value='${pageContext.request.contextPath}'/>/assets/resource/css/adm.css" />
    <link rel="stylesheet" type="text/css" href="<c:out value='${pageContext.request.contextPath}'/>/assets/datepicker/jquery-ui.min.css" />
    <script src="<c:out value='${pageContext.request.contextPath}'/>/assets/resource/js/ui.js"></script>
    <script src="<c:out value='${pageContext.request.contextPath}'/>/assets/js/jquery.js"></script>
    <script src="<c:out value='${pageContext.request.contextPath}'/>/assets/admin/js/commonUtil.js"></script>
    <script src="<c:out value='${pageContext.request.contextPath}'/>/assets/admin/js/common.js"></script>
    <script src="<c:out value='${pageContext.request.contextPath}'/>/assets/js/jquery-ui.min.js"></script>
    <script src="<c:out value='${pageContext.request.contextPath}'/>/assets/admin/js/pdfobject.js"></script>
    <title>kms</title>
    <script>
        var contextPath = "<c:out value='${pageContext.request.contextPath}'/>";
        var popUpMsg = "<c:out value='${popUpMsg}'/>";
        var msg = "<c:out value='${msg}'/>";
        var subUrl = "";

        if(typeof popUpMsg != "undefined" && popUpMsg != null && popUpMsg != ""){
            alert(popUpMsg);
            location.replace(contextPath + "/main");
        }

        if(typeof msg != "undefined" && msg != null && msg != ""){
            alert(msg);
        }

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

        function locTableauAdmin(){
            var _url = contextPath + '/api/v1/monitor/locTableau';

            var _postData = {};

            var _option = {
                "async" : true
                , "loading" : true
            }

            $("#loading_title").text('테블로 시스템 모니터링 이동중..');
            $("#loading_content").empty();
            $("#loading_content").append('계정정보를 읽고 새로운 창을 생성중 입니다.<br>수초 이상 소요될 수 있습니다.');

            commonObj.ajaxCall(_url, null, getLocTableauAdminCallback, _option, 'POST');
        }

        function getLocTableauAdminCallback(response, status, xhr){
            try {
                var responseCode = response.response_code;
                var responseMessage = response.response_message;

                if(responseCode == "000") {
                    var data = response.data;
                    // var openNewWindow = window.open("about:blank");
                    window.open(data.URL);
                }else {
                    $('#tbl_pop_wrap02').empty();
                    $('#tbl_pop_wrap02').append('<p class="msg">테블로 시스템 모니터링 접속에 실패했습니다.<br>시스템 관리자에게 문의해 주세요.</p>');
                    popOpen('#pop-msg-type02');
                }
            }catch(e) {
                console.log(e);
                console.log(response);
            }
        }

        function locGrafana(){
            if (window.navigator.userAgent.match(/MSIE|Internet Explorer|Trident/i)){
                window.location = 'microsoft-edge:http://10.141.3.174:13000';
            }else{
                window.open('http://10.141.3.174:13000');
            }
        }

        function locNifi(){
            window.open('https://10.141.3.175:12443/nifi/login');
        }


        function goMain(){
            window.location.href = contextPath + '/main'
        }
    </script>
</head>

<tiles:insertAttribute name="content" />