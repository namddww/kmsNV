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
@NoArgsConstructor
@AllArgsConstructor
@Alias("user")
public class User {
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
     * 전화번호
     */
    private String tel;
    /**
     * 이메일
     */
    private String email;
    /**
     * 상태 코드
     */
    private String stateCd;
    /**
     * 사용여부
     */
    private String isUse;
    /**
     * 메모
     */
    private String memo;
    /**
     * 등록일
     */
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date regDate;
    /**
     * 마지막 로그인 일자
     */
    private Date loginDate;
}
