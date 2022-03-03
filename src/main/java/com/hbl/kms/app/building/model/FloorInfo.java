package com.hbl.kms.app.building.model;

import lombok.*;
import org.apache.ibatis.type.Alias;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Alias("floorInfo")
public class FloorInfo {
    /**
     * 층 SEQ
     */
    private int floorSeq;
    /**
     * 빌딩 SEQ
     */
    private int buildSeq;
    /**
     * 층수
     */
    private int floor;
    /**
     * 도면파일경로
     */
    private String filePath;
    /**
     * 사용여부
     */
    private String isUse;

    /**
     * 도면투명도
     */
    private int opacity;

}
