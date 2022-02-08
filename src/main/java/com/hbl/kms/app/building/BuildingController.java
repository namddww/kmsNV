package com.hbl.kms.app.building;

import com.hbl.kms.app.building.model.BuildingDto;
import com.hbl.kms.app.building.service.BuildingService;
import com.hbl.kms.app.common.model.Result;
import com.hbl.kms.app.common.model.utils.ResponseUtil;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;

@AllArgsConstructor
@Controller
public class BuildingController {

    private final BuildingService buildingService;

    // 건물등록
    public Result buildingInsert(BuildingDto buildingDto) {
        return ResponseUtil.process(buildingService.buildingInsert(buildingDto));
    }

}
