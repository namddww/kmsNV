package com.hbl.kms.app.building.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.hbl.kms.app.building.mapper.BuildingMapper;
import com.hbl.kms.app.building.model.Building;
import com.hbl.kms.app.building.model.BuildingDto;
import com.hbl.kms.app.building.model.FloorInfo;
import com.hbl.kms.app.building.model.FloorInfoDto;
import com.hbl.kms.app.common.model.utils.UploadUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

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
            floorInfo.setOpacity(buildingDto.getFloorInfo().get(i).getOpacity());
            buildingMapper.insertFloorInfo(floorInfo);
        }

        return 1;
    }

    public List<FloorInfo> selectFloorInfoList(FloorInfoDto floorInfoDto) {
        return buildingMapper.selectFloorInfoList(floorInfoDto);
    }

    public Building selectBuildingInfo(int buildSeq) {
        return buildingMapper.selectBuildingInfo(buildSeq);
    }

    public int updateBuilding(BuildingDto buildingDto) {
        buildingMapper.updateBuilding(buildingDto);

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
                floorInfo.setFilePath(buildingDto.getFloorInfo().get(i).getFilePath());
            }
            floorInfo.setOpacity(buildingDto.getFloorInfo().get(i).getOpacity());
            floorInfo.setFloorSeq(buildingDto.getFloorInfo().get(i).getFloorSeq());
            floorInfo.setIsUse(buildingDto.getFloorInfo().get(i).getIsUse());
            buildingMapper.updateFloorInfo(floorInfo);
        }
        return 1;
    }
}
