package com.hbl.kms.app.monitoring;

import com.hbl.kms.app.icon.model.Icon;
import com.hbl.kms.app.icon.service.IconService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequiredArgsConstructor
public class MonitoringController {

    private final IconService iconService;

    @GetMapping("/monitoringDevice")
    public ModelAndView monitoringDevice(ModelAndView mav) {
        String lock = "";
        String key = "";
        Icon iconLock = iconService.selectIconDetailByCodeVal("DEV00020");
        Icon iconKey = iconService.selectIconDetailByCodeVal("DEV00010");
        if(iconLock == null){
            lock = "default";
        }else{
            lock = iconLock.getIconPath();
        }
        if(iconKey == null){
            key = "default";
        }else{
            key = iconKey.getIconPath();
        }
        mav.addObject("lock", lock);
        mav.addObject("key", key);
        mav.setViewName("monitoring/monitoringDevice");

        return mav;
    }

    @GetMapping("/monitoringGeofence")
    public ModelAndView monitoringGeofence(ModelAndView mav) {
        mav.setViewName("monitoring/monitoringGeofence");
        return mav;
    }

}
