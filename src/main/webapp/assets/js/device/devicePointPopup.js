let _pointPopup = {
    $scope      : null, // 영역

    init : function () {

        this.$scope      = $("#map");

        this.events();
    },

    events : function () {
        const _this = this;

        var x_1 = $("#stdPoint1", opener.document).val();
        var y_1 = $("#stdPoint2", opener.document).val();
        var x_2 = $("#areaPoint1", opener.document).val();
        var y_2 = $("#areaPoint2", opener.document).val();

        let map = L.map('map').setView([x_1, y_1],15);

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
                marker: true,
                circlemarker: false,
            },
            edit: {
                featureGroup: editableLayers, //REQUIRED!!
                remove: false,
                edit: false,
            }
        };

        var drawControl = new L.Control.Draw(options);
        map.addControl(drawControl);

        // TODO : BANG 임시 이미지 주소
        // var imageUrl = "C:\\upload\\images\\building\\sample_2.jpg";
        // var imageUrl = "file:///C:/upload/images/building/sample_2.jpg";
        // var imageUrl = "D:\\test\\image\\sample_2.jpg";
        var imageUrl = "https://shop-phinf.pstatic.net/20210915_17/1631709921614RtBYz_PNG/%C3%CA%C4%DA%B3%D7_%B0%A1%B0%D4_%B8%DE%C0%CEPC.png?type=w345";
        // var imageUrl = $("#imagePath").val();

        var imageBounds = [
            [x_1, y_1],
            [x_2, y_2]
        ];
        L.imageOverlay(imageUrl, imageBounds).addTo(map);

        var x1 = '';
        var y1 = '';

        map.on(L.Draw.Event.CREATED, function (e) {
            var type = e.layerType,
                layer = e.layer;
            if(editableLayers && editableLayers.getLayers().length!==0){
                editableLayers.clearLayers();
            }
            /*if (type === 'rectangle') {
                layer.bindPopup('A popup!');
            }*/

            editableLayers.addLayer(layer);
            x1 = layer.getLatLng().lat;
            y1 = layer.getLatLng().lng;
        });

        // 건물좌표 등록
        $('#btnSave').on('click', function(){
            if (x1 == '' || y1 == '') {
                alert("자산 마커를 선택하지 않았습니다.\n" +
                    "미 선택 시 좌표는 자동으로 입력 되지 않습니다.");
            }
            $("#point1", opener.document).val(x1);
            $("#point2", opener.document).val(y1);
            window.close();
        });
    }
};

// onload
$(document).ready(function() {
    _pointPopup.init();
});