package com.hbl.kms.app.login.mapper;

import com.hbl.kms.app.login.model.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LoginMapper {

    int saveUser(User user);

    User findByUserId(String userId);

    int updateUserLastDate(String userId);
}
