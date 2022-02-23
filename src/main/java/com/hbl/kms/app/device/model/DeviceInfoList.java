package com.hbl.kms.app.device.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DeviceInfoList {
    /**
     * 디바이스 위치 top 비율
     */
    private String top;
    /**
     * 디바이스 위치 left 비율율
     */
    private String left;
    /**
     * 디바이스 타입
     */
    private String type;
}
