package com.hbl.kms.app.device;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hbl.kms.app.common.constants.ControllerUrlConstants;
import com.hbl.kms.app.common.model.Result;
import com.hbl.kms.app.common.model.utils.ResponseUtil;
import com.hbl.kms.app.device.model.AreaList;
import com.hbl.kms.app.device.model.DeviceDto;
import com.hbl.kms.app.device.model.LocationCd;
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
    private static final String codeDevGroupCd = "DEV";

    /**
     * 자산등록 목록화면
     */
    @GetMapping(ControllerUrlConstants.DeviceUrl.Device.DEFAULT)
    public ModelAndView deviceList(ModelAndView mav) {
        mav.setViewName("device/deviceList");

        String json = null;
        ObjectMapper mapper = new ObjectMapper();
        List<AreaList> areaList = deviceService.selectAreaList(codeDevGroupCd);

        try {
            json = mapper.writeValueAsString(areaList);
        } catch (JsonProcessingException e) {
            log.error("NoticeController.faqCategoryLists error {}", e);
        }
        mav.addObject("areaList", json);

        return mav;
    }

    /**
     * 자산정보 조회
     */
    @GetMapping(ControllerUrlConstants.DeviceUrl.Device.SEARCH_DEVICE)
    @ResponseBody
    public Result selectDeviceInfoList(@ModelAttribute DeviceDto deviceDto) {
        return ResponseUtil.process(deviceService.selectDeviceInfoList(deviceDto));
    }

    /**
     * 건물정보 조회
     */
    @GetMapping(ControllerUrlConstants.DeviceUrl.Device.SEARCH_BUILDING)
    @ResponseBody
    public Result selectBuildingInfoList(@ModelAttribute DeviceDto deviceDto) {
        return ResponseUtil.process(deviceService.selectBuildingInfoList(deviceDto));
    }

    /**
     * 자산등록 화면
     */
    @GetMapping(ControllerUrlConstants.DeviceUrl.Device.SAVE_FORM)
    public ModelAndView saveForm(@RequestParam(value = "buildSeq", required = false) Integer buildSeq
                                 , @RequestParam(value = "deviceSeq", required = false) Integer deviceSeq
                                 , ModelAndView mav) {
        mav.setViewName("device/saveForm");

        String json = null;
        ObjectMapper mapper = new ObjectMapper();
        List<AreaList> areaList = deviceService.selectAreaList(codeDevGroupCd);

        try {
            json = mapper.writeValueAsString(areaList);
        } catch (JsonProcessingException e) {
            log.error("NoticeController.faqCategoryLists error {}", e);
        }
        mav.addObject("typeList", json);

        // deviceSeq null 이면 신규 null이 아니면 업데이트
        if (deviceSeq != null) {
            mav.addObject("buildSeq", buildSeq);
            mav.addObject("deviceSeq", deviceSeq);
            mav.addObject("actionFlag", "UPDATE");
        } else {
            mav.addObject("actionFlag", "INSERT");
        }
        return mav;
    }

    /**
     * 자산등록 > 건물조회 팝업
     */
    @GetMapping(ControllerUrlConstants.DeviceUrl.Device.BUILDING_POPUP)
    public ModelAndView buildingPopup(ModelAndView mav) {
        mav.setViewName("device/buildingPopup");

        String json = null;
        ObjectMapper mapper = new ObjectMapper();
        List<LocationCd> locationList = deviceService.selectLocationCd();

        try {
            json = mapper.writeValueAsString(locationList);
        } catch (JsonProcessingException e) {
            log.error("NoticeController.faqCategoryLists error {}", e);
        }
        mav.addObject("locationList", json);
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

    // device 정보 조회 데이터
    @GetMapping(ControllerUrlConstants.DeviceUrl.Device.SEARCH_FLOOR)
    @ResponseBody
    public Result deviceListData(@ModelAttribute DeviceDto deviceDto) {
        return ResponseUtil.process(deviceService.selectDeviceListByFloor(deviceDto));
    }

    /**
     * 자산 상세정보조회
     */
    @PostMapping(ControllerUrlConstants.DeviceUrl.Device.SELECT_DEVICE_DETAIL)
    @ResponseBody
    public Result selectDeviceDetail(@ModelAttribute DeviceDto deviceDto) {
        return ResponseUtil.process(deviceService.selectDeviceDetail(deviceDto));
    }

    /**
     * 디바이스 수정
     */
    @PostMapping(ControllerUrlConstants.DeviceUrl.Device.UPDATE)
    @ResponseBody
    public Result updateDevice(DeviceDto deviceDto) {
        return ResponseUtil.process(deviceService.updateDevice(deviceDto));
    }

    /**
     * 디바이스 확대이미지 화면
     */
    @GetMapping(ControllerUrlConstants.DeviceUrl.Device.FLOOR_DEVICEINFO_POPUP)
    public ModelAndView floorDeviceInfoPopup(ModelAndView mav, DeviceDto deviceDto) {
        mav.setViewName("device/floorDeviceInfoPopup");

        String json = null;
        ObjectMapper mapper = new ObjectMapper();

        try {
            json = mapper.writeValueAsString(deviceDto.getDeviceInfoList());
        } catch (JsonProcessingException e) {
            log.error("NoticeController.faqCategoryLists error {}", e);
        }
        mav.addObject("deviceInfoList", json);
        mav.addObject("imagePath", deviceDto.getImgPath());

        return mav;
    }
}
