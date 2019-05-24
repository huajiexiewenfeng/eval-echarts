package com.huajie.entity;

import lombok.Data;

import java.io.Serializable;

@Data
public class LegendStack implements Serializable {

    private static final long serialVersionUID = 957716647004683678L;

    private String legend;
    private String stack;

    public LegendStack(String legend,String stack){
        this.legend = legend;
        this.stack = stack;
    }
}
