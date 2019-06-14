/**
 * echarts 封装工具 js
 */
var EchartsTool = EchartsTool || {};
var $theme = 'eval';
EchartsTool.prototype = (function () {
    return {
        setTheme: function (themeName) {
            $theme = themeName;
        },
        initPieRichText: function (conf, param) { //初始化饼状图
            if (!(typeof conf == 'object' && 'id' in conf && 'seriesData' in conf)) {
                console.warn('初始化饼状图失败！');
                return;
            }

            var legendData = [];
            //var defaultPieColor = ['#7b86de','#7bcbde','#ab7bde','#7bdead'];
            var pieColor = [];
            for (var op in conf['seriesData']) { //遍历传进来的seriesData
                //var index = op % (defaultPieColor.length);
                legendData[op] = conf['seriesData'][op]['name'];
                //pieColor[op] = defaultPieColor[index]; //每个pie的color，如果pie的长度超过默认颜色数组长度，则循环使用
            }

            var tooltipShow = true; //默认tooltip设置为显示
            if (typeof conf['tooltipShow'] != 'undefined') {
                tooltipShow = conf['tooltipShow'];
            }
            var domChart = echarts.init($("#" + conf['id'])[0], $theme);
            var defaultOption = {
                title: {
                    text: conf['titleText'],
                    //left: 'center',
                    x: 'center',
                    //bottom:5, //距离底部的距离
                    textStyle: {  //标题文字设置
                        fontSize: '12',
                        fontWeight: 'normal',
                        color: '#666'
                    }
                },
                animation: false, //不设置开场动画
                tooltip: {  //默认的提示语句
                    show: tooltipShow, //显示tooltip
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    // orient: 'vertical',
                    // top: 'middle',
                    bottom: 10,
                    left: 'center',
                    data: legendData     //数组
                },
                series: [
                    {
                        type: 'pie',
                        //radius: conf['seriesRadius'],//series的radius
                        radius: conf['seriesRadius'] || ['60%', '62%'],
                        center: ['50%', '50%'],
                        selectedMode: 'single',
                        data: conf['seriesData'],   //series的数据
                        label: {     //饼状图中间显示数字
                            normal: {
                                show: conf['seriesLabelShow'] || false,//默认不显示
                                position: 'center',
                                formatter: conf['seriesLabelFormatter'], //格式化函数
                                textStyle: {
                                    fontSize: 16,
                                    color: conf['seriesLabelTextColor']       //文字颜色
                                }
                            }
                        },  //series的label
                        itemStyle: {
                            normal: {
                                color: function (params) {
                                    var defaultPieColor = ['#1cc09e', '#7bcbde', '#ab7bde', '#7bdead'];
                                    return defaultPieColor[params.dataIndex % defaultPieColor.length];
                                }
                            },
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
                // color :conf['colorData']
            }
            domChart.setOption(defaultOption);
            return domChart;
        },
        initPieSimple: function (conf, param) {
            var flag = checkConf(conf, '饼状图pie-simple');
            if (!flag) {
                return
            }
            var result = getResult(conf, param);
            var seriesData = result.seriesData;
            var legendData = [];
            for (var op in seriesData) {
                legendData[op] = seriesData[op].name;
            }
            var option = {
                title: {
                    text: conf['titleText'],
                    x: 'center',
                },
                tooltip: {
                    show: conf['tooltipShow'] || true,
                    trigger: 'item',
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: legendData
                },
                series: [
                    {
                        name: conf['seriesName'] || '',
                        type: 'pie',
                        radius: conf['seriesRadius'] || '35%',
                        center: ['50%', '50%'],
                        data: seriesData,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            }
            return setOption(conf, option);
        },
        initPieDoughnut: function (conf, param) { //初始化饼状图
            var flag = checkConf(conf, '环形图pie-doughnut');
            if (!flag) {
                return
            }
            var result = getResult(conf, param)
            var seriesData = result.seriesData;
            var legendData = [];

            for (var op in seriesData) {
                legendData[op] = seriesData[op].name;
            }

            var option = {
                title: {
                    text: conf['titleText'],
                    x: 'center',
                },
                tooltip: {
                    show: conf['tooltipShow']||true,
                    trigger: 'item',
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: legendData
                },
                series: [
                    {
                        name: conf['seriesName'] || '',
                        type: 'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        data: seriesData,   //series的数据
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },

                    }
                ]
            }
            return setOption(conf,option);
        },
        initBarYCategory: function (conf, param) { //初始化柱状图bar-y-category
            var flag = checkConf(conf, '条形图bar-y-category');
            if (!flag) {
                return
            }
            var result = getResult(conf, param)

            var seriesData = result.seriesData; // 获取seriesData数据
            var legendData = result.legendData; // 获取legendData数据
            var yAxisData = result.yaxisData; // 获取y轴数据

            var seriesArray = [];
            for (var i = 0; i < seriesData.length; i++) { //遍历seriesData数据
                var seriesObj = {
                    name: legendData[i],
                    type: 'bar',
                    data: seriesData[i],
                }
                seriesArray.push(seriesObj);
            }
            var option = {
                title: {
                    text: conf['titleText'],
                    show: true
                },
                //提示框组件
                tooltip: {
                    show: conf['tooltipShow']||true,
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: legendData
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    name: conf['xAxisName'],
                    boundaryGap: [0, 0.01]
                },
                yAxis: {
                    type: 'category',
                    name: conf['yAxisName'],
                    data: yAxisData
                },
                series: seriesArray
            };
            return setOption(conf,option);
        },
        initBarSimple: function (conf, param) {
            if (!(typeof conf == 'object' && 'id' in conf && 'url' in conf)) {
                console.warn('初始化柱状图bar-simple失败！');
                return;
            }
            var result = getResult(conf, param);

            var seriesData = result.seriesData[0];
            var legendData = result.legendData;
            var xAxisData = result.xaxisData;

            var xAxisName = conf['xAxisName'] || '';  //x轴名称
            var yAxisName = conf['yAxisName'] || '';  //y轴名称
            var option = {
                title: {
                    text: conf['titleText']
                },
                animation: false, //不设置开场动画
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    },
                    formatter: conf['tooltipFormatter'] || "{a} <br/>{b} : {c}"    //{a}（系列名称），{b}（类目值），{c}（数值）, {d}（无）
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                legend: {
                    data: legendData
                },
                xAxis: {
                    type: 'category',
                    name: xAxisName,
                    data: xAxisData
                },
                yAxis: [
                    {
                        type: 'value',
                        name: yAxisName,
                        splitLine: {  //无垂直
                            show: false
                        },
                        axisLabel: conf['yAxisLabel'] || {}
                    }
                ],
                series: [{
                    name: conf['seriesName'], //series的名称
                    type: 'bar',
                    data: seriesData,
                    barWidth: conf['barWidth'] || 20,  //设置柱状图宽度
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                }]
            };

            return setOption(conf,option);
        },
        initBarStack: function (conf, param) {
            if (!(typeof conf == 'object' && 'id' in conf && 'url' in conf)) {
                console.warn('初始化柱状图bar-stack失败！');
                return;
            }
            var result = getResult(conf, param);

            var seriesData = result.seriesData;
            var legendData = result.legendData;
            var xAxisData = result.xaxisData;

            var seriesArray = [];
            for (var i = 0; i < seriesData.length; i++) {
                var seriesObj = {
                    name: legendData[i],
                    type: 'bar',
                    data: seriesData[i],
                    markPoint: {
                        data: [
                            {type: 'max', name: '最大值'},
                            {type: 'min', name: '最小值'}
                        ]
                    },
                    markLine: {
                        data: [
                            {type: 'average', name: '平均值'}
                        ]
                    }
                }
                seriesArray.push(seriesObj);
            }

            var xAxisName = conf['xAxisName'] || '';  //x轴名称
            var yAxisName = conf['yAxisName'] || '';  //y轴名称
            var option = {
                title: {
                    text: conf['titleText']
                },
                animation: false, //不设置开场动画
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    },
                    formatter: conf['tooltipFormatter'] || "{a} <br/>{b} : {c}"    //{a}（系列名称），{b}（类目值），{c}（数值）, {d}（无）
                },
                toolbox: {
                    show: true,
                    feature: {
                        dataView: {show: true, readOnly: false},
                        magicType: {show: true, type: ['line', 'bar']},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                legend: {
                    data: legendData
                },
                xAxis: {
                    type: 'category',
                    name: xAxisName,
                    data: xAxisData
                },
                yAxis: [
                    {
                        type: 'value',
                        name: yAxisName,
                        splitLine: {  //无垂直
                            show: false
                        },
                        axisLabel: conf['yAxisLabel'] || {}
                    }
                ],
                series: seriesArray
            };
            return setOption(conf,option);
        },
        initAreaStack: function (conf, param) {
            if (!(typeof conf == 'object' && 'id' in conf && 'url' in conf)) {
                console.warn('初始化区域图area-stack失败！');
                return;
            }
            var result = getResult(conf, param);

            var seriesData = result.seriesData; // 获取seriesData数据
            var legendStackData = result.legendStackData; // 获取legendData数据
            var xAxisData = result.xaxisData; // 获取y轴数据

            var seriesArray = [];
            var legendArr = [];
            for (var i = 0; i < seriesData.length; i++) { //遍历seriesData数据
                var seriesObj = {
                    name: legendStackData[i].legend,
                    data: seriesData[i],
                    stack: legendStackData[i].stack,
                    type: 'line',
                    smooth: true,
                    areaStyle: {},
                }
                seriesArray.push(seriesObj);
                legendArr.push(legendStackData[i].legend);
            }

            var xAxisName = conf['xAxisName'] || '';  //x轴名称
            var yAxisName = conf['yAxisName'] || '';  //y轴名称
            var option = {
                title: {
                    text: conf['titleText']
                },
                animation: false, //不设置开场动画
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                toolbox: {
                    show: true,
                    feature: {
                        dataView: {show: true, readOnly: false},
                        saveAsImage: {show: true}
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                legend: {
                    data: legendArr
                },
                xAxis: {
                    type: 'category',
                    name: xAxisName,
                    data: xAxisData
                },
                yAxis: [
                    {
                        type: 'value',
                        name: yAxisName,
                        splitLine: {  //无垂直
                            show: false
                        },
                        axisLabel: conf['yAxisLabel'] || {}
                    }
                ],
                series: seriesArray
            };

            return setOption(conf, option);
        },
        initLineSimple: function (conf, param) { //初始化折线
            if (!(typeof conf == 'object' && 'id' in conf && 'url' in conf)) {
                console.warn('初始化折线图line-smooth失败！');
                return;
            }
            var result=getResult(conf,param)
            var xAxisData = result.xaxisData;
            var seriesData = result.seriesData;
            var option = {
                title: {
                    text: conf['titleText'],
                    left: 'center'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    },
                    formatter: "{a} <br/>{b} : {c}%"    //{a}（系列名称），{b}（类目值），{c}（数值）, {d}（无）
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    name: conf['xAxisName'],
                    data: xAxisData
                },
                yAxis: {
                    type: 'value',
                    name: conf['yAxisName'],
                    splitLine: {  //无垂直
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        interval: 'auto',
                        formatter: '{value}%'
                    },
                },
                series: [{
                    name: conf['seriesName'],
                    data: seriesData,
                    type: 'line'
                }],
            };
            setOption(conf,option);
        },
        initLineStack: function (conf, param) { //折线图堆叠
            if (!(typeof conf == 'object' && 'id' in conf && 'url' in conf)) {
                console.warn('初始折线图堆叠line-stack失败！');
                return;
            }
            var result = getResult(conf, param);

            var legendStackData = result.legendStackData;
            var xAxisData = result.xaxisData;
            var seriesData = result.seriesData;

            var seriesArr = []; //最后总的series数组
            var legendArr = [];
            for (var i = 0; i < legendStackData.length; i++) {
                var seriesObj = {
                    name: legendStackData[i].legend,
                    data: seriesData[i],
                    stack: legendStackData[i].stack,
                    type: 'line',
                    smooth: true
                }
                seriesArr.push(seriesObj);
                legendArr.push(legendStackData[i].legend);
            }

            var option = {
                title: {
                    text: conf['titleText'],
                    left: 'center'
                },
                tooltip: {
                    trigger: 'axis',
                },
                legend: {data: legendArr},
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                axisPointer: {
                    label: {
                        formatter: function (params) {
                            return conf['yAxisName'] + params.value;
                        }
                    },
                    lineStyle: {
                        width: 100,
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: 'rgba(0, 0, 0, .075)' // 0% 处的颜色
                            }, {
                                offset: 1, color: 'rgba(0, 0, 0, .075)' // 100% 处的颜色
                            }],
                            global: false // 缺省为 false
                        }
                    }
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    name: conf['xAxisName'],
                    data: xAxisData
                },
                yAxis: {
                    type: 'value',
                    name: conf['yAxisName'],
                    splitLine: {  //无垂直
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        interval: 'auto',
                        formatter: '{value}'
                    },
                },
                series: seriesArr,
                // color: ['#25a547']
            };
            return setOption(conf,option);
        },
        initRadar: function (conf, param) { //初始化雷达图
            if (!(typeof conf == 'object' && 'id' in conf
                && 'url' in conf)) {
                console.warn('初始化雷达图radar失败！');
                return;
            }
            var result; //查询结果
            var resFlag = true; //查询状态
            //获取radar服务端数据
            BsTool.ajaxSubmit(conf['url'], param, function (res) {
                if (res.rtnCode == 200) { // 成功
                    result = res.data;
                } else {
                    toastr.warning(res.msg); // 失败
                    resFlag = false;
                    return false;
                }
            })
            if (!resFlag) {
                toastr.warning('雷达图radar数据查询失败！');
                return;
            }
            var legendData = result.legendData;       //[leadergroupName+'领导人员二级指标平均分'];
            var legendDataArr = [];
            var indicator = result.indicator;    // [  [{}],     [{},{}]  ]
            var seriesData = result.seriesData;
            var tooltipShow = conf['tooltipShow'] && true;
            /*var tooltipShow = true; //默认tooltip设置为显示
            if(typeof conf['tooltipShow'] !='undefined'){
                tooltipShow = conf['tooltipShow'];
            }*/

            var radarArr = [];
            var seriesArr = []; //最后总的series数组
            if (indicator.length > 0) { //如果indicator有数据
                var radarCenterX = 25; //雷达图x轴位置
                var radarCenterY = 50; //雷达图y轴位置
                for (var i = 0; i < indicator.length; i++) { //遍历indicator雷达图数据,绘制indicator.length的雷达图
                    var radarObj = {};
                    if (i >= 1) {
                        radarCenterX += 50;
                    }
                    radarObj['name'] = {
                        textStyle: {
                            color: '#fff',
                            backgroundColor: '#999',
                            borderRadius: 3,
                            padding: [3, 5]
                        }
                    };
                    radarObj['axisLine'] = {
                        show: true,
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.5)'
                        }
                    },
                        radarObj['indicator'] = indicator[i];
                    radarObj['center'] = [radarCenterX + '%', radarCenterY + '%'];
                    radarObj['radius'] = 150;
                    radarArr.push(radarObj);

                    var seriesDataArray = []; //seriesData的数组
                    var seriesName = '';
                    var count = 0;
                    for (var j = 0; j < seriesData.length; j++) { //遍历seriessData数据
                        if (legendData[j].index == i) { //如果这个legendData索引是外层的雷达图，则push数据
                            legendDataArr.push(legendData[j].legendName);
                            count++;
                            if (count > 1) {
                                seriesName += ' vs ';
                                seriesName += legendData[j].legendName;
                            } else {
                                seriesName += legendData[j].legendName;
                            }
                            var obj = {};
                            obj['name'] = legendData[j].legendName; //与legend保持一致
                            obj['value'] = seriesData[j];
                            obj['label'] = {  //这里的配置显示数值
                                normal: {
                                    show: true,
                                    formatter: function (params) {
                                        return params.value;
                                    }
                                }
                            };
                            seriesDataArray.push(obj);//[{name:' 标题一',value:[1,2,3,4,5]},{name:' 标题二',value:[2,78,1,2,9]}]
                        }
                    }

                    var seriesObj = {
                        name: seriesName, //series总的名称
                        type: 'radar',
                        radarIndex: i, //雷达图的索引
                        data: seriesDataArray,
                        itemStyle: {
                            //通常情况下：
                            normal: {
                                //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                                color: function (params) {
                                    //barColor[i]
                                    var defaultBarColor = ['#19e8e0', '#166fe0'];
                                    return defaultBarColor[params.dataIndex % defaultBarColor.length];
                                }
                            },
                            //鼠标悬停时：
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },
                    }
                    seriesArr.push(seriesObj);

                }
            }
            option = {
                title: {
                    text: conf['titleText'] // 取消默认显示|| '雷达图'
                },
                animation: false, //不设置开场动画
                tooltip: {  //默认的提示语句
                    show: tooltipShow == false ? false : true, //显示tooltip
                    trigger: 'item'
                    //formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    data: legendDataArr
                },
                radar: radarArr,
                series: seriesArr

            };
            return setOption(conf,option);
        }
    }
})();
EchartsTool = EchartsTool.prototype;

function checkConf(conf, name) {
    if (!(typeof conf == 'object' && 'id' in conf && 'url' in conf)) {
        console.warn('初始化' + name + '失败！');
        return false;
    } else {
        return true;
    }
}

function setOption(conf, option) {
    var dom = $("#" + conf['id'])[0];
    var domChart = echarts.init(dom, $theme);
    domChart.setOption(option);
    return domChart;
}

function getResult(conf, param) {
    var result;
    param = param || {}
    if (typeof param == 'function') {
        param = param();
    }
    //获取数据
    BsTool.ajaxSubmit(conf['url'], param,
        function (res) {
            if (res.rtnCode == 200) {
                result = res.data;
            } else {
                toastr.warning(res.msg);
            }
        })
    return result;
}
