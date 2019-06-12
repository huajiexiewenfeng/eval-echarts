package com.huajie.entity;

import lombok.Data;

import java.util.List;

/**
 * @author xiewenfeng
 * echarts 多柱状图
 */
@Data
public class BarStack {
	private List<String> legendData;
	private List<String> xAxisData;
	private List<List<String>> seriesData;
}
