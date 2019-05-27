package com.huajie.base;

import com.huajie.constants.Constants;

/**
 * 封装为restfull风格
 * */
public class BaseApiService {

	// 失败
	public ResponseBase setResultFail(String msg) {
		return new ResponseBase(Constants.HTTP_RES_CODE_500, msg, null);
	}

	// 成功
	public ResponseBase setResultSuccess(Object data) {
		return new ResponseBase(Constants.HTTP_RES_CODE_200, Constants.HTTP_RES_CODE_200_VALUE, data);
	}

	// 成功不带参数
	public ResponseBase setResultSuccess() {
		return new ResponseBase(Constants.HTTP_RES_CODE_200, Constants.HTTP_RES_CODE_200_VALUE, null);
	}

	// 通用封装
	public ResponseBase setResult(int code, String msg, Object data) {
		return new ResponseBase(code, msg, data);
	}
}
