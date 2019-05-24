package com.huajie.echarts;

import com.huajie.entity.ExtMapData;
import com.huajie.entity.LineSimple;

import java.util.ArrayList;
import java.util.List;

/**
 * @author xiewenfeng 封装后台echarts 图表数据组合 LineSimple折线图
 */
public abstract class AbstractLineSimple extends BsaeEchartsBean<LineSimple>{

	/**
	 * 获取data数据集 
	 * name :x轴值集合 
	 * value :对应的y轴值集合
	 * ExtMapData<name:value> 的List集合形式
	 * @return
	 */
	protected abstract List<ExtMapData<String, String>> ListXYAxis();

	public LineSimple initEchartsData() {
		LineSimple lineSimple = new LineSimple();
		List<String> xAxisDataList = new ArrayList<String>();
		List<String> seriesDataList = new ArrayList<String>();
		List<ExtMapData<String, String>> listData = ListXYAxis();
		
		for (ExtMapData<String, String> extMapData : listData) {
			xAxisDataList.add(String.valueOf(extMapData.getName()));
			seriesDataList.add(String.valueOf(extMapData.getValue()));
		}
		
		lineSimple.setXAxisData(xAxisDataList);
		lineSimple.setSeriesData(seriesDataList);
		return lineSimple;
	}

}
