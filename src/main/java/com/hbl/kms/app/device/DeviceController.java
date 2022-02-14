package com.hbl.kms.app.device;

import com.hbl.kms.app.common.constants.ControllerUrlConstants;
import com.hbl.kms.app.common.model.Result;
import com.hbl.kms.app.common.model.utils.ResponseUtil;
import com.hbl.kms.app.device.model.DeviceDto;
import com.hbl.kms.app.device.service.DeviceService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

@AllArgsConstructor
@Controller
public class DeviceController {

    private final DeviceService deviceService;

    /**
     * 자산등록 목록화면
     */
    @GetMapping(ControllerUrlConstants.DeviceUrl.Device.DEFAULT)
    public ModelAndView deviceList(ModelAndView mav) {
        mav.setViewName("device/deviceList");
        return mav;
    }

    /**
     * 건물정보 목록 및 정보 조회
     */
    @GetMapping(ControllerUrlConstants.DeviceUrl.Device.SEARCH)
    @ResponseBody
    public Result selectBuildingInfoList(@ModelAttribute DeviceDto deviceDto) {
        return ResponseUtil.process(deviceService.selectBuildingInfoList(deviceDto));
    }

    /**
     * 자산등록 화면
     */
    @GetMapping(ControllerUrlConstants.DeviceUrl.Device.SAVE_FORM)
    public ModelAndView saveForm(ModelAndView mav) {
        mav.setViewName("device/saveForm");
        return mav;
    }

    /**
     * 자산등록 > 건물조회 팝업
     */
    @GetMapping(ControllerUrlConstants.DeviceUrl.Device.BUILDING_POPUP)
    public ModelAndView buildingPopup(ModelAndView mav) {
        mav.setViewName("device/buildingPopup");
        return mav;
    }

    /**
     * 자산등록 > 건물조회 팝업
     */
    @GetMapping(ControllerUrlConstants.DeviceUrl.Device.POINT_POPUP)
    public ModelAndView devicePointPopup(ModelAndView mav) {
        mav.setViewName("device/devicePointPopup");
        return mav;
    }

    /**
     * 디바이스 저장
     */
    @PostMapping(ControllerUrlConstants.DeviceUrl.Device.SAVE)
    @ResponseBody
    public Result insertDevice(DeviceDto deviceDto) {
        return ResponseUtil.process(deviceService.insertDevice(deviceDto));
    }
}
