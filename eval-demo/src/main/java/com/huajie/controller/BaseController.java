package com.huajie.controller;

import com.huajie.base.BaseApiService;
import com.huajie.echarts.EchartsFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class BaseController extends BaseApiService {

    @Autowired
    protected EchartsFactory echartsFactory;

}
