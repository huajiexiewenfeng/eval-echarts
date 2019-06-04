package com.huajie.echarts;

import com.huajie.entity.BarSimple;
import com.huajie.entity.BarYCategorySimple;
import com.huajie.entity.ExtMapData;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * @author xiewenfeng
 * 封装后台echarts 图表数据组合
 * BarSimple柱状图
 */
public abstract class AbstractBarYCategorySimple extends BsaeEchartsBean<BarYCategorySimple> {

    protected abstract List<String> getLegendList();

    protected abstract Map<String, List<ExtMapData<String, String>>> getSeriesData();

    public BarYCategorySimple initEchartsData() {
        BarYCategorySimple barYCategorySimple = new BarYCategorySimple();
        List<String> legendList = getLegendList();
        Map<String, List<ExtMapData<String, String>>> mapSeriesData = getSeriesData();
        List<String> yAxisDataList = new ArrayList<>();
        List<String> serieDataList = new ArrayList<>();
        List<List<String>> serieDataListSum = new ArrayList<>();
        for (String name : legendList) {
            List<ExtMapData<String, String>> extMapData = mapSeriesData.get(name);
            if (yAxisDataList.size() == 0) {
                yAxisDataList = extMapData.stream().map(ExtMapData::getName).collect(Collectors.toList());
            }
            serieDataList = extMapData.stream().map(ExtMapData::getValue).collect(Collectors.toList());
            serieDataListSum.add(serieDataList);
        }
        barYCategorySimple.setLegendData(legendList);
        barYCategorySimple.setYAxisData(yAxisDataList);
        barYCategorySimple.setSeriesData(serieDataListSum);
        return barYCategorySimple;
    }

}
