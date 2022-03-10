package com.hbl.kms.app.device.model;

import lombok.Getter;
import lombok.Setter;
import org.apache.ibatis.type.Alias;

@Getter
@Setter
@Alias("areaList")
public class AreaList {
    /**
     * 코드명
     */
    private String codeName;
    /**
     * 코드값
     */
    private String codeVal;
    /**
     * 코드 그룹명
     */
    private String groupCd;
}
