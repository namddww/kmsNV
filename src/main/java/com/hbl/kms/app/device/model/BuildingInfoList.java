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
     * 층정보 SEQ
     */
    private int floorSeq;
    /**
     * 디바이스 SEQ
     */
    private int deviceSeq;
    /**
     * 빌딩명
     */
    private String buildName;
    /**
     * 자산명
     */
    private String deviceName;
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
    /**
     * 층수
     */
    private int floor;
    /**
     * 기준좌표1(leftop_위도)
     */
    private String stdPoint1;
    /**
     * 기준좌표2(leftop_경도)
     */
    private String stdPoint2;
    /**
     * 영역좌표1(rightbotton_경도)
     */
    private String areaPoint1;
    /**
     * 영역좌표2(rightbotton_경도)
     */
    private String areaPoint2;
    /**
     * 지역코드
     */
    private String locationCd;
    /**
     * 타입 (코드값)
     */
    private String typeCd;
    /**
     * 상태코드
     */
    private String stateCd;
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
