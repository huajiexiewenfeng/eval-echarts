package com.huajie.entity;

import lombok.Data;

import java.util.List;

@Data
public class PieSimple<K,V> {
	private List<ExtMapData<K,V>> seriesData;
}
