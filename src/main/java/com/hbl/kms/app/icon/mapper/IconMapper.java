package com.hbl.kms.app.icon.mapper;

import com.hbl.kms.app.icon.model.Icon;
import com.hbl.kms.app.icon.model.IconDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface IconMapper {
    List<Icon> selectIconListData(IconDto iconDto);

    int selectIconCount(IconDto iconDto);

    int insertIcon(IconDto iconDto);

    Icon selectIconDetail(int iconSeq);

    int updateIcon(IconDto iconDto);

    Icon selectIconDetailByCodeVal(String codeVal);
}
