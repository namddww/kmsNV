package com.hbl.kms.app.login;

import com.hbl.kms.app.common.constants.ControllerUrlConstants;
import com.hbl.kms.app.common.model.Result;
import com.hbl.kms.app.common.model.utils.ResponseUtil;
import com.hbl.kms.app.login.model.User;
import com.hbl.kms.app.login.service.LoginService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Slf4j
@Controller
@RequiredArgsConstructor
public class LoginController {

    private final LoginService loginService;

    private final PasswordEncoder passwordEncoder;

    /**
     * 로그인 화면
     */
    @GetMapping(ControllerUrlConstants.LoginUrl.Login.DEFAULT)
    public ModelAndView loginForm(ModelAndView mav) {
        mav.setViewName("user/loginForm");
        return mav;
    }

    /**
     * 회원가입 화면
     */
    @GetMapping(ControllerUrlConstants.LoginUrl.Login.SAVE_FORM)
    public ModelAndView userSaveForm(ModelAndView mav) {
        mav.setViewName("user/saveForm");
        return mav;
    }

    /**
     * 회원가입
     */
    @PostMapping(ControllerUrlConstants.LoginUrl.Login.SAVE)
    public Result saveUser(User user) {
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        return ResponseUtil.process(loginService.saveUser(user));
    }

    /**
     * 로그인
     */
    @PostMapping(ControllerUrlConstants.LoginUrl.Login.LOGIN)
    @ResponseBody
    public Result login(User user, HttpServletRequest request) {

        // 사용자 조회 및 검증
        if (!validationLogin(user.getUserId(), user.getPassword(), request)) {
            return ResponseUtil.process("실패");
        }
        
        // 세션 저장
//        HttpSession session = request.getSession();
//        session.setAttribute("userInfo", "유저정보 넣을까?");
//        session.setMaxInactiveInterval(1800); // 일단 유지시간 30분 설정

        return ResponseUtil.process("성공");
    }

    /**
     * 로그아웃
     * @param session
     */
    @GetMapping(ControllerUrlConstants.LoginUrl.Login.LOGOUT)
    public void logOut(HttpSession session) {
        session.invalidate();
    }

    /**
     * 회원정보 검증
     */
    public boolean validationLogin(String id, String password, HttpServletRequest request) {
        User loginUser = loginService.findByUserId(id);

        if(loginUser==null) {
            log.info("해당 아이디의 유저가 존재하지 않습니다.");
            return false;
        }

        if(!passwordEncoder.matches(password, loginUser.getPassword())) {
            log.info("비밀번호가 일치하지 않습니다.");
            return false;
        }

        loginService.updateUserLastDate(id);
        // 세션 저장
        HttpSession session = request.getSession();
        session.setAttribute("loginUser", loginUser);
        session.setMaxInactiveInterval(1800); // 일단 유지시간 30분 설정

        return true;
    }
}
