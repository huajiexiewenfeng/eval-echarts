package com.huajie.controller;


import com.huajie.base.BaseApiService;
import com.huajie.base.ResponseBase;
import com.huajie.echarts.AbstractLineStack;
import com.huajie.echarts.EchartsFactory;
import com.huajie.entity.LineStack;
import com.huajie.service.impl.echarts.BarSimpleImpl;
import com.huajie.utils.QueryUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;


@RestController
@RequestMapping("/report/echarts")
public class LineController extends BaseApiService {

    @Autowired
    private EchartsFactory echartsFactory;

    /**
     * LineStack 折线堆叠
     */
    @PostMapping("/lineStack")
    public ResponseBase lineStack(HttpServletRequest request) {
        Map<String, Object> conditionMap = QueryUtils.getParams(request);
        AbstractLineStack lineStack = echartsFactory.createLineStack(conditionMap, BarSimpleImpl.class);
        LineStack lineStackData = lineStack.initEchartsData();
        return setResultSuccess(lineStackData);
    }

}
