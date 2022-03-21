package com.hbl.kms.app.common.model;

import lombok.Getter;
import lombok.Setter;
import org.apache.ibatis.type.Alias;

@Getter
@Setter
@Alias("code")
public class Code {
    /**
     * 코드 SEQ
     */
    private int codeSeq;
    /**
     * 코드명
     */
    private String codeName;
    /**
     * 코드값
     */
    private String codeVal;
    /**
     * 사용여부
     */
    private String isUse;
}
