package com.huajie.service.impl.echarts;

import com.huajie.echarts.AbstractBarStack;
import com.huajie.echarts.AbstractBarYCategory;
import com.huajie.entity.ExtMapData;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class BarStackImpl extends AbstractBarStack {

    @Override
    protected List<String> getLegendList() {
        return Arrays.asList("蒸发量","降水量");
    }

    @Override
    protected Map<String, List<ExtMapData<String, String>>> getSeriesData() {
        Map<String, List<ExtMapData<String, String>>> map = new HashMap<>();
        //查询该年度所有批次 的优秀率 和 合格率
        List<ExtMapData<String, String>> list1 = Arrays.asList(new ExtMapData("1月", "2.0"), new ExtMapData("2月", "4.9"),
                new ExtMapData("3月", "7.0"), new ExtMapData("4月", "23.2"),
                new ExtMapData("5月", "25.6"), new ExtMapData("6月", "76.7"));
        List<ExtMapData<String, String>> list2 = Arrays.asList(new ExtMapData("1月", "2.6"), new ExtMapData("2月", "5.9"),
                new ExtMapData("3月", "9.0"), new ExtMapData("4月", "26.4"),
                new ExtMapData("5月", "28.7"), new ExtMapData("6月", "70.7"));
        map.put("蒸发量", list1);
        map.put("降水量", list2);
        return map;
    }

    @Override
    protected void setParameters(Map<String, Object> parameters) {
        super.parameters = parameters;
    }
}
