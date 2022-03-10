package com.hbl.kms.app.device;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hbl.kms.app.building.model.FloorInfoDto;
import com.hbl.kms.app.common.constants.ControllerUrlConstants;
import com.hbl.kms.app.common.model.Result;
import com.hbl.kms.app.common.model.utils.ResponseUtil;
import com.hbl.kms.app.device.model.AreaList;
import com.hbl.kms.app.device.model.DeviceDto;
import com.hbl.kms.app.device.model.DeviceInfoList;
import com.hbl.kms.app.device.service.DeviceService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@AllArgsConstructor
@Controller
public class DeviceController {

    private final DeviceService deviceService;
    private static final String codeAcdGroupCd = "ACD";
    private static final String codeDevGroupCd = "DEV";

    /**
     * 자산등록 목록화면
     */
    @GetMapping(ControllerUrlConstants.DeviceUrl.Device.DEFAULT)
    public ModelAndView deviceList(ModelAndView mav) {
        mav.setViewName("device/deviceList");

        String json = null;
        ObjectMapper mapper = new ObjectMapper();
        List<AreaList> areaList = deviceService.selectAreaList(codeAcdGroupCd);

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
    public ModelAndView saveForm(ModelAndView mav) {
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

        String json = null;
        ObjectMapper mapper = new ObjectMapper();
        // buildSeq, floor 정보로 층 파일정보 조회
        String imagePath = deviceService.selectFloorFilePath(buildSeq, floor);

        try {
            json = mapper.writeValueAsString(imagePath);
        } catch (JsonProcessingException e) {
            log.error("NoticeController.faqCategoryLists error {}", e);
        }
        mav.addObject("imagePath", json);

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
     * 디바이스 확대이미지 화면
     */
    @GetMapping(ControllerUrlConstants.DeviceUrl.Device.FLOOR_DEVICEINFO_POPUP)
    public ModelAndView floorDeviceInfoPopup(ModelAndView mav, DeviceDto deviceDto) {
        mav.setViewName("device/floorDeviceInfoPopup");

        String json = null;
        ObjectMapper mapper = new ObjectMapper();

        // TODO : TEST 시작
        /*List<DeviceInfoList> deviceInfoList = new ArrayList<>();
        deviceInfoList.add(0, new DeviceInfoList());
        deviceInfoList.get(0).setTop("10%");
        deviceInfoList.get(0).setLeft("10%");
        deviceInfoList.get(0).setType("자물쇠");
        deviceInfoList.get(0).setImgPath("/assets/testImg/test.jpg");
        deviceInfoList.add(1, new DeviceInfoList());
        deviceInfoList.get(1).setTop("20%");
        deviceInfoList.get(1).setLeft("20%");
        deviceInfoList.get(1).setType("자물쇠");
        deviceInfoList.get(1).setImgPath("/assets/testImg/test.jpg");
        deviceInfoList.add(2, new DeviceInfoList());
        deviceInfoList.get(2).setTop("30%");
        deviceInfoList.get(2).setLeft("30%");
        deviceInfoList.get(2).setType("열쇠");
        deviceInfoList.get(2).setImgPath("/assets/testImg/test.jpg");
        deviceInfoList.add(3, new DeviceInfoList());
        deviceInfoList.get(3).setTop("40%");
        deviceInfoList.get(3).setLeft("40%");
        deviceInfoList.get(3).setType("열쇠");
        deviceInfoList.get(3).setImgPath("/assets/testImg/test.jpg");
        deviceInfoList.add(4, new DeviceInfoList());
        deviceInfoList.get(4).setTop("50%");
        deviceInfoList.get(4).setLeft("50%");
        deviceInfoList.get(4).setType("자물쇠");
        deviceInfoList.get(4).setImgPath("/assets/testImg/test.jpg");
        deviceInfoList.add(5, new DeviceInfoList());
        deviceInfoList.get(5).setTop("60%");
        deviceInfoList.get(5).setLeft("60%");
        deviceInfoList.get(5).setType("열쇠");
        deviceInfoList.get(5).setImgPath("/assets/testImg/test.jpg");
        deviceDto.setDeviceInfoList(deviceInfoList);*/
        // TODO : TEST 종료

        try {
            json = mapper.writeValueAsString(deviceDto.getDeviceInfoList());
        } catch (JsonProcessingException e) {
            log.error("NoticeController.faqCategoryLists error {}", e);
        }
        mav.addObject("deviceInfoList", json);
        mav.addObject("imgPath", deviceDto.getImgPath());

        return mav;
    }
}
