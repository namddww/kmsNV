package com.hbl.kms.app.building.mapper;

import com.hbl.kms.app.building.model.Building;
import com.hbl.kms.app.building.model.BuildingDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BuildingMapper {

    int buildingInsert(BuildingDto buildingDto);

    List<Building> selectBuildingList(BuildingDto buildingDto);
}
