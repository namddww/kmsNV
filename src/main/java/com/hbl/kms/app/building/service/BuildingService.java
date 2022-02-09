package com.hbl.kms.app.building.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.hbl.kms.app.building.mapper.BuildingMapper;
import com.hbl.kms.app.building.model.Building;
import com.hbl.kms.app.building.model.BuildingDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class BuildingService {

    private final BuildingMapper buildingMapper;

    public int buildingInsert(BuildingDto buildingDto) {
        return buildingMapper.buildingInsert(buildingDto);
    }

    public PageInfo<Building> selectBuildingList(BuildingDto buildingDto) {
        PageHelper.startPage(buildingDto);
        return PageInfo.of(buildingMapper.selectBuildingList(buildingDto), buildingDto.getNavigatePages());
    }
}
