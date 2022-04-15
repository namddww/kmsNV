package com.hbl.kms.app.dashboard;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hbl.kms.app.common.constants.ControllerUrlConstants;
import com.hbl.kms.app.dashboard.model.DashBoard;
import com.hbl.kms.app.dashboard.service.DashBoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@Slf4j
@Controller
@RequiredArgsConstructor
public class DashboardController {

    private final DashBoardService dashBoardService;
    private final String IN_CODE = "DLO00010";
    private final String OUT_CODE = "DLO00020";

    /**
     * 대쉬보드
     */
    @GetMapping(ControllerUrlConstants.DashBoardUrl.DashBoard.DEFAULT)
    public ModelAndView dashboard(ModelAndView mav) {
        mav.setViewName("dashboard/dashboard");

        String json = null;
        ObjectMapper mapper = new ObjectMapper();

        // 전체장비현황 카운트
        DashBoard allCount = dashBoardService.selectAllCount();

        // 실내 장비현황 카운트
        List<DashBoard> inCount = dashBoardService.selectInCount(IN_CODE);

        // 실외 장비현황 카운트
        List<DashBoard> outCount = dashBoardService.selectOutCount();

        try {
            json = mapper.writeValueAsString(allCount);
            mav.addObject("allCount", json);

            json = mapper.writeValueAsString(inCount);
            mav.addObject("inCount", json);

            json = mapper.writeValueAsString(outCount);
            mav.addObject("outCount", json);
        } catch (JsonProcessingException e) {
            log.error("NoticeController.faqCategoryLists error {}", e);
        }

        return mav;
    }
}
