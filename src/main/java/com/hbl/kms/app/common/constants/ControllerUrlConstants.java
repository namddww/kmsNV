package com.hbl.kms.app.common.constants;

/**
 * 컨트롤러 URL
 */
public class ControllerUrlConstants {

    // 건물관련 URL
    public interface BuildingUrl {
        interface Building {
            String DEFAULT = "/building/list";
            String SEARCH = "/building/search";
            String SAVE_FORM = "/building/saveForm";
            String SAVE = "/building/save";
            String POINT_POPUP = "/building/pointPopup";
            String FLOOR_POPUP = "/building/floorPopup";
        }

    }

    // 자산관련 URL
    public interface DeviceUrl {
        interface Device {
            String DEFAULT = "/device/list";
            String SAVE_FORM = "/device/saveForm";
            String SEARCH = "/device/search";
            String SAVE = "/device/save";
        }
    }
}
