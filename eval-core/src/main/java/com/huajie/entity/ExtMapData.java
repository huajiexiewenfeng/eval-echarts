package com.huajie.entity;

import lombok.Data;

@Data
public class ExtMapData<K,V> {
	private K name;
	private V value;

	public ExtMapData(K key ,V value){
		this.name = key;
		this.value = value;
	}
}
