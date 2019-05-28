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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 * @author xwf
 */
@Controller
@RequestMapping
public class IndexController extends BaseApiService {

    @GetMapping(value = "/")
    public String home() {
        return "index";
    }



}
