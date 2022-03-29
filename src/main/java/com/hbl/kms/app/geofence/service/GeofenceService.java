package com.hbl.kms.app.geofence.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.hbl.kms.app.device.mapper.DeviceMapper;
import com.hbl.kms.app.device.model.DeviceDto;
import com.hbl.kms.app.geofence.mapper.GeofenceMapper;
import com.hbl.kms.app.geofence.model.Geofence;
import com.hbl.kms.app.geofence.model.GeofenceDto;
import com.hbl.kms.app.geofence.model.GeofenceInfo;
import com.hbl.kms.app.geofence.model.PointXY;
import lombok.RequiredArgsConstructor;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.Geometry;
import org.locationtech.jts.io.ParseException;
import org.locationtech.jts.io.WKTReader;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GeofenceService {

    private final GeofenceMapper geofenceMapper;
    private final DeviceMapper deviceMapper;

    public PageInfo<Geofence> selectGeofenceList(GeofenceDto geofenceDto) {
        PageHelper.startPage(geofenceDto);
        return PageInfo.of(geofenceMapper.selectGeofenceList(geofenceDto), geofenceDto.getNavigatePages());
    }

    public int insertGeofence(GeofenceDto geofenceDto) {

        DeviceDto deviceDto = new DeviceDto();
        deviceDto.setBuildSeq(geofenceDto.getBuildSeq());
        deviceDto.setFloor(geofenceDto.getFloor());

        Geofence geofence = new Geofence();
        geofence.setBuildSeq(geofenceDto.getBuildSeq());
        geofence.setFloorSeq(deviceMapper.selectFloorSeq(deviceDto));
        geofence.setGeoName(geofenceDto.getGeoName());
        geofence.setFloor(geofenceDto.getFloor());
        geofence.setStateCd(geofenceDto.getStateCd());
        geofence.setLocationCd(geofenceDto.getLocationCd());
        geofence.setTypeCd(geofenceDto.getTypeCd());

        geofenceMapper.insertGeofence(geofence);

        GeofenceInfo geofenceInfo = new GeofenceInfo();
        geofenceInfo.setGeofenceSeq(geofence.getGeofenceSeq());
        BigDecimal bigDecimal = new BigDecimal(geofenceDto.getRadius());
        geofenceInfo.setRadius(bigDecimal);
        geofenceInfo.setSetPointX(geofenceDto.getSetPointX());
        geofenceInfo.setSetPointY(geofenceDto.getSetPointY());
        geofenceInfo.setPointList(geofenceDto.getPointList());
        geofenceMapper.insertGeofenceInfo(geofenceInfo);

        return 1;
    }

    public Geofence selectGeofence(int geofenceSeq) {
        return geofenceMapper.selectGeofence(geofenceSeq);
    }

    public GeofenceInfo selectGeofenceInfo(int geofenceSeq) {

        GeofenceInfo geofenceInfo = geofenceMapper.selectGeofenceInfo(geofenceSeq);

        try {
            //setPoint
            if (geofenceInfo.getSetPoint() != null){
                Geometry gSetPoint = new WKTReader().read(geofenceInfo.getSetPoint());
                Coordinate[] c1 = gSetPoint.getCoordinates();
                Coordinate setPoint = c1[0];
                geofenceInfo.setSetPointX(String.valueOf(setPoint.getX()));
                geofenceInfo.setSetPointY(String.valueOf(setPoint.getY()));
            }

            //areaPoint
            Geometry gAreaPoint = new WKTReader().read(geofenceInfo.getAreaPoint());
            List<PointXY> list = new ArrayList<>();
            Coordinate[] c2 = gAreaPoint.getCoordinates();
            for (int i=0; i<c2.length; i++){
                Coordinate setAreaPoint = c2[i];
                PointXY pointXY = new PointXY();
                pointXY.setPointX(String.valueOf(setAreaPoint.getX()));
                pointXY.setPointY(String.valueOf(setAreaPoint.getY()));
                list.add(pointXY);
            }
            if(c2.length > 1){
                list.remove(list.size() - 1);
            }
            geofenceInfo.setPointList(list);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return geofenceInfo;
    }

    public int updateGeofence(GeofenceDto geofenceDto) {
        DeviceDto deviceDto = new DeviceDto();
        deviceDto.setBuildSeq(geofenceDto.getBuildSeq());
        deviceDto.setFloor(geofenceDto.getFloor());

        Geofence geofence = new Geofence();
        geofence.setGeofenceSeq(geofenceDto.getGeofenceSeq());
        geofence.setGeoName(geofenceDto.getGeoName());
        geofence.setStateCd(geofenceDto.getStateCd());
        geofence.setLocationCd(geofenceDto.getLocationCd());
        geofence.setTypeCd(geofenceDto.getTypeCd());

        geofenceMapper.updateGeofence(geofence);

        GeofenceInfo geofenceInfo = new GeofenceInfo();
        geofenceInfo.setGeofenceInfoSeq(geofenceDto.getGeofenceInfoSeq());
        BigDecimal bigDecimal = new BigDecimal(geofenceDto.getRadius());
        geofenceInfo.setRadius(bigDecimal);
        geofenceInfo.setSetPointX(geofenceDto.getSetPointX());
        geofenceInfo.setSetPointY(geofenceDto.getSetPointY());
        geofenceInfo.setPointList(geofenceDto.getPointList());
        geofenceMapper.updateGeofenceInfo(geofenceInfo);

        return 1;
    }

    public List<Geofence> selectGeofenceListByFloor(GeofenceDto geofenceDto) {
        List<Geofence> geofence = geofenceMapper.selectGeofenceListByFloor(geofenceDto);

        for(int i=0; i<geofence.size(); i++){
            try {
                //setPoint
                if (geofence.get(i).getSetPoint() != null){
                    Geometry gSetPoint = new WKTReader().read(geofence.get(i).getSetPoint());
                    Coordinate[] c1 = gSetPoint.getCoordinates();
                    Coordinate setPoint = c1[0];
                    geofence.get(i).setSetPointX(String.valueOf(setPoint.getX()));
                    geofence.get(i).setSetPointY(String.valueOf(setPoint.getY()));
                }

                //areaPoint
                if(geofence.get(i).getAreaPoint() != null){
                    Geometry gAreaPoint = new WKTReader().read(geofence.get(i).getAreaPoint());
                    List<PointXY> list = new ArrayList<>();
                    Coordinate[] c2 = gAreaPoint.getCoordinates();
                    for (int j=0; j<c2.length; j++){
                        Coordinate setAreaPoint = c2[j];
                        PointXY pointXY = new PointXY();
                        pointXY.setPointX(String.valueOf(setAreaPoint.getX()));
                        pointXY.setPointY(String.valueOf(setAreaPoint.getY()));
                        list.add(pointXY);
                    }
                    if(c2.length > 1){
                        list.remove(list.size() - 1);
                    }
                    geofence.get(i).setPointList(list);
                }
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }
        return geofence;
    }
}
