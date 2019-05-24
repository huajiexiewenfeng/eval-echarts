package com.huajie.entity;

import lombok.Data;

import java.util.List;

@Data
public class LineSimple {
	private List<String> xAxisData;
	private List<String> yAxisData;
	private List<String> seriesData;
}
