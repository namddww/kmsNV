let _monitoringDevice = {
    $scope : null, // 영역
    $searchTab : null,
    $deviceTab : null,
    $tableList : null,
    $floorInfo : null,
    $floorInfoList : null,
    $deviceList : null,
    $trigger : null,
    $image : null,
    $rect : null,
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

    init : function () {

        this.$scope = $("#map");
        this.$searchTab = $("#searchTab");
        this.$deviceTab = $("#deviceTab");
        this.$tableList = $('#searchListTable', this.$searchTab);
        this.$floorInfo = $("#floorInfo");
        this.$floorInfoList = $('#floorInfoList', this.$floorInfo);
        this.$deviceList = $('#deviceListTable', this.$deviceTab);

        this.events();
    },

    events : function () {
        const _this = this;

        setInterval(function() {
            if(_monitoringDevice.$trigger == 'f'){
                _monitoringDevice.clickFloor(_monitoringDevice.$f, _monitoringDevice.$o);
            }else if(_monitoringDevice.$trigger == 'fAll'){
                _monitoringDevice.clickFloorAll(_monitoringDevice.$b);
            }
        }, 10000);

        _monitoringDevice.$map = L.map('map').setView([37.5,127.5],11);

        let osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
            attribution:'&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> Contributors'
            , maxZoom:19
        }).addTo(_monitoringDevice.$map);

        var editableLayers = new L.FeatureGroup();
        _monitoringDevice.$map.addLayer(editableLayers);

        _monitoringDevice.$map.zoomControl.remove();

        L.control.zoom({
            position: 'bottomright'
        }).addTo(_monitoringDevice.$map);

        //건물검색결과 클릭
        $(document).on("click", ".building", function() {
            let i = $(this).attr('data-seq');
            _monitoringDevice.$x_1 = $("#"+i+'-stdPoint1').val();
            _monitoringDevice.$y_1 = $("#"+i+'-stdPoint2').val();
            _monitoringDevice.$x_2 = $("#"+i+'-areaPoint1').val();
            _monitoringDevice.$y_2 = $("#"+i+'-areaPoint2').val();
            _monitoringDevice.$map.setView(new L.LatLng(_monitoringDevice.$x_1, _monitoringDevice.$y_1), 18);

            _monitoringDevice.searchFloorInfo(i);
            $("#deviceTab").show();
        });

        //층 클릭
        $(document).on("click", ".btnFloor", function() {
            _monitoringDevice.$f = $(this).attr('data-f');
            _monitoringDevice.$o = $(this).attr('data-o');
            _monitoringDevice.clickFloor(_monitoringDevice.$f, _monitoringDevice.$o);
            _monitoringDevice.$trigger = 'f';
        });

        //층 전체 클릭
        $(document).on("click", ".btnFloorAll", function() {
            _monitoringDevice.$b = $(this).attr('data-b');
            _monitoringDevice.clickFloorAll(_monitoringDevice.$b);
            _monitoringDevice.$trigger = 'fAll';
        });

        // 실내확대
        $('#btnPopup').on('click', function(){
            let url = '/device/floorDeviceInfoPopup';
            url = url + "?imgPath="+encodeURIComponent(_monitoringDevice.$imageUrl);
            for(let i=0; i<_monitoringDevice.$markersB.length; i++){
                url = url + "&" + encodeURIComponent("deviceInfoList["+i+"].type")+"="+_monitoringDevice.$markersB[i].typeCd;
                url = url + "&" + encodeURIComponent("deviceInfoList["+i+"].left")+"="+_monitoringDevice.$markersB[i].left;
                url = url + "&" + encodeURIComponent("deviceInfoList["+i+"].top")+"="+_monitoringDevice.$markersB[i].top;
            }
            window.open(url, '', '_blank');
        });

        // 닫기
        $('#deviceTabClose').on('click', function(){
            $("#deviceTab").attr('style', 'display:none;');
            _this.$floorInfoList.empty();
        });

        // 검색
        $('#btnSearch').on('click', function(){
            _monitoringDevice.searchBuilding(1, 't');
        });

        // 지도내검색
        $('#btnSearchArea').on('click', function(){
            _monitoringDevice.searchBuilding(1, 'a');
        });

    },

    searchBuilding : function(page, type) {
        const _this = this;
        let x1;
        let x2;
        let y1;
        let y2;
        if(type == 'a'){
            x1 = _monitoringDevice.$map.getBounds()._southWest.lat;
            y1 = _monitoringDevice.$map.getBounds()._southWest.lng;
            x2 = _monitoringDevice.$map.getBounds()._northEast.lat;
            y2 = _monitoringDevice.$map.getBounds()._northEast.lng;
        }
        var param = {
            buildName : $('#searchText').val(),
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
            },
            error : function(XMLHttpRequest, textStatus, errorThrown){

            }
        });

    },

    dataBindBuilding : function(result) {
        const _this = this;
        _this.$tableList.find('tbody').empty();
        if (result.list.length > 0) {
            if (_monitoringDevice.$markers != undefined) {
                for(let i=0; i<_monitoringDevice.$markers.length; i++){
                    _monitoringDevice.$map.removeLayer(_monitoringDevice.$markers[i]);
                }
            };
            _monitoringDevice.$markers = [];
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
                _monitoringDevice.$markers.push(L.marker(latlng).addTo(_monitoringDevice.$map));
            });
        } else {
            if (_monitoringDevice.$markers != undefined) {
                for(let i=0; i<_monitoringDevice.$markers.length; i++){
                    _monitoringDevice.$map.removeLayer(_monitoringDevice.$markers[i]);
                }
            };
            _monitoringDevice.$markers = [];
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
        _this.$floorInfoList.empty();
        if (result.length > 0) {
            _this.$floorInfoList.append(
                $('<li/>').append(
                    $('<button/>').text('전체').attr('class', 'btnFloorAll').attr('data-b', result[0].buildSeq)
                )
            );
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

    //device list databind
    dataBindDeviceList : function(result) {
        const _this = this;
        _this.$deviceList.empty();
        if (result.length > 0) {
            $.each(result, function (i, val) {
                if(val.floor > 0){
                    _this.$deviceList.append(
                        $('<tr/>').attr('onclick', '_monitoringDevice.clickDevice('+val.point1+','+val.point2+')').append(
                            $('<td/>').text(val.floor)
                        ).append(
                            $('<td/>').text(val.codeName)
                        ).append(
                            $('<td/>').text(val.deviceName)
                        )
                    )
                }else{
                    _this.$deviceList.append(
                        $('<tr/>').attr('onclick', '_monitoringDevice.clickDevice('+val.point1+','+val.point2+')').append(
                            $('<td/>').text('지하 '+(val.floor*-1))
                        ).append(
                            $('<td/>').text(val.codeName)
                        ).append(
                            $('<td/>').text(val.deviceName)
                        )
                    )
                }
            });
        } else {
            _this.$deviceList.append(
                $('<tr/>').append($('<td/>').attr({colspan : 3}).text('검색결과가 없습니다.'))
            );
        }
    },

    //층 클릭
    clickFloor : function(f, o) {
        if(_monitoringDevice.$map.hasLayer(_monitoringDevice.$image)){
            _monitoringDevice.$map.removeLayer(_monitoringDevice.$image);
        }
        if(_monitoringDevice.$map.hasLayer(_monitoringDevice.$rect)){
            _monitoringDevice.$map.removeLayer(_monitoringDevice.$rect);
        }
        _monitoringDevice.$imageUrl = $('#F'+f).val();
        //_monitoringDevice.$imageUrl = 'https://www.codingfactory.net/wp-content/uploads/abc.jpg';
        var imageBounds = [
            [_monitoringDevice.$x_1, _monitoringDevice.$y_1],
            [_monitoringDevice.$x_2, _monitoringDevice.$y_2]
        ];
        _monitoringDevice.$image = L.imageOverlay(_monitoringDevice.$imageUrl, imageBounds, {opacity: o*0.01}).addTo(_monitoringDevice.$map);

        let param = {
            floorSeq: f
        };
        $.ajax({
            type : "GET",
            url : "/device/search/floor",
            data : param,
            success : function(res){
                _monitoringDevice.dataBindDeviceList(res.result);
                //device정보 클리어
                if (_monitoringDevice.$markers != undefined) {
                    for(let i=0; i<_monitoringDevice.$markers.length; i++){
                        _monitoringDevice.$map.removeLayer(_monitoringDevice.$markers[i]);
                    }
                };
                _monitoringDevice.$markers = [];
                _monitoringDevice.$markersB = [];
                //영역의 가로 세로 길이
                let t = L.point(_monitoringDevice.$x_1, _monitoringDevice.$y_1).distanceTo(L.point(_monitoringDevice.$x_2, _monitoringDevice.$y_1));
                let l = L.point(_monitoringDevice.$x_1, _monitoringDevice.$y_1).distanceTo(L.point(_monitoringDevice.$x_1, _monitoringDevice.$y_2));
                if (res.result.length > 0) {
                    $.each(res.result, function (i, val) {
                        let x1 = val.point1;
                        let y1 = val.point2;
                        var iconUrl = "";
                        if(val.typeCd == "DEV00010"){
                            iconUrl = $("#key").val();
                        }else{
                            iconUrl = $("#lock").val();
                        }
                        var latlng = L.latLng(x1, y1);
                        if(iconUrl == "default"){
                            _monitoringDevice.$markers.push(L.marker(latlng).addTo(_monitoringDevice.$map));
                        }else{
                            var icon = L.icon({
                                iconUrl: iconUrl,
                                iconSize: [32, 46], // 모바일에서는 2x 이미지 사용
                                iconAnchor: [16,46]
                            });
                            _monitoringDevice.$markers.push(L.marker(latlng, {
                                icon: icon
                            }).addTo(_monitoringDevice.$map));
                        }

                        if(x1 <= _monitoringDevice.$x_1 && x1 >= _monitoringDevice.$x_2 && y1 >= _monitoringDevice.$y_1 && y1 <= _monitoringDevice.$y_2){
                            let mt = L.point(_monitoringDevice.$x_1, _monitoringDevice.$y_1).distanceTo(L.point(x1, _monitoringDevice.$y_1));
                            let ml = L.point(_monitoringDevice.$x_1, _monitoringDevice.$y_1).distanceTo(L.point(_monitoringDevice.$x_1, y1));

                            let top = (mt/t) * 100;
                            let left = (ml/l) * 100;

                            let obj = {top:top, left:left, typeCd:val.typeCd};
                            _monitoringDevice.$markersB.push(obj);
                        }
                    });
                } else {
                    alert('등록된 장비가 없습니다.');
                    _monitoringDevice.$trigger = '';
                }
            },
            error : function(XMLHttpRequest, textStatus, errorThrown){

            }
        });
    },

    //층 전체 클릭
    clickFloorAll : function(b) {
        if(_monitoringDevice.$map.hasLayer(_monitoringDevice.$image)){
            _monitoringDevice.$map.removeLayer(_monitoringDevice.$image);
        }
        if(_monitoringDevice.$map.hasLayer(_monitoringDevice.$rect)){
            _monitoringDevice.$map.removeLayer(_monitoringDevice.$rect);
        }
        var rectBounds = [
            [_monitoringDevice.$x_1, _monitoringDevice.$y_1],
            [_monitoringDevice.$x_2, _monitoringDevice.$y_2]
        ];
        _monitoringDevice.$rect = L.rectangle(rectBounds, {color: 'red', weight: 1}).on('click', function (e) {
            // There event is event object
            // there e.type === 'click'
            // there e.lanlng === L.LatLng on map
            // there e.target.getLatLngs() - your rectangle coordinates
            // but e.target !== rect
        }).addTo(_monitoringDevice.$map);

        let param = {
            buildSeq: b
        };
        $.ajax({
            type : "GET",
            url : "/device/search/floor",
            data : param,
            success : function(res){
                _monitoringDevice.dataBindDeviceList(res.result);
                //device정보 클리어
                if (_monitoringDevice.$markers != undefined) {
                    for(let i=0; i<_monitoringDevice.$markers.length; i++){
                        _monitoringDevice.$map.removeLayer(_monitoringDevice.$markers[i]);
                    }
                };
                _monitoringDevice.$markers = [];
                _monitoringDevice.$markersB = [];
                //영역의 가로 세로 길이
                let t = L.point(_monitoringDevice.$x_1, _monitoringDevice.$y_1).distanceTo(L.point(_monitoringDevice.$x_2, _monitoringDevice.$y_1));
                let l = L.point(_monitoringDevice.$x_1, _monitoringDevice.$y_1).distanceTo(L.point(_monitoringDevice.$x_1, _monitoringDevice.$y_2));
                if (res.result.length > 0) {
                    $.each(res.result, function (i, val) {
                        let x1 = val.point1;
                        let y1 = val.point2;
                        var iconUrl = "";
                        if(val.typeCd == "DEV00010"){
                            iconUrl = $("#key").val();
                        }else{
                            iconUrl = $("#lock").val();
                        }
                        var latlng = L.latLng(x1, y1);
                        if(iconUrl == "default"){
                            _monitoringDevice.$markers.push(L.marker(latlng).addTo(_monitoringDevice.$map));
                        }else{
                            var icon = L.icon({
                                iconUrl: iconUrl,
                                iconSize: [32, 46], // 모바일에서는 2x 이미지 사용
                                iconAnchor: [16,46]
                            });
                            _monitoringDevice.$markers.push(L.marker(latlng, {
                                icon: icon
                            }).addTo(_monitoringDevice.$map));
                        }

                        if(x1 <= _monitoringDevice.$x_1 && x1 >= _monitoringDevice.$x_2 && y1 >= _monitoringDevice.$y_1 && y1 <= _monitoringDevice.$y_2){
                            let mt = L.point(_monitoringDevice.$x_1, _monitoringDevice.$y_1).distanceTo(L.point(x1, _monitoringDevice.$y_1));
                            let ml = L.point(_monitoringDevice.$x_1, _monitoringDevice.$y_1).distanceTo(L.point(_monitoringDevice.$x_1, y1));

                            let top = (mt/t) * 100;
                            let left = (ml/l) * 100;

                            let obj = {top:top, left:left, typeCd:val.typeCd};
                            _monitoringDevice.$markersB.push(obj);
                        }
                    });
                } else {
                    alert('등록된 장비가 없습니다.');
                    _monitoringDevice.$trigger = '';
                }
            },
            error : function(XMLHttpRequest, textStatus, errorThrown){

            }
        });
    },

    //장비 클릭
    clickDevice : function(point1, point2) {
        _monitoringDevice.$map.setView(new L.LatLng(point1, point2), 18);
    }
};

// onload
$(document).ready(function() {
    _monitoringDevice.init();
});