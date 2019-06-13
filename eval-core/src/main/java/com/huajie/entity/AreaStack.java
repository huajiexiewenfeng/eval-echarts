package com.huajie.entity;

import lombok.Data;

import java.util.List;

/**
 * @author xiewenfeng
 * echarts 堆叠区域图
 */
@Data
public class AreaStack {
	private List<LegendStack> legendStackData;
	private List<String> xAxisData;
	private List<List<String>> seriesData;
}
