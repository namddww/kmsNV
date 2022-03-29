package com.hbl.kms.app.main;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequiredArgsConstructor
public class MainController {

    /**
     * 홈화면
     */
    @GetMapping("/home")
    public ModelAndView home(ModelAndView mav) {
        mav.setViewName("home/home");

        return mav;
    }

}
