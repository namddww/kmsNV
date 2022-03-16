package com.hbl.kms.app.device.mapper;

import com.hbl.kms.app.device.model.*;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface DeviceMapper {

    List<AreaList>  selectAreaList(String codeGroupCd);

    List<BuildingInfoList> selectBuildingInfoList(DeviceDto deviceDto);

    List<BuildingInfoList> selectDeviceInfoList(DeviceDto deviceDto);

    String selectFloorFilePath(int buildSeq, int floor);

    int selectFloorSeq(DeviceDto deviceDto);

    int insertDevice(DeviceDto deviceDto);

    List<Device> selectDeviceListByFloor(DeviceDto deviceDto);

    int insertDeviceTracking(DeviceDto deviceDto);

    DeviceDetail selectDeviceDetail(DeviceDto deviceDto);

    int updateDevice(DeviceDto deviceDto);
}
