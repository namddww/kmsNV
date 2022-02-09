package com.hbl.kms.app.device.model;

import lombok.Getter;
import lombok.Setter;

/**
 * 자산등록 파라미터 전달용
 */

@Getter
@Setter
public class DeviceDto {
    /**
     * 빌딩 SEQ
     */
    private int buildSeq;
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
     * 지상층 (층정보)
     */
    private int groundFloor;
    /**
     * 지하층 (층정보)
     */
    private int baseFloor;
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
     * 한페이지 노출 시작 번호
     */
    int pageNum = 1;
    /**
     * 한페이지 노출 종료 번호
     */
    int pageSize = 5;
    /**
     * 한페이지 노출 갯수
     */
    int NavigatePages = 10;
    // TODO : BANG 지역, 메모 누락
}
