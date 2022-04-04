let _monitoringGeofence = {
    $scope : null, // 영역
    $searchTab : null,
    $geofenceTab : null,
    $tableList : null,
    $floorInfo : null,
    $floorInfoList : null,
    $geofenceList : null,
    $trigger : null,
    $image : null,
    $markers : [],
    $markersB : [],
    $imageUrl : null,
    $map : null,
    $x_1 : null,
    $y_1 : null,
    $x_2 : null,
    $y_2 : null,
    $f : null,
    $o : null,
    $b : null,
    $geofenceAreaObject : [],

    init : function () {

        this.$scope = $("#map");
        this.$searchTab = $("#searchTab");
        this.$geofenceTab = $("#geofenceTab");
        this.$tableList = $('#searchListTable', this.$searchTab);
        this.$floorInfo = $("#floorInfo");
        this.$floorInfoList = $('#floorInfoList', this.$floorInfo);
        this.$geofenceList = $('#geofenceListTable', this.$geofenceTab);

        this.events();
    },

    events : function () {
        const _this = this;

        _monitoringGeofence.$map = L.map('map').setView([37.5,127.5],11);

        let osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
            attribution:'&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> Contributors'
            , maxZoom:19
        }).addTo(_monitoringGeofence.$map);

        var editableLayers = new L.FeatureGroup();
        _monitoringGeofence.$map.addLayer(editableLayers);

        _monitoringGeofence.$map.zoomControl.remove();

        L.control.zoom({
            position: 'bottomright'
        }).addTo(_monitoringGeofence.$map);

        //건물검색결과 클릭
        $(document).on("click", ".building", function() {
            let i = $(this).attr('data-seq');
            _monitoringGeofence.$x_1 = $("#"+i+'-stdPoint1').val();
            _monitoringGeofence.$y_1 = $("#"+i+'-stdPoint2').val();
            _monitoringGeofence.$x_2 = $("#"+i+'-areaPoint1').val();
            _monitoringGeofence.$y_2 = $("#"+i+'-areaPoint2').val();
            _monitoringGeofence.$map.setView(new L.LatLng(_monitoringGeofence.$x_1, _monitoringGeofence.$y_1), 17);

            _monitoringGeofence.searchFloorInfo(i);
            $("#geofenceTab").show();
        });

        //층 클릭
        $(document).on("click", ".btnFloor", function() {
            _monitoringGeofence.$f = $(this).attr('data-f');
            _monitoringGeofence.$o = $(this).attr('data-o');
            _monitoringGeofence.clickFloor(_monitoringGeofence.$f, _monitoringGeofence.$o);
            _monitoringGeofence.$trigger = 'f';
        });

        // 닫기
        $('#geofenceTabClose').on('click', function(){
            $("#geofenceTab").attr('style', 'display:none;');
            _this.$floorInfoList.empty();
            _this.$geofenceList.empty();
        });

        // 검색
        $('#btnSearch').on('click', function(){
            _monitoringGeofence.searchBuilding(1);
            $("#geofenceTab").attr('style', 'display:none;');
            _this.$floorInfoList.empty();
            _this.$geofenceList.empty();
        });

        // 지도내검색
        $('#btnSearchArea').on('click', function(){
            _monitoringGeofence.searchBuildingArea(1);
            $("#geofenceTab").attr('style', 'display:none;');
            _this.$floorInfoList.empty();
            _this.$geofenceList.empty();
        });

        // geofence 상세페이지 이동
        $(document).on("click", "#btnGeofenceInfo", function() {
            let seq = $('#btnGeofenceInfo').attr('data-seq');
            location.href = '/geofence/geofenceInfo/'+seq;
        });

    },

    searchBuilding : function(page) {
        const _this = this;
        var param = {
            buildName : $('#searchText').val(),
            pageNum: page
        };
        $.ajax({
            type : "GET",
            url : "/building/search",
            data : param,
            success : function(res){
                _this.dataBindBuilding(res.result);
                pagination(res.result, '', '_monitoringGeofence.searchBuilding');
            },
            error : function(XMLHttpRequest, textStatus, errorThrown){

            }
        });

    },

    searchBuildingArea : function(page) {
        const _this = this;
        let x1;
        let x2;
        let y1;
        let y2;
        x1 = _monitoringGeofence.$map.getBounds()._southWest.lat;
        y1 = _monitoringGeofence.$map.getBounds()._southWest.lng;
        x2 = _monitoringGeofence.$map.getBounds()._northEast.lat;
        y2 = _monitoringGeofence.$map.getBounds()._northEast.lng;
        var param = {
            buildName : $('#searchText').val(),
            pageNum: page,
            x1 : x1,
            y1 : y1,
            x2 : x2,
            y2 : y2
        };
        $.ajax({
            type : "GET",
            url : "/building/search",
            data : param,
            success : function(res){
                _this.dataBindBuilding(res.result);
                pagination(res.result, '', '_monitoringGeofence.searchBuildingArea');
            },
            error : function(XMLHttpRequest, textStatus, errorThrown){

            }
        });

    },

    dataBindBuilding : function(result) {
        const _this = this;
        if(_monitoringGeofence.$map.hasLayer(_monitoringGeofence.$image)){
            _monitoringGeofence.$map.removeLayer(_monitoringGeofence.$image);
        }
        if (_monitoringGeofence.$geofenceAreaObject != undefined) {
            for(let i=0; i<_monitoringGeofence.$geofenceAreaObject.length; i++){
                _monitoringGeofence.$map.removeLayer(_monitoringGeofence.$geofenceAreaObject[i]);
            }
        };
        _this.$tableList.find('tbody').empty();
        if (result.list.length > 0) {
            if (_monitoringGeofence.$markers != undefined) {
                for(let i=0; i<_monitoringGeofence.$markers.length; i++){
                    _monitoringGeofence.$map.removeLayer(_monitoringGeofence.$markers[i]);
                }
            };
            _monitoringGeofence.$markers = [];
            $.each(result.list, function (i, val) {
                _this.$tableList.append(
                    $('<tr/>').append(
                        $('<td/>').text(val.buildName).attr('class', 'building').attr('data-seq', val.buildSeq).append(
                            $('<input>').attr('type', 'hidden').attr('id',val.buildSeq+'-stdPoint1').val(val.stdPoint1)
                        ).append(
                            $('<input>').attr('type', 'hidden').attr('id',val.buildSeq+'-stdPoint2').val(val.stdPoint2)
                        ).append(
                            $('<input>').attr('type', 'hidden').attr('id',val.buildSeq+'-areaPoint1').val(val.areaPoint1)
                        ).append(
                            $('<input>').attr('type', 'hidden').attr('id',val.buildSeq+'-areaPoint2').val(val.areaPoint2)
                        )
                    )
                )
                var x_1 = val.stdPoint1;
                var y_1 = val.stdPoint2;
                var x_2 = val.areaPoint1;
                var y_2 = val.areaPoint2;
                let x = Number(x_1) - ((Number(x_1) - Number(x_2)) / 2);
                let y = Number(y_1) + ((Number(y_2) - Number(y_1)) / 2);
                var latlng = L.latLng(x, y);
                /*L.marker(latlng, {
                    icon: icon
                }).addTo(_this2.$map);*/
                var markerClick = L.marker(latlng).addTo(_monitoringGeofence.$map);
                markerClick.on('click', function (e) {
                    _monitoringGeofence.markerOnClick(val.buildSeq)
                });
                _monitoringGeofence.$markers.push(markerClick);
            });
        } else {
            if (_monitoringGeofence.$markers != undefined) {
                for(let i=0; i<_monitoringGeofence.$markers.length; i++){
                    _monitoringGeofence.$map.removeLayer(_monitoringGeofence.$markers[i]);
                }
            };
            _monitoringGeofence.$markers = [];
            _this.$tableList.append(
                $('<tr/>').append($('<td/>').attr({colspan : 1}).text('검색결과가 없습니다.'))
            );
        }
    },

    searchFloorInfo : function(seq) {
        const _this = this;
        var param = {
            buildSeq : seq
        };
        $.ajax({
            type : "GET",
            url : "/building/search/floorInfo",
            data : param,
            success : function(res){
                _this.dataBindFloorInfo(res.result);
            },
            error : function(XMLHttpRequest, textStatus, errorThrown){

            }
        });

    },

    dataBindFloorInfo : function(result) {
        const _this = this;
        _this.$geofenceList.empty();
        _this.$floorInfoList.empty();
        if (result.length > 0) {
            $.each(result, function (i, val) {
                if(val.floor < 0){
                    _this.$floorInfoList.append(
                        $('<li/>').append(
                            $('<button/>').text('B'+(val.floor*-1)).attr('class', 'btnFloor').attr('data-f', val.floorSeq).attr('data-o', val.opacity)
                        ).append(
                            $('<input>').attr('id', 'F'+val.floorSeq).attr('type', 'hidden').val(val.filePath)
                        )
                    );
                }else{
                    _this.$floorInfoList.append(
                        $('<li/>').append(
                            $('<button/>').text(val.floor).attr('class', 'btnFloor').attr('data-f', val.floorSeq).attr('data-o', val.opacity)
                        ).append(
                            $('<input>').attr('id', 'F'+val.floorSeq).attr('type', 'hidden').val(val.filePath)
                        )
                    );
                }

            });
        } else {
            _this.$floorInfoList.append(

            );
            alert('층 정보가 없습니다.');
        }
    },

    //geofence list databind
    dataBindGeofenceList : function(result) {
        const _this = this;
        _this.$geofenceList.empty();
        if (result.length > 0) {
            $.each(result, function (i, val) {
                if(val.floor > 0){
                    _this.$geofenceList.append(
                        $('<tr/>').attr('onclick', '_monitoringGeofence.clickGeofence('+val.setPointX+','+val.setPointY+',"'+val.typeCd+'",'+val.geofenceSeq+')').append(
                            $('<td/>').text(val.floor)
                        ).append(
                            $('<td/>').text(val.geoName)
                        ).append(
                            $('<td/>').append(
                                $('<a/>').attr('href', '/geofence/geofenceInfo/'+val.geofenceSeq).text('수정')
                            )
                        )
                    )
                }else{
                    _this.$geofenceList.append(
                        $('<tr/>').attr('onclick', '_monitoringGeofence.clickGeofence('+val.setPointX+','+val.setPointY+',"'+val.typeCd+'",'+val.geofenceSeq+')').append(
                            $('<td/>').text('지하 '+(val.floor*-1))
                        ).append(
                            $('<td/>').text(val.geoName)
                        ).append(
                            $('<td/>').append(
                                $('<a/>').attr('href', '/geofence/geofenceInfo/'+val.geofenceSeq).text('수정')
                            )
                        )
                    )
                }
            });
            $.each(result, function (i, val) {
                for(let j=0; j<val.pointList.length; j++){
                    _this.$geofenceList.append(
                        $('<input>').attr('type', 'hidden').attr('id', 'g'+val.geofenceSeq+'x'+j).attr('value', val.pointList[j].pointX).attr('name', 'xy'+val.geofenceSeq)
                    ).append(
                        $('<input>').attr('type', 'hidden').attr('id', 'g'+val.geofenceSeq+'y'+j).attr('value', val.pointList[j].pointY).attr('name', 'xy'+val.geofenceSeq)
                    )
                }
                _this.$geofenceList.append(
                    $('<input>').attr('type', 'hidden').attr('id', 'g'+val.geofenceSeq+'radius').attr('value', val.radius)
                )
            });
        } else {
            _this.$geofenceList.append(
                $('<tr/>').append($('<td/>').attr({colspan : 3}).text('검색결과가 없습니다.'))
            );
        }
    },

    //층 클릭
    clickFloor : function(f, o) {
        if(_monitoringGeofence.$map.hasLayer(_monitoringGeofence.$image)){
            _monitoringGeofence.$map.removeLayer(_monitoringGeofence.$image);
        }
        _monitoringGeofence.$imageUrl = $('#F'+f).val();
        //_monitoringGeofence.$imageUrl = 'https://www.codingfactory.net/wp-content/uploads/abc.jpg';
        var imageBounds = [
            [_monitoringGeofence.$x_1, _monitoringGeofence.$y_1],
            [_monitoringGeofence.$x_2, _monitoringGeofence.$y_2]
        ];
        _monitoringGeofence.$image = L.imageOverlay(_monitoringGeofence.$imageUrl, imageBounds, {opacity: o*0.01}).addTo(_monitoringGeofence.$map);

        let param = {
            floorSeq: f
        };
        $.ajax({
            type : "GET",
            url : "/geofence/search/floor",
            data : param,
            success : function(res){
                _monitoringGeofence.dataBindGeofenceList(res.result);
                //geofence정보 클리어
                if (_monitoringGeofence.$markers != undefined) {
                    for(let i=0; i<_monitoringGeofence.$markers.length; i++){
                        _monitoringGeofence.$map.removeLayer(_monitoringGeofence.$markers[i]);
                    }
                };
                if (_monitoringGeofence.$geofenceAreaObject != undefined) {
                    for(let i=0; i<_monitoringGeofence.$geofenceAreaObject.length; i++){
                        _monitoringGeofence.$map.removeLayer(_monitoringGeofence.$geofenceAreaObject[i]);
                    }
                };
                _monitoringGeofence.$markers = [];
                _monitoringGeofence.$markersB = [];
                _monitoringGeofence.$geofenceAreaObject = [];

                if (res.result.length > 0) {
                    $.each(res.result, function (i, val) {
                        let x1 = val.setPointX;
                        let y1 = val.setPointY;
                        let leafletId;
                        if(val.pointList != null){
                            if(val.typeCd == 'FIG00010'){ //사각형
                                let latlngs = [[val.pointList[1].pointX, val.pointList[1].pointY]
                                    , [val.pointList[3].pointX, val.pointList[3].pointY]];
                                let rectangle = L.rectangle(latlngs).addTo(_monitoringGeofence.$map);
                                leafletId = rectangle._leaflet_id;
                                _monitoringGeofence.$geofenceAreaObject.push(rectangle);
                            }else if(val.typeCd == 'FIG00020'){ //원
                                let circleCenter = [val.pointList[0].pointX, val.pointList[0].pointY];
                                let circle = L.circle(circleCenter, {radius: val.radius}).addTo(_monitoringGeofence.$map);
                                leafletId = circle._leaflet_id;
                                _monitoringGeofence.$geofenceAreaObject.push(circle);
                            }else if(val.typeCd == 'FIG00030'){ //폴리곤
                                let size = val.pointList.length;
                                let latlngs = [];
                                for(let i=0; i<size; i++){
                                    latlngs.push([val.pointList[i].pointX, val.pointList[i].pointY]);
                                }
                                let polygon = L.polygon(latlngs).addTo(_monitoringGeofence.$map);
                                leafletId = polygon._leaflet_id;
                                _monitoringGeofence.$geofenceAreaObject.push(polygon);
                            }
                        }
                        if(x1 != null && y1 != null){
                            var latlng = L.latLng(x1, y1);
                            var geofenceMarkerClick = L.marker(latlng).addTo(_monitoringGeofence.$map);
                            geofenceMarkerClick.bindPopup("<button id='btnGeofenceInfo' data-seq="+val.geofenceSeq+">수정</button>");
                            geofenceMarkerClick.on('click', function (e) {
                                _monitoringGeofence.geofenceMarkerClick(leafletId)
                            });
                            _monitoringGeofence.$markers.push(geofenceMarkerClick);
                        }
                    });
                } else {
                    alert('등록된 지오팬스가 없습니다.');
                    _monitoringGeofence.$trigger = '';
                }
            },
            error : function(XMLHttpRequest, textStatus, errorThrown){

            }
        });
    },

    //지오팬스 클릭
    clickGeofence : function(point1, point2, typeCd, geofenceSeq) {
        _monitoringGeofence.$map.setView(new L.LatLng(point1, point2), 18);
        if (_monitoringGeofence.$markers != undefined) {
            for(let i=0; i<_monitoringGeofence.$markers.length; i++){
                _monitoringGeofence.$map.removeLayer(_monitoringGeofence.$markers[i]);
            }
        };
        if (_monitoringGeofence.$geofenceAreaObject != undefined) {
            for(let i=0; i<_monitoringGeofence.$geofenceAreaObject.length; i++){
                _monitoringGeofence.$map.removeLayer(_monitoringGeofence.$geofenceAreaObject[i]);
            }
        };
        _monitoringGeofence.$markers = [];
        _monitoringGeofence.$geofenceAreaObject = [];
        let leafletId;
        if(typeCd == 'FIG00010'){ //사각형
            let latlngs = [[$('#g'+geofenceSeq+'x1').val(), $('#g'+geofenceSeq+'y1').val()]
                , [$('#g'+geofenceSeq+'x3').val(), $('#g'+geofenceSeq+'y3').val()]];
            let rectangle = L.rectangle(latlngs).addTo(_monitoringGeofence.$map);
            leafletId = rectangle._leaflet_id;
            _monitoringGeofence.$geofenceAreaObject.push(rectangle);
        }else if(typeCd == 'FIG00020'){ //원
            let circleCenter = [$('#g'+geofenceSeq+'x0').val(), $('#g'+geofenceSeq+'y0').val()];
            let circle = L.circle(circleCenter, {radius: $('#g'+geofenceSeq+'radius').val()}).addTo(_monitoringGeofence.$map);
            leafletId = circle._leaflet_id;
            _monitoringGeofence.$geofenceAreaObject.push(circle);
        }else if(typeCd == 'FIG00030'){ //폴리곤
            let size = $("input[name=xy"+geofenceSeq+"]").length/2;
            let latlngs = [];
            for(let i=0; i<size; i++){
                latlngs.push([$('#g'+geofenceSeq+'x'+i).val(), $('#g'+geofenceSeq+'y'+i).val()]);
            }
            let polygon = L.polygon(latlngs).addTo(_monitoringGeofence.$map);
            leafletId = polygon._leaflet_id;
            _monitoringGeofence.$geofenceAreaObject.push(polygon);
        }

        if(point1 != null && point2 != null){
            var latlng = L.latLng(point1, point2);
            var geofenceMarkerClick = L.marker(latlng).addTo(_monitoringGeofence.$map);
            geofenceMarkerClick.bindPopup("<button id='btnGeofenceInfo' data-seq="+geofenceSeq+">수정</button>");
            geofenceMarkerClick.on('click', function (e) {
                _monitoringGeofence.geofenceMarkerClick(leafletId)
            });
            _monitoringGeofence.$markers.push(geofenceMarkerClick);
        }
    },

    //건물조회 후 marker click
    markerOnClick : function (buildSeq) {
        let i = buildSeq;
        _monitoringGeofence.$x_1 = $("#"+i+'-stdPoint1').val();
        _monitoringGeofence.$y_1 = $("#"+i+'-stdPoint2').val();
        _monitoringGeofence.$x_2 = $("#"+i+'-areaPoint1').val();
        _monitoringGeofence.$y_2 = $("#"+i+'-areaPoint2').val();
        _monitoringGeofence.$map.setView(new L.LatLng(_monitoringGeofence.$x_1, _monitoringGeofence.$y_1), 17);

        _monitoringGeofence.searchFloorInfo(i);
        $("#geofenceTab").show();;
    },

    geofenceMarkerClick : function (leafletId) {
        for(let i=0; i<_monitoringGeofence.$geofenceAreaObject.length; i++){
            if(_monitoringGeofence.$geofenceAreaObject[i]._leaflet_id == leafletId) {
                _monitoringGeofence.$geofenceAreaObject[i].setStyle({
                   color: 'red'
                });
            }else{
                _monitoringGeofence.$geofenceAreaObject[i].setStyle({
                    color: '#3388ff'
                });
            }
        }
    }

};

// onload
$(document).ready(function() {
    _monitoringGeofence.init();
});