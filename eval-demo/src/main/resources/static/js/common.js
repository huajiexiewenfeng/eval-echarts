/**
 * 通用封装工具 js
 */
var BsTool = BsTool || {};
BsTool.prototype = (function () {
    return {
        loadJsonToForm: function (jsonStr) {
            try {
                //var obj = eval("("+jsonStr+")");
                var obj = jsonStr;
                var key, value, tagName, type, arr;

                var formId = '';
                if (typeof obj['formId'] != 'undefined') {
                    formId = obj['formId'];
                }
                for (x in obj) {
                    key = x;
                    value = obj[x];
                    $(formId + "[name='" + key + "'],[name='" + key + "[]']").each(function () {
                        tagName = $(this)[0].tagName;
                        type = $(this).attr('type');
                        if (tagName == 'INPUT') {
                            if (type == 'radio') {
                                $(this).prop('checked', $(this).val() == value);
                            } else if (type == 'checkbox') {
                                arr = value.split(',');
                                for (var i = 0; i < arr.length; i++) {
                                    if ($(this).val() == arr[i]) {
                                        $(this).attr('checked', true);
                                        break;
                                    }
                                }
                            } else {
                                $(this).val(value);
                            }
                        } else if (tagName == 'SELECT' || tagName == 'TEXTAREA') {
                            // if($("#" + id).attr('multiple') !=undefined){ //如果是多选的下拉框
                            // $("#" + id+" option:eq(0)").attr("selected","selected");

                            //if(tagName == 'TEXTAREA' ||!$(this).hasClass('selectpicker') ) {
                            $(this).val(value);
                            // }
                            if ($(this).hasClass('selectpicker')) {
                                //$("#queryEvalYear").selectpicker('refresh');
                                //$(this).find("option[value="+value+"]").prop("selected","selected");
                                $(formId + ".selectpicker").selectpicker('refresh');
                                $(formId + '.selectpicker').selectpicker('render'); //您可以强制使用该render方法重新渲染bootstrap-select ui 。如果当您编程时更改任何相关值而影响元素布局，这将非常有用
                            }
                        }
                    });
                }
            } catch (e) {
                console.warn("加载表单：" + e.message + ",数据内容" + JSON.stringify(jsonStr));
            }
        },

        initDeleteEvent: function (opt) {
            if (!(typeof opt == 'object')) {
                console.error('初始化删除事件参数类型错误');
                return;
            }

            var closeFunc = '';
            if (opt['closeFunc'] != undefined && typeof opt['closeFunc'] == 'function') {
                closeFunc = opt['closeFunc'];
            }

            var rows = opt['rows'];
            if (BsTool.isArrayFn(rows)) {  //如果是数组
                if (rows.length == 0) {
                    toastr.warning('请选择要删除的数据！');
                    return false;
                }
            } else { //不是数组
                if (rows == null) {
                    toastr.warning('请选择要删除的数据！');
                    return false;
                }
            }
            BsTool.confirmDialog('提示', '确认要删除勾选的数据？', function (result) {
                if (result) {
                    var ids = [];
                    for (var i = 0; i < rows.length; i++) {
                        ids.push(rows[i][opt['ID']]);
                    }
                    var data = {
                        ids: ids.join(',')
                    };
                    BsTool.ajaxSubmit(opt['url'], data, function (msg) {
                        if (msg == 'success') {
                            toastr.success('删除成功！');
                        } else {
                            toastr.warning('删除失败！');
                        }
                        opt['callback'](msg);
                    });
                }
            }, '', closeFunc)
        },
        ajaxSubmit: function (url, data, callback, type, async, contentType, traditional, beforeSendFunc) {
            if (url == undefined) {
                return;
            }
            $.ajax({
                url: url,
                data: data,
                // dataType:"json",
                contentType: contentType || "application/x-www-form-urlencoded; charset=UTF-8",
                async: async || '' ? true : false, //如果没传async,默认是同步，否则是异步
                type: type || 'post',
                traditional: traditional || '' ? true : false, //如果没传traditional默认false
                crossDomain: true,
                xhrFields: {withCredentials: true},
                beforeSend: function () {
                    if (typeof beforeSendFunc == 'function') {
                        beforeSendFunc();
                    }
                }, //发送之前处理函数
                success: function (msg) {
                    if (callback) {
                        callback(msg);
                    }
                }
            });
        },
        ajaxSubmitCross: function (conf) {
            if (conf['url'] == undefined) {
                return;
            }
            $.ajax({
                url: prefix + conf['url'],
                data: conf['data'],
                // dataType:"json",
                contentType: conf['contentType'] || "application/x-www-form-urlencoded; charset=UTF-8",
                async: conf['async'] || '' ? true : false, //如果没传async,默认是同步，否则是异步
                type: conf['type'] || 'post',
                traditional: conf['traditional'] || '' ? true : false, //如果没传traditional默认false
                crossDomain: true,
                xhrFields: {withCredentials: true},
                beforeSend: function () {
                    if (typeof conf['beforeSendFunc'] == 'function') {
                        conf['beforeSendFunc']();
                    }
                }, //发送之前处理函数
                success: function (msg) {
                    if (typeof conf['successFunc'] == 'function') {
                        conf['successFunc'](msg);
                    }
                }
            });
        },
        isArrayFn: function (value) {
            if (typeof Array.isArray === "function") {//判断是否为数组
                return Array.isArray(value);
            } else {
                return Object.prototype.toString.call(value) === "[object Array]";
            }
        },
        toStringValue: function (obj) {
            if (obj instanceof Array) {
                var arr = [];
                for (var i = 0; i < obj.length; i++) {
                    arr[i] = BsTool.toStringValue(obj[i]);
                }
                return arr;
            } else if (typeof obj == 'object') {
                for (var opt in obj) {
                    obj[opt] = BsTool.toStringValue(obj[opt]);
                }
            } else if (typeof obj == 'number') {
                obj = obj + '';
            }
            return obj;
        },
        initSelectBox: function (id, url, data, initData, optionExtra, optionObj) { //初始化下拉框
            optionExtra = optionExtra || false;
            $("#" + id).empty();
            BsTool.ajaxSubmit(url, data, function (res) {

                var options = ''; //<option value="">请选择</option>
                if (optionExtra) {
                    options += "<option value=''>请选择</option>";
                }
                if (!(typeof optionObj == "undefined")) {
                    options += '<option value="' + optionObj.value + '">' + optionObj.optionText + '</option>';
                    $("#" + id).append(options);
                }
                if (res != null && res != '') {
                    for (var i in res) {
                        var otherOption = typeof res[i].otherOption == "undefined" ? "" : res[i].otherOption;
                        if (initData != undefined && initData == res[i].value) {
                            options += '<option value="' + res[i].value + '" otherOption="' + otherOption + '" selected=selected>' + res[i].text + '</option>';
                        } else {
                            if (res[i].value != undefined) {
                                options += '<option value="' + res[i].value + '" otherOption="' + otherOption + '">' + res[i].text + '</option>';
                            }
                        }
                    }
                    $("#" + id).append(options);
                }
                if ($("#" + id).hasClass('selectpicker')) { //如果是bootstrap selectpicker
                    if ($("#" + id).attr('multiple') != undefined) { //如果是多选的下拉框
                        $("#" + id + " option:eq(0)").attr("selected", "selected");
                    }
                    $("#" + id).attr("data-dropup-auto", "false"); //表示下拉框默认向下展开
                    $("#" + id).selectpicker('refresh'); //只刷新自己，不影响其他
                    $("#" + id).selectpicker('render');//只刷新自己，不影响其他
                    $("#" + id).parent().find("div.dropdown-menu").css("min-width", "100%");
                    $("#" + id).parent().find("div.dropdown-menu").css("max-width", "120%");

                }
            })
        },

        initSelectBoxName: function (name, url, data, initData, optionExtra, optionObj) { //初始化下拉框
            optionExtra = optionExtra || false;
            $($("input[name=" + name + "]")[0]).empty();
            BsTool.ajaxSubmit(url, data, function (res) {

                var options = ''; //<option value="">请选择</option>
                if (optionExtra) {
                    options += "<option value=''>请选择</option>";
                }
                if (!(typeof optionObj == "undefined")) {
                    options += '<option value="' + optionObj.value + '">' + optionObj.optionText + '</option>';
                }
                if (res != null && res != '') {
                    for (var i in res) {
                        var otherOption = typeof res[i].otherOption == "undefined" ? "" : res[i].otherOption;
                        if (initData != undefined && initData == res[i].value) {
                            options += '<option value="' + res[i].value + '" otherOption="' + otherOption + '" selected=selected>' + res[i].text + '</option>';
                        } else {
                            if (res[i].value != undefined) {
                                options += '<option value="' + res[i].value + '" otherOption="' + otherOption + '">' + res[i].text + '</option>';
                            }
                        }
                    }
                    $($("select[name='" + name + "']")[0]).append(options);
                }
                if ($($("select[name='" + name + "']")[0]).hasClass('selectpicker')) { //如果是bootstrap selectpicker
                    if ($($("select[name='" + name + "']")[0]).attr('multiple') != undefined) { //如果是多选的下拉框
                        $($("select[name='" + name + "']")[0]).find("option:eq(0)").attr("selected", "selected");
                    }
                    $($("select[name='" + name + "']")[0]).selectpicker('refresh'); //只刷新自己，不影响其他
                    $($("select[name='" + name + "']")[0]).selectpicker('render');//只刷新自己，不影响其他
                }
            })
        },
        getFormData: function (formId) { //初始化重置表单，将表单标签置为初始值，隐藏标签要单独处理
            var data = {};
            var $inpurDom = $("#" + formId + " input");
            for (var i = 0; i < $inpurDom.length; i++) {
                var name = $inpurDom[i].name;
                if (name)
                    data[name] = $($inpurDom[i]).val();
            }
            var $selectDom = $("#" + formId + " select");
            for (var i = 0; i < $selectDom.length; i++) {
                //var selectedIndex = $selectDom[i].selectedIndex;
                //if(selectedIndex){
                var name = $selectDom[i].name;
                if (name) {
                    if ($selectDom[i].multiple) {
                        var values_arr = $($selectDom[i]).val();//以数组形式获取值
                        if (values_arr) {
                            var value_str = values_arr.join(",");//数组转字符串
                            data[name] = value_str;
                        }
                    } else {
                        data[name] = $($selectDom[i]).val();
                    }
                }
                //}
            }
            var $textareaDom = $("#" + formId + " textarea");
            for (var i = 0; i < $textareaDom.length; i++) {
                var name = $textareaDom[i].name;
                if (name)
                    data[name] = $($textareaDom[i]).val();
            }
            return data;

        },
        setFormData: function (formId, row) { //设置表单的值
            var name = '';
            var value = '';
            var $inpurDom = $("#" + formId + " input");
            for (var i = 0; i < $inpurDom.length; i++) {
                name = $inpurDom[i].name;
                if (null != row[name] && row[name] != undefined) {
                    value = row[name];
                    $($inpurDom[i]).val(value);
                } else {
                    $($inpurDom[i]).val('');
                }

            }
            var $selectDom = $("#" + formId + " select");
            for (var i = 0; i < $selectDom.length; i++) {
                /*var selectedIndex = $selectDom[i].selectedIndex;
                if(selectedIndex){
                    var name = $selectDom[i].name;
                    var value = '';
                    if(row[name] != undefined){
                        value = row[name];
                    }
                    $($selectDom[i]).val(value);
                }*/
                name = $selectDom[i].name; //select名称
                if (null != row[name] && row[name] != undefined) {
                    value = row[name];
                    $($selectDom[i]).val(value);
                } else {
                    $($selectDom[i]).val('');
                }
                /*var selectOptions = $($selectDom[i]).find("option");
                for(var j=0;j<selectOptions.length; j++){ //遍历options选项
                    if(row[name] != undefined && row[name] == $(selectOptions[j]).val() ){
                        $(selectOptions[j]).prop("selected",true);
                    }
                }*/
                if ($($selectDom[i]).hasClass('selectpicker')) {
                    $("#" + formId + " .selectpicker").selectpicker('refresh');
                    $("#" + formId + " .selectpicker").selectpicker('render'); //您可以强制使用该render方法重新渲染bootstrap-select ui 。如果当您编程时更改任何相关值而影响元素布局，这将非常有用
                }
            }
            var $textareaDom = $("#" + formId + " textarea"); //遍历textarea
            for (var i = 0; i < $textareaDom.length; i++) {
                name = $textareaDom[i].name;
                if (null != row[name] && row[name] != undefined) {
                    value = row[name];
                    $($textareaDom[i]).val(value);
                } else {
                    $($textareaDom[i]).val('');
                }
            }
        },
        resetFormNotHidden: function (formId) { //初始化重置表单，将表单标签置为初始值，隐藏标签要单独处理
            $('#' + formId + ' .selectpicker').each(function (i, j) {
                $(j).find("option:selected").attr("selected", false);
                var optionFirst = $(j).find("option:first");
                optionFirst.attr("selected", true);

                //设置下一个button title为 选项名称
                $(j).next().attr('title', optionFirst[0].label);
                //设置下一个div class filter-option-inner-inner 为 选项名称
                $(j).next().find("div .filter-option-inner-inner").text(optionFirst[0].label);
            });
            document.getElementById(formId).reset(); //reset按钮不能清空隐藏域的值
        },
        resetForm: function (formId) { //初始化重置表单，将表单标签置为初始值，隐藏标签要单独处理
            var $inpurDom = $("#" + formId + " input");
            for (var i = 0; i < $inpurDom.length; i++) {
                var type = $inpurDom[i].type;
                if (type == "hidden") {
                    $($inpurDom[i]).val("");
                }
            }
            document.getElementById(formId).reset(); //reset按钮不能清空隐藏域的值
            $('#' + formId + ' .selectpicker').each(function (index, item) {
                if ($(item).hasClass('selectpicker')) {
                    $(".selectpicker").selectpicker('refresh');
                    $('.selectpicker').selectpicker('render'); //您可以强制使用该render方法重新渲染bootstrap-select ui 。如果当您编程时更改任何相关值而影响元素布局，这将非常有用
                }
            });
        },
        initSubTableCol: function (col) { //初始化table
            var dom = '';
            var readonly = '';
            if (col.hasOwnProperty('readonly')) {
                readonly = 'readonly';
            }
            if (typeof col.type != 'undefined') {
                if (col.type == 'text') { //text框
                    dom += '<input type="text" ' + readonly + ' class="form-control input-sm" name="' + col.name + '" value="' + col.value + '">';
                } else if (col.type == 'number') { //数字框
                    dom += '<input type="number"  ' + readonly + ' onkeypress="return( /[0-9\.]/.test(String.fromCharCode(event.keyCode)))" class="form-control input-sm" name="' + col.name + '" value="' + col.value + '">';
                } else if (col.type == 'textarea') { //textarea
                    dom += '<textarea class="form-control" rows="2" name="' + col.name + '" >' + col.value + '</textarea>';
                } else if (col.type == 'select') { //下拉框
                    dom = '<select class="form-control input-sm" name="' + col.name + '">';
                    for (var i = 0; i < col.option.length; i++) {
                        if (col.value == col.option[i].value) {
                            dom += '<option value="' + col.option[i].value + '" selected>';
                        } else {
                            dom += '<option value="' + col.option[i].value + '">';
                        }
                        dom += '' + col.option[i].text + '</option>';
                    }
                    dom += '</select>';
                } else if (col.type == 'date') {
                    dom += '<input type="date" class="form-control input-sm" name="' + col.name + '" value="' + col.value + '">';
                }
            } else {
                dom += '<input type="text" style="display: none"' + readonly + ' name="' + col.name + '" value="' + col.value + '">';
            }
            return dom;
        },
        checkRequire: function (formId) {
            if (formId == undefined || typeof formId != "string") {
                return;
            }
            // 检测必输项
            $('#' + formId + ' .require').nextAll('.form-control').removeClass('require-focus');
            var tag = true;
            var a_content = $('#' + formId + ' .require').parent('.input-group');
            a_content.each(function (i, e) {
                if ($(e).children(".form-control").length > 0) {
                    var $childrenEle = $(e).children(".form-control");
                    for (var i = 0; i < $childrenEle.length; i++) {
                        if ($childrenEle[i].tagName != "DIV") {
                            if ($($childrenEle[i]).val() == null || $($childrenEle[i]).val() == '' || $($childrenEle[i]).val().trim() == '') {
                                $($childrenEle[i]).addClass('require-focus');
                                scroll_to_dom($($childrenEle[i]));
                                tag = false;
                                return tag;
                            }
                        } else { //说明div层
                            var $childrenEle1 = $($childrenEle[i]).children(".form-control");
                            if ($childrenEle1.val() == null || $childrenEle1.val() == '' || $childrenEle1.val().trim() == '') {
                                $($childrenEle[i]).addClass('require-focus');
                                scroll_to_dom($($childrenEle[i]));
                                tag = false;
                                return tag;
                            }
                        }
                    }
                } else {
                    if ($(e).children(".input-group.date.form_date_start").length > 0) { //日期类型
                        var $childrenEle = $(e).children(".input-group.date.form_date_start");
                        var $childrenEleDate = $childrenEle.find(".form-control");
                        if ($childrenEleDate.val() == null || $childrenEleDate.val() == '' || $childrenEleDate.val().trim() == '') {
                            $childrenEleDate.addClass('require-focus');
                            scroll_to_dom($childrenEleDate);
                            tag = false;
                            return tag;
                        }
                    } else if ($(e).children(".radio-inline").length > 0) { //radio标签
                        var a_radio = $(e).find('input[type="radio"]');
                        if (a_radio.length > 0) {
                            var num = 0;
                            a_radio.each(function (a, b) {
                                if ($(b).is(":checked")) {  //$(b).get(0).checked   $(b).attr('checked')   $(b).prop('checked') $(b).is(":checked")
                                    num += 1;
                                }
                            });
                            if (num == 0) {
                                var radio_temp = a_radio.parents('.td-content');
                                radio_temp.addClass('require-focus');
                                scroll_to_dom(radio_temp);
                                tag = false;
                                return tag;
                            }
                        }
                    }
                }
            });
            return tag;
        },
        addNum: function (num1, num2) {  //自定义加法运算
            var sq1, sq2, m;
            try {
                sq1 = num1.toString().split(".")[1].length;
            }
            catch (e) {
                sq1 = 0;
            }
            try {
                sq2 = num2.toString().split(".")[1].length;
            }
            catch (e) {
                sq2 = 0;
            }
            m = Math.pow(10, Math.max(sq1, sq2));
            return (Math.round(num1 * m * 100) / 100 + Math.round(num2 * m * 100) / 100) / m;
        },
        ajaxPromise: function (url, data, callback, type, async, contentType, traditional) { //ajax方法 集成了promise
            var p = new Promise(function (resolve, reject) {
                if (BsTool.stringIsEmptyOrNull(url)) { //如果没传递url参数，进行普通函数的promise过程

                    resolve(callback());//调用resolve()
                } else { //有url参数，执行ajax方法
                    BsTool.ajaxSubmit(url, data, function (res) {
                        callback(res); //执行回调函数
                        resolve(res);//调用resolve()
                        //使得当前promise状态转变为fulfilled即可
                    }, type, async, contentType, traditional);
                }
            });
            return p;
        },
        stringIsEmptyOrNull: function (str) {
            if (str == null || str.toString().replace(/(^\s*)|(\s*$)/g, "") == '') {
                return true;
            } else {
                return false;
            }
        },
        serializeObject: function (formId) {
            var o = {};
            var a = $("#" + formId).serializeArray();
            $.each(a, function () {
                if (o[this.name]) {
                    if (!o[this.name].push) {
                        o[this.name] = [o[this.name]];
                    }
                    o[this.name].push(this.value || '');
                } else {
                    o[this.name] = this.value || '';
                }
            });
            return o;
        },
        //数组去重
        unique: function (arr) {
            var result = [], hash = {};
            for (var i = 0, elem; (elem = arr[i]) != null; i++) {
                if (!hash[elem]) {
                    result.push(elem);
                    hash[elem] = true;
                }
            }
            return result;
        }
    }
})();
BsTool = BsTool.prototype;


function defaultValue(value, defaultValue) {
    return isNotEmpty(value) ? value : defaultValue;
}

function isEmpty(str) {
    return str + '' == '' || str == null;
}

function isNotEmpty(str) {
    return !isEmpty(str);
}


//var toString = Object.prototype.toString;
function isFunction(obj) {
    return Object.prototype.toString.call(obj) === '[object Function]'
}

function eq(a, b, aStack, bStack) {

    // === 结果为 true 的区别出 +0 和 -0
    if (a === b) return a !== 0 || 1 / a === 1 / b;

    // typeof null 的结果为 object ，这里做判断，是为了让有 null 的情况尽早退出函数
    if (a == null || b == null) return false;

    // 判断 NaN
    if (a !== a) return b !== b;

    // 判断参数 a 类型，如果是基本类型，在这里可以直接返回 false
    var type = typeof a;
    if (type !== 'function' && type !== 'object' && typeof b != 'object') return false;

    // 更复杂的对象使用 deepEq 函数进行深度比较
    return deepEq(a, b, aStack, bStack);
}

function deepEq(a, b, aStack, bStack) {

    // a 和 b 的内部属性 [[class]] 相同时 返回 true
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;

    switch (className) {
        case '[object RegExp]':
        case '[object String]':
            return '' + a === '' + b;
        case '[object Number]':
            if (+a !== +a) return +b !== +b;
            return +a === 0 ? 1 / +a === 1 / b : +a === +b;
        case '[object Date]':
        case '[object Boolean]':
            return +a === +b;
    }

    var areArrays = className === '[object Array]';
    // 不是数组
    if (!areArrays) {
        // 过滤掉两个函数的情况
        if (typeof a != 'object' || typeof b != 'object') return false;

        var aCtor = a.constructor,
            bCtor = b.constructor;
        // aCtor 和 bCtor 必须都存在并且都不是 Object 构造函数的情况下，aCtor 不等于 bCtor， 那这两个对象就真的不相等啦
        if (aCtor !== bCtor && !(isFunction(aCtor) && aCtor instanceof aCtor && isFunction(bCtor) && bCtor instanceof bCtor) && ('constructor' in a && 'constructor' in b)) {
            return false;
        }
    }


    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;

    // 检查是否有循环引用的部分
    while (length--) {
        if (aStack[length] === a) {
            return bStack[length] === b;
        }
    }

    aStack.push(a);
    bStack.push(b);

    // 数组判断
    if (areArrays) {

        length = a.length;
        if (length !== b.length) return false;

        while (length--) {
            if (!eq(a[length], b[length], aStack, bStack)) return false;
        }
    }
    // 对象判断
    else {

        var keys = Object.keys(a),
            key;
        length = keys.length;

        if (Object.keys(b).length !== length) return false;
        while (length--) {

            key = keys[length];
            if (!(b.hasOwnProperty(key) && eq(a[key], b[key], aStack, bStack))) return false;
        }
    }

    aStack.pop();
    bStack.pop();
    return true;

}