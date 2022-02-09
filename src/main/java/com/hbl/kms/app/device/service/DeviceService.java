package com.hbl.kms.app.device.service;

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

    public int deviceInsert(DeviceDto deviceDto) {
        return deviceMapper.deviceInsert(deviceDto);
    }
}
