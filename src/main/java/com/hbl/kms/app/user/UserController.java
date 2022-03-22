package com.hbl.kms.app.user;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hbl.kms.app.common.constants.ControllerUrlConstants;
import com.hbl.kms.app.common.model.Code;
import com.hbl.kms.app.common.model.Result;
import com.hbl.kms.app.common.model.utils.ResponseUtil;
import com.hbl.kms.app.device.model.DeviceDto;
import com.hbl.kms.app.icon.model.IconDto;
import com.hbl.kms.app.login.model.Join;
import com.hbl.kms.app.user.model.User;
import com.hbl.kms.app.user.model.UserDto;
import com.hbl.kms.app.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@Slf4j
@Controller
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private static final String codeSexGroupCd = "SEX";

    /**
     * 사용자 목록록 화면
     */
    @GetMapping(ControllerUrlConstants.UserUrl.User.DEFAULT)
    public ModelAndView userList(ModelAndView mav) {
        mav.setViewName("user/userList");
        return mav;
    }

    /**
     * 사용자정보 조회
     */
    @PostMapping(ControllerUrlConstants.UserUrl.User.SEARCH)
    @ResponseBody
    public Result selectUserInfoList(@ModelAttribute UserDto userDto) {
        return ResponseUtil.process(userService.selectUserInfoList(userDto));
    }

    /**
     * 회원가입 화면
     */
    @GetMapping(ControllerUrlConstants.UserUrl.User.SAVE_FORM)
    public ModelAndView userSaveForm(@RequestParam(value = "userSeq", required = false) Integer userSeq
            , ModelAndView mav) {
        mav.setViewName("user/saveForm");

        // TODO : BANG 성별 조회해서 들어가자.
        String json = null;
        ObjectMapper mapper = new ObjectMapper();
        List<Code> sexCdList = userService.selectSexCdList(codeSexGroupCd);
        try{
            json = mapper.writeValueAsString(sexCdList);
        } catch (JsonProcessingException e) {
            log.error("UserController.selectSexCdList error {}", e);
        }

        // userSeq null 이면 신규 null이 아니면 업데이트
        if (userSeq != null) {
            mav.addObject("userSeq", userSeq);
            mav.addObject("actionFlag", "UPDATE");
        } else {
            mav.addObject("actionFlag", "INSERT");
        }
        mav.addObject("sexCdList", json);

        return mav;
    }

    /**
     * 아이디 중복 카운트 조회
     */
    @PostMapping(ControllerUrlConstants.UserUrl.User.SELECT_ID_COUNT)
    @ResponseBody
    public Result selectIdCount(UserDto userDto) {
        return ResponseUtil.process(userService.selectIdCount(userDto));
    }

    /**
     * 회원가입
     */
    @PostMapping(ControllerUrlConstants.UserUrl.User.SAVE)
    @ResponseBody
    public Result saveUser(User user) {
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        return ResponseUtil.process(userService.saveUser(user));
    }

    /**
     * 사용자 상세정보조회
     */
    @PostMapping(ControllerUrlConstants.UserUrl.User.SELECT_USER_DETAIL)
    @ResponseBody
    public Result selectUserDetail(@ModelAttribute UserDto userDto) {
        return ResponseUtil.process(userService.selectUserDetail(userDto));
    }

    /**
     * 사용자정보 수정
     */
    @PostMapping(ControllerUrlConstants.UserUrl.User.UPDATE)
    @ResponseBody
    public Result updateUser(UserDto userDto) {
        String encodedPassword = passwordEncoder.encode(userDto.getPassword());
        userDto.setPassword(encodedPassword);
        return ResponseUtil.process(userService.updateUser(userDto));
    }

}
