
var $evalNameUrl = '/dropDown/getEvalNameDropdown';
var initControllers = (function () {
    return {
        init: function () {
            initBar();
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



function initBar() {
    var configure = {
        id: 'bar-y-category',
        titleText: '世界人口总量',
        url: '/report/echarts/barYCategory',
        xAxisName: '',
        yAxisName: '',
    }
    var queryParams = function (params) {
        return BsTool.getFormData("searchFormCondition");
    }
    EchartsTool.initBarYCategory(configure, queryParams);
}
