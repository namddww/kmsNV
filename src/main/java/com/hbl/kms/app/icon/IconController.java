package com.hbl.kms.app.icon;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hbl.kms.app.common.constants.ControllerUrlConstants;
import com.hbl.kms.app.common.model.Result;
import com.hbl.kms.app.common.model.utils.ResponseUtil;
import com.hbl.kms.app.common.service.CommonService;
import com.hbl.kms.app.device.model.CodeList;
import com.hbl.kms.app.icon.model.IconDto;
import com.hbl.kms.app.icon.service.IconService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@Slf4j
@Controller
@RequiredArgsConstructor
public class IconController {

    private final IconService iconService;
    private final CommonService commonService;
    private static final String codeDevGroupCd = "DEV";

    /**
     * 아이콘 목록 화면
     */
    @GetMapping(ControllerUrlConstants.IconUrl.Icon.DEFAULT)
    public ModelAndView iconList(ModelAndView mav) {
        mav.setViewName("icon/iconList");

        String json = null;
        ObjectMapper mapper = new ObjectMapper();
        List<CodeList> typeList = commonService.selectCodeListByGroupCd(codeDevGroupCd);

        try {
            json = mapper.writeValueAsString(typeList);
        } catch (JsonProcessingException e) {
            log.error("NoticeController.faqCategoryLists error {}", e);
        }
        mav.addObject("typeList", json);

        return mav;
    }

    @PostMapping(ControllerUrlConstants.IconUrl.Icon.SEARCH_ICON)
    @ResponseBody
    public Result selectIconListData(@ModelAttribute IconDto iconDto) {
        return ResponseUtil.process(iconService.selectIconListData(iconDto));
    }

    /**
     * 아이콘 등록 및 수정 화면
     */
    @GetMapping(ControllerUrlConstants.IconUrl.Icon.SAVE_FORM)
    public ModelAndView iconSaveForm(@RequestParam(value = "iconSeq", required = false) Integer iconSeq
            , ModelAndView mav) {
        mav.setViewName("icon/saveForm");

        String json = null;
        ObjectMapper mapper = new ObjectMapper();
        List<CodeList> typeList = commonService.selectCodeListByGroupCd(codeDevGroupCd);

        try {
            json = mapper.writeValueAsString(typeList);
        } catch (JsonProcessingException e) {
            log.error("NoticeController.faqCategoryLists error {}", e);
        }
        mav.addObject("typeList", json);

        // iconSeq가 null 이면 신규 null이 아니면 업데이트
        if (iconSeq != null) {
            mav.addObject("iconSeq", iconSeq);
            mav.addObject("actionFlag", "UPDATE");
        } else {
            mav.addObject("actionFlag", "INSERT");
        }

        return mav;
    }

    /**
     * 아이콘 중복 카운트 조회
     */
    @PostMapping(ControllerUrlConstants.IconUrl.Icon.SELECT_ICON_COUNT)
    @ResponseBody
    public Result selectIconCount(IconDto iconDto) {
        return ResponseUtil.process(iconService.selectIconCount(iconDto));
    }

    /**
     * 아이콘 저장
     */
    @PostMapping(ControllerUrlConstants.IconUrl.Icon.SAVE)
    @ResponseBody
    public Result insertIcon(IconDto iconDto) {
        return ResponseUtil.process(iconService.insertIcon(iconDto));
    }

    /**
     * 아이콘 상세정보 조회
     */
    @PostMapping(ControllerUrlConstants.IconUrl.Icon.SELECT_ICON_DETAIL)
    @ResponseBody
    public Result selectIconDetail(@RequestParam(value = "iconSeq", required = true) Integer iconSeq) {
        return ResponseUtil.process(iconService.selectIconDetail(iconSeq));
    }

    /**
     * 아이콘 수정
     */
    @PostMapping(ControllerUrlConstants.IconUrl.Icon.UPDATE)
    @ResponseBody
    public Result updateIcon(IconDto iconDto) {
        return ResponseUtil.process(iconService.updateIcon(iconDto));
    }

}
