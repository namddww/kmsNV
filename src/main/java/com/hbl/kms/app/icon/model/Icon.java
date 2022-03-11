package com.hbl.kms.app.icon.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.ibatis.type.Alias;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Alias("icon")
public class Icon {
    /**
     * 아이콘 SEQ
     */
    private int iconSeq;
    /**
     * 아이콘명
     */
    private String iconName;
    /**
     * 아이콘타입 그룹코드
     */
    private String  groupCd;
    /**
     * 아이콘타입 그룹값
     */
    private String codeVal;
    /**
     * 아이콘 파일경로
     */
    private String iconPath;
    /**
     * 등록자 SEQ
     */
    private int userSeq;
    /**
     * 등록일
     */
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date regDate;
    /**
     * 수정자 SEQ
     */
    private int modiSeq;
    /**
     * 수정일
     */
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date modiDate;
}
