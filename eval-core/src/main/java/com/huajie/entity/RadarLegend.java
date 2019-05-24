package com.huajie.entity;

import lombok.Data;

@Data
public class RadarLegend {
	private String legendName; //legend名称
	private Integer index; //legend在indicator的索引位置（就是在第几个雷达图）

}
