let _pointPopup = {
    $scope      : null, // 영역

    init : function () {

        this.$scope      = $("#map");

        this.events();
    },

    events : function () {
        const _this = this;
        var popLocation = '';

        let map = L.map('map').setView([37.5,127.5],11);

        let osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
            attribution:'&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> Contributors'
        }).addTo(map);

        var editableLayers = new L.FeatureGroup();
        map.addLayer(editableLayers);

        var MyCustomMarker = L.Icon.extend({
            options: {
                shadowUrl: null,
                iconAnchor: new L.Point(12, 12),
                iconSize: new L.Point(24, 24),
                iconUrl: 'link/to/image.png'
            }
        });

        var options = {
            position: 'topright',
            draw: {
                polyline: false,
                polygon: false,
                circle: false, // Turns off this drawing tool
                rectangle: {
                    shapeOptions: {
                        clickable: false
                    }
                },
                marker: false,
                circlemarker: false
            },
            edit: {
                featureGroup: editableLayers, //REQUIRED!!
                remove: false
            }
        };

        var drawControl = new L.Control.Draw(options);
        map.addControl(drawControl);

        map.on(L.Draw.Event.CREATED, function (e) {
            var type = e.layerType,
                layer = e.layer;
            if(editableLayers && editableLayers.getLayers().length!==0){
                editableLayers.clearLayers();
            }
            if (type === 'marker') {
                layer.bindPopup('A popup!');
            }

            editableLayers.addLayer(layer);
            console.log(layer.getLatLngs());
        });
    }

};

// onload
$(document).ready(function() {
    _pointPopup.init();
});