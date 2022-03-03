var _floorPopup = {
    $scope : null, // 영역
    $image : null,

    init : function () {

        this.$scope = $("#floorPopupArea");

        this.events();
    },

    events : function () {
        const _this = this;

        var x_1 = $("#stdPoint1", opener.document).val();
        var y_1 = $("#stdPoint2", opener.document).val();
        var x_2 = $("#areaPoint1", opener.document).val();
        var y_2 = $("#areaPoint2", opener.document).val();
        let x = Number(x_1) - ((Number(x_1) - Number(x_2)) / 2);
        let y = Number(y_1) + ((Number(y_2) - Number(y_1)) / 2);
        let map = L.map('map').setView([x,y], 17);

        let osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
            attribution:'&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> Contributors'
        }).addTo(map);

        var editableLayers = new L.FeatureGroup();
        map.addLayer(editableLayers);

        /*var MyCustomMarker = L.Icon.extend({
            options: {
                shadowUrl: null,
                iconAnchor: new L.Point(12, 12),
                iconSize: new L.Point(24, 24),
                iconUrl: 'link/to/image.png'
            }
        });*/

        var options = {
            position: 'topright',
            draw: {
                polyline: false,
                polygon: false,
                circle: false, // Turns off this drawing tool
                rectangle: false,
                marker: false,
                circlemarker: false
            },
            edit: false
        };

        var drawControl = new L.Control.Draw(options);
        map.addControl(drawControl);

        // 파일 미리보기
        $("[name=floorFile]").on("change", function(e){
            var reader = new FileReader();
            reader.onload = function(e) {
                var image_data = e.target.result;

                var imageUrl = image_data;
                var imageBounds = [
                    [x_1, y_1],
                    [x_2, y_2]
                ];
                $image = L.imageOverlay(imageUrl, imageBounds, {opacity: $("#opacity").val()}).addTo(map);

            }
            if(this.files[0] == null){

            }else{
                reader.readAsDataURL(this.files[0]);
            }
        });

        // 도면 등록
        $('#btnSave').on('click', function(){
            let num = $('#num').val();
            let text = $('#floorFile').val().split("\\").pop();
            let opacity = $('#opacity').val();
            $(opener.document).find('#df'+num).empty();
            $(opener.document).find('#df'+num)
                .append(
                    $('<span/>').text(text)
                ).append(
                $('<div/>').attr('id','dfdiv'+num).attr('style', 'display:none;')
                    .append(
                        $('#floorFile').attr('id', 'dfinput'+num)
                    )
                );
            $(opener.document).find('#dfopacity'+num).val(opacity);
            window.close();
        });
    },

    updateOpacity : function (value) {
        $image.setOpacity(value);
    }
};

// onload
$(document).ready(function() {
    _floorPopup.init();
});