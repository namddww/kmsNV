package com.hbl.kms.app.common.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
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
