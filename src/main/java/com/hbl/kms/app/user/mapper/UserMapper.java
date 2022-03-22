package com.hbl.kms.app.user.mapper;

import com.hbl.kms.app.common.model.Code;
import com.hbl.kms.app.login.model.Join;
import com.hbl.kms.app.user.model.User;
import com.hbl.kms.app.user.model.UserDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {

    List<User> selectUserInfoList(UserDto userDto);

    List<Code> selectSexCdList(String codeSexGroupCd);

    int selectIdCount(UserDto userDto);

    int saveUser(User user);

    User selectUserDetail(UserDto userDto);

    int updateUser(UserDto userDto);
}
