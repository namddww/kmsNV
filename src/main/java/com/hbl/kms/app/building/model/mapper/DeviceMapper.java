package com.hbl.kms.app.building.model.mapper;

import com.hbl.kms.app.device.model.DeviceDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface DeviceMapper {
    int deviceInsert(DeviceDto deviceDto);
}
