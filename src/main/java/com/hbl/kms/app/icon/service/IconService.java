package com.hbl.kms.app.icon.service;

import com.hbl.kms.app.common.model.Result;
import com.hbl.kms.app.common.model.utils.UploadUtil;
import com.hbl.kms.app.icon.mapper.IconMapper;
import com.hbl.kms.app.icon.model.IconDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;

@RequiredArgsConstructor
@Service
public class IconService {

    private final IconMapper iconMapper;

    public int selectIconCount(IconDto iconDto) {
        return iconMapper.selectIconCount(iconDto);
    }

    public int insertIcon(IconDto iconDto) {
        try {
            // 넘겨받은 파일경로를 설정경로에 맞춰서 변경
            // 설정경로 : C://upload/images/
            String iconPath = UploadUtil.uploadImage("iconMarker", iconDto.getFile());
            iconDto.setIconPath(iconPath);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return iconMapper.insertIcon(iconDto);
    }
}
