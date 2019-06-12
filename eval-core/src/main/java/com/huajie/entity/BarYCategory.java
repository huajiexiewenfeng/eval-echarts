package com.huajie.entity;

import lombok.Data;

import java.util.List;

/**
 * @author xiewenfeng
 * echarts普通柱状图
 */
@Data
public class BarYCategory {
	//legend中data的数据
	private List<String> legendData;
	private List<String> yAxisData;
	private List<List<String>> seriesData;
}
