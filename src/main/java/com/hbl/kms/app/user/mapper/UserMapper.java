package com.hbl.kms.app.user.mapper;

import com.hbl.kms.app.login.model.Join;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {

    int saveUser(Join user);
}
