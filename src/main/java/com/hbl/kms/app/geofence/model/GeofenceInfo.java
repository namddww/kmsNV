package com.hbl.kms.app.geofence.model;

import lombok.*;
import org.apache.ibatis.type.Alias;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Alias("geofenceInfo")
public class GeofenceInfo {
    /**
     * geofence_info_seq
     */
    private int geofenceInfoSeq;
    /**
     * geofence_seq
     */
    private int geofenceSeq;
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
    private BigDecimal radius;

    private String setPoint;
    private String areaPoint;
}
