$(function () {
    cmmFnObj.common();
});

cmmFnObj = {
    common: function () {
        $('#visual_area').addClass('on');

        $('.gnb_unit').click(function () {
            $(this).next('.gnb_unit_open').stop().slideToggle(300);
            $(this).toggleClass('on').siblings().removeClass('on');
            $(this).next('.gnb_unit_open').siblings('.gnb_unit_open').slideUp(300); // 1개씩 펼치기
        });

        // 체크박스 전체선택 적용
        $(document).ready(function () {
            $('#chk_all').click(function () {
                if ($('#chk_all').prop('checked')) {
                    $('input[name=chk]').prop('checked', true);
                } else {
                    $('input[name=chk]').prop('checked', false);
                }
            });
        });

        // TODO : add admin
        // $('body').on('click', '.side_cont_btn', function () {
        //     $('.dim_pop').stop().fadeIn(600, 'easeOutQuad');
        //     $('.side_cont').delay(200).stop().animate({ right: '0' }, 200, 'easeOutQuad');
        // });
        // $('body').on('click', '.row_btn', function () {
        //     $('.dim_pop').stop().fadeIn(600, 'easeOutQuad');
        //     $('.side_cont').delay(200).stop().animate({ right: '0' }, 200, 'easeOutQuad');
        // });
        // $('body').on('click', '.btn_cancel', function () {
        //     $('.side_cont').stop().animate({ right: '-1200px' }, 200, 'easeOutQuad');
        //     $('.dim_pop').delay(200).stop().fadeOut(200, 'easeOutQuad');
        // });

        /* 헤더 메뉴 마우스 오버시 동작 부분 */
        // gnb_zone 초기화
        var $header = $('.adm_header'),
            $gnb = $('.snb_wrap'),
            hh = $header.height();

        $gnb.css('height', 0);

        $header.find('.depth1').on('mouseenter', function () {
            $header.addClass('on');
            // 마우스 오버된 메뉴를 찾아서 show/hide 처리를 한다.
            var menuId = $(this).closest('li').data('targetmenu');
            $gnb.find('.snb_list').hide(); // 모든 항목 숨김 처리
            $gnb.find('#' + menuId).show(); // 선택된 항목만 보임 처리
            $gnb.show();

            // 전체 메뉴일 경우 내려오는 부분 사이즈 조정
            if (menuId == 'all') {
                $gnb.stop().animate(
                    { height: 220 },
                    {
                        duration: 200,
                    }
                );
            } else {
                $gnb.stop().animate(
                    { height: 84 },
                    {
                        duration: 200,
                    }
                );
            }
        });

        function isTop() {
            return $(window).scrollTop() < hh;
        }

        /* 20220401 gnb 마우스 이벤트 개선 : 마우스 빠르게 움직이거나 브라우저 탭 쪽으로 이동 시 닫히지 않음
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
        */

        //20220401 gnb 마우스 이벤트 개선
        $header.on('mouseleave', function (e) {
            e.preventDefault();
            $header.removeClass('on');
            $gnb.stop().animate(
                { height: 0 },
                {
                    duration: 200,
                }
            );
            $gnb.find('.snb_list').hide();
        });

        // datepicker
        $('#startDate').datepicker({
            //버튼 선택 시 달력 open + 버튼 이미지 적용
            showOn: 'button',
            buttonImage: '/assets/resource/images/ico/ico_calendar.svg',
            buttonImageOnly: true,
            dateFormat: 'yy-mm-dd',
            nextText: '>',
            prevText: '<',
            onSelect: function (date) {
                var endDate = $('#endDate');
                var minDate = $(this).datepicker('getDate');
                endDate.datepicker('option', 'minDate', minDate);
            },
        });

        $('#endDate').datepicker({
            showOn: 'button',
            buttonImage: '/assets/resource/images/ico/ico_calendar.svg',
            buttonImageOnly: true,
            dateFormat: 'yy-mm-dd',
        });

        // 20211222 > 운영자 관리 위한 추가
        $('#searchStartDate').datepicker({
            //버튼 선택 시 달력 open + 버튼 이미지 적용
            showOn: 'button',
            buttonImage: '/assets/resource/images/ico/ico_calendar.svg',
            buttonImageOnly: true,
            dateFormat: 'yy-mm-dd',
            nextText: '>',
            prevText: '<',
            onSelect: function (date) {
                var endDate = $('#searchEndDate');
                var minDate = $(this).datepicker('getDate');
                endDate.datepicker('option', 'minDate', minDate);
            },
        });

        $('#searchEndDate').datepicker({
            showOn: 'button',
            buttonImage: '/assets/resource/images/ico/ico_calendar.svg',
            buttonImageOnly: true,
            dateFormat: 'yy-mm-dd',
        });

        $('#absenceStartDate').datepicker({
            //버튼 선택 시 달력 open + 버튼 이미지 적용
            showOn: 'button',
            buttonImage: '/assets/resource/images/ico/ico_calendar.svg',
            buttonImageOnly: true,
            dateFormat: 'yy-mm-dd',
            nextText: '>',
            prevText: '<',
            onSelect: function (date) {
                var endDate = $('#absenceEndDate');
                var minDate = $(this).datepicker('getDate');
                endDate.datepicker('option', 'minDate', minDate);
            },
        });

        $('#absenceEndDate').datepicker({
            showOn: 'button',
            buttonImage: '/assets/resource/images/ico/ico_calendar.svg',
            buttonImageOnly: true,
            dateFormat: 'yy-mm-dd',
        });

        // 데이터 셋 개발 요청 관리
        $('#devStartDate').datepicker({
            //버튼 선택 시 달력 open + 버튼 이미지 적용
            showOn: 'button',
            buttonImage: '/assets/resource/images/ico/ico_calendar.svg',
            buttonImageOnly: true,
            dateFormat: 'yy-mm-dd',
            nextText: '>',
            prevText: '<',
            onSelect: function (date) {
                var endDate = $('#devEndDate');
                var minDate = $(this).datepicker('getDate');
                endDate.datepicker('option', 'minDate', minDate);
            },
        });

        $('#devEndDate').datepicker({
            showOn: 'button',
            buttonImage: '/assets/resource/images/ico/ico_calendar.svg',
            buttonImageOnly: true,
            dateFormat: 'yy-mm-dd',
        });

        // 데이터 셋 권한 요청 관리
        $('#authorStartDate').datepicker({
            //버튼 선택 시 달력 open + 버튼 이미지 적용
            showOn: 'button',
            buttonImage: '/assets/resource/images/ico/ico_calendar.svg',
            buttonImageOnly: true,
            dateFormat: 'yy-mm-dd',
            nextText: '>',
            prevText: '<',
            onSelect: function (date) {
                var endDate = $('#authorEndDate');
                var minDate = $(this).datepicker('getDate');
                endDate.datepicker('option', 'minDate', minDate);
            },
        });

        $('#authorEndDate').datepicker({
            showOn: 'button',
            buttonImage: '/assets/resource/images/ico/ico_calendar.svg',
            buttonImageOnly: true,
            dateFormat: 'yy-mm-dd',
        });

        // 20211227 > 데이터셋 등록 위한 추가
        $('#rgstProductDate').datepicker({
            showOn: 'button',
            buttonImage: '/assets/resource/images/ico/ico_calendar.svg',
            buttonImageOnly: true,
            dateFormat: 'yy-mm-dd',
        });
        $('#rgstRenewalDate').datepicker({
            showOn: 'button',
            buttonImage: '/assets/resource/images/ico/ico_calendar.svg',
            buttonImageOnly: true,
            dateFormat: 'yy-mm-dd',
        });
        $('#rgstFirstDate').datepicker({
            showOn: 'button',
            buttonImage: '/assets/resource/images/ico/ico_calendar.svg',
            buttonImageOnly: true,
            dateFormat: 'yy-mm-dd',
        });
        $('#rgstLastDate').datepicker({
            showOn: 'button',
            buttonImage: '/assets/resource/images/ico/ico_calendar.svg',
            buttonImageOnly: true,
            dateFormat: 'yy-mm-dd',
        });

        // 20211229 > 데이터 셋 상세 위한 추가
        $('#dtstProductDate').datepicker({
            showOn: 'button',
            buttonImage: '/assets/resource/images/ico/ico_calendar.svg',
            buttonImageOnly: true,
            dateFormat: 'yy-mm-dd',
        });
        $('#dtstRenewalDate').datepicker({
            showOn: 'button',
            buttonImage: '/assets/resource/images/ico/ico_calendar.svg',
            buttonImageOnly: true,
            dateFormat: 'yy-mm-dd',
        });
        $('#dtstFirstDate').datepicker({
            showOn: 'button',
            buttonImage: '/assets/resource/images/ico/ico_calendar.svg',
            buttonImageOnly: true,
            dateFormat: 'yy-mm-dd',
        });
        $('#dtstLastDate').datepicker({
            showOn: 'button',
            buttonImage: '/assets/resource/images/ico/ico_calendar.svg',
            buttonImageOnly: true,
            dateFormat: 'yy-mm-dd',
        });

        // 20220106 > 세부코드 datepicker
        $('#dtcode_startDate').datepicker({
            //버튼 선택 시 달력 open + 버튼 이미지 적용
            showOn: 'button',
            buttonImage: '/assets/resource/images/ico/ico_calendar.svg',
            buttonImageOnly: true,
            dateFormat: 'yy-mm-dd',
            nextText: '>',
            prevText: '<',
            onSelect: function (date) {
                var endDate = $('#dtcode_endDate');
                var minDate = $(this).datepicker('getDate');
                endDate.datepicker('option', 'minDate', minDate);
            },
        });

        $('#dtcode_endDate').datepicker({
            showOn: 'button',
            buttonImage: '/assets/resource/images/ico/ico_calendar.svg',
            buttonImageOnly: true,
            dateFormat: 'yy-mm-dd',
        });
    },
    eventSlide: function () {
        $('.eventSlide').slick({
            autoplay: true,
            autoplaySpeed: 3000,
            pauseOnHover: false,
            slidesToShow: 1,
        });
        $('body').on('click', '.evtLeft', function (e) {
            $('.eventSlide').slick('slickPrev');
        });
        $('body').on('click', '.evtRight', function (e) {
            $('.eventSlide').slick('slickNext');
        });
    },
};

// function popOpen(o) {
//     $(o).show();
// }
// function popClose(o) {
//     $(o).hide();
// }

function popOpen(o) {
    $(o).fadeIn();
}
function popClose(o) {
    $(o).fadeOut();
}
function slidePopOpen(o) {
    $(o).stop().fadeIn(600, 'easeOutQuad');
    $(o).children('.side_cont').delay(200).stop().animate(
        {
            right: '0',
        },
        200,
        'easeOutQuad'
    );
    $('body').addClass('notScroll');
}
function slidePopClose(o) {
    $(o).children('.side_cont').stop().animate(
        {
            right: '-1200px',
        },
        200,
        'easeOutQuad'
    );
    $(o).delay(200).stop().fadeOut(200, 'easeOutQuad');
    $('body').removeClass('notScroll');
}
