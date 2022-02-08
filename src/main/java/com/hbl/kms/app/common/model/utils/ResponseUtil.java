package com.hbl.kms.app.common.model.utils;

import com.hbl.kms.app.common.model.Result;

public class ResponseUtil {

    public static Result process(Object o) {
        return Result
                .builder()
                .result(o)
                .build();
    }
}
