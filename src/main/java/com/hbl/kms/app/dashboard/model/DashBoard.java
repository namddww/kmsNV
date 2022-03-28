package com.hbl.kms.app.dashboard.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.ibatis.type.Alias;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Alias("dashBoard")
public class DashBoard {

    // 전체 장비 현황
    /**
     * 전체 카운트
     */
    private int allCount;
    /**
     * 사용중 장비 카운트
     */
    private int yCount;
    /**
     * 미사용중 장비 카운트
     */
    private int nCount;

    // 실내, 실외 장비 현황
    /**
     * 층 정보
     * 실내 장비 현황 시 사용
     */
    private int floor;
    /**
     * 장비 카운트
     */
    private int count;
    /**
     * 코드명
     * 실외 장비 현황 시 사용
     */
    private String name;
}
