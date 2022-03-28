let _setPointPopup = {
    $scope : null, // 영역

    init : function () {

        this.$scope = $("#map");

        this.events();
    },

    events : function () {
        const _this = this;

        var x_1 = $("#stdPoint1", opener.document).val();
        var y_1 = $("#stdPoint2", opener.document).val();
        var x_2 = $("#areaPoint1", opener.document).val();
        var y_2 = $("#areaPoint2", opener.document).val();

        var setPointX = $("#setPointX", opener.document).val();
        var setPointY = $("#setPointY", opener.document).val();

        let map = L.map('map').setView([x_1,y_1],15);

        let osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
            attribution:'&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> Contributors'
        }).addTo(map);

        var editableLayers = new L.FeatureGroup();
        map.addLayer(editableLayers);

        var options = {
            position: 'topright',
            draw: {
                polyline: false,
                polygon: false,
                circle: false, // Turns off this drawing tool
                rectangle: false,
                marker: true,
                circlemarker: false
            },
            edit: {
                featureGroup: editableLayers, //REQUIRED!!
                remove: false
            }
        };

        var drawControl = new L.Control.Draw(options);
        map.addControl(drawControl);

        var imageUrl = $("#imagePath").val();

        var imageBounds = [
            [x_1, y_1],
            [x_2, y_2]
        ];
        L.imageOverlay(imageUrl, imageBounds).addTo(map);

        var marker = L.marker([setPointX, setPointY]).addTo(map);

        var type;
        var object;
        map.on(L.Draw.Event.CREATED, function (e) {
            marker.remove();
            type = e.layerType,
                layer = e.layer;
            if(editableLayers && editableLayers.getLayers().length!==0){
                editableLayers.clearLayers();
            }
            object = layer;
            editableLayers.addLayer(layer);

        });

        // geofence좌표 등록
        $('#btnSave').on('click', function(){
            let arr = object.getLatLng();
            let x1 = arr.lat;
            let y1 = arr.lng;
            $("#setPointX", opener.document).val(x1);
            $("#setPointY", opener.document).val(y1);
            window.close();
        });
    }
};

// onload
$(document).ready(function() {
    _setPointPopup.init();
});