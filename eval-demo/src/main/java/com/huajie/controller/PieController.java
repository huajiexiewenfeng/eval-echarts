package com.huajie.controller;


import com.huajie.base.BaseApiService;
import com.huajie.base.ResponseBase;
import com.huajie.echarts.AbstractPieSimple;
import com.huajie.echarts.EchartsFactory;
import com.huajie.entity.PieSimple;
import com.huajie.service.impl.echarts.PieSimpleImpl;
import com.huajie.utils.QueryUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.*;


@Controller
@RequestMapping("/report/echarts")
public class PieController extends BaseApiService {

    @Autowired
    private EchartsFactory echartsFactory;

    @GetMapping(value = "/pie")
    public String home() {
        return "pie";
    }

    /**
     * PieSimple 饼状图
     */
    @PostMapping("/pieSimple")
    @ResponseBody
    public ResponseBase pieSimple(HttpServletRequest request) {
        Map<String, Object> conditionMap = QueryUtils.getParams(request);
        AbstractPieSimple pieSimple = echartsFactory.createPieSimple(conditionMap, PieSimpleImpl.class);
        PieSimple pieSimpleData = pieSimple.initEchartsData();
        return setResultSuccess(pieSimpleData);
    }


}
