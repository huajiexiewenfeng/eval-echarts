package com.huajie.service.impl.echarts;

import com.huajie.echarts.AbstractLineStack;
import com.huajie.entity.ExtMapData;
import com.huajie.entity.LegendStack;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class LineStackImpl extends AbstractLineStack {

    @Override
    protected List<LegendStack> getlegendStackList() {
        return Arrays.asList(new LegendStack("邮件营销", "总量"), new LegendStack("联盟广告", "总量"), new LegendStack("视频广告", "总量"), new LegendStack("直接访问", "总量"), new LegendStack("搜索引擎", "总量"));
    }

    @Override
    protected Map<String, List<ExtMapData<String, String>>> ListSeriesData() {
        Map<String, List<ExtMapData<String, String>>> map = new HashMap<>();
        //查询该年度所有批次 的优秀率 和 合格率
        List<ExtMapData<String, String>> list1 = Arrays.asList(new ExtMapData("周一", "120"), new ExtMapData("周二", "132"), new ExtMapData("周三", "101"), new ExtMapData("周四", "152"), new ExtMapData("周五", "220"), new ExtMapData("周六", "212"), new ExtMapData("周日", "300"));
        List<ExtMapData<String, String>> list2 = Arrays.asList(new ExtMapData("周一", "220"), new ExtMapData("周二", "112"), new ExtMapData("周三", "111"), new ExtMapData("周四", "112"), new ExtMapData("周五", "210"), new ExtMapData("周六", "112"), new ExtMapData("周日", "200"));
        List<ExtMapData<String, String>> list3 = Arrays.asList(new ExtMapData("周一", "100"), new ExtMapData("周二", "102"), new ExtMapData("周三", "101"), new ExtMapData("周四", "152"), new ExtMapData("周五", "120"), new ExtMapData("周六", "112"), new ExtMapData("周日", "100"));
        List<ExtMapData<String, String>> list4 = Arrays.asList(new ExtMapData("周一", "320"), new ExtMapData("周二", "312"), new ExtMapData("周三", "311"), new ExtMapData("周四", "312"), new ExtMapData("周五", "310"), new ExtMapData("周六", "312"), new ExtMapData("周日", "300"));
        List<ExtMapData<String, String>> list5 = Arrays.asList(new ExtMapData("周一", "820"), new ExtMapData("周二", "932"), new ExtMapData("周三", "934"), new ExtMapData("周四", "1290"), new ExtMapData("周五", "1330"), new ExtMapData("周六", "1320"), new ExtMapData("周日", "901"));
        map.put("邮件营销", list1);
        map.put("联盟广告", list2);
        map.put("视频广告", list3);
        map.put("直接访问", list4);
        map.put("搜索引擎", list5);
        return map;
    }

    @Override
    protected void setParameters(Map<String, Object> parameters) {

    }
}
