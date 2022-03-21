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
@Alias("deviceDetail")
public class DeviceDetail {
    /**
     * 디바이스 SEQ
     */
    private int deviceSeq;
    /**
     * 빌딩 SEQ
     */
    private int buildSeq;
    /**
     * 층 SEQ
     */
    private int floorSeq;
    /**
     * 건물명
     */
    private String buildName;
    /**
     * 지역명
     */
    private String locationCd;
    /**
     * 지상층
     */
    private int groundFloor;
    /**
     * 지하층
     */
    private int baseFloor;
    /**
     * 주소 (주소1 + 주소2)
     */
    private String address;
    /**
     * 자산명
     */
    private String deviceName;
    /**
     * 층수
     */
    private int floor;
    /**
     * 타입 (코드값)
     */
    private String typeCd;
    /**
     * 위치설명
     */
    private String location;
    /**
     * 좌표1 (위도)
     */
    private String point1;
    /**
     * 좌표2 (경도)
     */
    private String point2;
    /**
     * 메모
     */
    private String memo;
    /**
     * 등록일
     */
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date regDate;
    /**
     * 등록자 (회원 번호)
     */
    private int regUser;
    /**
     * 상태 (코드값)
     */
    private String stateCd;
    /**
     * 사용여부
     */
    private String isUse;
    /**
     * 기준좌표1(leftop_위도)
     */
    private String stdPoint1;
    /**
     * 기준좌표2(leftop_경도)
     */
    private String stdPoint2;
    /**
     * 영역좌표1(rightbotton_위도)
     */
    private String areaPoint1;
    /**
     * 영역좌표1(rightbotton_경도)
     */
    private String areaPoint2;
}
