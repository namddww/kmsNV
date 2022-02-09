package com.hbl.kms.app.common.constants;

/**
 * 컨트롤러 URL
 */
public class ControllerUrlConstants {

    // 건물관련 URL
    public interface BuildingUrl {
        interface Building {
            String DEFAULT = "/building/list";
        }

    }

    // 자산관련 URL
    public interface DeviceUrl {
        interface Device {
            String DEFAULT = "/device/list";
            String SAVE = "/device/save";
        }
    }
}
