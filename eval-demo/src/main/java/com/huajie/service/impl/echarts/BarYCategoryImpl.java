package com.huajie.service.impl.echarts;

import com.huajie.echarts.AbstractBarYCategory;
import com.huajie.entity.ExtMapData;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class BarYCategoryImpl extends AbstractBarYCategory {

    @Override
    protected List<String> getLegendList() {
        return Arrays.asList("2011年","2012年");
    }

    @Override
    protected Map<String, List<ExtMapData<String, String>>> getSeriesData() {
        Map<String, List<ExtMapData<String, String>>> map = new HashMap<>();
        List<ExtMapData<String, String>> list1 = Arrays.asList(new ExtMapData("巴西", "18203"), new ExtMapData("印尼", "23489"), new ExtMapData("美国", "29034"), new ExtMapData("印度", "104970"), new ExtMapData("中国", "131744"), new ExtMapData("世界人口", "630230"));
        List<ExtMapData<String, String>> list2 = Arrays.asList(new ExtMapData("巴西", "19325"), new ExtMapData("印尼", "23438"), new ExtMapData("美国", "31000"), new ExtMapData("印度", "121594"), new ExtMapData("中国", "134141"), new ExtMapData("世界人口", "681807"));
        map.put("2011年", list1);
        map.put("2012年", list2);
        return map;
    }

    @Override
    protected void setParameters(Map<String, Object> parameters) {
        super.parameters = parameters;
    }
}
