var PageObject = function (goPageFunction) {
	this._target = $(".paging");
	this._currPage = 1;
	this._pagePerList = 5;
	this._totalCount = 0;
	this._range = 1;
	this._rangeSize = 10;
	this._goPageFunction = goPageFunction;
};

PageObject.prototype.init = function (target, currPage, pagePerList, totalCount, range, rangeSize) {
	if(typeof target != 'undefined' && target != null && target != "") this._target = target;
	if(typeof currPage != 'undefined' && currPage != null && currPage != "") this._currPage = currPage;
	if(typeof pagePerList != 'undefined' && pagePerList != null && pagePerList != "") this._pagePerList = pagePerList;
	if(typeof totalCount != 'undefined' && totalCount != null && totalCount != "") this._totalCount = totalCount;
	if(typeof range != 'undefined' && range != null && range != "") this._range = range;
	if(typeof rangeSize != 'undefined' && rangeSize != null && rangeSize != "") this._rangeSize = rangeSize;
};

PageObject.prototype.getCurrPage = function () {
	return this._currPage;
}

PageObject.prototype.setCurrPage = function (page) {
	this._currPage = page;
}

PageObject.prototype.getPagePerList = function () {
	return this._pagePerList;
}
//HY추가
PageObject.prototype.setPagePerList = function (pagePerList) {
	this._pagePerList = pagePerList;
}
//HY추가
PageObject.prototype.setRangeSize = function (rangeSize) {
	this._rangeSize = rangeSize;
}



PageObject.prototype.drawPage = function (totalCount) {
	this._totalCount = totalCount;

	var firstPage = 1;
	var lastPage = Math.ceil(this._totalCount / this._pagePerList);
	this._range = Math.ceil(this._currPage / this._rangeSize);
	var startPage = (this._range - 1) * this._rangeSize + 1;
	var endPage = (this._range*this._rangeSize>=lastPage)?lastPage:(this._range*this._rangeSize);
	var prevPage = startPage<=1?1:startPage-1;
	var nextPage = endPage>=lastPage?lastPage:endPage+1;

	var html = '';

	if(this._range != 1) {
		html += '<a href="javascript:void(0)" class="btnPrev" onclick="fn_go_page(' + prevPage + ')">이전</a>';
	}

	for(var i = startPage ; i <= endPage ; i++) {
		html += '<a href="javascript:void(0)" ' + (i==this._currPage?'class="on"':"")  + 'onclick="fn_go_page(' + i + ')">' + i + '</a>';
	}

	if(endPage != lastPage) {
		html += '<a href="javascript:void(0)" class="btnNext" onclick="fn_go_page(' + nextPage + ')">다음</a>';
	}

	if(lastPage >= 1) this._target.html(html);
	else this._target.empty();
};

var PageObject2 = function (goPageFunction) {
	this._target = $(".page_wrap");
	this._currPage = 1;
	this._pagePerList = 5;
	this._totalCount = 0;
	this._range = 1;
	this._rangeSize = 10;
	this._goPageFunction = goPageFunction;
};

PageObject2.prototype.init = function (target, currPage, pagePerList, totalCount, range, rangeSize) {
	if(typeof target != 'undefined' && target != null && target != "") this._target = target;
	if(typeof currPage != 'undefined' && currPage != null && currPage != "") this._currPage = currPage;
	if(typeof pagePerList != 'undefined' && pagePerList != null && pagePerList != "") this._pagePerList = pagePerList;
	if(typeof totalCount != 'undefined' && totalCount != null && totalCount != "") this._totalCount = totalCount;
	if(typeof range != 'undefined' && range != null && range != "") this._range = range;
	if(typeof rangeSize != 'undefined' && rangeSize != null && rangeSize != "") this._rangeSize = rangeSize;
};

PageObject2.prototype.getCurrPage = function () {
	return this._currPage;
}

PageObject2.prototype.setCurrPage = function (page) {
	this._currPage = page;
}

PageObject2.prototype.getPagePerList = function () {
	return this._pagePerList;
}
//HY 추가
PageObject2.prototype.settPagePerList = function (pagePerList) {
	this._pagePerList = pagePerList;
}
PageObject2.prototype.drawPage = function (totalCount) {
	this._totalCount = totalCount;

	var firstPage = 1;
	var lastPage = Math.ceil(this._totalCount / this._pagePerList);
	this._range = Math.ceil(this._currPage / this._rangeSize);
	var startPage = (this._range - 1) * this._rangeSize + 1;
	var endPage = (this._range*this._rangeSize>=lastPage)?lastPage:(this._range*this._rangeSize);
	var prevPage = startPage<=1?1:startPage-1;
	var nextPage = endPage>=lastPage?lastPage:endPage+1;

	var html = '';

	if(this._range != 1) {
		html += '<span class="prev" onclick="fn_go_page(' + prevPage + ')"></span>';
	}

	for(var i = startPage ; i <= endPage ; i++) {
		html += '<span class="num  ' + (i==this._currPage?" current":"") + '" onclick="fn_go_page(' + i + ')">' + i + '</span>';
	}

	if(endPage != lastPage) {
		html += '<span class="next" onclick="fn_go_page(' + nextPage + ')"></span>';
	}

	if(lastPage >= 1) this._target.html(html);
	else this._target.empty();
};