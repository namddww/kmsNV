package com.hbl.kms.app.common.model;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;

@Data
@Builder
public class Result<T> implements Serializable {
    private String code;
    private String message;
    private T result;
    private int count;
}
