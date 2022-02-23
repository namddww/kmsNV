$(document).ready(function() {
    console.log("========== 이미지 좌표 ==========");
    console.log("ready deviceInfoList : ", deviceInfoList);
    img();
});

function img() {
    console.log("========== img ==========");
    console.log("img deviceInfoList : ", deviceInfoList);

    var img = $("#img")
    console.log("img width : ", img.width());
    console.log("img height : ", img.height());
}


function onLoad() {
    console.log("onLoad deviceInfoList : ", deviceInfoList);
    
    // TODO : 루프돌면서 좌물쇠, 키 구분값으로 색깔 구분하고, top,left 퍼센트 바꾸고
    $.each(deviceInfoList, function (i, val) {
        var deviceTypeColor = val.type == '자물쇠' ? 'red' : 'blue';
        $("#div-main").append(
            $('<div/>')
                .attr('class', 'div' + i)
                .css({
                    'position' : 'absolute',
                    'top' : val.top,
                    'left' : val.left
                })
                .append(
                    $('<span/>')
                        .attr('class', 'device-point')
                        .css({
                            'desplay' : 'flex',
                            'background-color' : deviceTypeColor,
                            'width' : '10px',
                            'height' : '10px',
                            'border-radius' : '50px'
                        })
                )
        )
    });
}


