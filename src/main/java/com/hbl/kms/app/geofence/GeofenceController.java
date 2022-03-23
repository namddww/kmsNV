package com.hbl.kms.app.geofence;

import com.hbl.kms.app.common.constants.ControllerUrlConstants;
import com.hbl.kms.app.common.model.Result;
import com.hbl.kms.app.common.model.utils.ResponseUtil;
import com.hbl.kms.app.geofence.model.GeofenceDto;
import com.hbl.kms.app.geofence.service.GeofenceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequiredArgsConstructor
public class GeofenceController {

    private final GeofenceService geofenceService;

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

}
