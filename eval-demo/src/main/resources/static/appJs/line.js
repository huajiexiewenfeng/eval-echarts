var $evalNameUrl = '/dropDown/getEvalNameDropdown';
var initControllers = (function () {
    return {
        init: function () {
            // 柱状图
            initLine();
            // 柱状图
            // initSimpleBar();
            // 初始化折线
            // initBrokenLine();
            // initEvents();
        }
    }
})();


/**
 * 初始化按钮事件
 */
function initEvents() {
    $("#btn_export").click(function () {
        html2canvas($('#mainContext')[0], {
            onrendered: function (canvas) {
                context = canvas.getContext("2d");
                context.fillStyle = "#fff";
                //返回图片URL，参数：图片格式和清晰度(0-1)
                var pageData = canvas.toDataURL('image/jpeg', 1.0);
                //方向默认竖直，尺寸ponits，格式a4【595.28,841.89]
                var pdf = new jsPDF('', 'pt', 'a4');
                //需要dataUrl格式
                pdf.addImage(pageData, 'JPEG', 0, 0, 595.28, 592.28 / canvas.width * canvas.height);
                pdf.save("echarts图表.pdf");
            },
            background: '#fff'
        })
    })
}


function initLine() {
    var configure = {
        id: 'line-stack',
        url: '/report/echarts/lineStack',
        titleText: '',
        xAxisName: '日期', // x轴的名称
        yAxisName: '访问数', // y轴的名称
        seriesName: '日期'
    };
    var queryParams = function () {
        return BsTool.getFormData("searchFormCondition");
    };
    EchartsTool.initLineStack(configure, queryParams);
}
