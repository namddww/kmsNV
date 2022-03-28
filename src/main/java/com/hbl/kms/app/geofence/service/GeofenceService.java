package com.hbl.kms.app.geofence.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.hbl.kms.app.device.mapper.DeviceMapper;
import com.hbl.kms.app.device.model.DeviceDto;
import com.hbl.kms.app.geofence.mapper.GeofenceMapper;
import com.hbl.kms.app.geofence.model.Geofence;
import com.hbl.kms.app.geofence.model.GeofenceDto;
import com.hbl.kms.app.geofence.model.GeofenceInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

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
        return null;
    }
}
