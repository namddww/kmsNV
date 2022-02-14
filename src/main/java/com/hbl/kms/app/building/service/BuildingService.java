package com.hbl.kms.app.building.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.hbl.kms.app.building.mapper.BuildingMapper;
import com.hbl.kms.app.building.model.Building;
import com.hbl.kms.app.building.model.BuildingDto;
import com.hbl.kms.app.building.model.FloorInfo;
import com.hbl.kms.app.common.model.utils.UploadUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
@Service
public class BuildingService {

    private final BuildingMapper buildingMapper;

    public PageInfo<Building> selectBuildingList(BuildingDto buildingDto) {
        PageHelper.startPage(buildingDto);
        return PageInfo.of(buildingMapper.selectBuildingList(buildingDto), buildingDto.getNavigatePages());
    }

    public int insertBuilding(BuildingDto buildingDto) {
        buildingMapper.insertBuilding(buildingDto);
        for(int i=0; i<buildingDto.getFloorInfo().size(); i++){
            FloorInfo floorInfo = new FloorInfo();
            if(buildingDto.getFloorInfo().get(i).getFile() != null){
                try {
                    String filePath = UploadUtil.uploadImage("building", buildingDto.getFloorInfo().get(i).getFile());
                    floorInfo.setFilePath(filePath);

                } catch (IOException e) {
                    e.printStackTrace();
                }
            }else{

            }
            floorInfo.setBuildSeq(buildingDto.getBuildSeq());
            floorInfo.setFloor(buildingDto.getFloorInfo().get(i).getFloor());
            buildingMapper.insertFloorInfo(floorInfo);
        }

        return 1;
    }

}
