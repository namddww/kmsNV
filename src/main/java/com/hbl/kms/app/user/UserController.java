package com.hbl.kms.app.user;

import com.hbl.kms.app.common.constants.ControllerUrlConstants;
import com.hbl.kms.app.common.model.Result;
import com.hbl.kms.app.common.model.utils.ResponseUtil;
import com.hbl.kms.app.login.model.Join;
import com.hbl.kms.app.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.ModelAndView;

@Slf4j
@Controller
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    /**
     * 회원가입 화면
     */
    @GetMapping(ControllerUrlConstants.UserUrl.User.SAVE_FORM)
    public ModelAndView userSaveForm(ModelAndView mav) {
        mav.setViewName("user/saveForm");
        return mav;
    }

    /**
     * 회원가입
     */
    @PostMapping(ControllerUrlConstants.UserUrl.User.SAVE)
    public Result saveUser(Join user) {
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        return ResponseUtil.process(userService.saveUser(user));
    }
}
