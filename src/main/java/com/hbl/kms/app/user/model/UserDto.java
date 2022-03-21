package com.hbl.kms.app.user.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.ibatis.type.Alias;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Getter
@Setter
public class UserDto {
    /**
     * 사용자 SEQ
     */
    private int userSeq;
    /**
     * 아이디
     */
    private String userId;
    /**
     * 비밀번호
     */
    private String password;
    /**
     * 이름
     */
    private String userName;
    /**
     * 성별 코드
     */
    private String sexCd;
    /**
     * 생년월일
     */
    private String birthday;
    /**
     * 주소1
     */
    private String addr1;
    /**
     * 주소2
     */
    private String addr2;
    /**
     * 사용여부
     */
    private String isUse;
    /**
     * 메모
     */
    private String memo;
    /**
     * 시작일
     */
    private String scRegDtSt;
    /**
     * 종료일
     */
    private String scRegDtEd;

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
