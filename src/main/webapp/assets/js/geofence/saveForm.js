var _geofence = {
    $scope : null, // 영역
    $contentForm : null, // content form

    init: function () {

        this.$scope = $("#geofenceArea");
        this.$contentForm = $('#geofenceForm', this.$scope);

        this.events();

    },

    events: function () {
        const _this = this;

        // 건물선택
        $('#btnBuilding').on('click', function () {
            let url = '/device/buildingPopup';
            window.open(url, '', '_blank');
        });

        // 건물선택
        $('#btnPoint').on('click', function () {
            let url = '/geofence/pointPopup';
            window.open(url, '', '_blank');
        });

        // 건물좌표 등록
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

        formData.append('stdPoint1', $('#stdPoint1', _this.$contentForm).val());
        formData.append('stdPoint2', $('#stdPoint2', _this.$contentForm).val());
        formData.append('areaPoint1', $('#areaPoint1', _this.$contentForm).val());
        formData.append('areaPoint2', $('#areaPoint2', _this.$contentForm).val());
        formData.append('buildName', $('#buildName', _this.$contentForm).val());
        formData.append('addr1', $('#addr1', _this.$contentForm).val());
        formData.append('addr2', $('#addr2', _this.$contentForm).val());
        formData.append('groundFloor', $('#groundFloor', _this.$contentForm).val());

        let baseFloor = $('#baseFloor', _this.$contentForm).val();
        baseFloor = Number(baseFloor) * -1
        formData.append('baseFloor', baseFloor);

        let size = $('#floorListTable tbody tr').length;
        let a = baseFloor;
        for(let i=0; i<size; i++){
            if(a===0){
                a++;
            }
            formData.append("floorInfo["+i+"].floor", a);
            //파일
            if($("#dfinput"+a, _this.$contentForm).length > 0){
                $.each($("#dfinput"+a, _this.$contentForm)[0].files, function (k, value){
                    formData.append("floorInfo["+i+"].file", value);
                });
            }
            let o = $("#dfopacity"+a, _this.$contentForm).val();
            formData.append("floorInfo["+i+"].opacity", Number(o*100));
            a++;
        }
        formData.append('searchInfo', $('#searchInfo', _this.$contentForm).val());
        formData.append('memo', $('#memo', _this.$contentForm).val());

        $.ajax({
            type : "POST",
            processData : false,
            contentType : false,
            url : "/building/save",
            data : formData,
            success : function(res){
                location.href = '/building/list'
            },
            error : function(XMLHttpRequest, textStatus, errorThrown){

            }
        });

    }

};

// onload
$(document).ready(function() {
    _geofence.init();
});

