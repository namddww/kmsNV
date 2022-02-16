function pagination(result, pagingId, funcNm) {

    let pagingBlock;
    if (typeof pagingId != 'undefined' && pagingId != null && pagingId != '') {
        pagingBlock = $('#' + pagingId);
    } else {
        pagingBlock = $('.pagination');
    }
    if ($(pagingBlock).length != 1) {
        console.log('페이징 블럭 지정이 필요합니다.');
        return;
    }
    $(pagingBlock).empty();

    if (typeof funcNm == 'undefined' || funcNm == null || funcNm == '') {
        funcNm = "search";
    }

    let prevFunc = 'void(0)';
    let nextFunc = 'void(0)';
    if (result.pageNum != result.navigateFirstPage) {
        prevFunc = funcNm + '(' + result.navigateFirstPage + ')';
    }
    if (result.pageNum != result.navigateLastPage) {
        nextFunc = funcNm + '(' + result.navigateLastPage + ')';
    }

    let prevHtml = '<a class="page-link" href="javascript: ' + prevFunc + ';" aria-label="Previous"><span aria-hidden="true">«</span></a>';
    let nextHtml = '<a class="page-link" href="javascript: ' + nextFunc + ';" aria-label="Next"><span aria-hidden="true">»</span></a>';
    let pageHtml = '<li class="page-item">{0}</li>';
    let strFormatReg = new RegExp("\\{0\\}", "gm");


    $(pagingBlock).append(pageHtml.replace(strFormatReg, prevHtml));

    $.each(result.navigatepageNums, function (i, item) {
        let pageNumHtml;
        if (item != result.pageNum) {
            pageNumHtml = '<a class="page-link" href="javascript: ' + funcNm + '(' + item + ');">' + item + '</a>';
        } else {
            pageNumHtml = '<a class="page-link" href="javascript: void(0);">' + item + '</a>';
        }
        pageNumHtml = pageHtml.replace(strFormatReg, pageNumHtml);
        if (item == result.pageNum) {
            pageNumHtml = $(pageNumHtml + " li").addClass('active');
        }
        $(pagingBlock).append(pageNumHtml);
    });
    $(pagingBlock).append(pageHtml.replace(strFormatReg, nextHtml));

}