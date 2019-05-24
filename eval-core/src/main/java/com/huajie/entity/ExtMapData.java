package com.huajie.entity;

import lombok.Data;

@Data
public class ExtMapData<K,V> {
	private K name;
	private V value;
}
