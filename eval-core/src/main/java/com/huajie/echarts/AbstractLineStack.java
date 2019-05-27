package com.huajie.echarts;

import com.huajie.entity.ExtMapData;
import com.huajie.entity.LegendStack;
import com.huajie.entity.LineStack;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * @author xiewenfeng
 * 封装后台echarts
 * 图表数据组合 LineSimple折线图
 */
public abstract class AbstractLineStack extends BsaeEchartsBean<LineStack> {

    protected abstract List<LegendStack> getlegendStackList();

    /**
     * 获取data数据集
     * name :x轴值集合
     * value :对应的y轴值集合
     * ExtMapData<name:value> 的List集合形式
     *
     * @return
     */
    protected abstract Map<String, List<ExtMapData<String, String>>> ListSeriesData();

    public LineStack initEchartsData() {
        LineStack lineStack = new LineStack();
        List<String> xAxisDataList = new ArrayList<>();
        List<List<String>> seriesDataList = new ArrayList<>();
        Map<String, List<ExtMapData<String, String>>> map = ListSeriesData();
        List<LegendStack> listLegendStack = getlegendStackList();

        for (LegendStack legendStack : listLegendStack) {
            String name = legendStack.getLegend();
            List<ExtMapData<String, String>> extMapData = map.get(name);
            seriesDataList.add(extMapData.stream().map(data ->String.valueOf(data.getValue())).collect(Collectors.toList()));
            if (xAxisDataList.size() <= 0) {
                xAxisDataList = extMapData.stream().map(data ->data.getName()).distinct().collect(Collectors.toList());
            }
        }
        lineStack.setLegendStackData(listLegendStack);
        lineStack.setXAxisData(xAxisDataList);
        lineStack.setSeriesData(seriesDataList);
        return lineStack;
    }

}
