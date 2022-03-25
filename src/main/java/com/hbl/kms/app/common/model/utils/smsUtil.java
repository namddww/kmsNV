package com.hbl.kms.app.common.model.utils;

import java.util.Random;

public class smsUtil {

    /**
     * SMS인증키 생성 
     * @param length : 인증번호 길이
     */
    public static String makeSMSKey(int length) {
        Random rand = new Random(System.currentTimeMillis());

        String authKey = "";
        for(int i = 0; i < length; i++) {
            authKey += String.valueOf(rand.nextInt(10));
        }

        return authKey;
    }
}
