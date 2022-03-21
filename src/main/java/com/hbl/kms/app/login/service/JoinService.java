package com.hbl.kms.app.login.service;

import com.hbl.kms.app.login.mapper.JoinMapper;
import com.hbl.kms.app.login.model.Join;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class JoinService {

    private final JoinMapper joinMapper;

    public int saveUser(Join user) {
        return joinMapper.saveUser(user);
    }

    public Join findByUserId(String userId) {
        return joinMapper.findByUserId(userId);
    }

    public int updateUserLastDate(String userId) {
        return joinMapper.updateUserLastDate(userId);
    }
}
