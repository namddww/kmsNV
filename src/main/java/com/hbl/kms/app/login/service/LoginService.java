package com.hbl.kms.app.login.service;

import com.hbl.kms.app.login.mapper.LoginMapper;
import com.hbl.kms.app.login.model.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class LoginService {

    private final LoginMapper loginMapper;

    public int saveUser(User user) {
        return loginMapper.saveUser(user);
    }

    public User findByUserId(String userId) {
        return loginMapper.findByUserId(userId);
    }

    public int updateUserLastDate(String userId) {
        return loginMapper.updateUserLastDate(userId);
    }
}
