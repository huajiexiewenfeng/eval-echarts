package com.huajie.service.impl.echarts;

import com.huajie.echarts.AbstractAreaStack;
import com.huajie.echarts.AbstractBarStack;
import com.huajie.entity.ExtMapData;
import com.huajie.entity.LegendStack;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AreaStackImpl extends AbstractAreaStack {

    @Override
    protected List<LegendStack> getLegendList() {
        return Arrays.asList(new LegendStack("蒸发量","总量"),new LegendStack("降水量","总量"));
    }

    @Override
    protected Map<String, List<ExtMapData<String, String>>> getSeriesData() {
        Map<String, List<ExtMapData<String, String>>> map = new HashMap<>();
        List<ExtMapData<String, String>> list1 = Arrays.asList(new ExtMapData("1月", "2.0"), new ExtMapData("2月", "4.9"),
                new ExtMapData("3月", "7.0"), new ExtMapData("4月", "23.2"),
                new ExtMapData("5月", "25.6"), new ExtMapData("6月", "76.7"),
                new ExtMapData("7月", "135.6"), new ExtMapData("8月", "162.2"),
                new ExtMapData("9月", "32.6"), new ExtMapData("10月", "20.0"),
                new ExtMapData("11月", "6.4"), new ExtMapData("12月", "3.2"));
        List<ExtMapData<String, String>> list2 = Arrays.asList(new ExtMapData("1月", "2.6"), new ExtMapData("2月", "5.9"),
                new ExtMapData("3月", "9.0"), new ExtMapData("4月", "26.4"),
                new ExtMapData("5月", "28.7"), new ExtMapData("6月", "70.7"),
                new ExtMapData("7月", "175.6"), new ExtMapData("8月", "182.2"),
                new ExtMapData("9月", "48.7"), new ExtMapData("10月", "18.0"),
                new ExtMapData("11月", "6.4"), new ExtMapData("12月", "2.2"));
        map.put("蒸发量", list1);
        map.put("降水量", list2);
        return map;
    }

    @Override
    protected void setParameters(Map<String, Object> parameters) {
        super.parameters = parameters;
    }
}
