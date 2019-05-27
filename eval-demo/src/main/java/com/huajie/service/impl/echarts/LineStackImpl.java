package com.huajie.service.impl.echarts;

import com.huajie.echarts.AbstractLineStack;
import com.huajie.entity.ExtMapData;
import com.huajie.entity.LegendStack;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class LineStackImpl extends AbstractLineStack {

    @Override
    protected List<LegendStack> getlegendStackList() {
        return null;
    }

    @Override
    protected Map<String, List<ExtMapData<String, String>>> ListSeriesData() {
        return null;
    }

    @Override
    protected void setParameters(Map<String, Object> parameters) {

    }
}
