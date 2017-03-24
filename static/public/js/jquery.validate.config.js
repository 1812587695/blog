(function( $ ) {
	/*
	 * Translated default messages for the jQuery validation plugin.
	 * Locale: ZH (Chinese, 中文 (Zhōngwén), 汉语, 漢語)
	 */
	$.extend($.validator.messages, {
		required: "这是必填字段",
		remote: "请修正此字段",
		email: "请输入有效的电子邮件地址",
		url: "请输入有效的网址",
		date: "请输入有效的日期",
		dateISO: "请输入有效的日期 (YYYY-MM-DD)",
		number: "请输入有效的数字",
		digits: "只能输入数字",
		creditcard: "请输入有效的信用卡号码",
		equalTo: "你的输入不相同",
		extension: "请输入有效的后缀",
		maxlength: $.validator.format("最多可以输入 {0} 个字符"),
		minlength: $.validator.format("最少要输入 {0} 个字符"),
		rangelength: $.validator.format("请输入长度在 {0} 到 {1} 之间的字符串"),
		range: $.validator.format("请输入范围在 {0} 到 {1} 之间的数值"),
		max: $.validator.format("请输入不大于 {0} 的数值"),
		min: $.validator.format("请输入不小于 {0} 的数值")
	});
	// 不能为
	$.validator.addMethod("notEqual", function(value, element, param) {
		return this.optional(element) || value != param;
	}, $.validator.format("输入值不允许为{0}!"));
	// 以XXX为开头
	$.validator.addMethod("begin", function(value, element, param) {
		var begin = new RegExp("^" + param);
		return this.optional(element) || (begin.test(value));
	}, $.validator.format("必须以 {0} 开头!"));
	// 是否为用户名
	$.validator.addMethod("isUsername", function(value, element, param) {
		var reg = new RegExp("^[a-zA-Z][a-zA-Z0-9_]{5,19}$");
		return this.optional(element) || (reg.test(value));
	}, $.validator.format("请使用英文字母、数字、下划线, 以英文字母开头, 长度在6到20个字符之间"));
	// 是否为密码
	$.validator.addMethod("isPassword", function(value, element, param) {
		var reg = new RegExp("^[^\\s]{6,20}$");
		return this.optional(element) || (reg.test(value));
	}, $.validator.format("请使用非空字符, 长度在6到20个字符之间"));
	// 是否为门店编号
	$.validator.addMethod("isLocalNumber", function(value, element, param) {
		var reg = new RegExp("^[A-Z0-9]{10}$");
		return this.optional(element) || (reg.test(value));
	}, $.validator.format("请使用英文大写字母和数组, 长度为10个字符"));
	// 是否为整数,可修正
	$.validator.addMethod("isInteger", function(value, element, param) {
		var reg = new RegExp("^-?[0-9]+$");
		if(!reg.test(value)){
			$(element).val("0");
		}else{
			$(element).val(value.replace(/^(-?)(0+?)(0|[1-9][0-9]*?)$/, '$1$3'));
		}
		return true;
	}, $.validator.format(""));
	// 是否为正整数(除了0的自然数)
	$.validator.addMethod("isPositiveInt", function(value, element, param) {
		var reg = new RegExp("^[1-9][0-9]*?$");
		return this.optional(element) || reg.test(value);
	}, $.validator.format("请输入正整数"));
	// 是否为正小数(除了0)
	$.validator.addMethod("isPositiveNumber", function(value, element, param) {
		var reg = new RegExp("^(0|[1-9][0-9]*?)(\.[0-9]+)?$");
		return this.optional(element) || reg.test(value);
	}, $.validator.format("请输入大于0的数字"));
	// 是否为数字,可修正
	$.validator.addMethod("isNumber", function(value, element, param) {
		var reg = new RegExp("^-?[0-9]+(\.[0-9]+)?$");
		if(!reg.test(value)){
			$(element).val("0");
		}else{
			$(element).val(value.replace(/^(-?)(0*?)(0|[1-9][0-9]*?)(\.[0-9]+)?$/, '$1$3$4'));
		}
		return true;
	}, $.validator.format(""));
	// 是否为有效日期, 年-月-日 时:分[:秒]或年/月/日 时:分[:秒]
	$.validator.addMethod("isActTime", function(value, element, param) {
		var reg = new RegExp("^\\d{4}/\\d{1,2}/\\d{1,2} \\d{1,2}:\\d{1,2}(:\\d{1,2})?$");
		var regxg = new RegExp("^\\d{4}-\\d{1,2}-\\d{1,2} \\d{1,2}:\\d{1,2}(:\\d{1,2})?$");
		return this.optional(element) || reg.test(value) || regxg.test(value);
	}, $.validator.format("请输入有效日期"));
	// 是否为有效日期, 年-月-日或年/月/日
	$.validator.addMethod("isDate", function(value, element, param) {
		var reg = new RegExp("^(\\d{4}/\\d{1,2}/\\d{1,2}|\\d{4}-\\d{1,2}-\\d{1,2})$");
		return this.optional(element) || reg.test(value);
	}, $.validator.format("请输入有效日期"));
	// 是否为有效营业时间
	$.validator.addMethod("isShopTime", function(value, element, param) {
		var reg = new RegExp("^\\d{1,2}:\\d{1,2}$");
		return this.optional(element) || reg.test(value);
	}, $.validator.format("请输入有效营业时间"));
	// 营业时间比较
	$.validator.addMethod("shopTimeBigThan", function(value, element, param) {
		if(value == ""  || $(param).val() == ""){
			return true;
		}
		var sarr = $(param).val().split(":");
		var earr = value.split(":");
		var flag = false;
		var shour = parseInt(sarr[0]);
		var ehour = parseInt(earr[0]);
		if(shour < ehour){
			flag = true;
		}else if(shour == ehour){
			if(parseInt(sarr[1]) < parseInt(earr[1])){
				flag = true;
			}
		}
		return flag;
	}, $.validator.format(""));
	// 日期比较
	$.validator.addMethod("dateBigThan", function(value, element, param) {
		if(value == ""  || $(param).val() == ""){
			return true;
		}
		var sarr = $(param).val().replace(/-|\//g, "#").split("#");
		var earr = value.replace(/-|\//g, "#").split("#");
		var sDate = new Date();
		sDate.setFullYear(parseInt(sarr[0]), parseInt(sarr[1]) - 1, parseInt(sarr[2]));
		var eDate = new Date();
		eDate.setFullYear(parseInt(earr[0]), parseInt(earr[1]) - 1, parseInt(earr[2]));
		return sDate < eDate;
	}, $.validator.format(""));
	// 日期时间比较(智能)
	$.validator.addMethod("dateTimeBigThan", function(value, element, param) {
		if(value == ""  || $(param).val() == ""){
			return true;
		}
		var sarr = $(param).val().replace(/-|\/| |:/g, "#").split("#");
		var earr = value.replace(/-|\/| |:/g, "#").split("#");
		var sDate = new Date();
		sDate.setFullYear(parseInt(sarr[0]), parseInt(sarr[1]) - 1, parseInt(sarr[2]));
		var eDate = new Date();
		eDate.setFullYear(parseInt(earr[0]), parseInt(earr[1]) - 1, parseInt(earr[2]));
		if(sarr.length == 6){
			sDate.setHours(parseInt(sarr[3]), parseInt(sarr[4]), parseInt(sarr[5]), 0);
			eDate.setHours(parseInt(earr[3]), parseInt(earr[4]), parseInt(earr[5]), 0);
		}else if(sarr.length == 5){
			sDate.setHours(parseInt(sarr[3]), parseInt(sarr[4]), 0, 0);
			eDate.setHours(parseInt(earr[3]), parseInt(earr[4]), 0, 0);
		}else if(sarr.length == 4){
			sDate.setHours(parseInt(sarr[3]), 0, 0, 0);
			eDate.setHours(parseInt(earr[3]), 0, 0, 0);
		}
		return sDate < eDate;
	}, $.validator.format(""));
	// 电话号码
	$.validator.addMethod("isPhone", function(value, element, param) {
		var reg = /^(\d{3,4}-)(\d{3}|\d{7,8})(-(\d{3,}))?$/;
		return this.optional(element) || (reg.test(value));
	}, $.validator.format("请输入有效电话号码"));
	// 手机号码
	$.validator.addMethod("isMobile", function(value, element, param) {
		var reg = /^1[0-9]{10}$/;
		return this.optional(element) || (reg.test(value));
	}, $.validator.format("请输入有效手机号码"));
	// 联系电话 (电话号码|手机号码)
	$.validator.addMethod("isTel", function(value, element, param) {
		var regp = /^(\d{3,4}-)(\d{3}|\d{7,8})(-(\d{3,}))?$/;
		var regm = /^1[0-9]{10}$/;
		return this.optional(element) || (regp.test(value)) || (regm.test(value));
	}, $.validator.format("请输入有效联系电话"));
	// 邮编
	$.validator.addMethod("isZipCode", function(value, element, param) {
		var reg = /^[0-9]{6}$/;
		return this.optional(element) || (reg.test(value));
	}, $.validator.format("请输入有效邮编"));
	// 价格 小数点保留两位, 可修正
	$.validator.addMethod("isPrice", function(value, element, param) {
		var reg = new RegExp("^-?[0-9]+(\.[0-9]+)?$");
		if(!reg.test(value)){
			$(element).val("0.00");
		}else{
            var pos = value.indexOf(".");
            var len = value.length;
            if(pos !== -1){
                if(pos + 2 < len - 1){
                    $(element).val(value.replace(/^(-?)(0*?)(0|[1-9][0-9]*?)(\.[0-9]{2})([0-9]+?)$/, '$1$3$4'));
                }else{
                    $(element).val(value.replace(/^(-?)(0*?)(0|[1-9][0-9]*?)(\.[0-9]+?)$/, '$1$3$4') + (pos + 2 == len - 1 ? "" : "0"));
                }
                
            }else{
                $(element).val(value.replace(/^(-?)(0+?)(0|[1-9][0-9]*?)$/, '$1$3'));
            }
		}
		return true;
	}, $.validator.format("请输入有效价格"));
	//输入正数价格
	$.validator.addMethod("isMoney", function(value, element, param) {
		var reg = new RegExp("^-?[0-9]+(\.[0-9]+)?$");
		value = value.trim();
		if(value == ""){
			return true;	
		}
		if(!reg.test(value)){
			$(element).val("0.00");
		}else{
            var pos = value.indexOf(".");
            var len = value.length;
            if(pos !== -1){
                if(pos + 2 < len - 1){
                    $(element).val(value.replace(/^(-?)(0*?)(0|[1-9][0-9]*?)(\.[0-9]{2})([0-9]+?)$/, '$1$3$4'));
                }else{
                    $(element).val(value.replace(/^(-?)(0*?)(0|[1-9][0-9]*?)(\.[0-9]+?)$/, '$1$3$4') + (pos + 2 == len - 1 ? "" : "0"));
                }
                
            }else{
                $(element).val(value.replace(/^(-?)(0+?)(0|[1-9][0-9]*?)$/, '$1$3'));
            }
		}
		return true;
	}, $.validator.format("请输入有效价格"));
	$.validator.setDefaults({
	    errorPlacement: function(error, element) {
			error.appendTo(element.parent().parent());
		},
		onkeyup: false
	});
})( jQuery );