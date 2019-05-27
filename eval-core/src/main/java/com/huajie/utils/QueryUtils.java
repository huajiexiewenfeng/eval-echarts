package com.huajie.utils;


import javax.servlet.http.HttpServletRequest;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

/**
 * @author xiewenfeng 动态报表工具包
 */
public final class QueryUtils {

	/**
	 * 根据request封装map参数
	 */
	public static Map<String, Object> getParams(HttpServletRequest request) {
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		Enumeration<String> attributeNames = request.getParameterNames();
		while (attributeNames.hasMoreElements()) {
			String name = attributeNames.nextElement();
			conditionMap.put(name, request.getParameter(name));
		}
		return conditionMap;
	}

}
