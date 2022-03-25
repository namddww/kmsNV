package com.hbl.kms.app.geofence.model;

import com.hbl.kms.app.building.model.FloorInfoDto;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

/**
 * geofence 관련 파리미터 전달용
 */

@Getter
@Setter
public class GeofenceDto {
    /**
     * 층
     */
    private int floor;
    /**
     * 빌딩명
     */
    private String buildName;
    /**
     * 시작일
     */
    private String scRegDtSt;
    /**
     * 종료일
     */
    private String scRegDtEd;
    /**
     * geofence_seq
     */
    private int geofenceSeq;
    /**
     * build_seq
     */
    private int buildSeq;
    /**
     * floor_seq
     */
    private int floorSeq;
    /**
     * 이름
     */
    private String geoName;
    /**
     * 영역타입
     */
    private String typeCd;
    /**
     * 위치타입
     */
    private String locationCd;
    /**
     * 상태
     */
    private String stateCd;
    /**
     * 설치좌표 위도
     */
    private String setPointX;
    /**
     * 설치좌표 경도
     */
    private String setPointY;
    /**
     * 영역좌표 list
     */
    private List<PointXY> pointList;
    /**
     * 반지름
     */
    private String radius;

    int pageNum = 1;
    int pageSize = 5;
    int NavigatePages = 10;
}
