package com.huajie.entity;

import lombok.Data;

import java.util.List;

@Data
public class LineStack {
	private List<LegendStack> legendStackData;
	private List<String> xAxisData;
	private List<List<String>> seriesData;
}
