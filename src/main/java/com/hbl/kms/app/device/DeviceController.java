package com.hbl.kms.app.device;

import com.hbl.kms.app.common.constants.ControllerUrlConstants;
import com.hbl.kms.app.common.model.Result;
import com.hbl.kms.app.common.model.utils.ResponseUtil;
import com.hbl.kms.app.device.model.DeviceDto;
import com.hbl.kms.app.device.service.DeviceService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;

@AllArgsConstructor
@Controller
public class DeviceController {

    private final DeviceService deviceService;

    /**
     * 디바이스 저장
     */
    @PostMapping(ControllerUrlConstants.DeviceUrl.Device.SAVE)
    public Result deviceInsert(DeviceDto deviceDto) {
        return ResponseUtil.process(deviceService.deviceInsert(deviceDto));
    }
}
