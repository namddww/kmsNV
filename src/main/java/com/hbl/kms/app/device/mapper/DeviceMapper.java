package com.hbl.kms.app.device.mapper;

import com.hbl.kms.app.device.model.BuildingInfoList;
import com.hbl.kms.app.device.model.DeviceDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface DeviceMapper {

    List<BuildingInfoList> selectBuildingInfoList(DeviceDto deviceDto);

    int insertDevice(DeviceDto deviceDto);
}
