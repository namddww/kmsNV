package com.hbl.kms.app.login;

import com.hbl.kms.app.common.constants.ControllerUrlConstants;
import com.hbl.kms.app.common.model.Result;
import com.hbl.kms.app.common.model.utils.ResponseUtil;
import com.hbl.kms.app.login.model.Join;
import com.hbl.kms.app.login.service.JoinService;
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
public class JoinController {

    private final JoinService joinService;

    private final PasswordEncoder passwordEncoder;

    /**
     * 로그인 화면
     */
    @GetMapping(ControllerUrlConstants.JoinUrl.Join.DEFAULT)
    public ModelAndView loginForm(ModelAndView mav) {
        mav.setViewName("join/loginForm");
        return mav;
    }

    /**
     * 로그인
     */
    @PostMapping(ControllerUrlConstants.JoinUrl.Join.LOGIN)
    @ResponseBody
    public Result login(Join user, HttpServletRequest request) {

        // 사용자 조회 및 검증
        if (!validationLogin(user.getUserId(), user.getPassword(), request)) {
            return ResponseUtil.process(false);
        }
        
        // 세션 저장
        HttpSession session = request.getSession();
        session.setAttribute("userId", user.getUserId());
        session.setAttribute("userInfo", user);
        session.setMaxInactiveInterval(1800); // 일단 유지시간 30분 설정

        return ResponseUtil.process(true);
    }

    /**
     * 로그아웃
     * @param session
     */
    @GetMapping(ControllerUrlConstants.JoinUrl.Join.LOGOUT)
    public void logOut(HttpSession session) {
        session.invalidate();
    }

    /**
     * 회원정보 검증
     */
    public boolean validationLogin(String id, String password, HttpServletRequest request) {
        Join loginJoin = joinService.findByUserId(id);

        if(loginJoin ==null) {
            log.info("해당 아이디의 유저가 존재하지 않습니다.");
            return false;
        }

        if(!passwordEncoder.matches(password, loginJoin.getPassword())) {
            log.info("비밀번호가 일치하지 않습니다.");
            return false;
        }

        joinService.updateUserLastDate(id);
        // 세션 저장
        HttpSession session = request.getSession();
        session.setAttribute("loginUser", loginJoin);
        session.setMaxInactiveInterval(1800); // 일단 유지시간 30분 설정

        return true;
    }
}
