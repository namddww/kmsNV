package com.hbl.kms.app.common.constants;

/**
 * 컨트롤러 URL
 */
public class ControllerUrlConstants {

    public interface DashBoardUrl {
        interface DashBoard {
            String DEFAULT = "/dashboard/dashboard";
        }
    }

    // 로그인관련 URL
    public interface JoinUrl {
        interface Join {
            String DEFAULT = "/join/loginForm";
            String AUTH_KEY = "/join/authKey";
            String LOGIN = "/join/login";
            String LOGOUT = "/join/logout";
        }
    }

    // 사용자 관련 URL
    public interface UserUrl {
        interface User {
            String DEFAULT = "/user/list";
            String SEARCH = "/user/search";
            String SAVE_FORM = "/user/saveForm";
            String SELECT_ID_COUNT = "/user/selectIdCount";
            String SAVE = "/user/save";
            String SELECT_USER_DETAIL = "/user/selectUserDetail";
            String UPDATE = "/user/update";
        }
    }

    // 건물관련 URL
    public interface BuildingUrl {
        interface Building {
            String DEFAULT = "/building/list";
            String SEARCH = "/building/search";
            String SAVE_FORM = "/building/saveForm";
            String SAVE = "/building/save";
            String UPDATE = "/building/update";
            String POINT_POPUP = "/building/pointPopup";
            String FLOOR_POPUP = "/building/floorPopup";
            String SEARCH_FLOORINFO = "/building/search/floorInfo";
            String INFO = "/building/buildingInfo/{buildSeq}";
        }

    }

    // 자산관련 URL
    public interface DeviceUrl {
        interface Device {
            String DEFAULT = "/device/list";
            String SAVE_FORM = "/device/saveForm";
            String BUILDING_POPUP = "/device/buildingPopup";
            String POINT_POPUP = "/device/devicePointPopup";
            String SEARCH_BUILDING = "/device/buildingSearch";
            String SEARCH_DEVICE = "/device/deviceSearch";
            String SAVE = "/device/save";
            String UPDATE = "/device/update";
            String SELECT_DEVICE_DETAIL = "/device/selectDeviceDetail";
            String SEARCH_FLOOR = "/device/search/floor";
            String FLOOR_DEVICEINFO_POPUP = "/device/floorDeviceInfoPopup";
        }
    }

    // 아이콘관련 URL
    public interface IconUrl {
        interface Icon {
            String DEFAULT = "/icon/list";
            String SEARCH_ICON = "/icon/iconSearch";
            String SAVE_FORM = "/icon/saveForm";
            String SELECT_ICON_COUNT = "/icon/selectIconCount";
            String SAVE = "/icon/save";
            String UPDATE = "/icon/update";
            String SELECT_ICON_DETAIL = "/icon/selectIconDetail";
        }
    }

    // geofence관련 URL
    public interface GeofenceUrl {
        interface Geofence {
            String DEFAULT = "/geofence/list";
            String SEARCH = "/geofence/search";
            String SAVE_FORM = "/geofence/saveForm";
            String SAVE = "/geofence/save";
            String UPDATE = "/geofence/update";
            String POINT_POPUP = "/geofence/pointPopup";
            String SETPOINT_POPUP = "/geofence/setPointPopup";
            String INFO = "/geofence/geofenceInfo/{geofenceSeq}";
            String SEARCH_FLOOR = "/geofence/search/floor";
        }
    }

}
