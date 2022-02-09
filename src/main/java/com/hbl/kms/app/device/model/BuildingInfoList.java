package com.hbl.kms.app.device.model;

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
     * 지상층
     */
    private int groundFloor;
    /**
     * 지하층
     */
    private int baseFloor;
    /**
     * 등록일
     */
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date regDate;
    /**
     * 등록자 (회원 번호)
     */
    private int regUser;
}
