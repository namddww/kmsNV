package com.hbl.kms.app.login;

import com.hbl.kms.app.common.constants.ControllerUrlConstants;
import com.hbl.kms.app.common.model.Result;
import com.hbl.kms.app.common.model.utils.ResponseUtil;
import com.hbl.kms.app.common.model.utils.smsUtil;
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
     * 인증번호 전송
     */
    @PostMapping(ControllerUrlConstants.JoinUrl.Join.AUTH_KEY)
    @ResponseBody
    public Result authKey(Join join) {

        // 1. 인증번호 생성
        String smsKey = smsUtil.makeSMSKey(6);
        log.info("smsKey : {}", smsKey);
        // TODO : BANG 임시로 1234 설정
        smsKey = "1234";

        // 2. DB에 사용자 ID와 인증번호 저장
        log.info("join UserId : {}", join.getUserId());

        // 3. 인증번호 전송

        return ResponseUtil.process(smsKey);
    }

    /**
     * 로그인
     */
    @PostMapping(ControllerUrlConstants.JoinUrl.Join.LOGIN)
    @ResponseBody
    public Result login(Join join, HttpServletRequest request) {

        // 사용자 조회 및 검증
        String resultMsg = validationLogin(join, request);
        if (!resultMsg.equals("SUCCESS")) {
            // TODO : BANG 실패카운트 업데이트
            // 1. 실패카운트 업데이트
            // DB테이블 없음
//            joinService.updateFailCount(join.getUserId());

            return ResponseUtil.process(resultMsg);
        }
        return ResponseUtil.process(resultMsg);
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
    public String validationLogin(Join join, HttpServletRequest request) {
        Join loginJoin = joinService.findByUserId(join.getUserId());

        // 1. 유저 체크
        if(loginJoin ==null) {
            log.info("해당 아이디의 유저가 존재하지 않습니다.");
            return "해당 아이디의 유저가 존재하지 않습니다.";
        }

        // 2. 비밀번호 체크
        if(!passwordEncoder.matches(join.getPassword(), loginJoin.getPassword())) {
            log.info("비밀번호가 일치하지 않습니다.");
            return "비밀번호가 일치하지 않습니다.";
        }

        // 3. 인증번호 체크
        if(join.getAuthKey() != 0) {
            // DB테이블 없음
//            int authDbValue = joinService.selectAuthKey(join.getUserId(), join.getAuthKey());
            // TODO : BANG 임시로 1234 설정
            int authDbValue = 1234;
            if (join.getAuthKey() != authDbValue) {
                log.info("인증번호가 일치하지 않습니다.");
                return "인증번호가 일치하지 않습니다.";
            }
        }

        // 2. 5회 로그인 실패 체크
        
        // 3. 6개월 이상 미사용 체크
        

        joinService.updateUserLastDate(join.getUserId());
        // 세션 저장
        HttpSession session = request.getSession();
        session.setAttribute("userId", join.getUserId());
        session.setAttribute("loginUser", loginJoin);
        session.setMaxInactiveInterval(1800); // 일단 유지시간 30분 설정

        return "SUCCESS";
    }
}
