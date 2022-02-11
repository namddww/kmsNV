let _floorPopup = {
    $scope      : null, // 영역

    init : function () {

        this.$scope      = $("#floorPopupArea");

        this.events();
    },

    events : function () {
        const _this = this;

        var x_1 = $("#stdPoint1", opener.document).val();
        var y_1 = $("#stdPoint2", opener.document).val();
        var x_2 = $("#areaPoint1", opener.document).val();
        var y_2 = $("#areaPoint2", opener.document).val();

        let map = L.map('map').setView([x_1,y_1],15);

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
                L.imageOverlay(imageUrl, imageBounds).addTo(map);

            }
            if(this.files[0] == null){

            }else{
                reader.readAsDataURL(this.files[0]);
            }

        });
    }
};

// onload
$(document).ready(function() {
    _floorPopup.init();
});