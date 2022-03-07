var _building = {
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
        _this.floorClear();

        // 건물좌표 등록
        $('#btnPoint').on('click', function () {
            let url = '/building/pointPopup';
            window.open(url, '', '_blank');
        });

        // 건물좌표 직접 등록
        $('#btnDirect').on('click', function () {
            $('#inputDirect').attr('style', '');
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

        // 층 정보 등록
        $('#btnFloor').on('click', function () {
            let ground = $('#groundFloor').val();
            let base = $('#baseFloor').val();
            if (ground == '' || base == '') {
                alert('층 정보를 입력해주세요.');
                return false;
            }
            if (ground < 1) {
                $('#groundFloor').val(1);
                return false;
            }
            if (base < 0) {
                $('#baseFloor').val(0);
                return false;
            }

            _this.$tableList.find('tbody').empty();
            for(let i=ground; i>base*-1; i--){
                if(i <= 0){
                    _this.$tableList.append(
                        $('<tr/>').append(
                            $('<td/>').append(
                                $('<input>').attr('type', 'checkbox').attr('name', 'chk').attr('class', 'floorChk').val(Number((i-1)))
                            )
                        ).append(
                            $('<td/>').text('지하'+Number((i-1)*-1))
                        ).append(
                            $('<td/>').append(
                                $('<div>').attr('id', 'df'+Number((i-1))).append(
                                    $('<span/>').text('파일을 등록해주세요.')
                                )
                            )
                        ).append(
                            $('<td/>').append(
                                $('<input>').attr('id', 'dfopacity'+Number((i-1))).attr('type', 'num').val(1)
                            )
                        ).append(
                            $('<td/>').append(
                                $('<button/>').text('등록').attr('type', 'button').attr('id', 'btnFloorPopup')
                                .attr('data-num', Number((i-1)))
                            )
                        )
                    )
                }else{
                    _this.$tableList.append(
                        $('<tr/>').append(
                            $('<td/>').append(
                                $('<input>').attr('type', 'checkbox').attr('name', 'chk').attr('class', 'floorChk').val(i)
                            )
                        ).append(
                            $('<td/>').text(i)
                        ).append(
                            $('<td/>').append(
                                $('<div>').attr('id', 'df'+i).append(
                                    $('<span/>').text('파일을 등록해주세요.')
                                )
                            )
                        ).append(
                            $('<td/>').append(
                                $('<input>').attr('id', 'dfopacity'+i).attr('type', 'num').val(1)
                            )
                        ).append(
                            $('<td/>').append(
                                $('<button/>').text('등록').attr('type', 'button').attr('id', 'btnFloorPopup')
                                    .attr('data-num', i)
                            )
                        )
                    )
                }
            }

            $('#groundFloor').attr('disabled', true);
            $('#baseFloor').attr('disabled', true);
            $('#btnFloor').attr('disabled', true).attr('style', 'background: #f6f7f7;');

        });

        // 층 정보 초기화
        $('#btnFloorClear').on('click', function () {
            _this.floorClear();
            _this.$tableList.find('tbody').empty();
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
            _building.save();
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
    _building.init();
});

