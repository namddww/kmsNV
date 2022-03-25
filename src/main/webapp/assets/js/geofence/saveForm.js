var _geofence = {
    $scope : null, // 영역
    $contentForm : null, // content form
    $dloList : null,
    $staList : null,

    init: function () {

        this.$scope = $("#geofenceArea");
        this.$contentForm = $('#geofenceForm', this.$scope);
        this.$dloList = dloList;
        this.$staList = staList;
        this.events();

    },

    events: function () {
        const _this = this;

        _geofence.appendSelect(_this.$dloList, 'location');
        _geofence.appendSelect(_this.$staList, 'stateCd');

        // 건물선택
        $('#btnBuilding').on('click', function () {
            let url = '/device/buildingPopup';
            window.open(url, '', '_blank');
        });

        // 설취 위치등록
        $('#btnSetPoint').on('click', function () {
            if($('#buildSeq').val()==''){
                alert('건물을 선택해주세요');
                return false;
            }
            let url = '/geofence/setPointPopup?'
                +encodeURIComponent("buildSeq")+"="+$('#buildSeq').val()+"&"
                +encodeURIComponent("floor")+"="+$('#floor').val();
            window.open(url, '', '_blank');
        });

        // 좌표등록
        $('#btnPoint').on('click', function () {
            if($('#buildSeq').val()==''){
                alert('건물을 선택해주세요');
                return false;
            }
            if($('#setPointX').val()=='' || $('#setPointY').val()==''){
                alert('설치위치를 등록해주세요');
                return false;
            }
            let url = '/geofence/pointPopup?'
                +encodeURIComponent("buildSeq")+"="+$('#buildSeq').val()+"&"
                +encodeURIComponent("floor")+"="+$('#floor').val();
            window.open(url, '', '_blank');
        });

        // geofence 저장
        $('#btnSave').on('click', function () {
            _geofence.save();
        });

        // 목록
        $('#btnList').on('click', function () {
            location.href = '/geofence/list';
        });

    },

    save: function () {
        const _this = this;

        let formData = new FormData();

        formData.append('buildSeq', $('#buildSeq', _this.$contentForm).val());
        formData.append('floor', $("#floor option:selected", _this.$contentForm).val());
        formData.append('geoName', $('#geoName', _this.$contentForm).val());
        formData.append('typeCd', $('#typeCd', _this.$contentForm).val());
        formData.append('stateCd', $('#stateCd', _this.$contentForm).val());
        formData.append('locationCd', $('#location', _this.$contentForm).val());

        let size = $("input[name=xy]").length/2;

        for(let i=0; i<size; i++){
            formData.append("pointList["+i+"].pointX", $('#x'+i, _this.$contentForm).val());
            formData.append("pointList["+i+"].pointY", $('#y'+i, _this.$contentForm).val());
        }
        if(size != 1){
            formData.append("pointList["+size+"].pointX", $('#x0', _this.$contentForm).val());
            formData.append("pointList["+size+"].pointY", $('#y0', _this.$contentForm).val());
        }
        if($('#radius', _this.$contentForm).val() == ''){
            formData.append('radius', '0');
        }else{
            formData.append('radius', $('#radius', _this.$contentForm).val());
        }
        formData.append('setPointX', $('#setPointX', _this.$contentForm).val());
        formData.append('setPointY', $('#setPointY', _this.$contentForm).val());

        $.ajax({
            type : "POST",
            processData : false,
            contentType : false,
            url : "/geofence/save",
            data : formData,
            success : function(res){
                location.href = '/geofence/list'
            },
            error : function(XMLHttpRequest, textStatus, errorThrown){

            }
        });

    },

    appendSelect : function (list, id) {
        $("#"+id).empty();

        $("#"+id).append(
            $('<option/>')
                .attr('value', '')
                .text('선택')
        )

        $.each(list, function (i, val) {
            $("#"+id).append(
                $('<option/>')
                    .attr('value', val.codeVal)
                    .text(val.codeName)
            )
        });
    }

};

// onload
$(document).ready(function() {
    _geofence.init();
});

