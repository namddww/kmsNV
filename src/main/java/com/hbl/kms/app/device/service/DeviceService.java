package com.hbl.kms.app.device.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.hbl.kms.app.device.mapper.DeviceMapper;
import com.hbl.kms.app.device.model.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class DeviceService {

    private final DeviceMapper deviceMapper;

    public PageInfo<?> selectDeviceInfoList(DeviceDto deviceDto) {
        PageHelper.startPage(deviceDto);
        return PageInfo.of(deviceMapper.selectDeviceInfoList(deviceDto), deviceDto.getNavigatePages());
    }

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

        deviceMapper.insertDevice(deviceDto);
        return deviceMapper.insertDeviceTracking(deviceDto);
    }

    public List<Device> selectDeviceListByFloor(DeviceDto deviceDto) {
        return deviceMapper.selectDeviceListByFloor(deviceDto);
    }

    public DeviceDetail selectDeviceDetail(DeviceDto deviceDto) {
        return deviceMapper.selectDeviceDetail(deviceDto);
    }

    public int updateDevice(DeviceDto deviceDto) {
        return deviceMapper.updateDevice(deviceDto);
    }

}
