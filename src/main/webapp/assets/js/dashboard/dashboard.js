$(document).ready(function() {
    console.log("========== 대쉬보드 데이터 START ==========");
    console.log("전체장비현황 : ", allCount);
    console.log("실내장비현황 : ", inCount);
    console.log("실외장비현황 : ", outCount);
    console.log("========== 대쉬보드 데이터 END ==========");

    $("#ul-dashboard").empty();
    allCountHtml(allCount);
    inCounttHtml(inCount);
    outCountHtml(outCount);
});

function allCountHtml(allCount) {
    $("#ul-dashboard").append(
        $('<li/>').attr('class', 'unit')
        .append(
            $('<a/>')
                .attr('href', 'javascript:void(0);')
                .attr('class', 'box shape02')
            .append(
                $('<ul/>').attr('class', 'unit_list')
                .append($('<li/>').text('사용중 ' + allCount.ycount + ' 대'))
                .append($('<li/>').text('미사용중 ' + allCount.ncount + ' 대'))
            )
            .append(
                $('<div/>').attr('class', 'data')
                .append($('<span/>').attr('class', 'icon unit01'))
                .append($('<p/>')
                            .attr('class', 'num')
                            .text(allCount.allCount + ' 대')
                )
            )
        )
    )
}

function inCounttHtml(inCount) {
    var scroll = "";
    // 데이터가 4개 이상일 경우 스크롤 추가
    if(inCount.length > 4) {
        scroll = " scroll";
    }

    $("#ul-dashboard").append(
        $('<li/>').attr('class', 'unit')
            .append(
                $('<a/>')
                    .attr('href', 'javascript:void(0);')
                    .attr('class', 'box shape02')
                    .append(
                        $('<ul/>')
                            .attr('class', 'unit_list' + scroll)
                            .attr('id', 'ul-indata')
                    )
                    .append(
                        $('<div/>').attr('class', 'data')
                            .append($('<span/>').attr('class', 'icon unit01'))
                            .append($('<p/>')
                                .attr('class', 'num')
                                .attr('id', 'p-indata')
                            )
                    )
            )
    )

    $.each(inCount, function (i, val) {
        $("#ul-indata").append(($('<li/>').text(val.floor + 'F ' + val.count + ' 대')))
        $("#p-indata").text(val.allCount + ' 대')
    });
}

function outCountHtml(outCount) {
    var scroll = "";
    // 데이터가 4개 이상일 경우 스크롤 추가
    if(outCount.length > 4) {
        scroll = " scroll";
    }

    $("#ul-dashboard").append(
        $('<li/>').attr('class', 'unit')
            .append(
                $('<a/>')
                    .attr('href', 'javascript:void(0);')
                    .attr('class', 'box shape02')
                    .append(
                        $('<ul/>')
                            .attr('class', 'unit_list' + scroll)
                            .attr('id', 'ul-outdata')
                    )
                    .append(
                        $('<div/>').attr('class', 'data')
                            .append($('<span/>').attr('class', 'icon unit01'))
                            .append($('<p/>')
                                .attr('class', 'num')
                                .attr('id', 'p-outdata')
                            )
                    )
            )
    )

    $.each(outCount, function (i, val) {
        $("#ul-outdata").append(($('<li/>').text(val.name + ' ' + val.count + ' 대')))
        $("#p-outdata").text(val.allCount + ' 대')
    });
}