package com.huajie.base;

import lombok.Data;

@Data
public class ResponseBase<T> {
	private int rtnCode;
	private String msg;
	private T data;

	public ResponseBase(Integer rtnCode, String msg, T data) {
		this.rtnCode = rtnCode;
		this.msg = msg;
		this.data = data;
	}

}
