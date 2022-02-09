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
     * 자산등록 화면
     */
    @GetMapping(ControllerUrlConstants.DeviceUrl.Device.SAVE_FORM)
    public ModelAndView saveForm(ModelAndView mav) {
        mav.setViewName("device/saveForm");
        return mav;
    }

    /**
     * 건물정보 목록 및 정보 조회
     */
    @GetMapping(ControllerUrlConstants.DeviceUrl.Device.DEFAULT)
    @ResponseBody
    public Result selectBuildingInfoList(@ModelAttribute DeviceDto deviceDto) {
        return ResponseUtil.process(deviceService.selectBuildingInfoList(deviceDto));
    }

    /**
     * 디바이스 저장
     */
    @PostMapping(ControllerUrlConstants.DeviceUrl.Device.SAVE)
    public Result insertDevice(DeviceDto deviceDto) {
        return ResponseUtil.process(deviceService.insertDevice(deviceDto));
    }
}
