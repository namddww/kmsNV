package com.hbl.kms.app.geofence.mapper;

import com.hbl.kms.app.geofence.model.Geofence;
import com.hbl.kms.app.geofence.model.GeofenceDto;
import com.hbl.kms.app.geofence.model.GeofenceInfo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface GeofenceMapper {

    List<Geofence> selectGeofenceList(GeofenceDto geofenceDto);

    int insertGeofence(Geofence geofence);

    int insertGeofenceInfo(GeofenceInfo geofenceInfo);
}
