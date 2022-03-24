package com.hbl.kms.app.common.service;

import com.hbl.kms.app.common.mapper.CommonMapper;
import com.hbl.kms.app.device.model.CodeList;
import com.hbl.kms.app.device.model.LocationCd;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommonService {

    private final CommonMapper commonMapper;

    public List<CodeList> selectCodeListByGroupCd(String codeGroupCd) {
        return commonMapper.selectCodeListByGroupCd(codeGroupCd);
    }

    public List<LocationCd> selectLocationCd() {
        return commonMapper.selectLocationCd();
    }

}
