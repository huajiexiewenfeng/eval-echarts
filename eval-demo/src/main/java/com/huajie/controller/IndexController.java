package com.huajie.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


/**
 * @author xwf
 */
@Controller
@RequestMapping
public class IndexController{

    @GetMapping(value = "/")
    public String index() {
        return "index";
    }

    @GetMapping(value = "/pie")
    public String pie() {
        return "pie";
    }

    @GetMapping(value = "/bar")
    public String bar() {
        return "bar";
    }

    @GetMapping(value = "/bar-y-category")
    public String barYCategory() {
        return "bar-y-category";
    }

    @GetMapping(value = "/line")
    public String line() {
        return "line";
    }

    @GetMapping(value = "/pie-doughnut")
    public String pieDoughnut() {
        return "pie-doughnut";
    }

}
