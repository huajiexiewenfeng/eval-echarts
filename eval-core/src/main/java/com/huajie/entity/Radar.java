package com.huajie.entity;

import lombok.Data;

import java.util.List;

/**
 * 
 * @ClassName: Radar
 * @Description:雷达图
 * @author luobin
 * @modifier luobin
 * @date 2018年8月10日 下午4:54:29
 *
 */
@Data
public class Radar {
	private List<RadarLegend> legendData; // legend数据
	private List<List<RadarIndicator>> indicator; // indicator数据
	private List<List<Object>> seriesData; // series数据
}
