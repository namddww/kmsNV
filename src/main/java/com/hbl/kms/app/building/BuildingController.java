package com.hbl.kms.app.building;

import com.hbl.kms.app.building.model.BuildingDto;
import com.hbl.kms.app.building.model.FloorInfoDto;
import com.hbl.kms.app.building.model.FloorInfoPopupDto;
import com.hbl.kms.app.building.service.BuildingService;
import com.hbl.kms.app.common.constants.ControllerUrlConstants;
import com.hbl.kms.app.common.model.Result;
import com.hbl.kms.app.common.model.utils.ResponseUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;


@Controller
@RequiredArgsConstructor
public class BuildingController {

    private final BuildingService buildingService;

    // 건물 조회 화면
    @GetMapping(ControllerUrlConstants.BuildingUrl.Building.DEFAULT)
    public ModelAndView buildingList(ModelAndView mav) {
        mav.setViewName("building/buildingList");
        return mav;
    }

    // 건물 조회 데이터
    @GetMapping(ControllerUrlConstants.BuildingUrl.Building.SEARCH)
    @ResponseBody
    public Result buildingListData(@ModelAttribute BuildingDto buildingDto) {
        return ResponseUtil.process(buildingService.selectBuildingList(buildingDto));
    }

    // 건물 등록 화면
    @GetMapping(ControllerUrlConstants.BuildingUrl.Building.SAVE_FORM)
    public ModelAndView buildingSaveForm(ModelAndView mav) {
        mav.setViewName("building/saveForm");
        return mav;
    }

    // 건물 등록 좌표등록 팝업
    @GetMapping(ControllerUrlConstants.BuildingUrl.Building.POINT_POPUP)
    public ModelAndView pointPopup(ModelAndView mav) {
        mav.setViewName("building/pointPopup");
        return mav;
    }

    // 건물 등록 층정보 파일등록 팝업
    @GetMapping(ControllerUrlConstants.BuildingUrl.Building.FLOOR_POPUP)
    public ModelAndView floorPopup(ModelAndView mav, FloorInfoPopupDto floorInfoPopupDto) {
        mav.addObject("num", floorInfoPopupDto);
        mav.setViewName("building/floorPopup");
        return mav;
    }

    // 건물 등록
    @PostMapping(ControllerUrlConstants.BuildingUrl.Building.SAVE)
    @ResponseBody
    public Result insertBuilding(BuildingDto buildingDto) {
        return ResponseUtil.process(buildingService.insertBuilding(buildingDto));
    }

    // 층 정보 조회 데이터
    @GetMapping(ControllerUrlConstants.BuildingUrl.Building.SEARCH_FLOORINFO)
    @ResponseBody
    public Result floorInfoListData(@ModelAttribute FloorInfoDto floorInfoDto) {
        return ResponseUtil.process(buildingService.selectFloorInfoList(floorInfoDto));
    }

    // 건물 상세페이지
    @GetMapping(ControllerUrlConstants.BuildingUrl.Building.INFO)
    public ModelAndView buildingInfo(ModelAndView mav, @PathVariable("buildSeq") int buildSeq) {
        FloorInfoDto floorInfoDto = new FloorInfoDto();
        floorInfoDto.setBuildSeq(buildSeq);
        mav.addObject("building", buildingService.selectBuildingInfo(buildSeq));
        mav.addObject("floor", buildingService.selectFloorInfoList(floorInfoDto));
        mav.setViewName("building/buildingInfo");
        return mav;
    }

    // 건물 수정
    @PutMapping(ControllerUrlConstants.BuildingUrl.Building.UPDATE)
    @ResponseBody
    public Result updateBuilding(BuildingDto buildingDto) {
        return ResponseUtil.process(buildingService.updateBuilding(buildingDto));
    }

}
