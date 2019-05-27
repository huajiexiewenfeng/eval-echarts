package com.huajie.service.impl.echarts;

import com.huajie.echarts.AbstractBarSimple;
import com.huajie.entity.ExtMapData;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class BarSimpleImpl extends AbstractBarSimple {

    @Override
    protected List<String> getLegendList() {
        return null;
    }

    @Override
    protected List<ExtMapData<String, String>> ListXYAxis() {
        return null;
    }

    @Override
    protected void setParameters(Map<String, Object> parameters) {
        super.parameters = parameters;
    }

}
