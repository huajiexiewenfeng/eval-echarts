package com.huajie.service.impl.echarts;

import com.huajie.echarts.AbstractBarSimple;
import com.huajie.entity.ExtMapData;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Service
public class BarSimpleImpl extends AbstractBarSimple {

    @Override
    protected List<String> getLegendList() {
        return Arrays.asList("直接访问","邮件营销","联盟广告","视频广告","搜索引擎");
    }

    @Override
    protected List<ExtMapData<String, String>> getSeriesData() {
        List<ExtMapData<String, String>> list = new ArrayList();
        list.add(new ExtMapData("直接访问", "335"));
        list.add(new ExtMapData("邮件营销", "310"));
        list.add(new ExtMapData("联盟广告", "234"));
        list.add(new ExtMapData("视频广告", "135"));
        list.add(new ExtMapData("搜索引擎", "1548"));
        return list;
    }

    @Override
    protected void setParameters(Map<String, Object> parameters) {
        super.parameters = parameters;
    }

}
