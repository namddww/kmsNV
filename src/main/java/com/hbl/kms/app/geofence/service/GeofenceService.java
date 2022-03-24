package com.hbl.kms.app.geofence.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.hbl.kms.app.geofence.mapper.GeofenceMapper;
import com.hbl.kms.app.geofence.model.Geofence;
import com.hbl.kms.app.geofence.model.GeofenceDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GeofenceService {

    private final GeofenceMapper geofenceMapper;

    public PageInfo<Geofence> selectGeofenceList(GeofenceDto geofenceDto) {
        PageHelper.startPage(geofenceDto);
        return PageInfo.of(geofenceMapper.selectGeofenceList(geofenceDto), geofenceDto.getNavigatePages());
    }

    public int insertGeofence(GeofenceDto geofenceDto) {

        return 1;
    }
}
