package com.hbl.kms.app.building.mapper;

import com.hbl.kms.app.building.model.Building;
import com.hbl.kms.app.building.model.BuildingDto;
import com.hbl.kms.app.building.model.FloorInfo;
import com.hbl.kms.app.building.model.FloorInfoDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BuildingMapper {

    int insertBuilding(BuildingDto buildingDto);

    List<Building> selectBuildingList(BuildingDto buildingDto);

    int insertFloorInfo(FloorInfo floorInfo);

    List<FloorInfo> selectFloorInfoList(FloorInfoDto floorInfoDto);

    Building selectBuildingInfo(int buildSeq);

    FloorInfo selectBuildingFloorInfo(int buildSeq);
}
