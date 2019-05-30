package com.huajie.controller;


import com.huajie.base.BaseApiService;
import com.huajie.base.ResponseBase;
import com.huajie.echarts.AbstractBarSimple;
import com.huajie.echarts.EchartsFactory;
import com.huajie.entity.BarSimple;
import com.huajie.service.impl.echarts.BarSimpleImpl;
import com.huajie.utils.QueryUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 * @author xwf
 */
@RestController
@RequestMapping("/report/echarts")
public class BarController extends BaseController {

    /**
     * BarSimple 柱状图
     */
    @PostMapping("/barSimple")
    @ResponseBody
    public ResponseBase barSimple(HttpServletRequest request) {
        Map<String, Object> conditionMap = QueryUtils.getParams(request);
        AbstractBarSimple barSimple = echartsFactory.createBarSimple(conditionMap, BarSimpleImpl.class);
        BarSimple barSimpleData = barSimple.initEchartsData();
        return setResultSuccess(barSimpleData);

    }

    /**
     * bar-Y-Category 条形图
     */
    @PostMapping("/barYCategory")
    @ResponseBody
    public ResponseBase barYCategory(HttpServletRequest request) {
        Map<String, Object> conditionMap = QueryUtils.getParams(request);
        AbstractBarSimple barSimple = echartsFactory.createBarSimple(conditionMap, BarSimpleImpl.class);
        BarSimple barSimpleData = barSimple.initEchartsData();
        return setResultSuccess(barSimpleData);

    }

}
