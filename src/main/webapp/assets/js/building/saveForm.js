let _building = {
    $scope      : null, // 영역
    $contentForm : null, // content form

    init : function () {

        this.$scope      = $("#buildingArea");
        this.$contentForm = $('#buildingForm', this.$scope);

        this.events();
    },

    events : function () {
        const _this = this;

        // 층 정보 등록
        $('#btnPoint').on('click', function(){
            let url = '/building/pointPopup';
            window.open(url, '_blank');
        });

        // 층 정보 등록
        $('#btnFloor').on('click', function(){
            if($('#groundFloor').val() == '' || $('#baseFloor').val() == ''){
                alert('층 정보를 입력해주세요.');
            }
        });

    },



};

// onload
$(document).ready(function() {
    _building.init();
});