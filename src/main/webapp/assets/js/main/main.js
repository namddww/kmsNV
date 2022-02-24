let _main = {
    $scope : null, // 영역
    $searchTab : null,
    $tableList : null,
    $floorInfo : null,
    $floorInfoList : null,

    init : function () {

        this.$scope = $("#map");
        this.$searchTab = $("#searchTab");
        this.$tableList = $('#searchListTable', this.$searchTab);
        this.$floorInfo = $("#floorInfo");
        this.$floorInfoList = $('#floorInfoList', this.$floorInfo);

        this.events();
    },

    events : function () {
        const _this = this;

        // 검색
        $('#btnSearch').on('click', function(){
            _main.searchBuilding(1)
        });

        var map = L.map('map').setView([37.5,127.5],11);

        let osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
            attribution:'&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> Contributors'
            , maxZoom:19
        }).addTo(map);

        var editableLayers = new L.FeatureGroup();
        map.addLayer(editableLayers);

        var x_1 = '';
        var y_1 = '';
        var x_2 = '';
        var y_2 = '';

        //건물검색결과 클릭
        $(document).on("click", ".building", function() {
            let i = $(this).attr('data-seq');
            x_1 = $("#"+i+'-stdPoint1').val();
            y_1 = $("#"+i+'-stdPoint2').val();
            x_2 = $("#"+i+'-areaPoint1').val();
            y_2 = $("#"+i+'-areaPoint2').val();
            map.setView(new L.LatLng(x_1, y_1), 18);

            _main.searchFloorInfo(i);

        });

        var image;
        var markers = [];
        var markersB = [];
        var imageUrl;
        //층 클릭
        $(document).on("click", ".btnFloor", function() {
            if(map.hasLayer(image)){
                map.removeLayer(image);
            }
            let f = $(this).attr('data-f');
            imageUrl = $('#F'+f).val();
            // imageUrl = 'https://www.codingfactory.net/wp-content/uploads/abc.jpg';
            var imageBounds = [
                [x_1, y_1],
                [x_2, y_2]
            ];
            image = L.imageOverlay(imageUrl, imageBounds).addTo(map);

            let param = {
                floorSeq: f
            };
            $.ajax({
                type : "GET",
                url : "/device/search/floor",
                data : param,
                success : function(res){
                    const _this = this;

                    //device정보 클리어
                    if (markers != undefined) {
                        for(let i=0; i<markers.length; i++){
                            map.removeLayer(markers[i]);
                        }
                    };
                    markers = [];
                    markersB = [];
                    //영역의 가로 세로 길이
                    let t = L.point(x_1, y_1).distanceTo(L.point(x_2, y_1));
                    let l = L.point(x_1, y_1).distanceTo(L.point(x_1, y_2));
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
                            }).addTo(map);*/
                            markers.push(L.marker(latlng).addTo(map));

                            if(x1 <= x_1 && x1 >= x_2 && y1 >= y_1 && y1 <= y_2){
                                let mt = L.point(x_1, y_1).distanceTo(L.point(x1, y_1));
                                let ml = L.point(x_1, y_1).distanceTo(L.point(x_1, y1));

                                let top = (mt/t) * 100;
                                let left = (ml/l) * 100;

                                let obj = {top:top, left:left, typeCd:val.typeCd};
                                markersB.push(obj);
                            }
                        });
                    } else {
                        alert('등록된 장비가 없습니다.');
                    }
                },
                error : function(XMLHttpRequest, textStatus, errorThrown){

                }
            });
        });

        // 검색
        $('#btnPopup').on('click', function(){
            let url = '/device/floorDeviceInfoPopup';
            url = url + "?imgPath="+encodeURIComponent(imageUrl)
            for(let i=0; i<markersB.length; i++){
                url = url + "&" + encodeURIComponent("deviceInfoList["+i+"].type")+"="+markersB[i].typeCd;
                url = url + "&" + encodeURIComponent("deviceInfoList["+i+"].left")+"="+markersB[i].left;
                url = url + "&" + encodeURIComponent("deviceInfoList["+i+"].top")+"="+markersB[i].top;
            }
            window.open(url, '_blank');
            console.log(markersB[0].left);
            console.log(imageUrl);
        });

    },

    searchBuilding : function(page) {
        const _this = this;
        var param = {
            buildName : $('#searchText').val()
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
            });
        } else {
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
            $.each(result, function (i, val) {
                if(val.floor < 0){
                    _this.$floorInfoList.append(
                        $('<li/>').append(
                            $('<button/>').text('B'+(val.floor*-1)).attr('class', 'btnFloor').attr('data-f', val.floorSeq)
                        ).append(
                            $('<input>').attr('id', 'F'+val.floorSeq).attr('type', 'hidden').val(val.filePath)
                        )
                    );
                }else{
                    _this.$floorInfoList.append(
                        $('<li/>').append(
                            $('<button/>').text(val.floor).attr('class', 'btnFloor').attr('data-f', val.floorSeq)
                        ).append(
                            $('<input>').attr('id', 'F'+val.floorSeq).attr('type', 'hidden').val(val.filePath)
                        )
                    );
                }

            });
        } else {
            _this.$floorInfoList.append(

            );
        }
    }
};

// onload
$(document).ready(function() {
    _main.init();
});