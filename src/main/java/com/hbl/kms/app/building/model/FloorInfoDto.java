package com.hbl.kms.app.building.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

/**
 * 건물등록 층별정보
 */

@Getter
@Setter
public class FloorInfoDto {

    /**
     * 층수
     */
    private int floor;
    /**
     * 도면파일경로
     */
    private MultipartFile file;

}
