var _buildingInfo = {
    $scope : null, // 영역
    $contentForm : null, // content form
    $tableList : null, // content form

    init: function () {

        this.$scope = $("#buildingArea");
        this.$contentForm = $('#buildingForm', this.$scope);
        this.$tableList  = $('#floorListTable', this.$scope);

        this.events();

    },

    events: function () {
        const _this = this;

        // 건물좌표 등록
        $('#btnPoint').on('click', function () {
            let url = '/building/pointPopup';
            window.open(url, '', '_blank');
        });

        // 건물좌표 직접 등록
        $('#btnDirect').on('click', function () {
            $('#inputDirect1').attr('style', '');
            $('#inputDirect2').attr('style', '');
            $('#inputDirect3').attr('style', '');
            $('#inputDirect4').attr('style', '');
            $('#stdPoint1').attr('type', 'text');
            $('#stdPoint2').attr('type', 'text');
            $('#areaPoint1').attr('type', 'text');
            $('#areaPoint2').attr('type', 'text');
        });

        // 주소 조회
        $('#btnAddr').on('click', function () {
            new daum.Postcode({
                oncomplete: function (data) {
                    // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
                    // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                    let roadAddr = data.roadAddress; // 도로명 주소 변수
                    //let jibunAddr = data.jibunAddress; // 지번 주소 변수

                    //$('#zipCode').val(data.zonecode);
                    if (roadAddr !== '') {
                        $('#addr1').val(roadAddr);
                    }
                    /*else if(jibunAddr !== ''){
                        $('#addr1').val(jibunAddr);
                    }*/
                }
            }).open();
        });

        // 층 정보 파일업로드 팝업
        $(document).on("click", "#btnFloorPopup", function() {
            if($('#stdPoint1').val() == '' || $('#stdPoint2').val() == '' ||
                $('#areaPoint1').val() == '' || $('#areaPoint2').val() == ''){
                alert('건물좌표를 입력해주세요');
                return false;
            }
            let list = $(this).data('num');
            let url = '/building/floorPopup?'+encodeURIComponent("list[0]")+"="+list;
            window.open(url, '', '_blank');
        });

        // 층 정보 파일업로드 팝업 일괄적용
        $('#btnFloorPopupChk').on('click', function () {
            if($('#stdPoint1').val() == '' || $('#stdPoint2').val() == '' ||
                $('#areaPoint1').val() == '' || $('#areaPoint2').val() == ''){
                alert('건물좌표를 입력해주세요');
                return false;
            }
            let list = '';
            if($(".floorChk:checked").length == 0){
                alert('층을 선택해주세요.');
                return false;
            }
            $(".floorChk:checked").each(function(i){
                if(i==0){
                    list = encodeURIComponent("list[0]")+"=" + $(this).val();
                }else{
                    list = list + "&" + encodeURIComponent("list["+i+"]")+"="+$(this).val();
                }
            });
            let url = '/building/floorPopup?'+list;
            window.open(url, '', '_blank');
        });

        // 건물좌표 등록
        $('#btnSave').on('click', function () {
            _buildingInfo.save();
        });

        // 목록
        $('#btnList').on('click', function () {
            location.href = '/building/list';
        });

    },

    floorClear: function () {
        $('#groundFloor').val(1);
        $('#baseFloor').val(0);
        $('#groundFloor').attr('disabled', false);
        $('#baseFloor').attr('disabled', false);
        $('#btnFloor').attr('disabled', false).attr('style', '');
    },

    save: function () {
        const _this = this;

        let formData = new FormData();

        formData.append('buildSeq', $('#buildSeq', _this.$contentForm).val());
        formData.append('stdPoint1', $('#stdPoint1', _this.$contentForm).val());
        formData.append('stdPoint2', $('#stdPoint2', _this.$contentForm).val());
        formData.append('areaPoint1', $('#areaPoint1', _this.$contentForm).val());
        formData.append('areaPoint2', $('#areaPoint2', _this.$contentForm).val());
        formData.append('buildName', $('#buildName', _this.$contentForm).val());
        formData.append('addr1', $('#addr1', _this.$contentForm).val());
        formData.append('addr2', $('#addr2', _this.$contentForm).val());

        let baseFloor = $('#baseFloor', _this.$contentForm).val();

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
            }else{
                formData.append("floorInfo["+i+"].filePath", $('#filePath'+a, _this.$contentForm).val());
            }
            let o = $("#dfopacity"+a, _this.$contentForm).val();
            let seq = $('#floorSeq'+a, _this.$contentForm).val();
            formData.append("floorInfo["+i+"].opacity", Number(o*100).toFixed(0));
            formData.append("floorInfo["+i+"].floorSeq", Number(seq));
            formData.append("floorInfo["+i+"].isUse", $('#sel'+a, _this.$contentForm).val());
            a++;
        }
        formData.append('searchInfo', $('#searchInfo', _this.$contentForm).val());
        formData.append('memo', $('#memo', _this.$contentForm).val());
        // FormData의 key 확인
        for (let key of formData.keys()) {
            console.log(key);
        }
        // FormData의 value 확인
        for (let value of formData.values()) {
            console.log(value);
        }
        $.ajax({
            type : "PUT",
            processData : false,
            contentType : false,
            url : "/building/update",
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
    _buildingInfo.init();
});

