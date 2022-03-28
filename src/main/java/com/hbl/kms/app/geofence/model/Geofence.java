package com.hbl.kms.app.geofence.model;

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
@Alias("geofence")
public class Geofence {
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
     * 층수
     */
    private int floor;
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
     * 위치이름
     */
    private String locationName;
    /**
     * 영역타입이름
     */
    private String typeCdName;
    /**
     * 건물이름
     */
    private String buildName;
    /**
     * 등록일
     */
    @JsonFormat(pattern = "yyyy-MM-dd")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date regDate;
    /**
     * 등록자 (회원 번호)
     */
    private int regUser;

    private String address;
    private String stdPoint1;
    private String stdPoint2;
    private String areaPoint1;
    private String areaPoint2;
    private int groundFloor;
    private int baseFloor;
}
