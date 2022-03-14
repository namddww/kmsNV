<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ include file="../common/include/common.jsp"%>

<!DOCTYPE html>
<html lang="ko" xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
 	<link rel="stylesheet" type="text/css" href="<c:out value='${pageContext.request.contextPath}'/>/assets/resource/css/default.css" />
	<link rel="stylesheet" type="text/css" href="<c:out value='${pageContext.request.contextPath}'/>/assets/resource/css/common.css" />
	<link rel="stylesheet" type="text/css" href="<c:out value='${pageContext.request.contextPath}'/>/assets/datepicker/jquery-ui.min.css" />
	<script src="<c:out value='${pageContext.request.contextPath}'/>/assets/resource/js/ui.js"></script>
	<script src="<c:out value='${pageContext.request.contextPath}'/>/assets/common/jquery.js"></script>
	<script src="<c:out value='${pageContext.request.contextPath}'/>/assets/common/common.js"></script>
	<script src="<c:out value='${pageContext.request.contextPath}'/>/assets/common/jquery-ui.min.js"></script>
	<title>데이터플레이그라운드</title>
	<!--[if lt IE 9]>
	 <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
</head>
<body>
	<tiles:insertAttribute name="body" />
</body>
</html>
