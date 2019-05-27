package com.huajie.echarts;

import com.huajie.entity.ExtMapData;
import com.huajie.entity.PieSimple;

import java.util.List;

/**
 * @author xiewenfeng
 * 封装后台echarts 图表数据组合
 * PieSimple饼状图
 */
public abstract class AbstractPieSimple extends BsaeEchartsBean<PieSimple> {

    /**
     * 获取data数据集
     * name :name值集合
     * value :value值集合
     * ExtMapData<name:value> 的List集合形式
     *
     * @return
     */
    protected abstract List<ExtMapData<String, String>> ListExtMapData();

    public PieSimple initEchartsData() {
        PieSimple pieSimple = new PieSimple();
        pieSimple.setSeriesData(ListExtMapData());
        return pieSimple;
    }

}
