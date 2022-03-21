package com.hbl.kms.app.login.mapper;

import com.hbl.kms.app.login.model.Join;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface JoinMapper {

    int saveUser(Join user);

    Join findByUserId(String userId);

    int updateUserLastDate(String userId);
}
