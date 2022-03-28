package com.hbl.kms.app.geofence;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hbl.kms.app.building.service.BuildingService;
import com.hbl.kms.app.common.constants.ControllerUrlConstants;
import com.hbl.kms.app.common.model.Result;
import com.hbl.kms.app.common.model.utils.ResponseUtil;
import com.hbl.kms.app.common.service.CommonService;
import com.hbl.kms.app.device.model.CodeList;
import com.hbl.kms.app.device.model.LocationCd;
import com.hbl.kms.app.device.service.DeviceService;
import com.hbl.kms.app.geofence.model.Geofence;
import com.hbl.kms.app.geofence.model.GeofenceDto;
import com.hbl.kms.app.geofence.model.GeofenceInfo;
import com.hbl.kms.app.geofence.service.GeofenceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class GeofenceController {

    private final GeofenceService geofenceService;
    private final CommonService commonService;
    private final DeviceService deviceService;

    //geofence list 조회 화면
    @GetMapping(ControllerUrlConstants.GeofenceUrl.Geofence.DEFAULT)
    public ModelAndView geofenceList(ModelAndView mav) {
        mav.setViewName("geofence/geofenceList");
        return mav;
    }

    //geofence list 조회 데이터
    @GetMapping(ControllerUrlConstants.GeofenceUrl.Geofence.SEARCH)
    @ResponseBody
    public Result geofenceListData(@ModelAttribute GeofenceDto geofenceDto) {
        return ResponseUtil.process(geofenceService.selectGeofenceList(geofenceDto));
    }

    //geofence 등록 화면
    @GetMapping(ControllerUrlConstants.GeofenceUrl.Geofence.SAVE_FORM)
    public ModelAndView geofenceSaveForm(ModelAndView mav) {
        mav.setViewName("geofence/saveForm");

        List<CodeList> dloList = commonService.selectCodeListByGroupCd("DLO");
        List<CodeList> staList = commonService.selectCodeListByGroupCd("STA");
        String jsonDlo = null;
        String jsonSta = null;
        ObjectMapper mapper = new ObjectMapper();
        try {
            jsonDlo = mapper.writeValueAsString(dloList);
            jsonSta = mapper.writeValueAsString(staList);
        } catch (JsonProcessingException e) {

        }
        mav.addObject("dloList", jsonDlo);
        mav.addObject("staList", jsonSta);
        return mav;
    }

    //geofence 설치위치 등록 팝업
    @GetMapping(ControllerUrlConstants.GeofenceUrl.Geofence.SETPOINT_POPUP)
    public ModelAndView setPointPopup(ModelAndView mav
            , @RequestParam(value = "buildSeq", required = true) int buildSeq
            , @RequestParam(value = "floor", required = true) int floor) {

        String imagePath = deviceService.selectFloorFilePath(buildSeq, floor);
        mav.addObject("imagePath", imagePath);
        mav.setViewName("geofence/setPointPopup");
        return mav;
    }

    //geofence 좌표등록 팝업
    @GetMapping(ControllerUrlConstants.GeofenceUrl.Geofence.POINT_POPUP)
    public ModelAndView pointPopup(ModelAndView mav
            , @RequestParam(value = "buildSeq", required = true) int buildSeq
            , @RequestParam(value = "floor", required = true) int floor) {

        String imagePath = deviceService.selectFloorFilePath(buildSeq, floor);
        mav.addObject("imagePath", imagePath);
        mav.setViewName("geofence/pointPopup");
        return mav;
    }

    //geofence 등록
    @PostMapping(ControllerUrlConstants.GeofenceUrl.Geofence.SAVE)
    @ResponseBody
    public Result insertGeofence(GeofenceDto geofenceDto) {
        return ResponseUtil.process(geofenceService.insertGeofence(geofenceDto));
    }

    //geofence 상세페이지
    @GetMapping(ControllerUrlConstants.GeofenceUrl.Geofence.INFO)
    public ModelAndView geofenceInfo(ModelAndView mav, @PathVariable("geofenceSeq") int geofenceSeq) {
        Geofence geofence = geofenceService.selectGeofence(geofenceSeq);
        GeofenceInfo geofenceInfo = geofenceService.selectGeofenceInfo(geofenceSeq);
        mav.setViewName("geofence/geofenceInfo");
        return mav;
    }

}
