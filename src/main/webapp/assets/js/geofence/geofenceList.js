let _geofenceList = {
    $scope : null, // 영역
    $tableList : null,

    init : function () {

        this.$scope = $("#geofenceList");
        this.$tableList = $('#geofenceListTable', this.$scope);

        this.events();
    },

    events : function () {
        const _this = this;
        this.search(1);

        // 목록
        $('#btnSaveForm').on('click', function () {
            location.href = '/geofence/saveForm';
        });

        //조회
        $('#a-search').on('click', function () {
            _this.search(1);
        });

        $("#scRegDtSt").datepicker();
        $("#scRegDtEd").datepicker();

    },

    search : function(page) {
        const _this = this;

        var param = {
            pageNum: page,
            buildName : $("#buildName").val(),
            scRegDtSt : $("#scRegDtSt").val().replaceAll('-',''),
            scRegDtEd : $("#scRegDtEd").val().replaceAll('-',''),
            floor : Number($("#floor").val())
        };
        $.ajax({
            type : "GET",
            url : "/geofence/search",
            data : param,
            success : function(res){
                _this.dataBind(res.result);
                pagination(res.result, '', '_geofenceList.search');
            },
            error : function(XMLHttpRequest, textStatus, errorThrown){

            }
        });

    },

    dataBind : function(result) {
        const _this = this;
        _this.$tableList.find('tbody').empty();
        if (result.list.length > 0) {
            $.each(result.list, function (i, val) {
                if(val.floor > 0){
                    _this.$tableList.append(
                        $('<tr/>').append(
                            $('<td/>').append($('<a/>').text(val.locationName).attr("href", "/geofence/geofenceInfo/"+val.geofenceSeq))
                        ).append(
                            $('<td/>').text(val.buildName)
                        ).append(
                            $('<td/>').text(val.floor)
                        ).append(
                            $('<td/>').text(val.geoName)
                        ).append(
                            $('<td/>').text(val.typeCdName)
                        ).append(
                            $('<td/>').text(" ")
                        ).append(
                            $('<td/>').text(val.regDate)
                        )
                    )
                }else{
                    _this.$tableList.append(
                        $('<tr/>').append(
                            $('<td/>').append($('<a/>').text(val.locationName).attr("href", "/geofence/geofenceInfo/"+val.geofenceSeq))
                        ).append(
                            $('<td/>').text(val.buildName)
                        ).append(
                            $('<td/>').text("지하"+(val.floor*-1))
                        ).append(
                            $('<td/>').text(val.geoName)
                        ).append(
                            $('<td/>').text(val.typeCdName)
                        ).append(
                            $('<td/>').text(" ")
                        ).append(
                            $('<td/>').text(val.regDate)
                        )
                    )
                }
            });
        } else {
            _this.$tableList.append(
                $('<tr/>').append($('<td/>').attr({colspan : 7}).text('검색결과가 없습니다.'))
            );
        }
    }
};

// onload
$(document).ready(function() {
    _geofenceList.init();
});