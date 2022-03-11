package com.hbl.kms.app.icon.mapper;

import com.hbl.kms.app.icon.model.IconDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface IconMapper {
    int selectIconCount(IconDto iconDto);

    int insertIcon(IconDto iconDto);
}
