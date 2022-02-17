package com.hbl.kms.app.device.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.hbl.kms.app.device.mapper.DeviceMapper;
import com.hbl.kms.app.device.model.Device;
import com.hbl.kms.app.device.model.DeviceDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class DeviceService {

    private final DeviceMapper deviceMapper;

    public PageInfo<?> selectBuildingInfoList(DeviceDto deviceDto) {
        PageHelper.startPage(deviceDto);
        return PageInfo.of(deviceMapper.selectBuildingInfoList(deviceDto), deviceDto.getNavigatePages());
    }

    public String selectFloorFilePath(int buildSeq, int floor) {
        return deviceMapper.selectFloorFilePath(buildSeq, floor);
    }

    public int insertDevice(DeviceDto deviceDto) {
        // buildSeq, floor 정보로 floorSeq 조회
        deviceDto.setFloorSeq(deviceMapper.selectFloorSeq(deviceDto));
        return deviceMapper.insertDevice(deviceDto);
    }

    public List<Device> selectDeviceListByFloor(DeviceDto deviceDto) {
        return deviceMapper.selectDeviceListByFloor(deviceDto);
    }
}
