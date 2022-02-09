package com.hbl.kms.app.building;

import com.hbl.kms.app.building.model.BuildingDto;
import com.hbl.kms.app.building.service.BuildingService;
import com.hbl.kms.app.common.model.Result;
import com.hbl.kms.app.common.model.utils.ResponseUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;


@Controller
@RequiredArgsConstructor
public class BuildingController {

    private final BuildingService buildingService;

    @GetMapping("/buildingList")
    public ModelAndView buildingList(ModelAndView mav) {
        mav.setViewName("building/buildingList");
        return mav;
    }

    // 건물 조회
    @GetMapping("/buildingListData")
    @ResponseBody
    public Result buildingListData(@ModelAttribute BuildingDto buildingDto) {
        return ResponseUtil.process(buildingService.selectBuildingList(buildingDto));
    }


    // 건물 등록
    public Result buildingInsert(BuildingDto buildingDto) {
        return ResponseUtil.process(buildingService.buildingInsert(buildingDto));
    }

}
