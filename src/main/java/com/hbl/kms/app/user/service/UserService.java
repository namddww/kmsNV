package com.hbl.kms.app.user.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.hbl.kms.app.common.model.Code;
import com.hbl.kms.app.login.mapper.JoinMapper;
import com.hbl.kms.app.login.model.Join;
import com.hbl.kms.app.user.mapper.UserMapper;
import com.hbl.kms.app.user.model.User;
import com.hbl.kms.app.user.model.UserDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserService {

    private final UserMapper userMapper;

    public PageInfo<?> selectUserInfoList(UserDto userDto) {
        PageHelper.startPage(userDto);
        return PageInfo.of(userMapper.selectUserInfoList(userDto), userDto.getNavigatePages());
    }

    public List<Code> selectSexCdList(String codeSexGroupCd) {
        return userMapper.selectSexCdList(codeSexGroupCd);
    }

    public int selectIdCount(UserDto userDto) {
        return userMapper.selectIdCount(userDto);
    }

    public int saveUser(User user) {
        return userMapper.saveUser(user);
    }

    public User selectUserDetail(UserDto userDto) {
        return userMapper.selectUserDetail(userDto);
    }

    public int updateUser(UserDto userDto) {
        return userMapper.updateUser(userDto);
    }
}
