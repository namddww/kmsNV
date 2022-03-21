package com.hbl.kms.app.device.model;

import lombok.Getter;
import lombok.Setter;
import org.apache.ibatis.type.Alias;

@Getter
@Setter
@Alias("locationCd")
public class LocationCd {
    /**
     * 지역코드
     */
    private String locationCd;
    /**
     * 지역이름
     */
    private String locationName;
}
