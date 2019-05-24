package com.huajie.echarts;

import java.util.Map;

/**
 * @author xiewenfeng 
 */
public abstract class BsaeEchartsBean<T>{
	
	protected Map<String, Object> parameters;
	
	protected abstract void setParameters(Map<String, Object> parameters);

	protected abstract T initEchartsData() ;

}
