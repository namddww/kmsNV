package com.hbl.kms.app.device.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.apache.ibatis.type.Alias;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Alias("buildingInfoList")
public class BuildingInfoList {
    /**
     * 빌딩 SEQ
     */
    private int buildSeq;
    /**
     * 빌딩명
     */
    private String buildName;
    /**
     * 주소 (주소1 + 주소2)
     */
    private String address;
    /**
     * 좌표 (기준좌표1 + 기준좌표2)
     */
    private String point;
    /**
     * 지상층
     */
    private int groundFloor;
    /**
     * 지하층
     */
    private int baseFloor;

    private String stdPoint1;
    private String stdPoint2;
    private String areaPoint1;
    private String areaPoint2;
    /**
     * 등록일
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private Date regDate;
    /**
     * 등록자 (회원 번호)
     */
    private int regUser;
}
