package com.hbl.kms.app.building.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 * 건물관련 파리미터 전달용
 */

@Getter
@Setter
public class BuildingDto {
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
     * 시작일
     */
    private String scRegDtSt;
    /**
     * 종료일
     */
    private String scRegDtEd;
    /**
     * 위치(지역)
     */
    private String locationCd;
    /**
     * 층별 정보
     */
    private List<FloorInfoDto> floorInfo;

    /**
     * 층별 정보
     */
    private String x1;
    private String y1;
    private String x2;
    private String y2;

    int pageNum = 1;
    int pageSize = 5;
    int NavigatePages = 10;
}
