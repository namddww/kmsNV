let _building = {
    $scope: null, // 영역
    $contentForm: null, // content form
    $tableList  : null, // content form

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
            window.open(url, '_blank');
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
            if (base > 0) {
                $('#baseFloor').val(0);
                return false;
            }

            _this.$tableList.find('tbody').empty();
            for(let i=ground; i>base; i--){
                if(i <= 0){
                    _this.$tableList.append(
                        $('<tr/>').append(
                            $('<td/>').text('지하'+Number((i-1)*-1))
                        ).append(
                            $('<td/>').text('')
                        ).append(
                            $('<button/>').text('등록').attr('type', 'button').attr('id', 'btnFloorPopup')
                        )
                    )
                }else{
                    _this.$tableList.append(
                        $('<tr/>').append(
                            $('<td/>').text(i)
                        ).append(
                            $('<td/>').text('')
                        ).append(
                            $('<button/>').text('등록').attr('type', 'button').attr('id', 'btnFloorPopup')
                        )
                    )
                }
            }

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
            let url = '/building/floorPopup';
            window.open(url, '_blank');
        });
    },

    floorClear: function () {
        $('#groundFloor').val(1);
        $('#baseFloor').val(0);
    }

};

// onload
$(document).ready(function() {
    _building.init();
});