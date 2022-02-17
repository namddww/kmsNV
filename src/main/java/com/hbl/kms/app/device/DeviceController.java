package com.hbl.kms.app.device;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hbl.kms.app.common.constants.ControllerUrlConstants;
import com.hbl.kms.app.common.model.Result;
import com.hbl.kms.app.common.model.utils.ResponseUtil;
import com.hbl.kms.app.device.model.AreaList;
import com.hbl.kms.app.device.model.DeviceDto;
import com.hbl.kms.app.device.service.DeviceService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@Slf4j
@AllArgsConstructor
@Controller
public class DeviceController {

    private final DeviceService deviceService;
    private static final String codeGroupCd = "ACD";

    /**
     * 자산등록 목록화면
     */
    @GetMapping(ControllerUrlConstants.DeviceUrl.Device.DEFAULT)
    public ModelAndView deviceList(ModelAndView mav) {
        mav.setViewName("device/deviceList");

        String json = null;
        ObjectMapper mapper = new ObjectMapper();
        List<AreaList> areaList = deviceService.selectAreaList(codeGroupCd);

        try {
            json = mapper.writeValueAsString(areaList);
        } catch (JsonProcessingException e) {
            log.error("NoticeController.faqCategoryLists error {}", e);
        }
        mav.addObject("areaList", json);
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
    public ModelAndView devicePointPopup(ModelAndView mav
            , @RequestParam(value = "buildSeq", required = true) int buildSeq
            , @RequestParam(value = "floor", required = true) int floor) {
        mav.setViewName("device/devicePointPopup");

        // buildSeq, floor 정보로 층 파일정보 조회
        String imagePath = deviceService.selectFloorFilePath(buildSeq, floor);
        mav.addObject("imagePath", imagePath);

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
