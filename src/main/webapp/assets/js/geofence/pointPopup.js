let _pointPopup = {
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
        var typeCd = $("#typeCd", opener.document).val();
        var radius = $("#radius", opener.document).val();

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
                polygon: true,
                circle: {
                    metric: false,
                    feet: false
                }, // Turns off this drawing tool
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

        var imageUrl = $("#imagePath").val();

        var imageBounds = [
            [x_1, y_1],
            [x_2, y_2]
        ];
        L.imageOverlay(imageUrl, imageBounds).addTo(map);

        L.marker([setPointX, setPointY]).addTo(map);

        var rectangle;
        var circle;
        var polygon;
        if(typeCd == 'FIG00010'){ //사각형
            let latlngs = [[$("#x1", opener.document).val(), $("#y1", opener.document).val()]
                , [$("#x3", opener.document).val(), $("#y3", opener.document).val()]];
            rectangle = L.rectangle(latlngs).addTo(map);
        }else if(typeCd == 'FIG00020'){ //원
            let circleCenter = [$("#x0", opener.document).val(), $("#y0", opener.document).val()];
            circle = L.circle(circleCenter, {radius: radius}).addTo(map);
        }else if(typeCd == 'FIG00030'){ //폴리곤
            let size = $("input[name=xy]", opener.document).length/2;
            let latlngs = [];
            for(let i=0; i<size; i++){
                latlngs.push([$('#x'+i, opener.document).val(),$('#y'+i, opener.document).val()]);
            }
            polygon = L.polygon(latlngs).addTo(map);
        }

        var type;
        var object;
        map.on(L.Draw.Event.CREATED, function (e) {
            if(typeCd == 'FIG00010'){
                rectangle.remove();
            }else if(typeCd == 'FIG00020'){
                circle.remove();
            }else if(typeCd == 'FIG00030'){
                polygon.remove();
            }
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
            $("#pointArr", opener.document).empty();
            $("#radius", opener.document).val('');
            $("#typeName", opener.document).val('');
            $("#typeCd", opener.document).val('');
            if (type === 'rectangle') {
                let arr = object.getLatLngs();
                for(let i=0; i<arr[0].length; i++){
                    let x1 = arr[0][i].lat;
                    let y1 = arr[0][i].lng;
                    $("#pointArr", opener.document).append(
                        $('<input>').attr('type', 'hidden').attr('id', 'x'+i).attr('value', x1).attr('name', 'xy')
                    )
                    $("#pointArr", opener.document).append(
                        $('<input>').attr('type', 'hidden').attr('id', 'y'+i).attr('value', y1).attr('name', 'xy')
                    )
                }
                $("#typeName", opener.document).val('사각형');
                $("#typeCd", opener.document).val('FIG00010');
            }else if(type === 'circle'){
                let arr = object.getLatLng();
                let radius = object.getRadius();
                let x1 = arr.lat;
                let y1 = arr.lng;
                $("#pointArr", opener.document).append(
                    $('<input>').attr('type', 'hidden').attr('id', 'x0').attr('value', x1).attr('name', 'xy')
                )
                $("#pointArr", opener.document).append(
                    $('<input>').attr('type', 'hidden').attr('id', 'y0').attr('value', y1).attr('name', 'xy')
                )
                $("#radius", opener.document).val(radius);
                $("#typeName", opener.document).val('원');
                $("#typeCd", opener.document).val('FIG00020');
            }else if(type === 'polygon'){
                let arr = object.getLatLngs();
                for(let i=0; i<arr[0].length; i++){
                    let x1 = arr[0][i].lat;
                    let y1 = arr[0][i].lng;
                    $("#pointArr", opener.document).append(
                        $('<input>').attr('type', 'hidden').attr('id', 'x'+i).attr('value', x1).attr('name', 'xy')
                    )
                    $("#pointArr", opener.document).append(
                        $('<input>').attr('type', 'hidden').attr('id', 'y'+i).attr('value', y1).attr('name', 'xy')
                    )
                }
                $("#typeName", opener.document).val('폴리곤');
                $("#typeCd", opener.document).val('FIG00030');
            }
            window.close();
        });
    }
};

// onload
$(document).ready(function() {
    _pointPopup.init();
});