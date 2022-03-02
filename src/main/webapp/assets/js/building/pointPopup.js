let _pointPopup = {
    $scope : null, // 영역

    init : function () {

        this.$scope = $("#map");

        this.events();
    },

    events : function () {
        const _this = this;

        let map = L.map('map').setView([37.5,127.5],11);

        let osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
            attribution:'&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> Contributors'
        }).addTo(map);
        /* rotation
        L.Edit.Rectangle.prototype.setOptions({ rotation: true, uniformScaling: false });
        */
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
        /*var polygon = new L.Polygon([
            [37.5,127.5],
            [37.502,127.502],
            [37.486,127.511]
        ], {
            color: '#f00',
            draggable: true,
            transform: true
        }).addTo(map);
        polygon.transform.enable({rotation: true, scaling: false});*/
        var x1 = '';
        var y1 = '';
        var x2 = '';
        var y2 = '';

        var rectangle;
        map.on(L.Draw.Event.CREATED, function (e) {
            var type = e.layerType,
                layer = e.layer;
            if(editableLayers && editableLayers.getLayers().length!==0){
                editableLayers.clearLayers();
            }
            /*if (type === 'rectangle') {
                layer.bindPopup('A popup!');
            }*/
            rectangle = layer;
            editableLayers.addLayer(layer);

        });

        // 건물좌표 등록
        $('#btnSave').on('click', function(){

            var arr = rectangle.getLatLngs();
            x1 = arr[0][1].lat;
            y1 = arr[0][1].lng;
            x2 = arr[0][3].lat;
            y2 = arr[0][3].lng;

            $("#stdPoint", opener.document).val(x1+' / '+y1);
            $("#areaPoint", opener.document).val(x2+' / '+y2);
            $("#stdPoint1", opener.document).val(x1);
            $("#stdPoint2", opener.document).val(y1);
            $("#areaPoint1", opener.document).val(x2);
            $("#areaPoint2", opener.document).val(y2);
            window.close();
        });
    }
};

// onload
$(document).ready(function() {
    _pointPopup.init();
});