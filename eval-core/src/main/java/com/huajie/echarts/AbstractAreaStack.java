package com.huajie.echarts;

import com.huajie.entity.AreaStack;
import com.huajie.entity.BarStack;
import com.huajie.entity.ExtMapData;
import com.huajie.entity.LegendStack;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * @author xiewenfeng 
 * 堆叠区域图
 */
public abstract class AbstractAreaStack extends BsaeEchartsBean<AreaStack> {
	
	protected abstract List<LegendStack> getLegendList();

	protected abstract Map<String, List<ExtMapData<String, String>>> getSeriesData();

	public AreaStack initEchartsData() {
		AreaStack areaStack = new AreaStack();
		List<LegendStack> legendList = getLegendList();
		Map<String, List<ExtMapData<String, String>>> mapSeriesData = getSeriesData();
		List<String> yAxisDataList = new ArrayList<>();
		List<String> serieDataList = new ArrayList<>();
		List<List<String>> serieDataListSum = new ArrayList<>();
		for (LegendStack legendStack : legendList) {
			List<ExtMapData<String, String>> extMapData = mapSeriesData.get(legendStack.getLegend());
			if (yAxisDataList.size() == 0) {
				yAxisDataList = extMapData.stream().map(ExtMapData::getName).collect(Collectors.toList());
			}
			serieDataList = extMapData.stream().map(data->String.valueOf(data.getValue())).collect(Collectors.toList());
			serieDataListSum.add(serieDataList);
		}
		areaStack.setLegendStackData(legendList);
		areaStack.setXAxisData(yAxisDataList);
		areaStack.setSeriesData(serieDataListSum);
		return areaStack;
	}

}
