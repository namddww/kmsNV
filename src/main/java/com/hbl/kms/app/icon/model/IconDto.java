package com.hbl.kms.app.icon.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class IconDto {
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
     * 아이콘 파일이미지
     */
    private MultipartFile file;
    /**
     * 아이콘 파일경로
     */
    private String iconPath;
    /**
     * 등록자 및 수정자 SEQ
     */
    private int userSeq;
}
