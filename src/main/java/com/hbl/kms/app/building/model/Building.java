package com.hbl.kms.app.building.model;

import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Building {
    /**
     * 빌딩 SEQ
     */
    private int buildSeq;
    /**
     * 기준좌표1
     * 좌측상단 X좌표 (가로방향 : 위도)
     */
    private String stdPoint1;
    /**
     * 기준좌표2
     * 좌측상단 Y좌표 (세로방향 : 경도)
     */
    private String stdPoint2;
    /**
     * 영역좌표1
     * 우측하단 X좌표 (가로방향 : 위도)
     */
    private String areaPoint1;
    /**
     * 영역좌표2
     * 우측하단 Y좌표 (세로방향 : 경도)
     */
    private String areaPoint2;
    /**
     * 빌딩명
     */
    private String buildName;
    /**
     * 주소1
     * 기본주소
     */
    private String addr1;
    /**
     * 주소2
     * 상세주소
     */
    private String addr2;
    /**
     * 지상층
     */
    private int groundFloor;
    /**
     * 지하층
     */
    private int baseFloor;
    /**
     * 사용여부
     */
    private String isUse;
    /**
     * 상태 (코드값)
     */
    private String stateCd;
    /**
     * 검색정보
     */
    private String searchInfo;
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
}
