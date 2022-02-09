package com.hbl.kms.app.device.model;

import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Device {
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
}
