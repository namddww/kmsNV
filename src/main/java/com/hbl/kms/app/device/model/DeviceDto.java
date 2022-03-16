package com.hbl.kms.app.device.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

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
     * 층정보 SEQ
     */
    private int floorSeq;
    /**
     * 디바이스 SEQ
     */
    private int deviceSeq;
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
     * 위치(지역)
     */
    private String locationCd;
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
     * 상태코드
     */
    private String stateCd;
    /**
     * 사용여부
     */
    private String isUse;
    /**
     * 건물명
     */
    private String buildName;
    /**
     * 자산명
     */
    private String deviceName;
    /**
     * 시작일
     */
    private String scRegDtSt;
    /**
     * 종료일
     */
    private String scRegDtEd;

    // 디바이스 이미지 확대용
    List<DeviceInfoList> deviceInfoList;

    // 건물이미지 경로
    private String imgPath;

    /**
     * 한페이지 노출 시작 번호
     */
    int pageNum = 1;
    /**
     * 한페이지 노출 갯수
     */
    int pageSize = 10;
    /**
     * 한페이지 노출 종료 번호
     */
    int NavigatePages = 10;
}
