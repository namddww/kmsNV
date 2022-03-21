package com.hbl.kms.app.user.service;

import com.hbl.kms.app.login.mapper.JoinMapper;
import com.hbl.kms.app.login.model.Join;
import com.hbl.kms.app.user.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserService {

    private final UserMapper userMapper;

    public int saveUser(Join user) {
        return userMapper.saveUser(user);
    }
}
