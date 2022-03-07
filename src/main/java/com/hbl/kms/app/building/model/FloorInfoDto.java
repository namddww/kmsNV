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
     * 층seq
     */
    private int floorSeq;

    /**
     * 빌딩seq
     */
    private int buildSeq;

    /**
     * 층수
     */
    private int floor;
    /**
     * 도면파일
     */
    private MultipartFile file;

    /**
     * 도면파일경로
     */
    private String filePath;

    /**
     * 도면투명도
     */
    private int opacity;

    /**
     * 사용여부
     */
    private String isUse;

}
