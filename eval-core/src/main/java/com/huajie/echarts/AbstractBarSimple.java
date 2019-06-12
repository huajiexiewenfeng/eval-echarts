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

	protected abstract List<ExtMapData<String, String>> getSeriesData();

	public BarSimple initEchartsData() {
		BarSimple barSimple = new BarSimple();
		List<String> legendList = getLegendList();
		List<ExtMapData<String, String>> listData = getSeriesData();
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
