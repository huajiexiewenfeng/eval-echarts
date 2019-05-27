package com.huajie.service.impl.echarts;

import com.huajie.echarts.AbstractPieSimple;
import com.huajie.entity.ExtMapData;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class PieSimpleImpl extends AbstractPieSimple {

    @Override
    protected List<ExtMapData<String, String>> ListExtMapData() {
        List<ExtMapData<String, String>> list = new ArrayList();
        list.add(new ExtMapData("直接访问","335"));
        list.add(new ExtMapData("邮件营销","310"));
        list.add(new ExtMapData("联盟广告","234"));
        list.add(new ExtMapData("视频广告","135"));
        list.add(new ExtMapData("搜索引擎","1548"));
        return list;
    }

    @Override
    protected void setParameters(Map<String, Object> parameters) {
      super.parameters = parameters;
    }
}
