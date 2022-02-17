package com.hbl.kms.app.device.mapper;

import com.hbl.kms.app.device.model.AreaList;
import com.hbl.kms.app.device.model.BuildingInfoList;
import com.hbl.kms.app.device.model.Device;
import com.hbl.kms.app.device.model.DeviceDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface DeviceMapper {

    List<AreaList>  selectAreaList(String codeGroupCd);

    List<BuildingInfoList> selectBuildingInfoList(DeviceDto deviceDto);

    String selectFloorFilePath(int buildSeq, int floor);

    int selectFloorSeq(DeviceDto deviceDto);

    int insertDevice(DeviceDto deviceDto);

    List<Device> selectDeviceListByFloor(DeviceDto deviceDto);
}
