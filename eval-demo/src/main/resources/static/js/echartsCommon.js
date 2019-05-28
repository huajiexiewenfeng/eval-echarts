/**
 * echarts 封装工具 js
 */
var EchartsTool = EchartsTool || {};
EchartsTool.prototype = (function () {
    return {
        initPieRichText: function (conf, param) { //初始化饼状图
            if (!(typeof conf == 'object' && 'id' in conf && 'seriesData' in conf)) {
                console.warn('初始化饼状图失败！');
                return;
            }
            /*   if (typeof conf == 'object') {
                  for (var op in conf) {
                      defaultOption[op] = conf[op];
                  }
              }*/

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
            var domChart = echarts.init($("#" + conf['id'])[0]); //饼状图dom
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
        initPieSimple: function (conf, param) { //初始化饼状图
            if (!(typeof conf == 'object' && 'id' in conf && 'url' in conf)) {
                console.warn('初始化饼状图pie-simple失败！');
                return;
            }
            var batchResult;

            param = param || {}  //没传param默认空对象
            if (typeof param == 'function') { //如果传递参数为函数
                param = param();  //执行函数获取对象
            }
            //获取数据
            BsTool.ajaxSubmit(conf['url'], param,
                function (res) {
                    if (res.rtnCode == 200) { // 成功
                        batchResult = res.data;
                    } else {
                        toastr.warning(res.msg); // 失败
                        return false;
                    }
                })
            var seriesData = batchResult.seriesData; // 获取seriesData数据
            var legendData = [];
            var pieColor = [];
            for (var op in seriesData) { //遍历传进来的seriesData
                legendData[op] = seriesData[op].name;
            }

            var tooltipShow = true; //默认tooltip设置为显示
            if (typeof conf['tooltipShow'] != 'undefined') {
                tooltipShow = conf['tooltipShow'];
            }
            var domChart = echarts.init($("#" + conf['id'])[0]); //饼状图dom
            var defaultOption = {
                title: {
                    text: conf['titleText'],
                    x: 'center',
                },
                tooltip: {  //默认的提示语句
                    show: tooltipShow, //显示tooltip
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: legendData     //数组
                },
                series: [
                    {   name:conf['seriesName']||'',
                        type: 'pie',
                        radius: conf['seriesRadius'] || '35%',//series的radius
                        center: ['50%', '50%'],
                        data: seriesData,   //series的数据
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                            /*normal:{
                    　　　　　　　　　　　　//每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                                        color: function (params){
                                            //barColor[i]
                                            var defaultBarColor = ['#1cc09e','#2f4553'];
                                            return defaultBarColor[params.dataIndex%defaultBarColor.length];
                                        }
                             }*/
                        }
                    }
                ]
                // color :conf['colorData']
            }
            domChart.setOption(defaultOption);
            return domChart;
        },
        initBarYCategory: function (conf, param) { //初始化柱状图bar-y-category
            if (!(typeof conf == 'object' && 'id' in conf && 'url' in conf)) {
                console.warn('初始化柱状图bar-y-category失败！');
                return;
            }

            var tooltipShow = true; //默认tooltip设置为显示
            if (typeof conf['tooltipShow'] != 'undefined') {
                tooltipShow = conf['tooltipShow'];
            }
            var batchResult;

            param = param || {}  //没传param默认空对象
            if (typeof param == 'function') { //如果传递参数为函数
                param = param();  //执行函数获取对象
            }
            //获取数据
            BsTool.ajaxSubmit(conf['url'], param,
                function (res) {
                    if (res.rtnCode == 200) { // 成功
                        batchResult = res.data;
                    } else {
                        toastr.warning(res.msg); // 失败
                        return false;
                    }
                })
            var seriesData = batchResult.seriesData; // 获取seriesData数据
            var legendData = batchResult.legendData; // 获取legendData数据
            var yAxisData = batchResult.yaxisData; // 获取y轴数据


            var seriesArray = [];
            for (var i = 0; i < seriesData.length; i++) { //遍历seriesData数据
                var seriesObj = {
                    name: legendData[i],
                    type: 'bar',
                    data: seriesData[i],
                    itemStyle: {
                        //通常情况下：
                        normal: {
                            //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                            color: function (params) {
                                //barColor[i]
                                var defaultBarColor = ['#1cc09e', '#2f4553'];
                                return defaultBarColor[params.seriesIndex % defaultBarColor.length];
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
                seriesArray.push(seriesObj);
            }


            var defaultOption = {
                tooltipTrigger: 'axis',
                tooltipAxisPointerType: 'shadow',
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
            }
            var option = {
                title: {
                    text: conf['titleText'],
                    show: conf['titleShow']
                },
                //提示框组件
                tooltip: {
                    show: tooltipShow, //显示tooltip
                    trigger: defaultOption['tooltipTrigger'],
                    axisPointer: {
                        type: defaultOption['tooltipAxisPointerType']
                    }
                },
                legend: {
                    data: legendData
                },
                grid: defaultOption['grid'],
                xAxis: {
                    type: 'value',//数值轴
                    name: conf['xAxisName'],
                    boundaryGap: [0, 0.01]//x 轴所在的 grid 的索引，默认位于第一个 grid
                },
                yAxis: {
                    type: 'category',//类目轴，适用于离散的类目数据
                    name: conf['yAxisName'],
                    data: yAxisData
                },
                series: seriesArray
            };
            //获取div对象
            var dom = $("#" + conf['id'])[0];
            var domChart = echarts.init(dom);
            // 使用刚指定的配置项和数据显示图表。
            domChart.setOption(option);
            return domChart;
        },
        initBarSimple: function (conf, queryParam) { //初始化柱状图bar-simple
            if (!(typeof conf == 'object' && 'id' in conf && 'url' in conf)) {
                console.warn('初始化柱状图bar-simple失败！');
                return;
            }
            var url = conf['url'];
            var result;
            //获取服务端数据
            BsTool.ajaxSubmit(url, queryParam(), function (res) {
                if (res.rtnCode == 200) { // 成功
                    result = res.data;
                } else {
                    toastr.warning(res.msg); // 失败
                }
            }, conf['method'] || 'post', false)
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
                    data: result.legendData
                },
                xAxis: {
                    type: 'category',
                    name: xAxisName,
                    data: result.xaxisData
                },
                yAxis: [
                    {
                        type: 'value',
                        name: yAxisName,
                        splitLine: {  //无垂直
                            show: false
                        },
                        axisLabel: conf['yaxisLabel'] || {}
                    }
                ],
                series: [{
                    name: conf['seriesName'], //series的名称
                    type: 'bar',
                    data: result.seriesData[0],
                    barWidth: conf['barWidth'] || 30,  //设置柱状图宽度
                    itemStyle: {
                        //通常情况下：
                        normal: {
                            //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                            color: function (params) {
                                var colorList = ['#1cc09e', '#2f4553'];
                                return colorList[params.dataIndex % 2];
                            }
                        },
                        //鼠标悬停时：
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                }]
            };
            //获取div对象
            var dom = $("#" + conf['id'])[0];
            var domChart = echarts.init(dom);
            // 使用刚指定的配置项和数据显示图表。
            domChart.setOption(option);
            return domChart;
        },
        initLineSimple: function (conf, param) { //初始化折线
            if (!(typeof conf == 'object' && 'id' in conf && 'url' in conf)) {
                console.warn('初始化折线图line-smooth失败！');
                return;
            }
            var url = conf['url']; //请求url
            var result;
            //获取服务端数据
            BsTool.ajaxSubmit(url, param(), function (res) {
                if (res.rtnCode == 200) { // 成功
                    result = res.data;
                } else {
                    toastr.warning(res.msg); // 失败
                    return false;
                }
            });
            var xAxisData = result.xaxisData;
            var seriesData = result.seriesData;

            option = {
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
                color: ['#25a547']
            };

            //获取div对象
            var dom = $("#" + conf['id'])[0];
            var domChart = echarts.init(dom);
            // 使用刚指定的配置项和数据显示图表。
            domChart.setOption(option);
            return domChart;
        },
        initLineStack: function (conf, param) { //折线图堆叠
            if (!(typeof conf == 'object' && 'id' in conf && 'url' in conf)) {
                console.warn('初始折线图堆叠line-stack失败！');
                return;
            }
            var result;
            //获取服务端数据
            BsTool.ajaxSubmit(conf['url'], param(), function (res) {
                if (res.rtnCode == 200) { // 成功
                    result = res.data;
                } else {
                    toastr.warning(res.msg); // 失败
                    return false;
                }
            }, conf['method'] || 'post', false);
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

            option = {
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
                        formatter: '{value}%'
                    },
                },
                series: seriesArr,
                // color: ['#25a547']
            };

            //获取div对象
            var dom = $("#" + conf['id'])[0];
            var domChart = echarts.init(dom);
            // 使用刚指定的配置项和数据显示图表。
            domChart.setOption(option);
            return domChart;
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
            //获取div对象
            var dom = $("#" + conf['id'])[0];
            var domChart = echarts.init(dom);
            // 使用刚指定的配置项和数据显示图表。
            domChart.setOption(option);
            return domChart;
        }
    }

})();
EchartsTool = EchartsTool.prototype;


