let _main = {
    $scope : null, // 영역
    $searchTab : null,
    $deviceTab : null,
    $tableList : null,
    $floorInfo : null,
    $floorInfoList : null,
    $deviceList : null,
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
            if(_main.$trigger == 'f'){
                _main.clickFloor(_main.$f, _main.$o);
            }else if(_main.$trigger == 'fAll'){
                _main.clickFloorAll(_main.$b);
            }
        }, 10000);

        _main.$map = L.map('map').setView([37.5,127.5],11);

        let osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
            attribution:'&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> Contributors'
            , maxZoom:19
        }).addTo(_main.$map);

        var editableLayers = new L.FeatureGroup();
        _main.$map.addLayer(editableLayers);

        _main.$map.zoomControl.remove();

        L.control.zoom({
            position: 'bottomright'
        }).addTo(_main.$map);

        //건물검색결과 클릭
        $(document).on("click", ".building", function() {
            let i = $(this).attr('data-seq');
            _main.$x_1 = $("#"+i+'-stdPoint1').val();
            _main.$y_1 = $("#"+i+'-stdPoint2').val();
            _main.$x_2 = $("#"+i+'-areaPoint1').val();
            _main.$y_2 = $("#"+i+'-areaPoint2').val();
            _main.$map.setView(new L.LatLng(_main.$x_1, _main.$y_1), 18);

            _main.searchFloorInfo(i);
            $("#deviceTab").show();
        });

        //층 클릭
        $(document).on("click", ".btnFloor", function() {
            _main.$f = $(this).attr('data-f');
            _main.$o = $(this).attr('data-o');
            _main.clickFloor(_main.$f, _main.$o);
            _main.$trigger = 'f';
        });

        //층 전체 클릭
        $(document).on("click", ".btnFloorAll", function() {
            _main.$b = $(this).attr('data-b');
            _main.clickFloorAll(_main.$b);
            _main.$trigger = 'fAll';
        });

        // 실내확대
        $('#btnPopup').on('click', function(){
            let url = '/device/floorDeviceInfoPopup';
            url = url + "?imgPath="+encodeURIComponent(_main.$imageUrl);
            for(let i=0; i<_main.$markersB.length; i++){
                url = url + "&" + encodeURIComponent("deviceInfoList["+i+"].type")+"="+_main.$markersB[i].typeCd;
                url = url + "&" + encodeURIComponent("deviceInfoList["+i+"].left")+"="+_main.$markersB[i].left;
                url = url + "&" + encodeURIComponent("deviceInfoList["+i+"].top")+"="+_main.$markersB[i].top;
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
            _main.searchBuilding(1, 't');
        });

        // 지도내검색
        $('#btnSearchArea').on('click', function(){
            _main.searchBuilding(1, 'a');
        });

    },

    searchBuilding : function(page, type) {
        const _this = this;
        let x1;
        let x2;
        let y1;
        let y2;
        if(type == 'a'){
            x1 = _main.$map.getBounds()._southWest.lat;
            y1 = _main.$map.getBounds()._southWest.lng;
            x2 = _main.$map.getBounds()._northEast.lat;
            y2 = _main.$map.getBounds()._northEast.lng;
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
            if (_main.$markers != undefined) {
                for(let i=0; i<_main.$markers.length; i++){
                    _main.$map.removeLayer(_main.$markers[i]);
                }
            };
            _main.$markers = [];
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
                _main.$markers.push(L.marker(latlng).addTo(_main.$map));
            });
        } else {
            if (_main.$markers != undefined) {
                for(let i=0; i<_main.$markers.length; i++){
                    _main.$map.removeLayer(_main.$markers[i]);
                }
            };
            _main.$markers = [];
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
                _this.$deviceList.append(
                    $('<tr/>').attr('onclick', '_main.clickDevice('+val.point1+','+val.point2+')').append(
                        $('<td/>').text(val.floor)
                    ).append(
                        $('<td/>').text(val.typeCd)
                    ).append(
                        $('<td/>').text(val.deviceName)
                    )
                )
            });
        } else {
            _this.$deviceList.append(
                $('<tr/>').append($('<td/>').attr({colspan : 1}).text('검색결과가 없습니다.'))
            );
        }
    },

    //층 클릭
    clickFloor : function(f, o) {
        if(_main.$map.hasLayer(_main.$image)){
            _main.$map.removeLayer(_main.$image);
        }
        if(_main.$map.hasLayer(_main.$rect)){
            _main.$map.removeLayer(_main.$rect);
        }
        _main.$imageUrl = $('#F'+f).val();
        //_main.$imageUrl = 'https://www.codingfactory.net/wp-content/uploads/abc.jpg';
        var imageBounds = [
            [_main.$x_1, _main.$y_1],
            [_main.$x_2, _main.$y_2]
        ];
        _main.$image = L.imageOverlay(_main.$imageUrl, imageBounds, {opacity: o*0.01}).addTo(_main.$map);

        let param = {
            floorSeq: f
        };
        $.ajax({
            type : "GET",
            url : "/device/search/floor",
            data : param,
            success : function(res){
                _main.dataBindDeviceList(res.result);
                //device정보 클리어
                if (_main.$markers != undefined) {
                    for(let i=0; i<_main.$markers.length; i++){
                        _main.$map.removeLayer(_main.$markers[i]);
                    }
                };
                _main.$markers = [];
                _main.$markersB = [];
                //영역의 가로 세로 길이
                let t = L.point(_main.$x_1, _main.$y_1).distanceTo(L.point(_main.$x_2, _main.$y_1));
                let l = L.point(_main.$x_1, _main.$y_1).distanceTo(L.point(_main.$x_1, _main.$y_2));
                if (res.result.length > 0) {
                    $.each(res.result, function (i, val) {
                        let x1 = val.point1;
                        let y1 = val.point2;
                        var iconUrl = "/assets/img/chk_atv.png"
                        var icon = L.icon({
                            iconUrl: iconUrl,
                            iconSize: [32, 46], // 모바일에서는 2x 이미지 사용
                            iconAnchor: [16,46],
                            popupAnchor: [0,-46]
                        });

                        var latlng = L.latLng(x1, y1);
                        /*L.marker(latlng, {
                            icon: icon
                        }).addTo(_this2.$map);*/
                        _main.$markers.push(L.marker(latlng).addTo(_main.$map));

                        if(x1 <= _main.$x_1 && x1 >= _main.$x_2 && y1 >= _main.$y_1 && y1 <= _main.$y_2){
                            let mt = L.point(_main.$x_1, _main.$y_1).distanceTo(L.point(x1, _main.$y_1));
                            let ml = L.point(_main.$x_1, _main.$y_1).distanceTo(L.point(_main.$x_1, y1));

                            let top = (mt/t) * 100;
                            let left = (ml/l) * 100;

                            let obj = {top:top, left:left, typeCd:val.typeCd};
                            _main.$markersB.push(obj);
                        }
                    });
                } else {
                    alert('등록된 장비가 없습니다.');
                    _main.$trigger = '';
                }
            },
            error : function(XMLHttpRequest, textStatus, errorThrown){

            }
        });
    },

    //층 전체 클릭
    clickFloorAll : function(b) {
        if(_main.$map.hasLayer(_main.$image)){
            _main.$map.removeLayer(_main.$image);
        }
        if(_main.$map.hasLayer(_main.$rect)){
            _main.$map.removeLayer(_main.$rect);
        }
        var rectBounds = [
            [_main.$x_1, _main.$y_1],
            [_main.$x_2, _main.$y_2]
        ];
        _main.$rect = L.rectangle(rectBounds, {color: 'red', weight: 1}).on('click', function (e) {
            // There event is event object
            // there e.type === 'click'
            // there e.lanlng === L.LatLng on map
            // there e.target.getLatLngs() - your rectangle coordinates
            // but e.target !== rect
        }).addTo(_main.$map);

        let param = {
            buildSeq: b
        };
        $.ajax({
            type : "GET",
            url : "/device/search/floor",
            data : param,
            success : function(res){
                _main.dataBindDeviceList(res.result);
                //device정보 클리어
                if (_main.$markers != undefined) {
                    for(let i=0; i<_main.$markers.length; i++){
                        _main.$map.removeLayer(_main.$markers[i]);
                    }
                };
                _main.$markers = [];
                _main.$markersB = [];
                //영역의 가로 세로 길이
                let t = L.point(_main.$x_1, _main.$y_1).distanceTo(L.point(_main.$x_2, _main.$y_1));
                let l = L.point(_main.$x_1, _main.$y_1).distanceTo(L.point(_main.$x_1, _main.$y_2));
                if (res.result.length > 0) {
                    $.each(res.result, function (i, val) {
                        let x1 = val.point1;
                        let y1 = val.point2;
                        var iconUrl = "/assets/img/chk_atv.png"
                        var icon = L.icon({
                            iconUrl: iconUrl,
                            iconSize: [32, 46], // 모바일에서는 2x 이미지 사용
                            iconAnchor: [16,46],
                            popupAnchor: [0,-46]
                        });

                        var latlng = L.latLng(x1, y1);
                        /*L.marker(latlng, {
                            icon: icon
                        }).addTo(_this2.$map);*/
                        _main.$markers.push(L.marker(latlng).addTo(_main.$map));

                        if(x1 <= _main.$x_1 && x1 >= _main.$x_2 && y1 >= _main.$y_1 && y1 <= _main.$y_2){
                            let mt = L.point(_main.$x_1, _main.$y_1).distanceTo(L.point(x1, _main.$y_1));
                            let ml = L.point(_main.$x_1, _main.$y_1).distanceTo(L.point(_main.$x_1, y1));

                            let top = (mt/t) * 100;
                            let left = (ml/l) * 100;

                            let obj = {top:top, left:left, typeCd:val.typeCd};
                            _main.$markersB.push(obj);
                        }
                    });
                } else {
                    alert('등록된 장비가 없습니다.');
                    _main.$trigger = '';
                }
            },
            error : function(XMLHttpRequest, textStatus, errorThrown){

            }
        });
    },

    //장비 클릭
    clickDevice : function(point1, point2) {
        _main.$map.setView(new L.LatLng(point1, point2), 18);
    }
};

// onload
$(document).ready(function() {
    _main.init();
});