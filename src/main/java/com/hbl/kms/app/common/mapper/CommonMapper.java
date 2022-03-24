package com.hbl.kms.app.common.mapper;

import com.hbl.kms.app.device.model.CodeList;
import com.hbl.kms.app.device.model.LocationCd;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CommonMapper {

    List<CodeList> selectCodeListByGroupCd(String codeGroupCd);

    List<LocationCd> selectLocationCd();
}
