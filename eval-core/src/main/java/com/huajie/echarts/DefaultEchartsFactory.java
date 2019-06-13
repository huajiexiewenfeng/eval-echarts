package com.huajie.echarts;

import com.huajie.utils.SpringUtils;
import org.springframework.beans.BeansException;

import java.lang.reflect.Method;
import java.util.Map;

public class DefaultEchartsFactory extends EchartsFactory {
	
	private static final EchartsFactory echartsFactory = new DefaultEchartsFactory();
	
	//1.构造方法私有化，让外界无法对对象进行实例化，保证一个类只有一个对象
	private DefaultEchartsFactory(){
	}
	
	//2.通过方法获取实例
	public static EchartsFactory getEchartsFactory(){
		return echartsFactory;
	}
	
	@Override
	public AbstractBarSimple createBarSimple(Map<String, Object> parameters, Class<?> cls) {
		return (AbstractBarSimple)getBeanInstance(cls,parameters);
	}

	@Override
	public AbstractBarStack createBarStack(Map<String, Object> parameters, Class<?> cls) {
		return (AbstractBarStack)getBeanInstance(cls,parameters);
	}

	@Override
	public AbstractLineSimple createLineSimple(Map<String, Object> parameters, Class<?> cls) {
		return (AbstractLineSimple)getBeanInstance(cls,parameters);
	}

	@Override
	public AbstractPieSimple createPieSimple(Map<String, Object> parameters, Class<?> cls) {
		return (AbstractPieSimple)getBeanInstance(cls,parameters);
	}

	@Override
	public AbstractLineStack createLineStack(Map<String, Object> parameters, Class<?> cls) {
		return (AbstractLineStack)getBeanInstance(cls,parameters);
	}

	@Override
	public AbstractBarYCategory createBarYCategory(Map<String, Object> parameters, Class<?> cls) {
		return (AbstractBarYCategory)getBeanInstance(cls,parameters);
	}

	@Override
	public AbstractAreaStack createAreaStack(Map<String, Object> parameters, Class<?> cls) {
		return (AbstractAreaStack)getBeanInstance(cls,parameters);
	}

	@SuppressWarnings("unchecked")
	public static <T> T getBeanInstance(Class<T> cls,Map<String, Object> parameters) throws BeansException {
        try {
        	/**
			 * 如果使用反射newInstance()之后<br/>
			 * cls实现类springIOC容器失效<br/>
			 * 所以从SpringIOC容器中获取该实例
			 */
        	Object obj = SpringUtils.getBeanByName(cls);
			Method method = cls.getDeclaredMethod("setParameters", new Class[] { Map.class });
			method.setAccessible(true);
			method.invoke(obj, parameters);
            return (T)obj;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        } 
    }

}
