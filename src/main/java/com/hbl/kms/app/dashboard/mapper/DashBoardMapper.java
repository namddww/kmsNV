package com.hbl.kms.app.dashboard.mapper;

import com.hbl.kms.app.dashboard.model.DashBoard;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface DashBoardMapper {

    DashBoard selectAllCount();

    List<DashBoard> selectInCount(String codeVal);

    List<DashBoard> selectOutCount();
}
