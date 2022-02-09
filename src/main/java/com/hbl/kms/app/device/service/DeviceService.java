package com.hbl.kms.app.device.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.hbl.kms.app.device.mapper.DeviceMapper;
import com.hbl.kms.app.device.model.DeviceDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class DeviceService {

    private final DeviceMapper deviceMapper;

    public PageInfo<?> selectBuildingInfoList(DeviceDto deviceDto) {
        PageHelper.startPage(deviceDto);
        return PageInfo.of(deviceMapper.selectBuildingInfoList(deviceDto), deviceDto.getNavigatePages());
    }

    public int insertDevice(DeviceDto deviceDto) {
        return deviceMapper.insertDevice(deviceDto);
    }

}
