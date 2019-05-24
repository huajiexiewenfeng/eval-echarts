package com.huajie.echarts;

import com.huajie.entity.BarSimple;
import com.huajie.entity.ExtMapData;

import java.util.ArrayList;
import java.util.List;

/**
 * @author xiewenfeng 
 * 封装后台echarts 图表数据组合
 * BarSimple柱状图
 */
public abstract class AbstractBarSimple extends BsaeEchartsBean<BarSimple> {
	
	protected abstract List<String> getLegendList();
	
	/**
	 * 获取data数据集
	 * name :x轴值集合
	 * value :对应的y轴值集合
	 * ExtMapData<name:value> 的List集合形式
	 * @return
	 */
	protected abstract List<ExtMapData<String, String>> ListXYAxis();

	public BarSimple initEchartsData() {
		BarSimple barSimple = new BarSimple();
		List<String> legendList = getLegendList();
		List<ExtMapData<String, String>> listData = ListXYAxis();
		List<String> xAxisDataList = new ArrayList<String>();
		List<Object> serieDataList = new ArrayList<Object>();
		List<List<Object>> serieDataListSum = new ArrayList<List<Object>>();
		
		for (ExtMapData<String, String> extMapData : listData) {
			xAxisDataList.add(String.valueOf(extMapData.getName()));
			serieDataList.add(String.valueOf(extMapData.getValue()));
		}
		
		barSimple.setLegendData(legendList);
		barSimple.setXAxisData(xAxisDataList);
		serieDataListSum.add(serieDataList);
		barSimple.setSeriesData(serieDataListSum);
		return barSimple;
	}

}
