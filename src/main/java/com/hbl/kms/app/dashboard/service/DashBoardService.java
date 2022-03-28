package com.hbl.kms.app.dashboard.service;

import com.hbl.kms.app.dashboard.mapper.DashBoardMapper;
import com.hbl.kms.app.dashboard.model.DashBoard;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class DashBoardService {

    private final DashBoardMapper dashBoardMapper;

    public DashBoard selectAllCount() {
        return dashBoardMapper.selectAllCount();
    }

    public List<DashBoard> selectInOutCount(String codeVal) {
        return dashBoardMapper.selectInOutCount(codeVal);
    }
}
