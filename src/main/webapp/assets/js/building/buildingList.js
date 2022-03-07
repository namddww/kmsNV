let _buildingList = {
    $scope : null, // 영역
    $tableList : null,

    init : function () {

        this.$scope = $("#buildingList");
        this.$tableList = $('#buildingListTable', this.$scope);

        this.events();
    },

    events : function () {
        const _this = this;
        this.search(1);

        // 목록
        $('#btnSaveForm').on('click', function () {
            location.href = '/building/saveForm';
        });

        //조회
        $('#a-search').on('click', function () {
            _this.search(1);
        });

    },

    search : function(page) {
        const _this = this;

        var param = {
            pageNum: page,
            buildName: $("#buildName").val(),
            scRegDtSt : $("#scRegDtSt").val().replaceAll('-',''),
            scRegDtEd : $("#scRegDtEd").val().replaceAll('-',''),
            locationCd : $("#select-area option:selected").val(),
            isUse : $("#select-useYn option:selected").val()
        };
        $.ajax({
            type : "GET",
            url : "/building/search",
            data : param,
            success : function(res){
                _this.dataBind(res.result);
                pagination(res.result, '', '_buildingList.search');
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
                _this.$tableList.append(
                    $('<tr/>').append(
                        $('<td/>').append($('<a/>').text(val.buildName).attr("href", "/building/buildingInfo/"+val.buildSeq))
                    ).append(
                        $('<td/>').text(" ")
                    ).append(
                        $('<td/>').text(val.addr1)
                    ).append(
                        $('<td/>').text(val.addr2)
                    ).append(
                        $('<td/>').text('지상'+val.groundFloor+'/ 지하'+(val.baseFloor*-1))
                    ).append(
                        $('<td/>').text(" ")
                    ).append(
                        $('<td/>').text(val.regDate)
                    )
                )
            });
        } else {
            _this.$tableList.append(
                $('<tr/>').append($('<td/>').attr({colspan : 6}).text('검색결과가 없습니다.'))
            );
        }
    }
};

// onload
$(document).ready(function() {
    _buildingList.init();
});