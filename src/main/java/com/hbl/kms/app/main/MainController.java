package com.hbl.kms.app.main;

import com.hbl.kms.app.icon.model.Icon;
import com.hbl.kms.app.icon.service.IconService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequiredArgsConstructor
public class MainController {

    private final IconService iconService;

    @GetMapping("/main")
    public ModelAndView main(ModelAndView mav) {
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
        mav.setViewName("main/main");

        return mav;
    }

}
