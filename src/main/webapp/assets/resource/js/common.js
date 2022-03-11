$(function () {
    cmmFnObj.common();
});

cmmFnObj = {
    common: function () {
        $('#visual_area').addClass('on');

        $(window).on('load', function () {
            $('.side_gnb').mCustomScrollbar();
        });

        $('.gnb_unit').click(function () {
            $(this).next('.gnb_unit_open').stop().slideToggle(300);
            $(this).toggleClass('on').siblings().removeClass('on');
            $(this).next('.gnb_unit_open').siblings('.gnb_unit_open').slideUp(300); // 1개씩 펼치기
        });

        $('.tab_content').hide();
        $('ul.tabs li:first').addClass('on').show();
        $('.tab_content:first').show();

        $('ul.tabs li').click(function () {
            $('ul.tabs li a').removeClass('on');
            $(this).find('a').addClass('on');
            $('.tab_content').hide();

            var activeTab = $(this).find('a').attr('href');
            $(activeTab).fadeIn();
            return false;
        });

        //        $("body").on("click", ".btn_r", function () {
        //            $(".dim_pop").stop().fadeIn(600, 'easeOutQuad');
        //            $(".side_cont").delay(200).stop().animate({
        //                "right": "0"
        //            }, 200, 'easeOutQuad');
        //        });
        //        $("body").on("click", ".btn_r.selected", function () {
        //            $(".side_cont").stop().animate({
        //                "right": "-1200px"
        //            }, 200, 'easeOutQuad');
        //            $(".dim_pop").delay(200).stop().fadeOut(200, 'easeOutQuad');
        //        });
        //        $("body").on("click", ".btn_close", function () {
        //            $(".side_cont").stop().animate({
        //                "right": "-1200px"
        //            }, 200, 'easeOutQuad');
        //            $(".dim_pop").delay(200).stop().fadeOut(200, 'easeOutQuad');
        //        });

        /* 헤더 메뉴 마우스 오버시 동작 부분 */
        // gnb_zone 초기화
        var $header = $('.adm_header'),
            $gnb = $('.snb_wrap'),
            hh = $header.height();

        /* s: 20220209 -> 20220218 마우스 빠른 이동 시 메뉴 영역 닫히지 않는 현상 개선
        사용자_ 헤더 메뉴 마우스 오버시 동작 부분   */
        // gnb_zone 초기화
        var $headerUser = $('.user_header'),
            $gnb = $headerUser.children('.snb_wrap'),
            $depth1 = $('.depth1'),
            hh = $headerUser.height();

        $gnb.css('height', 0);

        $depth1.on('mouseenter', function (e) {
            e.preventDefault();
            $headerUser.addClass('on');
            // 마우스 오버된 메뉴를 찾아서 show/hide 처리를 한다.
            var menuId = $(this).closest('li').data('targetmenu');
            $gnb.find('.snb_list').hide(); // 모든 항목 숨김 처리
            $depth1.css({ color: '#080836' });
            $depth1.css({ 'border-bottom-color': 'transparent' });
            $gnb.find('#' + menuId).show(); // 선택된 항목만 보임 처리
            $gnb.show();
            $(this).css({ color: '#003BBE' });
            $(this).css({ 'border-bottom-color': '#003BBE' });

            // 전체 메뉴일 경우 내려오는 부분 사이즈 조정
            if (menuId == 'data_category' || menuId == 'mypage') {
                $gnb.stop().animate(
                    { height: 300 },
                    {
                        duration: 200,
                    }
                );
            } else if (menuId == 'analysis') {
                $gnb.stop().animate(
                    { height: 440 },
                    {
                        duration: 200,
                    }
                );
            } else {
                $gnb.stop().animate(
                    { height: 0 },
                    {
                        duration: 200,
                    }
                );
            }
        });
        $headerUser.on('mouseleave', function (e) {
            e.preventDefault();
            $headerUser.removeClass('on');
            $gnb.stop().animate(
                { height: 0 },
                {
                    duration: 200,
                }
            );
            $gnb.find('.snb_list').hide();
            //$gnb.css('height', 0);// 모든 항목 숨김 처리
            $depth1.css({ color: '#080836' });
            $depth1.css({ 'border-bottom-color': 'transparent' });
        });
        // e: 20220209 -> 20220218

        function isTop() {
            return $(window).scrollTop() < hh;
        }

        $gnb.on('mouseleave', function () {
            $gnb.stop().animate(
                { height: 0 },
                {
                    duration: 200,
                    complete: function () {
                        $gnb.hide();
                    },
                }
            );
        });

        // Datepicker
        /*$(".date").datepicker({
            dateFormat: 'yy-mm-dd',
            showOn: "button",
            buttonImage: "resource/images/ico/ico_calendar.svg",
            buttonImageOnly: true,
            onClose: function (selectedDate) {

                var eleId = $(this).attr("id");
                var optionName = "";

                if (eleId.indexOf("StartDate") > 0) {
                    eleId = eleId.replace("StartDate", "EndDate");
                    optionName = "minDate";
                } else {
                    eleId = eleId.replace("EndDate", "StartDate");
                    optionName = "maxDate";
                }

                $("#" + eleId).datepicker("option", optionName, selectedDate);
            }
        });*/

        //        $(".eventSlide").slick({
        //            slidesToShow: 4,
        //            slidesToScroll: 1,
        //            autoplay: true,
        //            vertical: true,
        //            autoplaySpeed: 3000,
        //            pauseOnHover: false
        //        });

        // 20220223 분석 3depth 메뉴 여닫기
        $('.dep_1')
            .children('li')
            .on('click', function () {
                if ($(this).hasClass('on') === true) {
                    $(this).children('.dep_2').slideUp();
                    $(this).removeClass('on');
                } else {
                    $('.dep_2').slideUp();
                    $(this).children('.dep_2').slideDown();
                    $('.snb_wrap').stop().animate(
                        {
                            height: 550,
                        },
                        {
                            duration: 200,
                        }
                    );
                    $('.dep_1').children('li').removeClass('on');
                    $(this).addClass('on');
                }
            });
        $('#analysis').on('mouseleave', function () {
            $('.dep_2').slideUp();
            $('.dep_1').children('li').removeClass('on');
        });

        // 이용안내 슬라이드 효과를 위한 스크립트 - 20220224
        var slide = $('.info_slide_wrap#tab1').children('ul');
        var slide2 = $('.info_slide_wrap#tab2').children('ul');

        $('.tab').on('click', function () {
            slide.css({
                left: '0px',
            });
            slide2.css({
                left: '0px',
            });
        });

        $('#next_1_1').on('click', function () {
            slide.css({
                left: '-1000px',
            });
        });
        $('#next_1_2').on('click', function () {
            slide.css({
                left: '-2000px',
            });
        });
        $('#next_1_3').on('click', function () {
            slide.css({
                left: '-3000px',
            });
        });
        $('#next_1_4').on('click', function () {
            slide.css({
                left: '-4000px',
            });
        });
        $('#next_1_5').on('click', function () {
            slide.css({
                left: '-5000px',
            });
        });
        $('#next_1_6').on('click', function () {
            slide.css({
                left: '-6000px',
            });
        });
        $('#next_1_7').on('click', function () {
            slide.css({
                left: '0px',
            });
        });

        $('#next_2_1').on('click', function () {
            slide2.css({
                left: '-1000px',
            });
        });
        $('#next_2_2').on('click', function () {
            slide2.css({
                left: '-2000px',
            });
        });
        $('#next_2_3').on('click', function () {
            slide2.css({
                left: '-3000px',
            });
        });
        $('#next_2_4').on('click', function () {
            slide2.css({
                left: '-4000px',
            });
        });
        $('#next_2_5').on('click', function () {
            slide2.css({
                left: '-5000px',
            });
        });
        $('#next_2_6').on('click', function () {
            slide2.css({
                left: '-6000px',
            });
        });
        $('#next_2_7').on('click', function () {
            slide2.css({
                left: '0px',
            });
        });
    },
};

function popOpen(o) {
    $(o).show();
}

function popClose(o) {
    $(o).hide();
}
