package com.hbl.kms.app.building.mapper;

import com.hbl.kms.app.building.model.BuildingDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BuildingMapper {
    int buildingInsert(BuildingDto buildingDto);
}
