package com.hbl.kms.app.geofence.model;

import lombok.Getter;
import lombok.Setter;

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

    int pageNum = 1;
    int pageSize = 5;
    int NavigatePages = 10;
}
