/* jquery ui 달력 */
jQuery(function ($) {
    $.datepicker.regional['ko'] = {
        closeText: '닫기',
        prevText: '이전달',
        nextText: '다음달',
        currentText: '오늘',
        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월',
				'10월', '11월', '12월'],
        monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월',
				'9월', '10월', '11월', '12월'],
        dayNames: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
        dateFormat: 'yy-mm-dd',
        showMonthAfterYear: true,
        changeYear: true,
        changeMonth: true,
        showOn: 'button',
        // buttonImage: '../img/ico_calender.png',
        buttonImage: '../',
        buttonImageOnly: true
    };
    $.datepicker.setDefaults($.datepicker.regional['ko']);
});




function fixDataOnWheel() {
    if (event.wheelDelta < 0) {
        DataScroll.doScroll('scrollbarDown');
    } else {
        DataScroll.doScroll('scrollbarUp');
    }
    dataOnScroll();
}

function dataOnScroll() {
    right_header.scrollLeft = right_contents.scrollLeft;
}

//마스크 띄우기
function wrapWindowByMask() {

    var mask = $("#lay_mask");

    //화면의 높이와 너비를 구한다. 
    var maskHeight = $(document).height();
    var maskWidth = $(window).width();

    //마스크의 높이와 너비를 화면 것으로 만들어 전체 화면을 채운다. 
    mask.css({
        'width': maskWidth,
        'height': maskHeight
    });
    mask.show();
}
// 사이즈 리사이징
function ResizingLayer() {
    if ($(".PopupLayer").css("visibility") == "visible") {
        //화면의 높이와 너비를 구한다. 
        var maskHeight = $(document).height();
        var maskWidth = $(window).width();

        //마스크의 높이와 너비를 화면 것으로 만들어 전체 화면을 채운다. 
        $("#lay_mask").css({
            'width': maskWidth,
            'height': maskHeight
        });
        //$('#header').css({'width':maskWidth}); // 20131119 최창원 수정 헤더의 넓이 값을 우선 빼 봤음.

        $(".PopupLayer").each(function () {
            var left = ($(window).scrollLeft() + ($(window).width() - $(this).width()) / 2);
            var top = ($(window).scrollTop() + ($(window).height() - $(this).height()) / 2);

            if (top < 0) top = 0;
            if (left < 0) left = 0;

            $(this).css({
                "left": left,
                "top": top
            });
        });
    }
}

window.onresize = ResizingLayer;
//레이어 가운데 띄우고 마스크 띄우기
function toggleLayer(obj, s) {

    var zidx = $("#lay_mask").css("z-index");
    if (s == "on") {
        //화면중앙에 위치시키기
        var left = ($(window).scrollLeft() + ($(window).width() - obj.width()) / 2);
        var top = ($(window).scrollTop() + ($(window).height() - obj.height()) / 2);

        // 높이가 0이하면 0으로 변경
        if (top < 0) top = 0;
        if (left < 0) left = 0;

        if ($(".PopupLayer").length > 1) {
            var layer_idx = Number(zidx) + 10;
        }

        $("#lay_mask").css("z-index", layer_idx);
        // console.log('on일경우 '+ $("#lay_mask").css('z-index'))
        obj.css({
            "left": left,
            "top": top,
            "z-index": layer_idx
        }).addClass("PopupLayer");
        $("body").append(obj);

        wrapWindowByMask(); //배경 깔기
        //obj.show();//레이어 띄우기
        obj.css('visibility', 'visible'); //레이어 띄우기
        obj.css('overflow', 'visible');
        obj.css({
            "left": left,
            "top": top
        });

        if (obj.height() > $(window).height()) {
            obj.css({
                "left": left,
                "top": $(window).scrollTop() + 20
            });
        } else {
            obj.css({
                "left": left,
                "top": top
            });
        }
    }

    if (s == "off") {
        if ($(".PopupLayer").length > 1) {
            //var layer_idx = zidx - 10;
            //$("#lay_mask").css("z-index", layer_idx);
            // console.log('off일경우 '+ $("#lay_mask").css('z-index'))
        } else {
            $("#lay_mask").hide();
        }

        obj.removeClass("PopupLayer").css('visibility', 'hidden');
        obj.css('top', '-9999px');
    }

    if (s == "off2") { //레이어에서 다른 레이어를 띄울 경우 마스크는 안닫기 위한 처리
        obj.removeClass("PopupLayer").css('visibility', 'hidden');
    }
}


// dateRegStart, dateRegEnd class에 달력모양 넣기
function _datePickerMade() {
    $("input.dateRegStart, input.dateRegEnd").datepicker();
    $("input.dateRegStart, input.dateRegEnd").mask("9999-99-99");
    $("input.dateRegStart").datepicker("option", "dateFormat", "yy-mm-dd");
    $("input.dateRegEnd").datepicker("option", "dateFormat", "yy-mm-dd");
    $("input.dateRegStart").val("");
    $("input.dateRegEnd").val("");
}

$(window).on("load", function () {
    if ($('.dateRegStart, .dateRegEnd').length > 0) {
        _datePickerMade();
    }
});

$(document).ready(function () {
    $(".depth_1 > li > a").click(function () {
        $(this).toggleClass("on");
    });
    $('.depth_1 > li.on > a').addClass('on');

    $(".depth_2 > li").click(function () {
        $(this).addClass("on");
        $(this).siblings().removeClass("on")
    });


    $(".depth_1 > li > a").click(function () {
        $(this).next().slideToggle(500);
        $(".depth_1 > li > a").not(this).next().slideUp(500);
        $(".depth_1 > li > a").not(this).removeClass("on");
        return false;
    });

});

//체크 박스 전체 선택 및 해제
$(document).ready(function(){
    $("#chk_all").click(function(){
        if($("#chk_all").prop("checked")){
            $("input[name=chk]").prop("checked",true);
        }else{
            $("input[name=chk]").prop("checked",false);
        }
    })
})


